import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { Card } from '@/components/ui/Card';
import { DASHBOARD_STATS, MOCK_ANALYTICS, MOCK_MODEL_USAGE } from '@/lib/constants';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';

const chartTooltipStyle = {
  backgroundColor: 'rgba(17, 17, 24, 0.95)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '12px',
  padding: '12px',
  color: '#fff',
  fontSize: '12px',
};

const DashboardPage: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your AI operations and business intelligence"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {DASHBOARD_STATS.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily AI Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <h3 className="text-sm font-semibold text-white mb-4 light:text-gray-900">Daily AI Requests</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={MOCK_ANALYTICS}>
                <defs>
                  <linearGradient id="requestGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.slice(5)} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area type="monotone" dataKey="requests" stroke="#2563eb" strokeWidth={2} fill="url(#requestGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Cost Savings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <h3 className="text-sm font-semibold text-white mb-4 light:text-gray-900">Cost vs Savings ($)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={MOCK_ANALYTICS}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.slice(5)} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="cost" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="savings" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Model Usage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <h3 className="text-sm font-semibold text-white mb-4 light:text-gray-900">Model Usage Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={MOCK_MODEL_USAGE}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="requests"
                >
                  {MOCK_MODEL_USAGE.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={chartTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              {MOCK_MODEL_USAGE.map((model) => (
                <div key={model.model} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: model.color }} />
                    <span className="text-sm text-gray-300 light:text-gray-700">{model.model}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white light:text-gray-900">{model.requests.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">${model.cost}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
