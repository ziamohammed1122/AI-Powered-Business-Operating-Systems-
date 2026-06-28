import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, MessageSquare, Brain, CheckSquare, Settings, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/stores/sidebarStore';
import { SIDEBAR_NAV } from '@/lib/constants';
import { Zap } from 'lucide-react';

const mobileIcons: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  CheckSquare: <CheckSquare className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
};

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  BookOpen: <Brain className="w-5 h-5" />,
  Users: <Brain className="w-5 h-5" />,
  Video: <Brain className="w-5 h-5" />,
  CheckSquare: <CheckSquare className="w-5 h-5" />,
  BarChart3: <Brain className="w-5 h-5" />,
  Shield: <Brain className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
};

const BOTTOM_NAV = [
  { label: 'Dashboard', path: '/app', icon: 'LayoutDashboard' },
  { label: 'Chat', path: '/app/chat', icon: 'MessageSquare' },
  { label: 'Memory', path: '/app/memory', icon: 'Brain' },
  { label: 'Tasks', path: '/app/tasks', icon: 'CheckSquare' },
  { label: 'Settings', path: '/app/settings', icon: 'Settings' },
];

export const MobileNav: React.FC = () => {
  const location = useLocation();
  const { isOpen, setOpen } = useSidebarStore();

  return (
    <>
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 z-50 bg-surface-dark-2 border-r border-white/[0.06] p-4 lg:hidden light:bg-white light:border-gray-200"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-white text-lg light:text-gray-900">MemoryOS</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-1">
                {SIDEBAR_NAV.map((item) => {
                  const isActive = item.path === '/app'
                    ? location.pathname === '/app'
                    : location.pathname.startsWith(item.path);
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                        isActive
                          ? 'text-white bg-primary-600/20 border border-primary-600/20 light:text-primary-700 light:bg-primary-50 light:border-primary-200'
                          : 'text-gray-500 hover:text-gray-200 hover:bg-white/5 light:hover:text-gray-700 light:hover:bg-gray-100'
                      )}
                    >
                      {iconMap[item.icon] || <Brain className="w-5 h-5" />}
                      {item.label}
                    </NavLink>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Bottom navigation bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-white/[0.06] bg-surface-dark/90 backdrop-blur-xl light:bg-white/90 light:border-gray-200">
        <div className="flex items-center justify-around py-2">
          {BOTTOM_NAV.map((item) => {
            const isActive = item.path === '/app'
              ? location.pathname === '/app'
              : location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors',
                  isActive ? 'text-primary-500' : 'text-gray-500'
                )}
              >
                {mobileIcons[item.icon]}
                <span className="text-[10px] font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
};
