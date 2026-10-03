import React from 'react';
import { ArrowRight, BookOpen, Compass, ShieldAlert, Sparkles, Terminal, FileText } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
  onOpenArticle: (articleId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenArticle }) => {
  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-indigo-600/8 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Background Subtle Grid Lines */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none -z-10" 
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Massive Editorial Typography */}
          <div className="lg:col-span-7 space-y-7">
            {/* Live Indicator Meta */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-code tracking-wide">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>CATATAN PERSONAL</span>
              <span aria-hidden="true">·</span>
              <span>TULISAN & RISET</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">UNCLE ZEIN</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] text-balance font-display">
              Question everything. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">
                Especially the things
              </span>{' '}
              you're told not to question.
            </h1>

            {/* Credo & Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
              Ini tempat saya menulis, mencari tahu hal-hal yang menarik, jalan-jalan, dan mencatat apa yang ditemukan—dari sejarah, teks keagamaan, sains, hingga keseharian di alam terbuka.
            </p>

            {/* Credo Statement */}
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] max-w-xl">
              <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-1">Prinsip Sederhana</p>
              <p className="text-sm font-medium text-slate-200 italic font-serif-title">
                "{SITE_CONFIG.credo}"
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenArticle('art-wahyu-makna-kata')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-[0_0_25px_rgba(37,99,235,0.35)] hover:shadow-[0_0_35px_rgba(37,99,235,0.5)] active:scale-98 cursor-pointer"
              >
                <span>Baca Esai 01: Makna Waḥy</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('research')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-xl transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>Riset & Catatan</span>
              </button>
            </div>

            {/* Proof Badges / Meta Strip */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 font-mono-code border-t border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="text-white font-semibold tabular-nums">400+</span>
                <span>Halaman Catatan</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">|</span>
              <div className="flex items-center gap-1.5">
                <span className="text-white font-semibold tabular-nums">5</span>
                <span>Tingkat Kejelasan Bukti</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">|</span>
              <div className="flex items-center gap-1.5">
                <span className="text-white font-semibold tabular-nums">Catatan</span>
                <span>Pribadi</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Portrait Card with Visual Depth */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden glass-card p-2 group transition-all duration-500 hover:border-blue-500/40 glow-blue">
              {/* Card Media Area */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 via-[#0a0d16] to-[#040609] flex flex-col justify-end p-6 border border-white/5">
                {/* Visual Graphic Representation */}
                <div className="absolute inset-0 flex items-center justify-center opacity-90">
                  {/* Subtle Geometric Constellation SVG */}
                  <svg className="w-full h-full text-blue-500/10 absolute inset-0" viewBox="0 0 400 500" fill="none">
                    <circle cx="200" cy="180" r="140" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="200" cy="180" r="90" stroke="currentColor" strokeWidth="1" />
                    <line x1="200" y1="40" x2="200" y2="320" stroke="currentColor" strokeWidth="0.8" />
                    <line x1="60" y1="180" x2="340" y2="180" stroke="currentColor" strokeWidth="0.8" />
                    <polygon points="200,60 300,240 100,240" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
                  </svg>

                  {/* High-End Portrait Vector Silhouette */}
                  <div className="relative z-10 text-center flex flex-col items-center">
                    <div className="relative w-36 h-36 rounded-full border border-blue-400/30 p-1 bg-gradient-to-b from-blue-500/20 to-transparent mb-4 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden border border-white/10 relative">
                        {/* Abstract Thought Monogram */}
                        <span className="text-4xl font-black font-display text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-white to-slate-500">
                          UZ
                        </span>
                        <div className="absolute bottom-1 text-[9px] font-mono-code text-blue-400 uppercase tracking-wider">
                          THINKER
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white font-display tracking-tight">Uncle Zein</h3>
                    <p className="text-xs text-blue-400 font-mono-code mt-1 tracking-wider uppercase">
                      Personal Notes, Reading & Travel
                    </p>
                  </div>
                </div>

                {/* Scrim Overlay */}
                <div className="relative z-20 mt-auto pt-6 border-t border-white/10 bg-black/40 backdrop-blur-md rounded-lg p-4 -mx-2 -mb-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-mono-code text-blue-400">Catatan Riset</span>
                    <span className="text-slate-400">Status: Masih Dipelajari</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white leading-snug line-clamp-2">
                    Yesus / Isa Al Masih Punya Ayah Kandung?
                  </h4>
                  <div className="mt-3 flex items-center justify-between">
                    <button
                      onClick={() => onNavigate('research')}
                      className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                    >
                      Buka Catatan <ArrowRight className="w-3 h-3" />
                    </button>
                    <span className="text-[11px] text-slate-400 font-mono-code">5 Lapisan Bukti</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Insight Mini Note */}
            <div className="hidden sm:flex items-center gap-3 absolute -bottom-6 -left-6 glass-card p-3 rounded-xl border border-white/10 shadow-2xl max-w-xs z-30">
              <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                "Di laut atau di alam terbuka, yang penting adalah ketenangan dan rasa ingin tahu."
              </p>
            </div>
          </div>
        </div>

        {/* Quick Framework Navigator Tags */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('about')}
            className="text-left p-4 rounded-xl glass-card transition-all hover:border-blue-500/40 group cursor-pointer"
          >
            <div className="text-xs font-mono-code text-blue-400 mb-1">01. CARA MEMBACA</div>
            <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">Membaca & Memeriksa</div>
            <p className="text-xs text-slate-400 mt-1">Melihat teks asli secara langsung dan memisahkannya dari tafsir tambahan.</p>
          </button>

          <button
            onClick={() => onNavigate('research')}
            className="text-left p-4 rounded-xl glass-card transition-all hover:border-blue-500/40 group cursor-pointer"
          >
            <div className="text-xs font-mono-code text-blue-400 mb-1">02. RISET & TEMUAN</div>
            <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">5 Tingkat Bukti</div>
            <p className="text-xs text-slate-400 mt-1">Membedakan fakta yang jelas dari dugaan yang masih perlu diuji.</p>
          </button>

          <button
            onClick={() => onNavigate('books')}
            className="text-left p-4 rounded-xl glass-card transition-all hover:border-blue-500/40 group cursor-pointer"
          >
            <div className="text-xs font-mono-code text-blue-400 mb-1">03. BUKU & TULISAN</div>
            <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">Daftar Buku & Bab</div>
            <p className="text-xs text-slate-400 mt-1">Catatan panjang tentang sejarah, teks kuno, dan cara manusia berpikir.</p>
          </button>
        </div>
      </div>
    </section>
  );
};
