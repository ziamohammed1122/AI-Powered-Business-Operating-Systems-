import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Features } from './Features';
import { CustomerLogos } from './CustomerLogos';
import { Testimonials } from './Testimonials';
import { Pricing } from './Pricing';
import { FAQ } from './FAQ';
import { Footer } from './Footer';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-dark text-white light:bg-white light:text-gray-900">
      <Navbar />
      <Hero />
      <CustomerLogos />
      <Features />
      <Testimonials />
      <Pricing />

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-indigo-600/10 to-purple-600/10" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to give your business a{' '}
              <span className="gradient-text-light">perfect memory</span>?
            </h2>
            <p className="text-gray-400 text-lg mb-8 light:text-gray-600">
              Join 2,000+ companies already using MemoryOS AI to transform their operations.
            </p>
            <Button
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              onClick={() => navigate('/register')}
            >
              Start Free — No Credit Card Required
            </Button>
          </motion.div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </div>
  );
};

export default LandingPage;
