import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Search, Menu, X, UserCheck, Lock } from 'lucide-react';
import { soundscape } from '../utils/audioSynth';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenLogin,
}) => {
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
    { id: 'home', label: 'HOME', path: '/' },
    { id: 'ideas', label: 'IDEAS', path: '/ideas' },
    { id: 'research', label: 'RESEARCH', path: '/research' },
    { id: 'books', label: 'BOOKS', path: '/books' },
    { id: 'media', label: 'MEDIA', path: '/media' },
    { id: 'about', label: 'ABOUT', path: '/about' },
    { id: 'contact', label: 'CONTACT', path: '/contact' },
  ];

  const handleNavClick = (id: string, path: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    try {
      window.history.pushState({}, '', path);
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3.5 shadow-xl' : 'bg-[#07090e]/90 backdrop-blur-md py-4 border-b border-white/5'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark with dot */}
        <button
          onClick={() => handleNavClick('home', '/')}
          className="text-xl sm:text-2xl font-black tracking-tighter text-white hover:text-blue-400 transition-colors uppercase font-display cursor-pointer flex items-center gap-0.5 group"
        >
          <span>UNCLE ZEIN</span>
          <span className="text-blue-500 group-hover:scale-125 transition-transform">.</span>
        </button>

        {/* Zone 2: 4-7 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-mono-code tracking-wider uppercase">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.path)}
              className={`transition-all py-1 cursor-pointer font-semibold ${
                activeTab === item.id
                  ? 'text-blue-400 border-b-2 border-blue-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions + MASUK Button */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
            title="Search Archives (Ctrl+K)"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Ambient Audio Soundscape */}
          <button
            onClick={toggleSound}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code rounded-lg border transition-all cursor-pointer ${
              isAudioPlaying
                ? 'bg-blue-600/20 text-blue-300 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'text-slate-400 border-white/10 hover:text-white hover:border-slate-700 bg-black/40'
            }`}
            title="Toggle Ambient Audio Soundscape"
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>SOUND</span>
              </>
            )}
          </button>

          {/* PWA Install Button */}
          <PWAInstallButton variant="nav" />

          {/* MASUK / Member Button */}
          <button
            onClick={onOpenLogin}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all rounded-lg shadow-sm cursor-pointer font-mono-code tracking-wider"
          >
            <span>MASUK</span>
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
        <div className="lg:hidden glass-nav border-b border-white/10 px-6 py-5 space-y-3 bg-[#07090e]/98 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.path)}
              className={`block w-full text-left py-2 text-sm font-mono-code tracking-wider uppercase transition-colors ${
                activeTab === item.id ? 'text-blue-400 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Mobile PWA Install Trigger */}
          <div className="pt-2">
            <PWAInstallButton variant="drawer" />
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-mono-code text-slate-300"
            >
              <Search className="w-4 h-4" /> SEARCH (CTRL+K)
            </button>
            <button
              onClick={() => {
                onOpenLogin();
                setMobileMenuOpen(false);
              }}
              className="px-4 py-1.5 text-xs font-mono-code font-bold text-white bg-blue-600 rounded-lg"
            >
              MASUK
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
