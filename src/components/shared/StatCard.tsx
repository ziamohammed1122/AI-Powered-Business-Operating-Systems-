import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, MessageSquare, FileText, CheckSquare, DollarSign, Brain, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
  color: string;
  index?: number;
}

const iconComponents: Record<string, React.ReactNode> = {
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  CheckSquare: <CheckSquare className="w-5 h-5" />,
  DollarSign: <DollarSign className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
};

const colorStyles: Record<string, string> = {
  blue: 'bg-primary-600/10 text-primary-400 light:bg-primary-50 light:text-primary-600',
  indigo: 'bg-indigo-600/10 text-indigo-400 light:bg-indigo-50 light:text-indigo-600',
  emerald: 'bg-emerald-600/10 text-emerald-400 light:bg-emerald-50 light:text-emerald-600',
  amber: 'bg-amber-600/10 text-amber-400 light:bg-amber-50 light:text-amber-600',
  purple: 'bg-purple-600/10 text-purple-400 light:bg-purple-50 light:text-purple-600',
};

export const StatCard: React.FC<StatCardProps> = ({
  label, value, change, trend, icon, color, index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card>
        <div className="flex items-start justify-between">
          <div className={cn('p-2.5 rounded-xl', colorStyles[color])}>
            {iconComponents[icon]}
          </div>
          <div className={cn(
            'flex items-center gap-1 text-xs font-medium',
            trend === 'up' ? 'text-emerald-400' : 'text-red-400'
          )}>
            {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold text-white light:text-gray-900">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{label}</p>
        </div>
      </Card>
    </motion.div>
  );
};
