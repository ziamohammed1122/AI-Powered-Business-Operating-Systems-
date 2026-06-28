"""
FastAPI dependency injection: database, redis, authentication, workspace context.
"""

from collections.abc import AsyncGenerator
from typing import Annotated

import redis.asyncio as aioredis
from fastapi import Depends, Header, Query
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import Settings, get_settings
from app.core.exceptions import (
    ForbiddenException,
    NotFoundException,
    UnauthorizedException,
)
from app.core.permissions import Permission, check_permission
from app.core.security import decode_token, verify_token_type
from app.database.session import get_db
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember

# ============================================================
# Settings
# ============================================================

SettingsDep = Annotated[Settings, Depends(get_settings)]

# ============================================================
# Database
# ============================================================

DBSession = Annotated[AsyncSession, Depends(get_db)]

# ============================================================
# Redis
# ============================================================

_redis_pool: aioredis.Redis | None = None


async def get_redis() -> AsyncGenerator[aioredis.Redis, None]:
    """Get a Redis connection from the pool."""
    global _redis_pool
    if _redis_pool is None:
        settings = get_settings()
        _redis_pool = aioredis.from_url(
            settings.REDIS_URL,
            decode_responses=True,
            max_connections=20,
        )
    yield _redis_pool


RedisDep = Annotated[aioredis.Redis, Depends(get_redis)]

# ============================================================
# Authentication
# ============================================================

security_scheme = HTTPBearer(auto_error=False)


async def get_current_user(
    db: DBSession,
    credentials: HTTPAuthorizationCredentials | None = Depends(security_scheme),
) -> User:
    """Extract and validate the current user from the JWT bearer token."""
    if credentials is None:
        raise UnauthorizedException("Authorization header missing")

    try:
        payload = decode_token(credentials.credentials)
    except JWTError:
        raise UnauthorizedException("Invalid or expired token")

    if not verify_token_type(payload, "access"):
        raise UnauthorizedException("Invalid token type")

    user_id = payload.get("sub")
    if not user_id:
        raise UnauthorizedException("Token missing subject")

    result = await db.execute(select(User).where(User.id == user_id, User.is_active == True))
    user = result.scalar_one_or_none()

    if not user:
        raise UnauthorizedException("User not found or deactivated")

    return user


CurrentUser = Annotated[User, Depends(get_current_user)]


async def get_optional_user(
    db: DBSession,
    credentials: HTTPAuthorizationCredentials | None = Depends(security_scheme),
) -> User | None:
    """Get current user if authenticated, otherwise None."""
    if credentials is None:
        return None
    try:
        return await get_current_user(db, credentials)
    except UnauthorizedException:
        return None


OptionalUser = Annotated[User | None, Depends(get_optional_user)]

# ============================================================
# Workspace Context
# ============================================================


async def get_current_workspace(
    db: DBSession,
    current_user: CurrentUser,
    x_workspace_id: str | None = Header(None, alias="X-Workspace-ID"),
) -> Workspace:
    """Resolve the workspace from header and verify user membership."""
    if not x_workspace_id:
        raise UnauthorizedException("X-Workspace-ID header required")

    result = await db.execute(
        select(Workspace).where(
            Workspace.id == x_workspace_id,
            Workspace.is_deleted == False,
        )
    )
    workspace = result.scalar_one_or_none()

    if not workspace:
        raise NotFoundException("Workspace", x_workspace_id)

    # Verify membership
    member_result = await db.execute(
        select(WorkspaceMember).where(
            WorkspaceMember.workspace_id == workspace.id,
            WorkspaceMember.user_id == current_user.id,
        )
    )
    member = member_result.scalar_one_or_none()

    if not member:
        raise ForbiddenException("You are not a member of this workspace")

    # Attach role to user for permission checks in this request
    current_user._workspace_role = member.role  # type: ignore[attr-defined]

    return workspace


CurrentWorkspace = Annotated[Workspace, Depends(get_current_workspace)]

# ============================================================
# Permission Dependency Factory
# ============================================================


def require_permission(permission: Permission):
    """Create a dependency that checks the user has a specific permission in the workspace."""

    async def _check(
        current_user: CurrentUser,
        workspace: CurrentWorkspace,
    ) -> User:
        role = getattr(current_user, "_workspace_role", "viewer")
        check_permission(role, permission)
        return current_user

    return Depends(_check)


# ============================================================
# Pagination
# ============================================================


class PaginationParams:
    """Common pagination parameters."""

    def __init__(
        self,
        page: int = Query(1, ge=1, description="Page number"),
        page_size: int = Query(20, ge=1, le=100, description="Items per page"),
    ):
        self.page = page
        self.page_size = page_size
        self.offset = (page - 1) * page_size
        self.limit = page_size


PaginationDep = Annotated[PaginationParams, Depends()]
