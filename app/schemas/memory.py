"""Memory schemas."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class MemoryCreate(BaseModel):
    content: str = Field(..., min_length=1, max_length=5000)
    category: str = Field(..., pattern="^(customer|sales|support|meeting|engineering|marketing|finance)$")
    importance: int = Field(5, ge=1, le=10)
    source: str = Field(..., max_length=255)
    tags: list[str] | None = None
    related_to: str | None = None
    memory_type: str = Field("fact", pattern="^(fact|preference|decision|insight|reflection)$")


class MemoryUpdate(BaseModel):
    content: str | None = Field(None, min_length=1, max_length=5000)
    category: str | None = None
    importance: int | None = Field(None, ge=1, le=10)
    tags: list[str] | None = None


class MemoryResponse(BaseModel):
    id: UUID
    content: str
    category: str
    importance: int
    source: str
    timestamp: datetime
    tags: list[str]
    related_to: str | None = None
    memory_type: str
    access_count: int

    model_config = {"from_attributes": True}


class MemorySearchRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=1000)
    category: str | None = None
    min_importance: int | None = Field(None, ge=1, le=10)
    limit: int = Field(10, ge=1, le=50)
    include_reflections: bool = False
