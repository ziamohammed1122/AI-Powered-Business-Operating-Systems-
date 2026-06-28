import type {
  PricingPlan,
  FAQItem,
  Testimonial,
  Conversation,
  ChatMessage,
  Memory,
  KBDocument,
  Customer,
  Meeting,
  Task,
  AnalyticsData,
  ModelUsage,
  AuditLog,
} from '@/types';

// ===== Navigation =====
export const SIDEBAR_NAV = [
  { label: 'Dashboard', path: '/app', icon: 'LayoutDashboard' },
  { label: 'AI Chat', path: '/app/chat', icon: 'MessageSquare' },
  { label: 'Memory', path: '/app/memory', icon: 'Brain' },
  { label: 'Knowledge Base', path: '/app/knowledge', icon: 'BookOpen' },
  { label: 'Customers', path: '/app/customers', icon: 'Users' },
  { label: 'Meetings', path: '/app/meetings', icon: 'Video' },
  { label: 'Tasks', path: '/app/tasks', icon: 'CheckSquare' },
  { label: 'Analytics', path: '/app/analytics', icon: 'BarChart3' },
  { label: 'Audit Logs', path: '/app/audit', icon: 'Shield' },
  { label: 'Settings', path: '/app/settings', icon: 'Settings' },
];

// ===== Landing Page Features =====
export const FEATURES = [
  {
    icon: 'Brain',
    title: 'AI Memory',
    description: 'Persistent business memory that remembers every interaction, decision, and context across your entire organization.',
  },
  {
    icon: 'GitBranch',
    title: 'Smart Routing',
    description: 'Automatically selects the optimal AI model for each task, balancing cost, speed, and quality in real-time.',
  },
  {
    icon: 'BookOpen',
    title: 'Knowledge Base',
    description: 'Search across every document, conversation, and data point with semantic AI-powered search.',
  },
  {
    icon: 'Workflow',
    title: 'Workflow Automation',
    description: 'Automate repetitive business processes with intelligent AI-driven workflow orchestration.',
  },
  {
    icon: 'TrendingDown',
    title: 'Cost Analytics',
    description: 'Track and optimize your AI spending with real-time cost analytics and smart model selection.',
  },
  {
    icon: 'Shield',
    title: 'Audit Trail',
    description: 'Complete transparency with detailed logs of every AI decision, model selection, and reasoning.',
  },
];

// ===== Customer Logos =====
export const CUSTOMER_LOGOS = [
  'Stripe', 'Vercel', 'Linear', 'Notion', 'Figma', 'Slack',
  'GitHub', 'GitLab', 'Datadog', 'MongoDB', 'Supabase', 'Prisma',
];

// ===== Testimonials =====
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'TechScale Inc.',
    content: 'MemoryOS AI transformed how our engineering team works. The persistent memory means our AI actually understands our codebase and processes. We\'ve cut onboarding time by 60%.',
    avatar: 'SC',
    rating: 5,
  },
  {
    name: 'Marcus Williams',
    role: 'Head of Sales',
    company: 'CloudFirst',
    content: 'The customer memory feature is incredible. Our sales team now has complete context for every interaction. Our close rate increased by 35% in just 3 months.',
    avatar: 'MW',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'COO',
    company: 'FinFlow',
    content: 'The cost analytics alone paid for MemoryOS AI. We\'re saving $12,000/month on AI costs with smart model routing. The audit trail gives our compliance team peace of mind.',
    avatar: 'ER',
    rating: 5,
  },
];

// ===== Pricing =====
export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    price: 49,
    period: '/month',
    description: 'For small teams getting started with AI',
    cta: 'Start Free Trial',
    features: [
      '5 team members',
      '10,000 AI requests/month',
      '5GB knowledge base storage',
      'Basic memory retention',
      'Email support',
      '7-day conversation history',
    ],
  },
  {
    name: 'Professional',
    price: 149,
    period: '/month',
    description: 'For growing teams that need more power',
    cta: 'Start Free Trial',
    popular: true,
    features: [
      '25 team members',
      '100,000 AI requests/month',
      '50GB knowledge base storage',
      'Advanced memory & context',
      'Smart model routing',
      'Priority support',
      'Custom workflows',
      'API access',
      'Audit logs',
    ],
  },
  {
    name: 'Enterprise',
    price: 499,
    period: '/month',
    description: 'For organizations that demand the best',
    cta: 'Contact Sales',
    features: [
      'Unlimited team members',
      'Unlimited AI requests',
      'Unlimited storage',
      'Enterprise memory',
      'Advanced routing & fallback',
      'Dedicated support',
      'Custom integrations',
      'SSO & SAML',
      'SLA guarantee',
      'On-premise deployment',
    ],
  },
];

// ===== FAQ =====
export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What is MemoryOS AI?',
    answer: 'MemoryOS AI is an AI-powered business operating system that provides persistent memory across all your business interactions. It remembers conversations, documents, meetings, and customer interactions, turning them into actionable business intelligence.',
  },
  {
    question: 'How does Smart Routing work?',
    answer: 'Smart Routing automatically selects the best AI model for each task based on complexity, cost, and required capabilities. It dynamically routes between GPT-4, Claude, Gemini, and other models to optimize both quality and cost.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use enterprise-grade encryption (AES-256) for data at rest and TLS 1.3 for data in transit. We\'re SOC 2 Type II compliant and GDPR ready. Enterprise plans include SSO, SAML, and on-premise deployment options.',
  },
  {
    question: 'Can I integrate with my existing tools?',
    answer: 'Yes! MemoryOS AI integrates with Slack, Teams, Google Workspace, Salesforce, HubSpot, Jira, and 200+ other tools through our API and native integrations.',
  },
  {
    question: 'What file formats does the Knowledge Base support?',
    answer: 'The Knowledge Base supports PDF, Word (.docx), Excel (.xlsx), CSV, PowerPoint (.pptx), and plain text files. We use advanced AI to extract and index content for semantic search.',
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes! We offer a 14-day free trial on all plans with no credit card required. You can explore all features and cancel anytime.',
  },
];

// ===== Mock Conversations =====
export const MOCK_CONVERSATIONS: Conversation[] = [
  { id: '1', title: 'Q3 Revenue Analysis', lastMessage: 'Based on the data, Q3 revenue increased by 23%...', timestamp: '2026-06-27T10:30:00Z', pinned: true, unread: false, model: 'GPT-4' },
  { id: '2', title: 'Customer Onboarding Flow', lastMessage: 'I\'ve drafted the new onboarding sequence...', timestamp: '2026-06-27T09:15:00Z', pinned: true, unread: true, model: 'Claude 3.5' },
  { id: '3', title: 'API Integration Help', lastMessage: 'Here\'s the code for the webhook handler...', timestamp: '2026-06-27T08:00:00Z', pinned: false, unread: false, model: 'GPT-4' },
  { id: '4', title: 'Marketing Campaign Ideas', lastMessage: 'For the product launch, I suggest...', timestamp: '2026-06-26T16:45:00Z', pinned: false, unread: false, model: 'Claude 3.5' },
  { id: '5', title: 'Bug Triage: Auth Module', lastMessage: 'The issue is in the token refresh logic...', timestamp: '2026-06-26T14:20:00Z', pinned: false, unread: true, model: 'GPT-4' },
  { id: '6', title: 'Sales Pitch Review', lastMessage: 'The pitch deck looks strong, but consider...', timestamp: '2026-06-26T11:00:00Z', pinned: false, unread: false, model: 'Gemini Pro' },
  { id: '7', title: 'Weekly Team Standup Notes', lastMessage: 'Here are the action items from today...', timestamp: '2026-06-25T09:00:00Z', pinned: false, unread: false, model: 'Claude 3.5' },
  { id: '8', title: 'Database Optimization', lastMessage: 'I recommend adding indexes on these columns...', timestamp: '2026-06-25T07:30:00Z', pinned: false, unread: false, model: 'GPT-4' },
];

// ===== Mock Chat Messages =====
export const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content: 'Analyze our Q3 revenue data and compare it to Q2. Focus on the key growth drivers.',
    timestamp: '2026-06-27T10:25:00Z',
  },
  {
    id: '2',
    role: 'assistant',
    content: `## Q3 Revenue Analysis\n\nBased on the data from your knowledge base, here's the comprehensive Q3 vs Q2 comparison:\n\n### Key Metrics\n| Metric | Q2 | Q3 | Change |\n|--------|-----|-----|--------|\n| Total Revenue | $2.4M | $2.95M | +23% |\n| MRR | $800K | $983K | +22.9% |\n| New Customers | 145 | 203 | +40% |\n| Churn Rate | 4.2% | 3.1% | -26% |\n\n### Top Growth Drivers\n1. **Enterprise Plan Adoption** — 12 new enterprise accounts contributed $450K ARR\n2. **Product-Led Growth** — Self-serve signups increased 35% after the knowledge base launch\n3. **Reduced Churn** — Customer success automation reduced churn from 4.2% to 3.1%\n\n### Recommendations\n- Double down on enterprise outreach; the pipeline is strong\n- Consider a mid-tier plan between Pro and Enterprise\n- Invest in customer success automation\n\n*I've pulled this from 47 documents in your knowledge base and 23 customer conversations.*`,
    timestamp: '2026-06-27T10:26:00Z',
    model: 'GPT-4',
    tokens: 2847,
  },
  {
    id: '3',
    role: 'user',
    content: 'Great analysis! Can you create a summary I can share with the board?',
    timestamp: '2026-06-27T10:28:00Z',
  },
  {
    id: '4',
    role: 'assistant',
    content: `## Board Summary: Q3 Performance\n\n**Executive Overview**: Q3 2026 delivered exceptional results with 23% revenue growth, driven by enterprise expansion and reduced churn.\n\n### Headlines\n- 📈 Revenue reached **$2.95M** (+23% QoQ)\n- 🏢 **12 new enterprise** accounts onboarded\n- 📉 Churn reduced to **3.1%** (industry-leading)\n- 🚀 **203 new customers** acquired\n\n### Strategic Outlook\nThe business is in a strong position entering Q4. Key priorities:\n1. Scale enterprise sales team (3 new AEs recommended)\n2. Launch mid-market pricing tier\n3. Expand AI capabilities for customer success\n\n> *Projected Q4 revenue: $3.4M-$3.6M based on current pipeline*\n\nShall I format this as a presentation or email draft?`,
    timestamp: '2026-06-27T10:30:00Z',
    model: 'GPT-4',
    tokens: 1523,
  },
];

// ===== Suggested Prompts =====
export const SUGGESTED_PROMPTS = [
  { icon: 'BarChart3', text: 'Analyze this quarter\'s revenue trends' },
  { icon: 'Users', text: 'Summarize recent customer interactions' },
  { icon: 'FileText', text: 'Search our knowledge base for...' },
  { icon: 'Lightbulb', text: 'Generate ideas for the product roadmap' },
];

// ===== Mock Memories =====
export const MOCK_MEMORIES: Memory[] = [
  { id: '1', content: 'Acme Corp prefers communication via Slack over email. Key contact: John Davis (VP Engineering).', category: 'customer', importance: 9, source: 'Sales call with Acme Corp', timestamp: '2026-06-27T10:00:00Z', tags: ['acme', 'preferences', 'communication'] },
  { id: '2', content: 'Q3 target: $3M revenue. Currently at $2.95M (98.3%). Need $50K more to hit target.', category: 'sales', importance: 10, source: 'Revenue dashboard', timestamp: '2026-06-27T09:00:00Z', tags: ['revenue', 'q3', 'target'] },
  { id: '3', content: 'Customer reported intermittent 502 errors on the API gateway. Root cause: connection pool exhaustion during peak hours.', category: 'support', importance: 8, source: 'Support ticket #4521', timestamp: '2026-06-26T15:30:00Z', tags: ['api', 'bug', 'infrastructure'] },
  { id: '4', content: 'Team decided to migrate from REST to GraphQL for the public API. Timeline: Q4 2026.', category: 'engineering', importance: 9, source: 'Engineering all-hands', timestamp: '2026-06-26T14:00:00Z', tags: ['api', 'graphql', 'migration'] },
  { id: '5', content: 'Product launch event scheduled for August 15th. Budget approved: $25,000. Venue: TBD.', category: 'marketing', importance: 7, source: 'Marketing standup', timestamp: '2026-06-26T11:00:00Z', tags: ['launch', 'event', 'budget'] },
  { id: '6', content: 'Board approved hiring 3 new senior engineers and 2 AEs for Q4. Total budget: $850K.', category: 'finance', importance: 10, source: 'Board meeting minutes', timestamp: '2026-06-25T16:00:00Z', tags: ['hiring', 'budget', 'board'] },
  { id: '7', content: 'Weekly standup: Auth service migration 80% complete. Expected finish by Friday.', category: 'meeting', importance: 6, source: 'Team standup', timestamp: '2026-06-25T09:00:00Z', tags: ['standup', 'auth', 'migration'] },
  { id: '8', content: 'CloudFirst renewed their annual contract at $180K/year. Upsold from Pro to Enterprise plan.', category: 'sales', importance: 9, source: 'CRM update', timestamp: '2026-06-24T16:00:00Z', tags: ['renewal', 'upsell', 'enterprise'] },
];

// ===== Mock Documents =====
export const MOCK_DOCUMENTS: KBDocument[] = [
  { id: '1', name: 'Q3 Revenue Report.pdf', type: 'pdf', size: 2400000, uploadedAt: '2026-06-27T08:00:00Z', uploadedBy: 'Sarah Chen', status: 'ready', pages: 24, version: 3, tags: ['finance', 'quarterly'] },
  { id: '2', name: 'Product Roadmap 2026.pptx', type: 'powerpoint', size: 5200000, uploadedAt: '2026-06-26T14:00:00Z', uploadedBy: 'Alex Kim', status: 'ready', pages: 32, version: 5, tags: ['product', 'roadmap'] },
  { id: '3', name: 'Customer Database.xlsx', type: 'excel', size: 1800000, uploadedAt: '2026-06-26T10:00:00Z', uploadedBy: 'Marcus Williams', status: 'ready', pages: undefined, version: 12, tags: ['customers', 'data'] },
  { id: '4', name: 'API Documentation.pdf', type: 'pdf', size: 3100000, uploadedAt: '2026-06-25T16:00:00Z', uploadedBy: 'Dev Team', status: 'ready', pages: 67, version: 8, tags: ['engineering', 'api'] },
  { id: '5', name: 'Sales Playbook.docx', type: 'word', size: 890000, uploadedAt: '2026-06-25T11:00:00Z', uploadedBy: 'Emily Rodriguez', status: 'ready', pages: 15, version: 2, tags: ['sales', 'playbook'] },
  { id: '6', name: 'Marketing Analytics.csv', type: 'csv', size: 450000, uploadedAt: '2026-06-24T09:00:00Z', uploadedBy: 'Marketing Team', status: 'processing', pages: undefined, version: 1, tags: ['marketing', 'analytics'] },
];

// ===== Mock Customers =====
export const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Acme Corporation', email: 'contact@acme.com', company: 'Acme Corp', status: 'active', totalSpent: 240000, lastContact: '2026-06-27T10:00:00Z', tags: ['enterprise', 'tech'], phone: '+1 (555) 123-4567', notes: 'Key account. VP Engineering is main contact.' },
  { id: '2', name: 'CloudFirst Solutions', email: 'hello@cloudfirst.io', company: 'CloudFirst', status: 'active', totalSpent: 180000, lastContact: '2026-06-26T14:00:00Z', tags: ['enterprise', 'saas'], phone: '+1 (555) 234-5678' },
  { id: '3', name: 'DataFlow Inc', email: 'info@dataflow.com', company: 'DataFlow', status: 'active', totalSpent: 96000, lastContact: '2026-06-25T09:00:00Z', tags: ['mid-market', 'data'], phone: '+1 (555) 345-6789' },
  { id: '4', name: 'NexGen Labs', email: 'team@nexgen.dev', company: 'NexGen Labs', status: 'lead', totalSpent: 0, lastContact: '2026-06-27T11:00:00Z', tags: ['startup', 'ai'], phone: '+1 (555) 456-7890' },
  { id: '5', name: 'FinFlow Analytics', email: 'ops@finflow.com', company: 'FinFlow', status: 'active', totalSpent: 156000, lastContact: '2026-06-24T16:00:00Z', tags: ['enterprise', 'finance'], phone: '+1 (555) 567-8901' },
  { id: '6', name: 'GreenTech Co', email: 'info@greentech.co', company: 'GreenTech', status: 'inactive', totalSpent: 48000, lastContact: '2026-05-15T10:00:00Z', tags: ['mid-market', 'sustainability'] },
];

// ===== Mock Meetings =====
export const MOCK_MEETINGS: Meeting[] = [
  {
    id: '1', title: 'Q3 Revenue Review', date: '2026-06-27T14:00:00Z', duration: 60, attendees: ['Sarah Chen', 'Marcus Williams', 'Emily Rodriguez'], status: 'completed',
    summary: 'Reviewed Q3 performance. Revenue at $2.95M vs $3M target. Discussed strategies to close the gap. Enterprise pipeline looks strong.',
    actionItems: [
      { id: '1', text: 'Follow up with Acme Corp on upsell', assignee: 'Marcus', completed: false, dueDate: '2026-06-30' },
      { id: '2', text: 'Prepare Q4 forecast model', assignee: 'Sarah', completed: false, dueDate: '2026-07-05' },
      { id: '3', text: 'Schedule enterprise demo pipeline review', assignee: 'Emily', completed: true },
    ],
  },
  {
    id: '2', title: 'Engineering Sprint Planning', date: '2026-06-27T10:00:00Z', duration: 45, attendees: ['Alex Kim', 'Dev Team'], status: 'completed',
    summary: 'Planned Sprint 23. Focus on API v2, auth migration, and performance improvements. 42 story points committed.',
    actionItems: [
      { id: '4', text: 'Create API v2 migration guide', assignee: 'Alex', completed: false, dueDate: '2026-07-01' },
      { id: '5', text: 'Set up performance monitoring', assignee: 'Dev Team', completed: false, dueDate: '2026-07-03' },
    ],
  },
  { id: '3', title: 'Customer Success Sync', date: '2026-06-28T11:00:00Z', duration: 30, attendees: ['CS Team'], status: 'upcoming', summary: undefined, actionItems: [] },
  { id: '4', title: 'Product Roadmap Review', date: '2026-06-28T15:00:00Z', duration: 60, attendees: ['Product Team', 'Engineering'], status: 'upcoming' },
  { id: '5', title: 'Investor Update Call', date: '2026-06-30T16:00:00Z', duration: 45, attendees: ['CEO', 'CFO', 'Board'], status: 'upcoming' },
];

// ===== Mock Tasks =====
export const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Implement API v2 endpoints', description: 'Build new REST endpoints for the v2 API with pagination and filtering', status: 'in-progress', priority: 'high', assignee: 'Alex Kim', dueDate: '2026-07-01', tags: ['api', 'backend'], createdAt: '2026-06-20T10:00:00Z' },
  { id: '2', title: 'Design new dashboard UI', description: 'Create mockups for the redesigned analytics dashboard', status: 'review', priority: 'medium', assignee: 'Design Team', dueDate: '2026-06-30', tags: ['design', 'dashboard'], createdAt: '2026-06-18T09:00:00Z' },
  { id: '3', title: 'Fix auth token refresh bug', description: 'Token refresh failing intermittently causing 401 errors', status: 'todo', priority: 'urgent', assignee: 'Backend Team', dueDate: '2026-06-28', tags: ['bug', 'auth'], aiSuggestion: 'Check the token expiry buffer time. Consider implementing a token queue.', createdAt: '2026-06-25T14:00:00Z' },
  { id: '4', title: 'Write Q3 blog post', description: 'Highlight key product updates and customer wins', status: 'todo', priority: 'medium', assignee: 'Marketing', dueDate: '2026-07-05', tags: ['marketing', 'content'], createdAt: '2026-06-22T11:00:00Z' },
  { id: '5', title: 'Set up CI/CD pipeline', description: 'Implement GitHub Actions for automated testing and deployment', status: 'done', priority: 'high', assignee: 'DevOps', tags: ['infra', 'devops'], createdAt: '2026-06-15T10:00:00Z' },
  { id: '6', title: 'Customer onboarding automation', description: 'Build automated email sequences for new customers', status: 'backlog', priority: 'low', assignee: 'Growth Team', tags: ['automation', 'growth'], createdAt: '2026-06-23T09:00:00Z' },
  { id: '7', title: 'Database performance audit', description: 'Analyze slow queries and optimize database indexes', status: 'in-progress', priority: 'high', assignee: 'Alex Kim', dueDate: '2026-07-02', tags: ['database', 'performance'], createdAt: '2026-06-24T08:00:00Z' },
  { id: '8', title: 'Update privacy policy', description: 'Review and update privacy policy for GDPR compliance', status: 'backlog', priority: 'medium', tags: ['legal', 'compliance'], createdAt: '2026-06-21T10:00:00Z' },
];

// ===== Mock Analytics Data =====
export const MOCK_ANALYTICS: AnalyticsData[] = [
  { date: '2026-06-21', requests: 12400, cost: 89, savings: 34, latency: 245, tokens: 1240000 },
  { date: '2026-06-22', requests: 14200, cost: 102, savings: 41, latency: 232, tokens: 1420000 },
  { date: '2026-06-23', requests: 11800, cost: 85, savings: 38, latency: 258, tokens: 1180000 },
  { date: '2026-06-24', requests: 15600, cost: 112, savings: 48, latency: 221, tokens: 1560000 },
  { date: '2026-06-25', requests: 16800, cost: 121, savings: 52, latency: 218, tokens: 1680000 },
  { date: '2026-06-26', requests: 13900, cost: 98, savings: 39, latency: 241, tokens: 1390000 },
  { date: '2026-06-27', requests: 17200, cost: 124, savings: 55, latency: 215, tokens: 1720000 },
];

export const MOCK_MODEL_USAGE: ModelUsage[] = [
  { model: 'GPT-4', requests: 45200, cost: 342, tokens: 4520000, color: '#2563eb' },
  { model: 'Claude 3.5', requests: 32100, cost: 228, tokens: 3210000, color: '#7c3aed' },
  { model: 'Gemini Pro', requests: 18400, cost: 112, tokens: 1840000, color: '#059669' },
  { model: 'GPT-3.5', requests: 6200, cost: 18, tokens: 620000, color: '#d97706' },
];

// ===== Mock Audit Logs =====
export const MOCK_AUDIT_LOGS: AuditLog[] = [
  { id: '1', action: 'Chat completion', model: 'GPT-4', latency: 2340, reason: 'Complex analysis requiring advanced reasoning', cost: 0.042, tokens: 2847, timestamp: '2026-06-27T10:30:00Z', user: 'Sarah Chen', status: 'success' },
  { id: '2', action: 'Document summarization', model: 'Claude 3.5', latency: 1820, reason: 'Long document processing — Claude optimized for length', cost: 0.031, tokens: 1523, timestamp: '2026-06-27T10:15:00Z', user: 'Alex Kim', status: 'success' },
  { id: '3', action: 'Code generation', model: 'GPT-4', latency: 3100, reason: 'Code generation task — GPT-4 selected for accuracy', cost: 0.056, tokens: 3891, timestamp: '2026-06-27T09:45:00Z', user: 'Dev Team', status: 'success' },
  { id: '4', action: 'Quick answer', model: 'GPT-3.5', latency: 450, reason: 'Simple query — routed to fastest model', cost: 0.002, tokens: 245, timestamp: '2026-06-27T09:30:00Z', user: 'Marcus Williams', status: 'success' },
  { id: '5', action: 'Image analysis', model: 'GPT-4', latency: 4200, reason: 'Vision task — requires multimodal model', cost: 0.067, tokens: 1200, timestamp: '2026-06-27T09:00:00Z', user: 'Emily Rodriguez', status: 'success' },
  { id: '6', action: 'Chat completion', model: 'Claude 3.5', latency: 8500, reason: 'Model timeout — fallback initiated', cost: 0.000, tokens: 0, timestamp: '2026-06-27T08:45:00Z', user: 'Sarah Chen', status: 'error' },
  { id: '7', action: 'Sentiment analysis', model: 'GPT-3.5', latency: 380, reason: 'Classification task — lightweight model sufficient', cost: 0.001, tokens: 156, timestamp: '2026-06-27T08:30:00Z', user: 'CS Team', status: 'success' },
  { id: '8', action: 'Meeting transcription', model: 'Gemini Pro', latency: 5600, reason: 'Audio processing — Gemini selected for speed', cost: 0.034, tokens: 4200, timestamp: '2026-06-27T08:00:00Z', user: 'Product Team', status: 'warning' },
];

// ===== Dashboard Stats =====
export const DASHBOARD_STATS = [
  { label: 'Total Conversations', value: '12,847', change: '+12.5%', trend: 'up' as const, icon: 'MessageSquare', color: 'blue' },
  { label: 'Documents', value: '2,341', change: '+8.3%', trend: 'up' as const, icon: 'FileText', color: 'indigo' },
  { label: 'Active Tasks', value: '156', change: '-5.2%', trend: 'down' as const, icon: 'CheckSquare', color: 'emerald' },
  { label: 'AI Cost Today', value: '$124.50', change: '-18.4%', trend: 'down' as const, icon: 'DollarSign', color: 'amber' },
  { label: 'Memory Stored', value: '48.2K', change: '+23.1%', trend: 'up' as const, icon: 'Brain', color: 'purple' },
];
