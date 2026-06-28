import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';

export const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-surface-dark text-white light:bg-gray-50 light:text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  );
};
