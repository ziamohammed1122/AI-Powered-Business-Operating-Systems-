import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Clock, Edit3, Trash2, Tag, Brain } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_MEMORIES } from '@/lib/constants';
import { cn, getRelativeTime } from '@/lib/utils';
import type { MemoryCategory } from '@/types';

const CATEGORIES: { label: string; value: MemoryCategory | 'all'; color: string }[] = [
  { label: 'All', value: 'all', color: 'default' },
  { label: 'Customer', value: 'customer', color: 'info' },
  { label: 'Sales', value: 'sales', color: 'success' },
  { label: 'Support', value: 'support', color: 'warning' },
  { label: 'Meeting', value: 'meeting', color: 'purple' },
  { label: 'Engineering', value: 'engineering', color: 'info' },
  { label: 'Marketing', value: 'marketing', color: 'danger' },
  { label: 'Finance', value: 'finance', color: 'success' },
];

const MemoryPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<MemoryCategory | 'all'>('all');

  const filtered = MOCK_MEMORIES.filter((m) => {
    const matchesSearch = m.content.toLowerCase().includes(search.toLowerCase()) || m.source.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || m.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="Business Memory"
        description="AI-powered memory of every business interaction and decision"
        actions={
          <Button icon={<Brain className="w-4 h-4" />}>
            Add Memory
          </Button>
        }
      />

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search memories..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-600/50 light:bg-white light:border-gray-200 light:text-gray-900"
          />
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <motion.button
            key={cat.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat.value)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-all border',
              activeCategory === cat.value
                ? 'bg-primary-600/20 border-primary-600/30 text-primary-400'
                : 'bg-white/[0.03] border-white/[0.06] text-gray-400 hover:bg-white/[0.06] light:bg-gray-100 light:border-gray-200 light:text-gray-600 light:hover:bg-gray-200'
            )}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Memory Timeline */}
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-white/[0.06] light:bg-gray-200" />
        <div className="space-y-4">
          {filtered.map((memory, i) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-3.5 top-6 w-3 h-3 rounded-full bg-primary-600 ring-4 ring-surface-dark light:ring-gray-50" />

              <Card>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={
                          memory.category === 'customer' ? 'info' :
                          memory.category === 'sales' ? 'success' :
                          memory.category === 'support' ? 'warning' :
                          memory.category === 'engineering' ? 'info' :
                          memory.category === 'marketing' ? 'danger' :
                          memory.category === 'finance' ? 'success' : 'purple'
                        }
                        size="sm"
                      >
                        {memory.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(Math.min(5, Math.ceil(memory.importance / 2)))].map((_, j) => (
                          <Star key={j} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed light:text-gray-700">
                      {memory.content}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getRelativeTime(memory.timestamp)}
                      </span>
                      <span className="text-xs text-gray-600">·</span>
                      <span className="text-xs text-gray-500">{memory.source}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {memory.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.03] text-[10px] text-gray-500 light:bg-gray-100"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 light:hover:bg-gray-100">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryPage;
