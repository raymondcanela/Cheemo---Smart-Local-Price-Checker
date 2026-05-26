import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Zap, History, Brain, Globe } from 'lucide-react';

interface FeaturedProduct {
  id: string;
  name: string;
  store: string;
  currentPrice: number;
  originalPrice: number;
  discountPercentage: number;
  imageUrl: string;
  lastUpdated: string;
}

const FEATURED_PRODUCT_MOCK: FeaturedProduct = {
  id: '1',
  name: 'Premium Wireless Audio',
  store: 'TechStore Global',
  currentPrice: 299.00,
  originalPrice: 449.00,
  discountPercentage: 33,
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnt8scuki3ue2N9jMW2OppZCmGQ42wxmZuU-UFnnCnimZRfK-JJWSv3zgsNid7mh0hqAuBr8IRuaDz_bdQ56ZSbITZ24pMYBnJA7myszeIYtZTbeWAZMqXpUAWLCjfUluZAORrZa0uPsRS6sgAAFPujwB6YsGEZu9kqcPnU4Fy5fwaYfaa97mzOkrH1GArNqoSCPe4z8f83VfGQLJVJEEpX9OA-tzwU1H7wie66lgLocMd-FzV8HtlvM9Gk6EOy0Sd0pxqWGxqD1Y',
  lastUpdated: '2 minutes ago'
};

const Hero: React.FC = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="px-container-margin-desktop py-24 flex flex-col lg:flex-row items-center gap-16 text-center lg:text-left max-w-7xl mx-auto">
        <motion.div 
          className="flex-1 space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-headline text-5xl lg:text-6xl font-bold text-on-surface tracking-tight leading-tight">
            Track prices smarter. <br />
            <span className="text-primary-container">Buy at the perfect time.</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto lg:mx-0">
            Never overpay again. Cheemo monitors millions of products across the web to alert you the second prices drop. Smart analytics for savvy shoppers.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
            <button className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              Start Tracking
            </button>
            <button className="bg-surface-container-low text-on-surface border border-outline-variant px-8 py-4 rounded-xl font-bold text-lg hover:bg-surface-container-highest transition-all">
              How it works
            </button>
          </div>
        </motion.div>

        {/* Hero Product Card Preview */}
        <motion.div 
          className="flex-1 relative w-full max-w-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white p-8 rounded-card shadow-xl border border-outline-variant relative z-10 hover:-translate-y-2 transition-transform duration-500">
            <div className="flex items-center justify-between mb-6">
              <span className="bg-emerald-100 text-primary font-bold px-3 py-1 rounded-full text-sm uppercase tracking-wide">Prices Dropped</span>
              <span className="text-on-surface-variant text-sm font-medium">{FEATURED_PRODUCT_MOCK.lastUpdated}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-left">
              <div className="w-32 h-32 rounded-xl bg-surface-container overflow-hidden border border-outline-variant shrink-0">
                <img 
                  alt={FEATURED_PRODUCT_MOCK.name} 
                  className="w-full h-full object-cover" 
                  src={FEATURED_PRODUCT_MOCK.imageUrl} 
                />
              </div>
              <div className="flex-1">
                <h3 className="font-headline text-xl font-bold mb-1 text-on-surface">{FEATURED_PRODUCT_MOCK.name}</h3>
                <p className="text-on-surface-variant mb-4">{FEATURED_PRODUCT_MOCK.store}</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-primary">${FEATURED_PRODUCT_MOCK.currentPrice.toFixed(2)}</span>
                  <span className="text-on-surface-variant line-through font-medium">${FEATURED_PRODUCT_MOCK.originalPrice.toFixed(2)}</span>
                  <span className="text-error-red font-bold text-sm">-{FEATURED_PRODUCT_MOCK.discountPercentage}%</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Price History</span>
                <span className="text-primary flex items-center gap-1 font-bold text-sm">
                  <TrendingDown className="w-4 h-4" /> Lowest Price Ever
                </span>
              </div>
              <div className="h-24 w-full bg-surface-container-lowest rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-primary/10 to-transparent"></div>
                <svg className="absolute bottom-0 w-full h-16 text-primary-container" preserveAspectRatio="none" viewBox="0 0 100 20">
                  <path d="M0 5 Q 10 10, 20 2 L 40 18 L 60 5 L 80 15 L 100 2" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl z-0"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl z-0"></div>
        </motion.div>
      </section>

      {/* Social Proof Stats */}
      <section className="bg-surface-container-low py-16 border-y border-outline-variant">
        <div className="px-container-margin-desktop max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-12">
          <StatItem value="500k+" label="Active Trackers" />
          <div className="w-px h-12 bg-outline-variant hidden md:block"></div>
          <StatItem value="$12M+" label="User Savings" />
          <div className="w-px h-12 bg-outline-variant hidden md:block"></div>
          <StatItem value="4.9/5" label="Average Rating" />
          <div className="w-px h-12 bg-outline-variant hidden md:block"></div>
          <StatItem value="2M+" label="Products Monitored" />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-container-margin-desktop py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-headline mb-4">Powerful tracking at your fingertips</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">We combine advanced data scraping with AI insights to give you the most accurate price tracking experience in the market.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<History className="w-6 h-6" />} 
              title="Real-Time History" 
              description="Access complete historical price charts for any item, seeing exactly how often it goes on sale." 
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6" />} 
              title="Instant Alerts" 
              description="Get push notifications, emails, or SMS the very second a price drops to your target amount." 
            />
            <FeatureCard 
              icon={<Brain className="w-6 h-6" />} 
              title="AI Insights" 
              description="Our algorithms predict if a price is likely to drop further or if it's the right time to buy now." 
            />
            <FeatureCard 
              icon={<Globe className="w-6 h-6" />} 
              title="Universal Tracking" 
              description="Copy any URL from 1,000+ supported stores and start tracking instantly without complicated setups." 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const StatItem: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="text-center md:text-left">
    <p className="text-4xl font-extrabold text-on-surface">{value}</p>
    <p className="text-on-surface-variant text-sm font-semibold tracking-wider uppercase">{label}</p>
  </div>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="p-8 rounded-card border border-outline-variant hover:border-primary-container hover:shadow-lg transition-all group text-center">
    <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center mb-6 group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors mx-auto">
      {icon}
    </div>
    <h3 className="font-headline text-xl font-bold mb-3 text-on-surface">{title}</h3>
    <p className="text-on-surface-variant leading-relaxed">{description}</p>
  </div>
);

export default Hero;
