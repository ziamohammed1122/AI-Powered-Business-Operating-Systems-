import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Phone, Mail, Tag, MessageSquare, FileText, Calendar, Sparkles, ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { MOCK_CUSTOMERS } from '@/lib/constants';
import { formatCurrency, getRelativeTime } from '@/lib/utils';

const CustomersPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>('1');

  const filtered = MOCK_CUSTOMERS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  const active = MOCK_CUSTOMERS.find((c) => c.id === selectedCustomer);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="Customers"
        description="Manage your customer relationships with AI-powered insights"
        actions={<Button icon={<Plus className="w-4 h-4" />}>Add Customer</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-600/50 light:bg-white light:border-gray-200 light:text-gray-900"
            />
          </div>

          <div className="space-y-2">
            {filtered.map((customer, i) => (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  hover
                  onClick={() => setSelectedCustomer(customer.id)}
                  className={selectedCustomer === customer.id ? 'ring-1 ring-primary-600/50' : ''}
                  padding="sm"
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={customer.name} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate light:text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.company}</p>
                    </div>
                    <Badge
                      variant={customer.status === 'active' ? 'success' : customer.status === 'lead' ? 'info' : 'default'}
                      size="sm"
                    >
                      {customer.status}
                    </Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Customer Profile */}
        <div className="lg:col-span-2">
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Profile Header */}
              <Card>
                <div className="flex items-start gap-4">
                  <Avatar name={active.name} size="xl" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white light:text-gray-900">{active.name}</h3>
                    <p className="text-sm text-gray-500">{active.company}</p>
                    <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {active.email}</span>
                      {active.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {active.phone}</span>}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {active.tags.map((tag) => (
                        <Badge key={tag} size="sm">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white light:text-gray-900">{formatCurrency(active.totalSpent)}</p>
                    <p className="text-xs text-gray-500">Total Spent</p>
                  </div>
                </div>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <MessageSquare className="w-4 h-4" />, label: 'Conversations', value: '24' },
                  { icon: <Calendar className="w-4 h-4" />, label: 'Meetings', value: '8' },
                  { icon: <FileText className="w-4 h-4" />, label: 'Invoices', value: '12' },
                  { icon: <Sparkles className="w-4 h-4" />, label: 'AI Insights', value: '6' },
                ].map((stat, i) => (
                  <Card key={i} padding="sm">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">{stat.icon}<span className="text-xs">{stat.label}</span></div>
                    <p className="text-xl font-bold text-white light:text-gray-900">{stat.value}</p>
                  </Card>
                ))}
              </div>

              {/* AI Summary */}
              <Card glow>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-primary-400" />
                  <h4 className="text-sm font-semibold text-white light:text-gray-900">AI Summary</h4>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed light:text-gray-600">
                  {active.name} is a <Badge variant="success" size="sm">{active.status}</Badge> enterprise customer with strong engagement.
                  Last contacted {getRelativeTime(active.lastContact)}. They have shown interest in expanding their current plan
                  and have been responsive to product updates. Consider scheduling a quarterly business review.
                </p>
              </Card>

              {/* Notes */}
              {active.notes && (
                <Card>
                  <h4 className="text-sm font-semibold text-white mb-2 light:text-gray-900">Notes</h4>
                  <p className="text-sm text-gray-400 light:text-gray-600">{active.notes}</p>
                </Card>
              )}
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              Select a customer to view their profile
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
