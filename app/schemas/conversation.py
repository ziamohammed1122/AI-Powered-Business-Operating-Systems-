"""Conversation and chat schemas."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class ConversationCreate(BaseModel):
    title: str = Field("New Conversation", max_length=500)
    model: str | None = None


class ConversationUpdate(BaseModel):
    title: str | None = Field(None, max_length=500)
    pinned: bool | None = None
    model: str | None = None


class ConversationResponse(BaseModel):
    id: UUID
    title: str
    last_message: str | None = None
    timestamp: datetime
    pinned: bool
    unread: bool = False
    model: str | None = None

    model_config = {"from_attributes": True}


class AttachmentSchema(BaseModel):
    id: str
    name: str
    type: str  # image, document, file
    url: str
    size: int


class ChatRequest(BaseModel):
    """Chat message from the user."""

    message: str = Field(..., min_length=1, max_length=50000)
    model: str | None = None  # Override model for this request
    attachments: list[AttachmentSchema] | None = None
    stream: bool = True
    context_memories: bool = True  # Include relevant memories
    context_knowledge: bool = True  # Include relevant knowledge base docs


class ChatMessageResponse(BaseModel):
    id: UUID
    role: str
    content: str
    timestamp: datetime
    model: str | None = None
    tokens: int | None = None
    attachments: list[dict] | None = None

    model_config = {"from_attributes": True}


class StreamChunk(BaseModel):
    """Server-Sent Event chunk for streaming responses."""

    type: str  # content, done, error, metadata
    content: str | None = None
    model: str | None = None
    tokens: int | None = None
    message_id: str | None = None
