"""Company model — organization-level entity."""

from sqlalchemy import String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base, SoftDeleteMixin, TimestampMixin, UUIDMixin


class Company(Base, UUIDMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "companies"

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    domain: Mapped[str | None] = mapped_column(String(255), unique=True, nullable=True, index=True)
    logo: Mapped[str | None] = mapped_column(Text, nullable=True)
    plan: Mapped[str] = mapped_column(String(50), default="free", nullable=False)
    settings: Mapped[dict | None] = mapped_column(JSONB, nullable=True, default=dict)

    # Relationships
    workspaces = relationship("Workspace", back_populates="company", lazy="selectin")
    billing = relationship("Billing", back_populates="company", uselist=False, lazy="selectin")

    def __repr__(self) -> str:
        return f"<Company {self.name}>"
