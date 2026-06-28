import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2, Key, CreditCard, Users, Bell, Palette, ShieldCheck,
  Copy, Eye, EyeOff, Plus, Trash2, Sun, Moon, Monitor,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Toggle } from '@/components/ui/Tabs';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/stores/themeStore';

const TABS = [
  { id: 'workspace', label: 'Workspace', icon: <Building2 className="w-4 h-4" /> },
  { id: 'api-keys', label: 'API Keys', icon: <Key className="w-4 h-4" /> },
  { id: 'billing', label: 'Billing', icon: <CreditCard className="w-4 h-4" /> },
  { id: 'members', label: 'Members', icon: <Users className="w-4 h-4" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
  { id: 'theme', label: 'Theme', icon: <Palette className="w-4 h-4" /> },
  { id: 'security', label: 'Security', icon: <ShieldCheck className="w-4 h-4" /> },
];

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('workspace');
  const { isDark, toggle } = useThemeStore();

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader title="Settings" description="Manage your workspace and preferences" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left',
                activeTab === tab.id
                  ? 'bg-primary-600/20 text-primary-400 border border-primary-600/20 light:bg-primary-50 light:text-primary-700 light:border-primary-200'
                  : 'text-gray-400 hover:bg-white/[0.03] hover:text-gray-200 light:text-gray-600 light:hover:bg-gray-100 light:hover:text-gray-800'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'workspace' && (
              <Card>
                <h3 className="text-lg font-semibold text-white mb-6 light:text-gray-900">Workspace Settings</h3>
                <div className="space-y-4 max-w-md">
                  <Input label="Workspace Name" placeholder="My Workspace" defaultValue="MemoryOS Team" />
                  <Input label="Workspace URL" placeholder="my-workspace" defaultValue="memoryos-team" helperText="memoryos.ai/memoryos-team" />
                  <Input label="Company Name" placeholder="Company" defaultValue="MemoryOS Inc." />
                  <Button>Save Changes</Button>
                </div>
              </Card>
            )}

            {activeTab === 'api-keys' && (
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white light:text-gray-900">API Keys</h3>
                  <Button size="sm" icon={<Plus className="w-4 h-4" />}>Generate Key</Button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Production API Key', key: 'sk-prod-xxxx...xxxx', status: 'active', created: 'Jun 15, 2026' },
                    { name: 'Development Key', key: 'sk-dev-xxxx...xxxx', status: 'active', created: 'Jun 20, 2026' },
                    { name: 'Testing Key', key: 'sk-test-xxxx...xxxx', status: 'revoked', created: 'Jun 10, 2026' },
                  ].map((apiKey, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] light:bg-gray-50 light:border-gray-200">
                      <div>
                        <p className="text-sm font-medium text-white light:text-gray-900">{apiKey.name}</p>
                        <p className="text-xs text-gray-500 font-mono mt-0.5">{apiKey.key}</p>
                        <p className="text-[10px] text-gray-600 mt-1">Created: {apiKey.created}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={apiKey.status === 'active' ? 'success' : 'danger'} size="sm">{apiKey.status}</Badge>
                        <button className="p-1.5 rounded-lg text-gray-500 hover:bg-white/5"><Copy className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'billing' && (
              <Card>
                <h3 className="text-lg font-semibold text-white mb-6 light:text-gray-900">Billing</h3>
                <div className="p-6 rounded-xl bg-gradient-to-r from-primary-600/20 to-indigo-600/20 border border-primary-600/30 mb-6 light:from-primary-50 light:to-indigo-50 light:border-primary-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 light:text-gray-600">Current Plan</p>
                      <p className="text-2xl font-bold text-white mt-1 light:text-gray-900">Professional</p>
                      <p className="text-sm text-gray-500">$149/month · Renews Jul 27, 2026</p>
                    </div>
                    <Button variant="outline">Upgrade Plan</Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] light:bg-gray-50">
                    <p className="text-xs text-gray-500">AI Requests Used</p>
                    <p className="text-xl font-bold text-white mt-1 light:text-gray-900">67,420</p>
                    <p className="text-[10px] text-gray-600">of 100,000</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] light:bg-gray-50">
                    <p className="text-xs text-gray-500">Storage Used</p>
                    <p className="text-xl font-bold text-white mt-1 light:text-gray-900">28.4 GB</p>
                    <p className="text-[10px] text-gray-600">of 50 GB</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] light:bg-gray-50">
                    <p className="text-xs text-gray-500">Team Members</p>
                    <p className="text-xl font-bold text-white mt-1 light:text-gray-900">18</p>
                    <p className="text-[10px] text-gray-600">of 25</p>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'members' && (
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white light:text-gray-900">Team Members</h3>
                  <Button size="sm" icon={<Plus className="w-4 h-4" />}>Invite Member</Button>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Sarah Chen', email: 'sarah@memoryos.ai', role: 'Admin' },
                    { name: 'Alex Kim', email: 'alex@memoryos.ai', role: 'Member' },
                    { name: 'Marcus Williams', email: 'marcus@memoryos.ai', role: 'Member' },
                    { name: 'Emily Rodriguez', email: 'emily@memoryos.ai', role: 'Viewer' },
                  ].map((member, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors light:hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white light:text-gray-900">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      <Badge variant={member.role === 'Admin' ? 'info' : member.role === 'Member' ? 'success' : 'default'} size="sm">
                        {member.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <h3 className="text-lg font-semibold text-white mb-6 light:text-gray-900">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Email notifications for new messages', enabled: true },
                    { label: 'Push notifications for urgent tasks', enabled: true },
                    { label: 'Weekly analytics report', enabled: false },
                    { label: 'Monthly billing summary', enabled: true },
                    { label: 'System maintenance alerts', enabled: true },
                    { label: 'New feature announcements', enabled: false },
                  ].map((pref, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] light:bg-gray-50">
                      <span className="text-sm text-gray-300 light:text-gray-700">{pref.label}</span>
                      <Toggle enabled={pref.enabled} onChange={() => {}} />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'theme' && (
              <Card>
                <h3 className="text-lg font-semibold text-white mb-6 light:text-gray-900">Theme Settings</h3>
                <div className="grid grid-cols-3 gap-4 max-w-lg">
                  {[
                    { label: 'Dark', icon: <Moon className="w-5 h-5" />, active: isDark },
                    { label: 'Light', icon: <Sun className="w-5 h-5" />, active: !isDark },
                    { label: 'System', icon: <Monitor className="w-5 h-5" />, active: false },
                  ].map((theme) => (
                    <button
                      key={theme.label}
                      onClick={() => { if (theme.label === 'Dark' && !isDark) toggle(); if (theme.label === 'Light' && isDark) toggle(); }}
                      className={cn(
                        'flex flex-col items-center gap-2 p-6 rounded-xl border transition-all',
                        theme.active
                          ? 'bg-primary-600/20 border-primary-600/30 text-primary-400'
                          : 'bg-white/[0.02] border-white/[0.06] text-gray-400 hover:bg-white/[0.04] light:bg-gray-50 light:border-gray-200 light:text-gray-600'
                      )}
                    >
                      {theme.icon}
                      <span className="text-sm font-medium">{theme.label}</span>
                    </button>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card>
                <h3 className="text-lg font-semibold text-white mb-6 light:text-gray-900">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] light:bg-gray-50">
                    <div>
                      <p className="text-sm font-medium text-white light:text-gray-900">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-500 mt-0.5">Add an extra layer of security to your account</p>
                    </div>
                    <Toggle enabled={true} onChange={() => {}} />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] light:bg-gray-50">
                    <div>
                      <p className="text-sm font-medium text-white light:text-gray-900">Session Timeout</p>
                      <p className="text-xs text-gray-500 mt-0.5">Automatically log out after inactivity</p>
                    </div>
                    <Badge variant="info" size="sm">30 minutes</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] light:bg-gray-50">
                    <div>
                      <p className="text-sm font-medium text-white light:text-gray-900">SSO / SAML</p>
                      <p className="text-xs text-gray-500 mt-0.5">Enterprise single sign-on configuration</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <Button variant="danger" className="mt-4">Change Password</Button>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
