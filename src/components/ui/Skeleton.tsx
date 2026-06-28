import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'line' | 'circle' | 'card' | 'chart';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, variant = 'line' }) => {
  const variantStyles = {
    line: 'h-4 rounded',
    circle: 'rounded-full',
    card: 'h-32 rounded-2xl',
    chart: 'h-64 rounded-2xl',
  };

  return (
    <div className={cn('skeleton', variantStyles[variant], className)} />
  );
};

export const StatCardSkeleton: React.FC = () => (
  <div className="glass-card p-6 space-y-3">
    <Skeleton className="w-24 h-3" />
    <Skeleton className="w-16 h-8" />
    <Skeleton className="w-20 h-3" />
  </div>
);

export const TableRowSkeleton: React.FC = () => (
  <div className="flex items-center gap-4 py-4 px-4 border-b border-white/5 light:border-gray-100">
    <Skeleton variant="circle" className="w-9 h-9" />
    <div className="flex-1 space-y-2">
      <Skeleton className="w-48 h-4" />
      <Skeleton className="w-32 h-3" />
    </div>
    <Skeleton className="w-20 h-6 rounded-full" />
  </div>
);

export const ChatMessageSkeleton: React.FC = () => (
  <div className="flex gap-3 py-4">
    <Skeleton variant="circle" className="w-8 h-8 shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton className="w-3/4 h-4" />
      <Skeleton className="w-1/2 h-4" />
      <Skeleton className="w-2/3 h-4" />
    </div>
  </div>
);

export const PageSkeleton: React.FC = () => (
  <div className="space-y-6 p-6">
    <div className="flex items-center justify-between">
      <Skeleton className="w-48 h-8" />
      <Skeleton className="w-32 h-10 rounded-lg" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {[...Array(5)].map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Skeleton variant="chart" />
      <Skeleton variant="chart" />
    </div>
  </div>
);
