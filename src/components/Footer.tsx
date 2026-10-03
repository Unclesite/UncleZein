import React from 'react';
import { ArrowUp, Compass, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#040609] pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[11px] font-mono-code text-blue-400 font-bold uppercase tracking-widest">
                <span>DIGITAL JOURNAL</span>
              </div>
              <div className="text-2xl font-black text-white font-display tracking-tight uppercase flex items-center gap-0.5">
                <span>UNCLE ZEIN</span>
                <span className="text-blue-500">.</span>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              {SITE_CONFIG.topicsSubtitle}
            </p>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 max-w-sm space-y-1.5">
              <span className="text-[11px] font-mono-code text-blue-400 font-bold block">
                {SITE_CONFIG.triadTagline}
              </span>
              <p className="text-slate-300 font-serif-title italic text-xs">
                "{SITE_CONFIG.opennessQuote}"
              </p>
            </div>
          </div>

          {/* Quick Navigations */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono-code text-white uppercase tracking-wider font-semibold">
              Halaman
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  About & Catatan Pribadi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ideas')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Tulisan & Esai
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('research')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Riset & Catatan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('books')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Buku & Catatan Panjang
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('media')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Video & Media Sosial
                </button>
              </li>
            </ul>
          </div>

          {/* Topics Pillar */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono-code text-white uppercase tracking-wider font-semibold">
              Topik Pembahasan
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Membaca kembali teks, sejarah lokal dan dunia, serta berbagai pertanyaan menarik lainnya.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Religion', 'History', 'Science', 'Philosophy', 'Hermeneutics', 'Epistemology'].map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-[10px] font-mono-code text-blue-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-code text-slate-500">
          <div>
            © {new Date().getFullYear()} UNCLE ZEIN. All thoughts open for peer review.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-blue-400/80 font-bold tracking-wider uppercase">
              {SITE_CONFIG.triadTagline}
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
