import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '../data/translations';
import { 
  Search, Globe, Sun, Moon, Type, Shield, 
  Layers, BarChart3, Building2, MapPin, Database, 
  Sparkles, Menu, X, Check, HelpCircle
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: Language;
  onToggleLanguage: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  fontSize: 'normal' | 'large';
  onToggleFontSize: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  language,
  onToggleLanguage,
  highContrast,
  onToggleHighContrast,
  fontSize,
  onToggleFontSize,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: 'overview', label: t.navHome, icon: Layers },
    { id: 'explore', label: t.navExplore, icon: Search },
    { id: 'districts', label: t.navDistricts, icon: MapPin },
    { id: 'accountability', label: t.navAccountability, icon: Shield },
    { id: 'impact', label: t.navImpact, icon: BarChart3 },
    { id: 'open-data', label: t.navData, icon: Database },
    { id: 'about', label: t.navAbout, icon: Sparkles }
  ];

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors ${
      highContrast 
        ? 'bg-black text-white border-white' 
        : 'bg-white/95 backdrop-blur-md text-slate-900 border-slate-200'
    }`}>
      {/* Top Civic Identity Bar */}
      <div className={`px-4 sm:px-6 py-1 text-[11px] font-medium border-b flex items-center justify-between ${
        highContrast 
          ? 'bg-zinc-900 border-zinc-700 text-zinc-300' 
          : 'bg-slate-900 text-slate-300 border-slate-800'
      }`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-semibold text-white">GOVERNMENT OF JHARKHAND</span>
          <span className="hidden md:inline text-slate-400">• Societal Innovation & Open Accountability System</span>
        </div>

        {/* Accessibility & Language Toolbar */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1 hover:text-white px-2 py-0.5 rounded transition text-xs font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-800/60"
            title="Toggle English / हिन्दी"
          >
            <Globe className="w-3 h-3" />
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* High Contrast Toggle */}
          <button
            onClick={onToggleHighContrast}
            className={`p-1 rounded hover:text-white transition flex items-center gap-1 ${
              highContrast ? 'text-amber-400' : 'text-slate-400'
            }`}
            title="Toggle High Contrast Mode"
          >
            <Sun className="w-3 h-3" />
            <span className="hidden sm:inline text-[10px]">Contrast</span>
          </button>

          {/* Font Size Scaler */}
          <button
            onClick={onToggleFontSize}
            className={`p-1 rounded hover:text-white transition flex items-center gap-1 ${
              fontSize === 'large' ? 'text-emerald-300 font-bold' : 'text-slate-400'
            }`}
            title="Toggle Text Size (Normal / Large)"
          >
            <Type className="w-3 h-3" />
            <span className="hidden sm:inline text-[10px]">{fontSize === 'large' ? 'A+' : 'A'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Portal Identity */}
          <div 
            onClick={() => onSelectTab('overview')}
            className="flex items-center gap-3 cursor-pointer select-none shrink-0"
          >
            <div className="w-10 h-10 rounded bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center font-bold font-serif text-lg shadow-sm border border-emerald-500/30">
              JS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">
                  {language === 'hi' ? 'जनसमाधान' : 'JanaSamadhan'}
                </h1>
                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">
                  Layer 5
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                Public Transparency, Accountability & Impact
              </p>
            </div>
          </div>

          {/* Global Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs bg-slate-100 hover:bg-slate-200/80 text-slate-500 rounded-lg border border-slate-200 transition"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{t.searchPlaceholder}</span>
              </div>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono text-slate-400 shadow-2xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-200' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg bg-slate-100"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 animate-in slide-in-from-top-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-2.5 transition text-left ${
                  isActive
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
