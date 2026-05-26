import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA: React.FC = () => {
  return (
    <section className="px-container-margin-desktop py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="bg-primary rounded-card p-16 text-center text-white shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold font-headline mb-6">Ready to save?</h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto mb-10">
              Join over half a million users who are already getting the best deals automatically. No subscription required for basic tracking.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-white text-primary px-10 py-5 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:-translate-y-1">
                Create Free Account
              </button>
              <button className="bg-primary-container/20 text-white border border-white/30 px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                Talk to Sales
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
