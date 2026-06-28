import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';
import { Avatar } from '@/components/ui/Avatar';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white light:text-gray-900">
            Loved by <span className="gradient-text-light">thousands</span> of teams
          </h2>
          <p className="mt-4 text-gray-400 text-lg light:text-gray-600">
            See what our customers have to say about MemoryOS AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-8 flex flex-col"
            >
              <Quote className="w-8 h-8 text-primary-600/30 mb-4" />
              <p className="text-sm text-gray-300 leading-relaxed flex-1 light:text-gray-600">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-1 mt-4 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06] light:border-gray-200">
                <Avatar name={testimonial.name} size="md" />
                <div>
                  <p className="text-sm font-semibold text-white light:text-gray-900">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
