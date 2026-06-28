import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { router } from '@/routes';
import { useThemeStore } from '@/stores/themeStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  const { isDark } = useThemeStore();

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark);
  }, [isDark]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: isDark ? '#1a1a25' : '#ffffff',
            color: isDark ? '#ffffff' : '#111827',
            border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '14px',
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
