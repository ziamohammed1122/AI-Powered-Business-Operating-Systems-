"""
RBAC permission system with role definitions and workspace-scoped access control.
"""

from enum import Enum
from functools import wraps
from typing import Any, Callable

from fastapi import Depends

from app.core.exceptions import ForbiddenException


class Role(str, Enum):
    """User roles in a workspace."""

    OWNER = "owner"
    ADMIN = "admin"
    MEMBER = "member"
    VIEWER = "viewer"


class Permission(str, Enum):
    """Available permissions."""

    # Workspace
    WORKSPACE_READ = "workspace:read"
    WORKSPACE_UPDATE = "workspace:update"
    WORKSPACE_DELETE = "workspace:delete"
    WORKSPACE_MANAGE_MEMBERS = "workspace:manage_members"

    # Conversations
    CONVERSATION_CREATE = "conversation:create"
    CONVERSATION_READ = "conversation:read"
    CONVERSATION_DELETE = "conversation:delete"

    # Documents
    DOCUMENT_UPLOAD = "document:upload"
    DOCUMENT_READ = "document:read"
    DOCUMENT_DELETE = "document:delete"

    # Customers
    CUSTOMER_CREATE = "customer:create"
    CUSTOMER_READ = "customer:read"
    CUSTOMER_UPDATE = "customer:update"
    CUSTOMER_DELETE = "customer:delete"

    # Meetings
    MEETING_CREATE = "meeting:create"
    MEETING_READ = "meeting:read"
    MEETING_UPDATE = "meeting:update"
    MEETING_DELETE = "meeting:delete"

    # Tasks
    TASK_CREATE = "task:create"
    TASK_READ = "task:read"
    TASK_UPDATE = "task:update"
    TASK_DELETE = "task:delete"

    # Memory
    MEMORY_READ = "memory:read"
    MEMORY_CREATE = "memory:create"
    MEMORY_DELETE = "memory:delete"

    # Analytics
    ANALYTICS_READ = "analytics:read"

    # Audit
    AUDIT_READ = "audit:read"

    # Settings
    SETTINGS_READ = "settings:read"
    SETTINGS_UPDATE = "settings:update"

    # Billing
    BILLING_READ = "billing:read"
    BILLING_MANAGE = "billing:manage"

    # AI Agents
    AGENT_USE = "agent:use"


# ============================================================
# Role -> Permission Mapping
# ============================================================

ROLE_PERMISSIONS: dict[Role, set[Permission]] = {
    Role.OWNER: set(Permission),  # All permissions
    Role.ADMIN: {
        Permission.WORKSPACE_READ,
        Permission.WORKSPACE_UPDATE,
        Permission.WORKSPACE_MANAGE_MEMBERS,
        Permission.CONVERSATION_CREATE,
        Permission.CONVERSATION_READ,
        Permission.CONVERSATION_DELETE,
        Permission.DOCUMENT_UPLOAD,
        Permission.DOCUMENT_READ,
        Permission.DOCUMENT_DELETE,
        Permission.CUSTOMER_CREATE,
        Permission.CUSTOMER_READ,
        Permission.CUSTOMER_UPDATE,
        Permission.CUSTOMER_DELETE,
        Permission.MEETING_CREATE,
        Permission.MEETING_READ,
        Permission.MEETING_UPDATE,
        Permission.MEETING_DELETE,
        Permission.TASK_CREATE,
        Permission.TASK_READ,
        Permission.TASK_UPDATE,
        Permission.TASK_DELETE,
        Permission.MEMORY_READ,
        Permission.MEMORY_CREATE,
        Permission.MEMORY_DELETE,
        Permission.ANALYTICS_READ,
        Permission.AUDIT_READ,
        Permission.SETTINGS_READ,
        Permission.SETTINGS_UPDATE,
        Permission.BILLING_READ,
        Permission.AGENT_USE,
    },
    Role.MEMBER: {
        Permission.WORKSPACE_READ,
        Permission.CONVERSATION_CREATE,
        Permission.CONVERSATION_READ,
        Permission.DOCUMENT_UPLOAD,
        Permission.DOCUMENT_READ,
        Permission.CUSTOMER_CREATE,
        Permission.CUSTOMER_READ,
        Permission.CUSTOMER_UPDATE,
        Permission.MEETING_CREATE,
        Permission.MEETING_READ,
        Permission.MEETING_UPDATE,
        Permission.TASK_CREATE,
        Permission.TASK_READ,
        Permission.TASK_UPDATE,
        Permission.MEMORY_READ,
        Permission.MEMORY_CREATE,
        Permission.ANALYTICS_READ,
        Permission.SETTINGS_READ,
        Permission.AGENT_USE,
    },
    Role.VIEWER: {
        Permission.WORKSPACE_READ,
        Permission.CONVERSATION_READ,
        Permission.DOCUMENT_READ,
        Permission.CUSTOMER_READ,
        Permission.MEETING_READ,
        Permission.TASK_READ,
        Permission.MEMORY_READ,
        Permission.ANALYTICS_READ,
        Permission.SETTINGS_READ,
    },
}


def has_permission(role: Role, permission: Permission) -> bool:
    """Check if a role has a specific permission."""
    return permission in ROLE_PERMISSIONS.get(role, set())


def check_permission(role: str, permission: Permission) -> None:
    """Raise ForbiddenException if the role lacks the required permission."""
    try:
        role_enum = Role(role)
    except ValueError:
        raise ForbiddenException(f"Unknown role: {role}")

    if not has_permission(role_enum, permission):
        raise ForbiddenException(
            f"Role '{role}' does not have permission '{permission.value}'"
        )


def require_permission(permission: Permission) -> Callable:
    """Dependency that enforces a permission check on the current user."""

    async def _check(current_user: Any = Depends()) -> Any:
        # This is wired up properly in dependencies.py
        check_permission(current_user.role, permission)
        return current_user

    return _check
