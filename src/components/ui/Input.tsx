import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  helperText,
  className,
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-300 light:text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full rounded-lg border bg-white/[0.03] border-white/[0.08] px-4 py-2.5 text-sm text-white placeholder-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-primary-600/50 focus:border-primary-600/50',
            'transition-all duration-200',
            'light:bg-white light:border-gray-300 light:text-gray-900 light:placeholder-gray-400',
            'light:focus:ring-primary-600/30 light:focus:border-primary-600',
            icon && 'pl-10',
            error && 'border-red-500/50 focus:ring-red-500/50',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {helperText && !error && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
