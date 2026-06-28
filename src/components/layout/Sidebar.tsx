import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, MessageSquare, Brain, BookOpen, Users, Video,
  CheckSquare, BarChart3, Shield, Settings, ChevronLeft, ChevronRight, Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/stores/sidebarStore';
import { SIDEBAR_NAV } from '@/lib/constants';

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Video: <Video className="w-5 h-5" />,
  CheckSquare: <CheckSquare className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
};

export const Sidebar: React.FC = () => {
  const { isCollapsed, toggleCollapsed } = useSidebarStore();
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="hidden lg:flex flex-col h-screen sticky top-0 z-30 border-r border-white/[0.06] bg-surface-dark/80 backdrop-blur-xl light:bg-white/80 light:border-gray-200/60"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-white/[0.06] light:border-gray-200/60">
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-bold text-white text-lg light:text-gray-900 whitespace-nowrap"
            >
              MemoryOS
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {SIDEBAR_NAV.map((item) => {
          const isActive = item.path === '/app'
            ? location.pathname === '/app'
            : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                isActive
                  ? 'text-white light:text-primary-700'
                  : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.04] light:hover:text-gray-700 light:hover:bg-gray-100'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-indigo-600/10 rounded-xl border border-primary-600/20 light:from-primary-50 light:to-indigo-50 light:border-primary-200"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 shrink-0">{iconMap[item.icon]}</span>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="relative z-10 whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-white/[0.06] light:border-gray-200/60">
        <button
          onClick={toggleCollapsed}
          className="flex items-center justify-center w-full py-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors light:hover:text-gray-700 light:hover:bg-gray-100"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </motion.aside>
  );
};
