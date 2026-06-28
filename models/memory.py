"""Memory model — persistent AI memories with vector embeddings."""

import uuid

from sqlalchemy import Float, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from pgvector.sqlalchemy import Vector

from app.database.base import Base, SoftDeleteMixin, TimestampMixin, UUIDMixin
from app.core.config import get_settings

settings = get_settings()


class Memory(Base, UUIDMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "memories"

    content: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(
        String(50), nullable=False, index=True
    )  # customer, sales, support, meeting, engineering, marketing, finance
    importance: Mapped[int] = mapped_column(Integer, default=5, nullable=False)  # 1-10
    source: Mapped[str] = mapped_column(String(255), nullable=False)
    source_id: Mapped[str | None] = mapped_column(String(255), nullable=True)
    tags: Mapped[list[str] | None] = mapped_column(ARRAY(String), nullable=True, default=list)
    related_to: Mapped[str | None] = mapped_column(String(255), nullable=True)
    memory_type: Mapped[str] = mapped_column(
        String(50), default="fact", nullable=False
    )  # fact, preference, decision, insight, reflection
    access_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    decay_factor: Mapped[float] = mapped_column(Float, default=1.0, nullable=False)

    # Vector embedding for semantic search
    embedding = mapped_column(Vector(settings.EMBEDDING_DIMENSION), nullable=True)

    # Foreign keys
    workspace_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("workspaces.id"), nullable=False, index=True
    )
    user_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=True
    )
    conversation_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("conversations.id"), nullable=True
    )

    # Relationships
    workspace = relationship("Workspace", back_populates="memories")

    def __repr__(self) -> str:
        return f"<Memory [{self.category}] importance={self.importance}>"
