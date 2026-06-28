"""Audit log model — tracks all significant actions."""

import uuid

from sqlalchemy import Float, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base, TimestampMixin, UUIDMixin


class AuditLog(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "audit_logs"

    action: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    model: Mapped[str | None] = mapped_column(String(100), nullable=True)
    latency: Mapped[float | None] = mapped_column(Float, nullable=True)  # ms
    reason: Mapped[str | None] = mapped_column(Text, nullable=True)
    cost: Mapped[float | None] = mapped_column(Float, nullable=True)
    tokens: Mapped[int | None] = mapped_column(Integer, nullable=True)
    status: Mapped[str] = mapped_column(
        String(20), default="success", nullable=False
    )  # success, error, warning
    ip_address: Mapped[str | None] = mapped_column(String(45), nullable=True)
    user_agent: Mapped[str | None] = mapped_column(Text, nullable=True)
    request_path: Mapped[str | None] = mapped_column(String(500), nullable=True)
    request_method: Mapped[str | None] = mapped_column(String(10), nullable=True)
    response_code: Mapped[int | None] = mapped_column(Integer, nullable=True)
    metadata_: Mapped[str | None] = mapped_column("metadata", Text, nullable=True)

    # Foreign keys
    user_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=True, index=True
    )
    workspace_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("workspaces.id"), nullable=True, index=True
    )

    def __repr__(self) -> str:
        return f"<AuditLog {self.action} ({self.status})>"
