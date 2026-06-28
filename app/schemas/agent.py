"""AI Agent schemas — requests and responses for business agents."""

from pydantic import BaseModel, Field


class AgentRequest(BaseModel):
    """Base request for AI agents."""

    context: str | None = None
    additional_instructions: str | None = None


class EmailGenerateRequest(AgentRequest):
    recipient_name: str
    recipient_email: str | None = None
    subject: str | None = None
    tone: str = Field("professional", pattern="^(professional|friendly|formal|casual)$")
    purpose: str = Field(..., description="What the email is about")
    customer_id: str | None = None  # To pull customer memories


class ProposalGenerateRequest(AgentRequest):
    client_name: str
    project_description: str
    budget_range: str | None = None
    timeline: str | None = None
    customer_id: str | None = None


class SalesAssistantRequest(AgentRequest):
    customer_id: str | None = None
    deal_stage: str | None = None
    question: str


class SupportAssistantRequest(AgentRequest):
    customer_id: str | None = None
    issue_description: str
    priority: str = "medium"


class AgentResponse(BaseModel):
    """Standard response from AI agents."""

    content: str
    model_used: str
    tokens_used: int
    suggestions: list[str] | None = None
    confidence: float | None = None


class KnowledgeSearchRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=1000)
    limit: int = Field(10, ge=1, le=50)
    document_ids: list[str] | None = None


class KnowledgeSearchResult(BaseModel):
    chunk_text: str
    document_name: str
    document_id: str
    relevance_score: float
    page: int | None = None
