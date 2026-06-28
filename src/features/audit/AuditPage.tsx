import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Shield, Clock, Zap, DollarSign, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_AUDIT_LOGS } from '@/lib/constants';
import { getRelativeTime } from '@/lib/utils';

const AuditPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'success' | 'error' | 'warning'>('all');

  const filtered = MOCK_AUDIT_LOGS.filter((log) => {
    const matchesSearch = log.action.toLowerCase().includes(search.toLowerCase()) || log.model.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || log.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="Audit Logs"
        description="Complete transparency into every AI decision and model selection"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit logs..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-600/50 light:bg-white light:border-gray-200 light:text-gray-900"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'success', 'error', 'warning'] as const).map((f) => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                filter === f
                  ? 'bg-primary-600/20 border-primary-600/30 text-primary-400'
                  : 'bg-white/[0.03] border-white/[0.06] text-gray-400 hover:bg-white/[0.06] light:bg-gray-100 light:border-gray-200 light:text-gray-600'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Audit Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06] light:border-gray-200">
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">Action</th>
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">Model</th>
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">Latency</th>
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">Reason</th>
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">Cost</th>
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">Tokens</th>
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">User</th>
                <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, i) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors light:border-gray-100 light:hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    {log.status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {log.status === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
                    {log.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                  </td>
                  <td className="px-6 py-4 text-sm text-white light:text-gray-900">{log.action}</td>
                  <td className="px-6 py-4"><Badge variant="info" size="sm">{log.model}</Badge></td>
                  <td className="px-6 py-4 text-sm">
                    <span className={log.latency > 5000 ? 'text-red-400' : log.latency > 2000 ? 'text-amber-400' : 'text-emerald-400'}>
                      {log.latency}ms
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400 max-w-xs truncate light:text-gray-600">{log.reason}</td>
                  <td className="px-6 py-4 text-sm text-gray-300 light:text-gray-700">${log.cost.toFixed(3)}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{log.tokens.toLocaleString()}</td>
                  <td className="px-6 py-4 text-xs text-gray-400">{log.user}</td>
                  <td className="px-6 py-4 text-xs text-gray-500">{getRelativeTime(log.timestamp)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AuditPage;
