import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/stores/themeStore';
import { Sun, Moon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { isDark, toggle } = useThemeStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-surface-dark/80 backdrop-blur-xl border-b border-white/[0.06] light:bg-white/80 light:border-gray-200/60'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg light:text-gray-900">MemoryOS</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors light:text-gray-600 light:hover:text-gray-900">Features</a>
            <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors light:text-gray-600 light:hover:text-gray-900">Pricing</a>
            <a href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors light:text-gray-600 light:hover:text-gray-900">FAQ</a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggle}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors light:hover:text-gray-700 light:hover:bg-gray-100"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button size="sm" onClick={() => navigate('/register')}>
              Start Free
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-400"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-white/[0.06] bg-surface-dark/95 backdrop-blur-xl p-4 space-y-3 light:bg-white/95 light:border-gray-200"
        >
          <a href="#features" className="block px-3 py-2 text-sm text-gray-400 hover:text-white light:text-gray-600">Features</a>
          <a href="#pricing" className="block px-3 py-2 text-sm text-gray-400 hover:text-white light:text-gray-600">Pricing</a>
          <a href="#faq" className="block px-3 py-2 text-sm text-gray-400 hover:text-white light:text-gray-600">FAQ</a>
          <div className="pt-3 space-y-2 border-t border-white/[0.06] light:border-gray-200">
            <Button variant="ghost" className="w-full" onClick={() => navigate('/login')}>Sign In</Button>
            <Button className="w-full" onClick={() => navigate('/register')}>Start Free</Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
