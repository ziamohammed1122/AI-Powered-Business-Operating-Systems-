"""Billing model — subscription and payment tracking."""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, String
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base, TimestampMixin, UUIDMixin


class Billing(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "billing"

    plan: Mapped[str] = mapped_column(
        String(50), default="free", nullable=False
    )  # free, pro, enterprise
    status: Mapped[str] = mapped_column(
        String(20), default="active", nullable=False
    )  # active, cancelled, past_due, trialing
    stripe_customer_id: Mapped[str | None] = mapped_column(String(255), nullable=True, unique=True)
    stripe_subscription_id: Mapped[str | None] = mapped_column(String(255), nullable=True, unique=True)
    current_period_start: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    current_period_end: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    monthly_ai_budget: Mapped[float] = mapped_column(Float, default=50.0, nullable=False)
    monthly_ai_spent: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    features: Mapped[dict | None] = mapped_column(JSONB, nullable=True, default=dict)

    # Foreign keys
    company_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("companies.id"), nullable=False, unique=True, index=True
    )

    # Relationships
    company = relationship("Company", back_populates="billing")

    def __repr__(self) -> str:
        return f"<Billing {self.plan} ({self.status})>"
