import React from 'react';
import { ArrowUp, Compass, Heart } from 'lucide-react';
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
            <div className="text-lg font-bold text-white font-display tracking-tight uppercase">
              UNCLE ZEIN
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Ruang penyelidikan mandiri di luar doktrin institusi. Menguji narasi kuno dengan sains naskah, logika dingin, dan eksplorasi alam liar.
            </p>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 max-w-sm">
              <span className="text-[11px] font-mono-code text-blue-400 block mb-1">CREDO</span>
              <p className="text-slate-300 font-serif-title italic text-xs">
                "{SITE_CONFIG.credo}"
              </p>
            </div>
          </div>

          {/* Quick Navigations */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono-code text-white uppercase tracking-wider font-semibold">
              Eksplorasi Ruang
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-blue-400 transition-colors"
                >
                  The Man Behind The Mind
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ideas')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Esai Kritis & Epistemologi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('research')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Laboratorium Riset (5 Layers)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('books')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Buku Mendobrak Kepalsuan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('media')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Arsip Media & Video Esai
                </button>
              </li>
            </ul>
          </div>

          {/* Passions Index */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono-code text-white uppercase tracking-wider font-semibold">
              Wilderness Craft
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Spearfishing Laut Dalam · Traveling & Eksplorasi Batas Terluar · Berburu & Pelacakan Rimba · Berkuda Savana · Memancing Kontemplatif.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold"
              >
                <span>Kirim Pertanyaan / Undangan Riset</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <div>
            © {new Date().getFullYear()} Uncle Zein · Ultimate Edition. Hak Cipta Gagasan Bebas Berpikir.
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono-code text-[11px] text-slate-400">
              Nusantara & Global Frontier
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
