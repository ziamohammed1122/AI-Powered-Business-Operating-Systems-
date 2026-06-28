"""Analytics schemas."""

from datetime import datetime

from pydantic import BaseModel


class AnalyticsDataPoint(BaseModel):
    date: str
    requests: int
    cost: float
    savings: float
    latency: float
    tokens: int


class ModelUsageResponse(BaseModel):
    model: str
    requests: int
    cost: float
    tokens: int
    color: str


class DailyAnalyticsResponse(BaseModel):
    data: list[AnalyticsDataPoint]
    total_cost: float
    total_savings: float
    total_requests: int
    avg_latency: float


class CostBreakdown(BaseModel):
    provider: str
    model: str
    cost: float
    percentage: float
    requests: int


class AnalyticsSummary(BaseModel):
    daily_cost: float
    monthly_cost: float
    total_savings: float
    avg_latency_ms: float
    total_tokens: int
    active_models: int
    memory_count: int
    document_count: int
