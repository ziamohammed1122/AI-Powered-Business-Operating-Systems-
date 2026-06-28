import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Play, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] light:bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600/10 border border-primary-600/20 text-primary-400 text-sm mb-8"
        >
          <Sparkles className="w-4 h-4" />
          Now with GPT-4, Claude 3.5 & Gemini Pro
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl mx-auto leading-[1.1]"
        >
          <span className="text-white light:text-gray-900">The AI Business Operating System</span>
          <br />
          <span className="gradient-text-light">That Never Forgets</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed light:text-gray-600"
        >
          Turn conversations, documents, meetings and customer interactions into
          long-term business intelligence. Powered by persistent AI memory.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
            onClick={() => navigate('/register')}
            className="min-w-[180px]"
          >
            Start Free
          </Button>
          <Button
            variant="secondary"
            size="lg"
            icon={<Play className="w-5 h-5" />}
            className="min-w-[180px]"
          >
            Watch Demo
          </Button>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 relative"
        >
          <div className="relative rounded-2xl border border-white/[0.08] bg-surface-dark-2/80 backdrop-blur-xl p-2 shadow-2xl shadow-primary-600/5 light:bg-white/90 light:border-gray-200 light:shadow-lg">
            <div className="rounded-xl bg-surface-dark-3 overflow-hidden light:bg-gray-50">
              {/* Fake browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] light:border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-xs text-gray-500 light:bg-gray-100 light:border-gray-200">
                    app.memoryos.ai/dashboard
                  </div>
                </div>
              </div>
              {/* Dashboard preview content */}
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Conversations', value: '12,847', color: 'text-primary-400' },
                    { label: 'Documents', value: '2,341', color: 'text-indigo-400' },
                    { label: 'Memory Items', value: '48.2K', color: 'text-purple-400' },
                    { label: 'Cost Saved', value: '$4,230', color: 'text-emerald-400' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] light:bg-white light:border-gray-200"
                    >
                      <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                      <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-40 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-end p-4 gap-2 light:bg-white light:border-gray-200">
                    {[40, 65, 50, 80, 70, 90, 75].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                        className="flex-1 bg-gradient-to-t from-primary-600/60 to-indigo-600/40 rounded-t"
                      />
                    ))}
                  </div>
                  <div className="h-40 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center light:bg-white light:border-gray-200">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.5, type: 'spring' }}
                      className="w-24 h-24 rounded-full border-8 border-primary-600/30 border-t-primary-600 animate-spin"
                      style={{ animationDuration: '3s' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Glow effect behind preview */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary-600/10 via-indigo-600/10 to-purple-600/10 rounded-3xl blur-2xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};
