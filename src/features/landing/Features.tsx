import React from 'react';
import { motion } from 'framer-motion';
import { Brain, GitBranch, BookOpen, Workflow, TrendingDown, Shield } from 'lucide-react';
import { FEATURES } from '@/lib/constants';

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-6 h-6" />,
  GitBranch: <GitBranch className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Workflow: <Workflow className="w-6 h-6" />,
  TrendingDown: <TrendingDown className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white light:text-gray-900">
            Everything your business{' '}
            <span className="gradient-text-light">needs to remember</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto light:text-gray-600">
            A complete AI operating system that captures, remembers, and acts on every piece of business intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass-card p-8 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600/20 to-indigo-600/20 flex items-center justify-center text-primary-400 mb-5 group-hover:from-primary-600/30 group-hover:to-indigo-600/30 transition-colors">
                {iconMap[feature.icon]}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 light:text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed light:text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
