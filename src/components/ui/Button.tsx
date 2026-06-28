import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variants = {
  primary: 'bg-gradient-to-r from-primary-600 to-indigo-600 text-white hover:from-primary-700 hover:to-indigo-700 shadow-lg shadow-primary-600/20',
  secondary: 'bg-white/5 text-white hover:bg-white/10 border border-white/10 light:bg-gray-100 light:text-gray-900 light:hover:bg-gray-200 light:border-gray-200',
  ghost: 'text-gray-400 hover:text-white hover:bg-white/5 light:text-gray-600 light:hover:text-gray-900 light:hover:bg-gray-100',
  danger: 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20',
  outline: 'border border-primary-600/50 text-primary-400 hover:bg-primary-600/10 light:text-primary-600',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      {children}
    </motion.button>
  );
};
