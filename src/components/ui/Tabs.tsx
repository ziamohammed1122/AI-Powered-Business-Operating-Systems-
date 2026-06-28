import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div className={cn('flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] light:bg-gray-100 light:border-gray-200', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-2',
            activeTab === tab.id
              ? 'text-white light:text-gray-900'
              : 'text-gray-500 hover:text-gray-300 light:hover:text-gray-700'
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white/10 rounded-lg light:bg-white light:shadow-sm"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {tab.icon}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};

interface ToggleProps {
  enabled: boolean;
  onChange: (val: boolean) => void;
  label?: string;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ enabled, onChange, label, className }) => {
  return (
    <label className={cn('flex items-center gap-3 cursor-pointer', className)}>
      <button
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
          enabled ? 'bg-primary-600' : 'bg-white/10 light:bg-gray-300'
        )}
      >
        <motion.span
          layout
          className="inline-block h-4 w-4 rounded-full bg-white shadow-sm"
          animate={{ x: enabled ? 24 : 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
      {label && (
        <span className="text-sm text-gray-300 light:text-gray-700">{label}</span>
      )}
    </label>
  );
};
