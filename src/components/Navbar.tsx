import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Search, Menu, X } from 'lucide-react';
import { soundscape } from '../utils/audioSynth';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    if (isAudioPlaying) {
      soundscape.stop();
      setIsAudioPlaying(false);
    } else {
      soundscape.play('ocean');
      setIsAudioPlaying(true);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About & Passions' },
    { id: 'ideas', label: 'Ideas' },
    { id: 'research', label: 'Research Lab' },
    { id: 'books', label: 'Books' },
    { id: 'media', label: 'Media' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors uppercase font-display cursor-pointer"
        >
          UNCLE ZEIN
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`transition-colors relative py-1 cursor-pointer ${
                activeTab === item.id ? 'text-blue-400 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
            title="Cari Pemikiran & Arsip (Ctrl+K)"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={toggleSound}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              isAudioPlaying
                ? 'bg-blue-600/20 text-blue-300 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'text-slate-400 border-slate-800 hover:text-white hover:border-slate-700 bg-black/40'
            }`}
            title="Toggle Ambient Audio Soundscape"
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span className="hidden sm:inline">Ocean Ambiance</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Soundscape</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleNavClick('research')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all rounded-lg shadow-sm cursor-pointer"
          >
            Open Lab
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-b border-white/10 px-6 py-5 space-y-3 bg-[#07090e]/95 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left py-2 text-base font-medium transition-colors ${
                activeTab === item.id ? 'text-blue-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-sm text-slate-300"
            >
              <Search className="w-4 h-4" /> Cari Pemikiran
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg"
            >
              Hubungi
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
