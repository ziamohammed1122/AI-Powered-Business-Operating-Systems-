import React from 'react';
import { cn, getInitials } from '@/lib/utils';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const avatarSizes = {
  sm: 'w-7 h-7 text-[10px]',
  md: 'w-9 h-9 text-xs',
  lg: 'w-11 h-11 text-sm',
  xl: 'w-14 h-14 text-base',
};

const colors = [
  'from-primary-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-purple-500 to-pink-600',
  'from-rose-500 to-red-600',
  'from-cyan-500 to-blue-600',
];

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  className,
}) => {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(
          'rounded-full object-cover ring-2 ring-white/10 light:ring-gray-200',
          avatarSizes[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        'rounded-full bg-gradient-to-br flex items-center justify-center font-semibold text-white ring-2 ring-white/10 light:ring-gray-200',
        avatarSizes[size],
        getColorFromName(name),
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
};
