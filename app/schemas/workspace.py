"""Workspace schemas."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class WorkspaceCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    description: str | None = None


class WorkspaceUpdate(BaseModel):
    name: str | None = Field(None, min_length=2, max_length=255)
    description: str | None = None
    settings: dict | None = None


class WorkspaceMemberAdd(BaseModel):
    email: str
    role: str = Field("member", pattern="^(owner|admin|member|viewer)$")


class WorkspaceMemberUpdate(BaseModel):
    role: str = Field(..., pattern="^(owner|admin|member|viewer)$")


class WorkspaceMemberResponse(BaseModel):
    user_id: UUID
    name: str
    email: str
    avatar: str | None = None
    role: str
    joined_at: datetime

    model_config = {"from_attributes": True}


class WorkspaceResponse(BaseModel):
    id: UUID
    name: str
    description: str | None = None
    plan: str | None = None
    member_count: int = 0
    settings: dict | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


class APIKeyCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)


class APIKeyResponse(BaseModel):
    id: UUID
    name: str
    key: str
    created_at: datetime
    last_used: datetime | None = None
    status: str = "active"

    model_config = {"from_attributes": True}
