"""Audit log schemas."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class AuditLogResponse(BaseModel):
    id: UUID
    action: str
    model: str | None = None
    latency: float | None = None
    reason: str | None = None
    cost: float | None = None
    tokens: int | None = None
    timestamp: datetime
    user: str | None = None
    status: str

    model_config = {"from_attributes": True}
