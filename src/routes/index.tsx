import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageSkeleton } from '@/components/ui/Skeleton';

// Lazy load all pages
const LandingPage = lazy(() => import('@/features/landing/LandingPage'));
const LoginPage = lazy(() => import('@/features/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/RegisterPage'));
const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage'));
const ChatPage = lazy(() => import('@/features/chat/ChatPage'));
const MemoryPage = lazy(() => import('@/features/memory/MemoryPage'));
const KnowledgePage = lazy(() => import('@/features/knowledge/KnowledgePage'));
const CustomersPage = lazy(() => import('@/features/customers/CustomersPage'));
const MeetingsPage = lazy(() => import('@/features/meetings/MeetingsPage'));
const TasksPage = lazy(() => import('@/features/tasks/TasksPage'));
const AnalyticsPage = lazy(() => import('@/features/analytics/AnalyticsPage'));
const AuditPage = lazy(() => import('@/features/audit/AuditPage'));
const SettingsPage = lazy(() => import('@/features/settings/SettingsPage'));

const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SuspenseWrapper><LandingPage /></SuspenseWrapper>,
  },
  {
    path: '/login',
    element: <SuspenseWrapper><LoginPage /></SuspenseWrapper>,
  },
  {
    path: '/register',
    element: <SuspenseWrapper><RegisterPage /></SuspenseWrapper>,
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <SuspenseWrapper><DashboardPage /></SuspenseWrapper>,
      },
      {
        path: 'chat',
        element: <SuspenseWrapper><ChatPage /></SuspenseWrapper>,
      },
      {
        path: 'memory',
        element: <SuspenseWrapper><MemoryPage /></SuspenseWrapper>,
      },
      {
        path: 'knowledge',
        element: <SuspenseWrapper><KnowledgePage /></SuspenseWrapper>,
      },
      {
        path: 'customers',
        element: <SuspenseWrapper><CustomersPage /></SuspenseWrapper>,
      },
      {
        path: 'meetings',
        element: <SuspenseWrapper><MeetingsPage /></SuspenseWrapper>,
      },
      {
        path: 'tasks',
        element: <SuspenseWrapper><TasksPage /></SuspenseWrapper>,
      },
      {
        path: 'analytics',
        element: <SuspenseWrapper><AnalyticsPage /></SuspenseWrapper>,
      },
      {
        path: 'audit',
        element: <SuspenseWrapper><AuditPage /></SuspenseWrapper>,
      },
      {
        path: 'settings',
        element: <SuspenseWrapper><SettingsPage /></SuspenseWrapper>,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
