import React from 'react';
import { Compass, MapPin, Target, Zap, Anchor, ArrowRight, ShieldCheck, BookOpen, Volume2, Sparkles } from 'lucide-react';
import { PASSIONS_DATA, Passion } from '../data/siteData';

interface AboutSectionProps {
  onSelectPassion: (passion: Passion) => void;
  onNavigate: (tab: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onSelectPassion, onNavigate }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5" />;
      case 'Target':
        return <Target className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Anchor':
        return <Anchor className="w-5 h-5" />;
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-20">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 uppercase tracking-widest">
            <span>01</span>
            <span aria-hidden="true">/</span>
            <span>THE MAN BEHIND THE MIND</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
            Bukan Ustaz. Bukan Akademisi. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-200">
              Bukan Selebritas.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Uncle Zein adalah seorang penyelidik independen, praktisi survival alam liar, dan pemikir non-partisan yang menolak terjebak dalam sekat-sekat dogmatisme institusional.
          </p>
        </div>

        {/* Narrative Split: Philosophy & Credo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 glass-card p-8 sm:p-10 rounded-2xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white font-display">
              Menemukan Kejernihan di Luar Ruang Kuliah & Mimbar Tradisional
            </h3>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Dunia saat ini dipenuhi oleh dua kutub ekstrem: mereka yang menelan dogma tanpa saringan akal sehat karena takut dikutuk, dan akademisi menara gading yang berteori rumit namun terputus total dari realitas keras kehidupan nyata.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Saya memilih jalur ketiga: <strong>Jalur Penyelidik Lapangan Merdeka</strong>. Membaca naskah kuno dalam bahasa aslinya, memeriksa lapisan arkeologi, dan sekaligus menguji ketajaman insting di alam liar—melalui menyelam di palung laut, menunggang kuda di savana terbuka, dan melacak jejak di rimba sunyi.
            </p>

            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs text-blue-400 font-mono-code mb-1">01. INDEPENDENSI</div>
                <div className="text-xs text-slate-300">Bebas dari kepentingan donor, ormas, dan partai politik.</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs text-blue-400 font-mono-code mb-1">02. METODOLOGI</div>
                <div className="text-xs text-slate-300">Kritik historis-tekstual ketat & verifikasi empiris.</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs text-blue-400 font-mono-code mb-1">03. INTEGRITAS</div>
                <div className="text-xs text-slate-300">Menyampaikan kebenaran data tanpa kompromi popularitas.</div>
              </div>
            </div>
          </div>

          {/* Quick Framework / How I Read */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-8 rounded-2xl border border-white/10 space-y-4 glow-blue">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-blue-400 uppercase">Framework Penyelidikan</span>
                <span className="text-xs text-slate-400 font-mono-code">Prinsip 4 Langkah</span>
              </div>

              <h4 className="text-lg font-bold text-white font-display">
                Protokol Uji Klaim Intelektual
              </h4>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-mono-code font-bold">1</span>
                  <span><strong>Tolak Asumsi Awal:</strong> Anggap semua klaim teologis atau historis belum terbukti sampai data primer dihadirkan.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-mono-code font-bold">2</span>
                  <span><strong>Audit Naskah Tertua:</strong> Periksa manuskrip fisik terawal, varian bacaan (textual variants), dan bahasa aslinya.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-mono-code font-bold">3</span>
                  <span><strong>Uji Silang Lapangan:</strong> Validasi dengan catatan geologi, arkeologi, dan teks pihak ketiga yang netral.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-mono-code font-bold">4</span>
                  <span><strong>Uji Logika Non-Kontradiksi:</strong> Singkirkan spekulasi yang memuat cacat nalar formal (fallacy).</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('research')}
                className="w-full mt-4 py-2.5 px-4 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Lihat Implementasi di Lab Riset</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* PERSONAL PASSIONS GRID (Enhanced Bento Box) */}
        <div className="space-y-8 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs font-mono-code text-blue-400 uppercase tracking-widest">
                PERSONAL PASSIONS & WILDERNESS CRAFT
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                Disiplin Mental di Alam Liar
              </h3>
              <p className="text-sm text-slate-400 max-w-2xl">
                Bagi Uncle Zein, hobi bukan sekadar rekreasi pelarian, melainkan laboratorium fisik untuk melatih ketajaman batin, kesabaran primal, dan kerendahan hati di hadapan hukum semesta.
              </p>
            </div>

            <div className="text-xs text-slate-400 font-mono-code">
              Pilih kartu untuk membuka catatan lapangan & audio ambiance
            </div>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PASSIONS_DATA.map((passion, index) => {
              const isLarge = index === 0 || index === 1;
              return (
                <div
                  key={passion.id}
                  onClick={() => onSelectPassion(passion)}
                  className={`glass-card rounded-2xl p-6 sm:p-7 border border-white/10 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:border-blue-500/50 hover:scale-[1.01] flex flex-col justify-between ${
                    isLarge ? 'md:col-span-1 lg:col-span-1' : ''
                  }`}
                >
                  {/* Subtle Vector Backdrop Graphics */}
                  <div className="absolute top-0 right-0 p-6 text-white/5 group-hover:text-blue-500/10 transition-colors pointer-events-none">
                    {getIcon(passion.iconName)}
                  </div>

                  <div className="space-y-4">
                    {/* Top Header */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {getIcon(passion.iconName)}
                      </div>
                      <span className="text-[11px] font-mono-code text-slate-400 group-hover:text-blue-300 transition-colors">
                        0{index + 1}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors font-display">
                        {passion.title}
                      </h4>
                      <p className="text-xs text-blue-400 font-mono-code mt-0.5">
                        {passion.subtitle}
                      </p>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {passion.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-mono-code">Field Journal Ready</span>
                      <span className="text-blue-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Buka Jurnal <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
