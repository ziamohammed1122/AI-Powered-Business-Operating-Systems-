"""Document schemas."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class DocumentUpload(BaseModel):
    """Metadata for document upload (file sent as multipart)."""

    tags: list[str] | None = None


class DocumentResponse(BaseModel):
    id: UUID
    name: str
    type: str
    size: int
    uploaded_at: datetime
    uploaded_by: str  # user name
    status: str
    pages: int | None = None
    version: int
    tags: list[str]

    model_config = {"from_attributes": True}


class DocumentProcessingStatus(BaseModel):
    id: UUID
    status: str
    pages: int | None = None
    chunks_created: int = 0
    error_message: str | None = None
