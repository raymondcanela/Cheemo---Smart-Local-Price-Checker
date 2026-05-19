import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  Bell, 
  User as UserIcon, 
  Home, 
  TrendingDown, 
  Eye, 
  LayoutGrid, 
  HelpCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SearchBar from './SearchBar';
import MobileMenu from './MobileMenu';

const NAV_LINKS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Price Drops', href: '/price-drops', icon: TrendingDown },
  { label: 'Watchlist', href: '/watchlist', icon: Eye },
  { label: 'Categories', href: '/categories', icon: LayoutGrid },
  { label: 'How it Works', href: '/how-it-works', icon: HelpCircle },
];

const Header: React.FC = () => {
  const { isLoggedIn, login } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left Side: Logo & Desktop Nav */}
        <div className="flex items-center gap-8">
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          
          <Link to="/" className="text-2xl font-bold text-primary tracking-tight">
            Cheemo
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side: Search & User Actions */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          {isLoggedIn ? (
            <>
              <div className="hidden md:flex flex-1 justify-center">
                <SearchBar />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-tertiary rounded-full border-2 border-white"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <UserIcon className="h-5 w-5 text-gray-600" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <button className="p-2 md:hidden hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <button className="hidden md:block text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                Sign In
              </button>
              <button 
                onClick={login}
                className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        navLinks={NAV_LINKS}
      />
    </header>
  );
};

export default Header;
