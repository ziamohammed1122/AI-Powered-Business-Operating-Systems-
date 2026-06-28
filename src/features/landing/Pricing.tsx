import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PRICING_PLANS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white light:text-gray-900">
            Simple, <span className="gradient-text-light">transparent</span> pricing
          </h2>
          <p className="mt-4 text-gray-400 text-lg light:text-gray-600">
            Start free. Scale as you grow. No hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                'relative rounded-2xl border p-8 flex flex-col',
                plan.popular
                  ? 'bg-gradient-to-b from-primary-600/10 to-transparent border-primary-600/30 scale-105 shadow-xl shadow-primary-600/10 light:from-primary-50 light:border-primary-300'
                  : 'glass-card'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary-600 to-indigo-600 text-white text-xs font-semibold">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white light:text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white light:text-gray-900">${plan.price}</span>
                <span className="text-gray-500 text-sm">{plan.period}</span>
              </div>
              <Button
                variant={plan.popular ? 'primary' : 'secondary'}
                className="w-full mb-8"
              >
                {plan.cta}
              </Button>
              <ul className="space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                    <span className="text-gray-300 light:text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
