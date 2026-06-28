"""Workspace model with member association."""

import uuid

from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base, SoftDeleteMixin, TimestampMixin, UUIDMixin


class Workspace(Base, UUIDMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "workspaces"

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    company_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("companies.id"), nullable=False, index=True
    )
    settings: Mapped[dict | None] = mapped_column(JSONB, nullable=True, default=dict)

    # Relationships
    company = relationship("Company", back_populates="workspaces")
    members = relationship("WorkspaceMember", back_populates="workspace", lazy="selectin")
    conversations = relationship("Conversation", back_populates="workspace", lazy="selectin")
    documents = relationship("Document", back_populates="workspace", lazy="selectin")
    memories = relationship("Memory", back_populates="workspace", lazy="selectin")
    customers = relationship("Customer", back_populates="workspace", lazy="selectin")
    meetings = relationship("Meeting", back_populates="workspace", lazy="selectin")
    tasks = relationship("Task", back_populates="workspace", lazy="selectin")

    def __repr__(self) -> str:
        return f"<Workspace {self.name}>"


class WorkspaceMember(Base, TimestampMixin):
    __tablename__ = "workspace_members"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    workspace_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("workspaces.id"), nullable=False, index=True
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True
    )
    role: Mapped[str] = mapped_column(String(50), default="member", nullable=False)

    # Relationships
    workspace = relationship("Workspace", back_populates="members")
    user = relationship("User", back_populates="workspace_memberships")
