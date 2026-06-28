import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  size?: 'sm' | 'md';
  className?: string;
}

const badgeVariants = {
  default: 'bg-white/10 text-gray-300 light:bg-gray-100 light:text-gray-700',
  success: 'bg-emerald-500/10 text-emerald-400 light:bg-emerald-50 light:text-emerald-700',
  warning: 'bg-amber-500/10 text-amber-400 light:bg-amber-50 light:text-amber-700',
  danger: 'bg-red-500/10 text-red-400 light:bg-red-50 light:text-red-700',
  info: 'bg-primary-500/10 text-primary-400 light:bg-primary-50 light:text-primary-700',
  purple: 'bg-purple-500/10 text-purple-400 light:bg-purple-50 light:text-purple-700',
};

const badgeSizes = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};
