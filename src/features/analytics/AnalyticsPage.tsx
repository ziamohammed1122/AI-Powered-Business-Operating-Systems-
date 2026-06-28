import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { Card } from '@/components/ui/Card';
import { MOCK_ANALYTICS, MOCK_MODEL_USAGE } from '@/lib/constants';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

const chartTooltipStyle = {
  backgroundColor: 'rgba(17, 17, 24, 0.95)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '12px',
  padding: '12px',
  color: '#fff',
  fontSize: '12px',
};

const stats = [
  { label: 'Memory Growth', value: '48.2K', change: '+23.1%', trend: 'up' as const, icon: 'Brain', color: 'purple' },
  { label: 'Cost Saved', value: '$4,230', change: '+34.5%', trend: 'up' as const, icon: 'DollarSign', color: 'emerald' },
  { label: 'Avg Latency', value: '233ms', change: '-12.3%', trend: 'down' as const, icon: 'BarChart3', color: 'blue' },
  { label: 'Productivity', value: '94.2%', change: '+8.7%', trend: 'up' as const, icon: 'CheckSquare', color: 'amber' },
];

const teamPerformance = [
  { subject: 'Response Time', A: 85, B: 90 },
  { subject: 'Quality', A: 92, B: 88 },
  { subject: 'Throughput', A: 78, B: 85 },
  { subject: 'Accuracy', A: 95, B: 91 },
  { subject: 'Efficiency', A: 88, B: 82 },
  { subject: 'Satisfaction', A: 90, B: 87 },
];

const AnalyticsPage: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="Analytics"
        description="Comprehensive analytics across your AI operations"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Memory Growth */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <h3 className="text-sm font-semibold text-white mb-4 light:text-gray-900">Memory Growth</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={MOCK_ANALYTICS}>
                <defs>
                  <linearGradient id="memoryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.slice(5)} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area type="monotone" dataKey="tokens" stroke="#7c3aed" strokeWidth={2} fill="url(#memoryGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Cost Savings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <h3 className="text-sm font-semibold text-white mb-4 light:text-gray-900">Cost Savings ($)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={MOCK_ANALYTICS}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.slice(5)} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="savings" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Latency */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card>
            <h3 className="text-sm font-semibold text-white mb-4 light:text-gray-900">Latency (ms)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={MOCK_ANALYTICS}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.slice(5)} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Line type="monotone" dataKey="latency" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Team Performance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card>
            <h3 className="text-sm font-semibold text-white mb-4 light:text-gray-900">Team Performance</h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={teamPerformance}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10 }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="This Week" dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} />
                <Radar name="Last Week" dataKey="B" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.1} />
                <Tooltip contentStyle={chartTooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Model Usage */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <Card>
          <h3 className="text-sm font-semibold text-white mb-4 light:text-gray-900">Model Usage Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {MOCK_MODEL_USAGE.map((model) => (
              <div key={model.model} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] light:bg-gray-50">
                <div className="w-3 h-10 rounded-full" style={{ backgroundColor: model.color }} />
                <div>
                  <p className="text-sm font-semibold text-white light:text-gray-900">{model.model}</p>
                  <p className="text-xs text-gray-500">{model.requests.toLocaleString()} requests</p>
                  <p className="text-xs text-gray-500">${model.cost} spent</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AnalyticsPage;
