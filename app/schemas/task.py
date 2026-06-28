"""Task schemas."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=500)
    description: str | None = None
    status: str = Field("backlog", pattern="^(backlog|todo|in-progress|review|done)$")
    priority: str = Field("medium", pattern="^(low|medium|high|urgent)$")
    assignee_id: UUID | None = None
    due_date: datetime | None = None
    tags: list[str] | None = None


class TaskUpdate(BaseModel):
    title: str | None = Field(None, min_length=1, max_length=500)
    description: str | None = None
    status: str | None = Field(None, pattern="^(backlog|todo|in-progress|review|done)$")
    priority: str | None = Field(None, pattern="^(low|medium|high|urgent)$")
    assignee_id: UUID | None = None
    due_date: datetime | None = None
    tags: list[str] | None = None


class TaskResponse(BaseModel):
    id: UUID
    title: str
    description: str | None = None
    status: str
    priority: str
    assignee: str | None = None
    due_date: datetime | None = None
    tags: list[str]
    ai_suggestion: str | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


class TaskSuggestionRequest(BaseModel):
    """Request AI task suggestions based on context."""

    context: str | None = None
    max_suggestions: int = Field(5, ge=1, le=10)
