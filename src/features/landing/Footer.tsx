import React from 'react';
import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Security', 'Integrations', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Partners'],
  Resources: ['Documentation', 'API Reference', 'Community', 'Support', 'Status'],
  Legal: ['Privacy', 'Terms', 'Cookie Policy', 'DPA'],
};

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.06] bg-surface-dark-2/50 light:bg-gray-50 light:border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg light:text-gray-900">MemoryOS</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              The AI business operating system that never forgets.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4 light:text-gray-900">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors light:hover:text-gray-700">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 light:border-gray-200">
          <p className="text-sm text-gray-600">© 2026 MemoryOS AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">Twitter</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">GitHub</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">LinkedIn</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
