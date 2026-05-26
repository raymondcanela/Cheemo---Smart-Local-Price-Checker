import React from 'react';
import { Globe, Share2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container-high py-16 px-container-margin-desktop border-t border-outline-variant">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
          <div className="col-span-2">
            <span className="text-2xl font-bold text-primary block mb-6">Cheemo</span>
            <p className="text-on-surface-variant max-w-xs">
              Smart price tracking and analytics for the modern consumer. Save more, buy better.
            </p>
          </div>
          
          <FooterColumn 
            title="Product" 
            links={['Pricing', 'API', 'Extension']} 
          />
          <FooterColumn 
            title="Company" 
            links={['About', 'Careers', 'Blog']} 
          />
          <FooterColumn 
            title="Support" 
            links={['Help Center', 'Safety', 'Contact']} 
          />
          <FooterColumn 
            title="Legal" 
            links={['Privacy', 'Terms', 'Cookies']} 
          />
        </div>

        <div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-on-surface-variant text-sm">© 2024 Cheemo Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
              <Share2 className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn: React.FC<{ title: string; links: string[] }> = ({ title, links }) => (
  <div>
    <h5 className="font-bold mb-6 text-on-surface">{title}</h5>
    <ul className="space-y-4">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
