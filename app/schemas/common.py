"""Common schemas: pagination, filtering, sorting, standard responses."""

from typing import Any, Generic, TypeVar
from uuid import UUID

from pydantic import BaseModel, Field

T = TypeVar("T")


class PaginatedResponse(BaseModel, Generic[T]):
    """Standard paginated response wrapper."""

    items: list[T]
    total: int
    page: int
    page_size: int
    total_pages: int

    @classmethod
    def create(cls, items: list[T], total: int, page: int, page_size: int) -> "PaginatedResponse[T]":
        total_pages = max(1, (total + page_size - 1) // page_size)
        return cls(
            items=items,
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )


class SuccessResponse(BaseModel):
    """Standard success response."""

    success: bool = True
    message: str = "Operation completed successfully"
    data: Any = None


class ErrorResponse(BaseModel):
    """Standard error response."""

    error: bool = True
    message: str
    detail: Any = None


class IDResponse(BaseModel):
    """Response containing just an ID."""

    id: UUID


class FilterParams(BaseModel):
    """Common filter parameters."""

    search: str | None = Field(None, description="Full-text search query")
    status: str | None = Field(None, description="Filter by status")
    tags: list[str] | None = Field(None, description="Filter by tags")
    date_from: str | None = Field(None, description="Filter from date (ISO 8601)")
    date_to: str | None = Field(None, description="Filter to date (ISO 8601)")


class SortParams(BaseModel):
    """Common sort parameters."""

    sort_by: str = Field("created_at", description="Field to sort by")
    sort_order: str = Field("desc", description="Sort order: asc or desc")
