// ===== User & Auth =====
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  company: string;
  role: 'admin' | 'member' | 'viewer';
}

// ===== Conversations & Chat =====
export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  pinned: boolean;
  unread: boolean;
  model: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  model?: string;
  tokens?: number;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'file';
  url: string;
  size: number;
}

// ===== Memory =====
export interface Memory {
  id: string;
  content: string;
  category: MemoryCategory;
  importance: number; // 1-10
  source: string;
  timestamp: string;
  tags: string[];
  relatedTo?: string;
}

export type MemoryCategory =
  | 'customer'
  | 'sales'
  | 'support'
  | 'meeting'
  | 'engineering'
  | 'marketing'
  | 'finance';

// ===== Knowledge Base =====
export interface KBDocument {
  id: string;
  name: string;
  type: 'pdf' | 'word' | 'excel' | 'csv' | 'powerpoint';
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  status: 'processing' | 'ready' | 'error';
  pages?: number;
  version: number;
  tags: string[];
}

// ===== Customers =====
export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'lead';
  totalSpent: number;
  lastContact: string;
  tags: string[];
  phone?: string;
  notes?: string;
}

export interface Invoice {
  id: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  dueDate: string;
}

// ===== Meetings =====
export interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: number;
  attendees: string[];
  status: 'upcoming' | 'completed' | 'cancelled';
  summary?: string;
  actionItems?: ActionItem[];
  transcript?: string;
}

export interface ActionItem {
  id: string;
  text: string;
  assignee: string;
  completed: boolean;
  dueDate?: string;
}

// ===== Tasks =====
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: string;
  dueDate?: string;
  tags: string[];
  aiSuggestion?: string;
  createdAt: string;
}

// ===== Analytics =====
export interface AnalyticsData {
  date: string;
  requests: number;
  cost: number;
  savings: number;
  latency: number;
  tokens: number;
}

export interface ModelUsage {
  model: string;
  requests: number;
  cost: number;
  tokens: number;
  color: string;
}

// ===== Audit =====
export interface AuditLog {
  id: string;
  action: string;
  model: string;
  latency: number;
  reason: string;
  cost: number;
  tokens: number;
  timestamp: string;
  user: string;
  status: 'success' | 'error' | 'warning';
}

// ===== Settings =====
export interface Workspace {
  id: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  members: number;
  storage: number;
  apiKeys: APIKey[];
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
  status: 'active' | 'revoked';
}

// ===== Navigation =====
export interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: number;
}

// ===== Pricing =====
export interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

// ===== FAQ =====
export interface FAQItem {
  question: string;
  answer: string;
}

// ===== Testimonial =====
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}
