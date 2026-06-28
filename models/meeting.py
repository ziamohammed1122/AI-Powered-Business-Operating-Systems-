"""Meeting model with action items."""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import ARRAY, JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base, SoftDeleteMixin, TimestampMixin, UUIDMixin


class Meeting(Base, UUIDMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "meetings"

    title: Mapped[str] = mapped_column(String(500), nullable=False)
    date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    duration: Mapped[int] = mapped_column(Integer, nullable=False)  # minutes
    attendees: Mapped[list[str] | None] = mapped_column(ARRAY(String), nullable=True, default=list)
    status: Mapped[str] = mapped_column(
        String(20), default="upcoming", nullable=False, index=True
    )  # upcoming, completed, cancelled
    summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    transcript: Mapped[str | None] = mapped_column(Text, nullable=True)
    action_items: Mapped[list[dict] | None] = mapped_column(JSONB, nullable=True, default=list)
    # action_items structure: [{"id": str, "text": str, "assignee": str, "completed": bool, "dueDate": str}]

    # Foreign keys
    workspace_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("workspaces.id"), nullable=False, index=True
    )
    created_by: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=False
    )

    # Relationships
    workspace = relationship("Workspace", back_populates="meetings")
    creator = relationship("User", foreign_keys=[created_by])

    def __repr__(self) -> str:
        return f"<Meeting {self.title}>"
