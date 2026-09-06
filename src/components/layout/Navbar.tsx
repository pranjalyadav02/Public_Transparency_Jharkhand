import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Search, Menu, Shield } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Accountability', path: '/accountability' },
    { name: 'Impact', path: '/impact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-700" />
          <span className="text-xl font-bold tracking-tight text-gray-900">JanaSamadhan</span>
          <span className="hidden text-sm text-gray-500 sm:inline-block border-l border-gray-300 ml-3 pl-3">
            Public Transparency
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-700",
                location.pathname === item.path ? "text-blue-700" : "text-gray-600"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search problems, projects..."
              className="h-9 w-64 rounded-full border border-gray-300 bg-gray-50 pl-9 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          <button className="md:hidden p-2 text-gray-600 hover:text-gray-900">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
