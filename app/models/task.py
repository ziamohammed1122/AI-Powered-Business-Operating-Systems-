"""Task model — project management with AI suggestions."""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base, SoftDeleteMixin, TimestampMixin, UUIDMixin


class Task(Base, UUIDMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "tasks"

    title: Mapped[str] = mapped_column(String(500), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(
        String(20), default="backlog", nullable=False, index=True
    )  # backlog, todo, in-progress, review, done
    priority: Mapped[str] = mapped_column(
        String(20), default="medium", nullable=False
    )  # low, medium, high, urgent
    due_date: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    tags: Mapped[list[str] | None] = mapped_column(ARRAY(String), nullable=True, default=list)
    ai_suggestion: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Foreign keys
    workspace_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("workspaces.id"), nullable=False, index=True
    )
    assignee_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=True, index=True
    )
    created_by: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=False
    )

    # Relationships
    workspace = relationship("Workspace", back_populates="tasks")
    assignee = relationship("User", foreign_keys=[assignee_id])
    creator = relationship("User", foreign_keys=[created_by])

    def __repr__(self) -> str:
        return f"<Task {self.title} ({self.status})>"
