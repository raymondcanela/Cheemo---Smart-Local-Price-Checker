import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navLinks }) => {
  const location = useLocation();

  // Lock body scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 md:hidden">
          {/* Drawer */}
          <motion.div 
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 w-screen h-screen bg-[#F9FBF9] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-100/50 shrink-0">
              <span className="text-xl font-bold text-[#005F41]">Cheemo</span>
              <button onClick={onClose} className="p-2 hover:bg-gray-200/50 rounded-full transition-colors">
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 px-3 py-2 flex flex-col justify-center min-h-0">
              <ul className="space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.href;
                  
                  return (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive 
                            ? 'bg-primary text-white shadow-md' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                        <span className="text-base font-medium">{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Promo Card */}
              <div className="mt-4 p-4 rounded-2xl bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-100/50">
                <h3 className="text-base font-bold text-gray-900 mb-1">Track Smarter</h3>
                <p className="text-gray-500 text-xs leading-snug">
                  Join 50k+ shoppers saving an average of 15% on every purchase.
                </p>
              </div>
            </nav>
            
            {/* Footer Actions */}
            <div className="p-4 space-y-2 bg-white border-t border-gray-100 shrink-0">
              <button className="w-full bg-[#005F41] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-95 transition-opacity text-sm">
                Sign Up <ArrowRight className="h-4 w-4" />
              </button>
              <button className="w-full bg-white text-[#005F41] py-3.5 rounded-xl font-bold border-2 border-gray-100 hover:bg-gray-50 transition-colors text-sm">
                Login
              </button>
              <p className="text-center text-[10px] text-gray-400 pt-2">
                Cheemo Price Tracking © 2024
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
