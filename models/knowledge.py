"""Knowledge model — document chunks with vector embeddings for RAG."""

import uuid

from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from pgvector.sqlalchemy import Vector

from app.database.base import Base, TimestampMixin, UUIDMixin
from app.core.config import get_settings

settings = get_settings()


class Knowledge(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "knowledge"

    chunk_text: Mapped[str] = mapped_column(Text, nullable=False)
    chunk_index: Mapped[int] = mapped_column(Integer, nullable=False)
    metadata_: Mapped[dict | None] = mapped_column(
        "metadata", JSONB, nullable=True, default=dict
    )  # page number, section title, etc.

    # Vector embedding for semantic search
    embedding = mapped_column(Vector(settings.EMBEDDING_DIMENSION), nullable=True)

    # Foreign keys
    document_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("documents.id"), nullable=False, index=True
    )
    workspace_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("workspaces.id"), nullable=False, index=True
    )

    # Relationships
    document = relationship("Document", back_populates="chunks")

    def __repr__(self) -> str:
        return f"<Knowledge chunk={self.chunk_index} doc={self.document_id}>"
