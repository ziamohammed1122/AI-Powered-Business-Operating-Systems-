import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, Eye, EyeOff, Building2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/stores/authStore';

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({
    company: '', workspace: '', email: '', password: '', confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      id: '1',
      name: form.company,
      email: form.email,
      company: form.company,
      role: 'admin',
    });
    navigate('/app');
  };

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen bg-surface-dark flex items-center justify-center p-4 light:bg-gray-50">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-primary-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="glass-card p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-xl light:text-gray-900">MemoryOS</span>
          </div>

          <h2 className="text-xl font-bold text-center text-white mb-1 light:text-gray-900">Create your account</h2>
          <p className="text-sm text-gray-500 text-center mb-8">Start your 14-day free trial</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Company Name"
              placeholder="Acme Corporation"
              value={form.company}
              onChange={(e) => updateField('company', e.target.value)}
              icon={<Building2 className="w-4 h-4" />}
            />
            <Input
              label="Workspace Name"
              placeholder="acme-team"
              value={form.workspace}
              onChange={(e) => updateField('workspace', e.target.value)}
              icon={<Globe className="w-4 h-4" />}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              icon={<Mail className="w-4 h-4" />}
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min 8 characters"
                value={form.password}
                onChange={(e) => updateField('password', e.target.value)}
                icon={<Lock className="w-4 h-4" />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              icon={<Lock className="w-4 h-4" />}
            />

            <Button type="submit" className="w-full" size="lg">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
