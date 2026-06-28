import React from 'react';
import { useThemeStore } from '@/stores/themeStore';
import { useSidebarStore } from '@/stores/sidebarStore';
import { Search, Bell, Sun, Moon, Menu, Zap } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { motion } from 'framer-motion';

export const Topbar: React.FC = () => {
  const { isDark, toggle } = useThemeStore();
  const { setOpen } = useSidebarStore();

  return (
    <header className="sticky top-0 z-20 h-16 flex items-center justify-between px-4 md:px-6 border-b border-white/[0.06] bg-surface-dark/80 backdrop-blur-xl light:bg-white/80 light:border-gray-200/60">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 light:hover:text-gray-700 light:hover:bg-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-white light:text-gray-900">MemoryOS</span>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] w-72 light:bg-gray-100 light:border-gray-200">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-full light:text-gray-900"
          />
          <kbd className="hidden lg:inline text-[10px] text-gray-600 bg-white/5 px-1.5 py-0.5 rounded border border-white/10 light:bg-gray-200 light:border-gray-300 light:text-gray-500">⌘K</kbd>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggle}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors light:hover:text-gray-700 light:hover:bg-gray-100"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>

        <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors light:hover:text-gray-700 light:hover:bg-gray-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-600 rounded-full" />
        </button>

        <div className="ml-2 pl-2 border-l border-white/[0.06] light:border-gray-200">
          <Avatar name="Sarah Chen" size="md" />
        </div>
      </div>
    </header>
  );
};
