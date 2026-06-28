import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  onClick?: () => void;
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = true,
  glow = false,
  padding = 'md',
  onClick,
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2, scale: 1.005 } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        'rounded-2xl border transition-all duration-300',
        'bg-white/[0.03] border-white/[0.06] backdrop-blur-xl',
        'light:bg-white/80 light:border-gray-200/60 light:shadow-sm',
        hover && 'hover:bg-white/[0.06] hover:border-white/[0.1] hover:shadow-xl hover:shadow-black/20 light:hover:bg-white light:hover:shadow-md light:hover:border-gray-300/60',
        glow && 'shadow-lg shadow-primary-600/10',
        paddings[padding],
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
