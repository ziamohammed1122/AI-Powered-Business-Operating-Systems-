"""Meeting schemas."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class ActionItemSchema(BaseModel):
    id: str | None = None
    text: str
    assignee: str
    completed: bool = False
    due_date: str | None = None


class MeetingCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=500)
    date: datetime
    duration: int = Field(..., ge=1, description="Duration in minutes")
    attendees: list[str] | None = None
    status: str = Field("upcoming", pattern="^(upcoming|completed|cancelled)$")
    transcript: str | None = None


class MeetingUpdate(BaseModel):
    title: str | None = Field(None, min_length=1, max_length=500)
    date: datetime | None = None
    duration: int | None = None
    attendees: list[str] | None = None
    status: str | None = Field(None, pattern="^(upcoming|completed|cancelled)$")
    summary: str | None = None
    transcript: str | None = None
    action_items: list[ActionItemSchema] | None = None


class MeetingResponse(BaseModel):
    id: UUID
    title: str
    date: datetime
    duration: int
    attendees: list[str]
    status: str
    summary: str | None = None
    action_items: list[ActionItemSchema] | None = None
    transcript: str | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


class MeetingSummaryRequest(BaseModel):
    """Request to summarize a meeting transcript."""

    transcript: str | None = None  # If not provided, use stored transcript
