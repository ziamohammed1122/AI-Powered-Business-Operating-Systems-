"""Customer schemas."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class CustomerCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr | None = None
    phone: str | None = Field(None, max_length=50)
    company: str | None = Field(None, max_length=255)
    status: str = Field("lead", pattern="^(active|inactive|lead)$")
    total_spent: float = 0.0
    notes: str | None = None
    tags: list[str] | None = None


class CustomerUpdate(BaseModel):
    name: str | None = Field(None, min_length=1, max_length=255)
    email: EmailStr | None = None
    phone: str | None = None
    company: str | None = None
    status: str | None = Field(None, pattern="^(active|inactive|lead)$")
    total_spent: float | None = None
    notes: str | None = None
    tags: list[str] | None = None


class CustomerResponse(BaseModel):
    id: UUID
    name: str
    email: str | None = None
    phone: str | None = None
    company: str | None = None
    avatar: str | None = None
    status: str
    total_spent: float
    last_contact: datetime
    tags: list[str]
    notes: str | None = None

    model_config = {"from_attributes": True}


class CustomerInsight(BaseModel):
    """AI-generated customer insight."""

    summary: str
    risk_level: str  # low, medium, high
    next_steps: list[str]
    engagement_score: float
    key_topics: list[str]
