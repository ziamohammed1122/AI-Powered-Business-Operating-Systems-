"""User schemas."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)


class UserUpdate(BaseModel):
    name: str | None = Field(None, min_length=2, max_length=255)
    avatar: str | None = None


class UserResponse(BaseModel):
    id: UUID
    name: str
    email: str
    avatar: str | None = None
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class UserProfileResponse(UserResponse):
    """Extended user profile with workspace info."""

    company: str | None = None
    role: str | None = None
    workspace_count: int = 0
