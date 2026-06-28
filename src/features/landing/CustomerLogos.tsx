import React from 'react';
import { CUSTOMER_LOGOS } from '@/lib/constants';

export const CustomerLogos: React.FC = () => {
  return (
    <section className="py-16 border-y border-white/[0.06] light:border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500 mb-8 uppercase tracking-wider font-medium">
          Trusted by leading companies worldwide
        </p>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface-dark to-transparent z-10 light:from-white" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface-dark to-transparent z-10 light:from-white" />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...CUSTOMER_LOGOS, ...CUSTOMER_LOGOS].map((logo, i) => (
              <div
                key={i}
                className="inline-flex items-center justify-center mx-8 text-xl font-bold text-gray-600 hover:text-gray-400 transition-colors cursor-default select-none light:text-gray-400 light:hover:text-gray-600"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
