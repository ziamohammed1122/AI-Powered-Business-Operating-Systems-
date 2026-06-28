"""
Custom exception hierarchy and FastAPI exception handlers.
"""

from typing import Any

from fastapi import HTTPException, Request, status
from fastapi.responses import ORJSONResponse


# ============================================================
# Custom Exceptions
# ============================================================


class AppException(Exception):
    """Base application exception."""

    def __init__(
        self,
        message: str = "An error occurred",
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail: Any = None,
    ):
        self.message = message
        self.status_code = status_code
        self.detail = detail
        super().__init__(message)


class NotFoundException(AppException):
    """Resource not found."""

    def __init__(self, resource: str = "Resource", resource_id: str | None = None):
        msg = f"{resource} not found"
        if resource_id:
            msg = f"{resource} with id '{resource_id}' not found"
        super().__init__(message=msg, status_code=status.HTTP_404_NOT_FOUND)


class UnauthorizedException(AppException):
    """Authentication required or invalid credentials."""

    def __init__(self, message: str = "Not authenticated"):
        super().__init__(message=message, status_code=status.HTTP_401_UNAUTHORIZED)


class ForbiddenException(AppException):
    """Insufficient permissions."""

    def __init__(self, message: str = "You do not have permission to perform this action"):
        super().__init__(message=message, status_code=status.HTTP_403_FORBIDDEN)


class ValidationException(AppException):
    """Request validation error."""

    def __init__(self, message: str = "Validation error", detail: Any = None):
        super().__init__(
            message=message,
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=detail,
        )


class ConflictException(AppException):
    """Resource already exists / conflict."""

    def __init__(self, message: str = "Resource already exists"):
        super().__init__(message=message, status_code=status.HTTP_409_CONFLICT)


class RateLimitExceededException(AppException):
    """Rate limit exceeded."""

    def __init__(self, message: str = "Rate limit exceeded. Please try again later."):
        super().__init__(message=message, status_code=status.HTTP_429_TOO_MANY_REQUESTS)


class BudgetExceededException(AppException):
    """AI budget exceeded."""

    def __init__(self, message: str = "AI usage budget exceeded for this workspace"):
        super().__init__(message=message, status_code=status.HTTP_402_PAYMENT_REQUIRED)


class ExternalServiceException(AppException):
    """External service (LLM provider, OAuth, etc.) failure."""

    def __init__(self, service: str, message: str = "External service error"):
        super().__init__(
            message=f"{service}: {message}",
            status_code=status.HTTP_502_BAD_GATEWAY,
        )


# ============================================================
# Exception Handlers
# ============================================================


async def app_exception_handler(request: Request, exc: AppException) -> ORJSONResponse:
    """Handle custom application exceptions."""
    return ORJSONResponse(
        status_code=exc.status_code,
        content={
            "error": True,
            "message": exc.message,
            "detail": exc.detail,
        },
    )


async def http_exception_handler(request: Request, exc: HTTPException) -> ORJSONResponse:
    """Handle FastAPI HTTP exceptions."""
    return ORJSONResponse(
        status_code=exc.status_code,
        content={
            "error": True,
            "message": exc.detail,
        },
    )


async def unhandled_exception_handler(request: Request, exc: Exception) -> ORJSONResponse:
    """Handle unhandled exceptions — return 500 with safe message."""
    import structlog

    logger = structlog.get_logger()
    await logger.aerror(
        "unhandled_exception",
        path=request.url.path,
        method=request.method,
        error=str(exc),
        exc_info=True,
    )
    return ORJSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": True,
            "message": "An internal server error occurred",
        },
    )
