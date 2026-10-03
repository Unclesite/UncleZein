import React, { useState } from 'react';
import { Book, Check, ArrowRight, Download, Eye, Sparkles, BookOpen, Layers } from 'lucide-react';
import { BOOKS_DATA, BookChapter } from '../data/siteData';

interface BooksSectionProps {
  onOpenSampleModal: (chapter: BookChapter) => void;
  onOrderBook: () => void;
}

export const BooksSection: React.FC<BooksSectionProps> = ({ onOpenSampleModal, onOrderBook }) => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number>(0);

  const activeChapter = BOOKS_DATA.chapters[selectedChapterIndex];

  return (
    <section id="books" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 uppercase tracking-widest">
            <span>04</span>
            <span aria-hidden="true">/</span>
            <span>PUBLICATIONS & MONOGRAPHS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
            Katalog Buku & Risalah Monografis
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Karya cetak berbobot yang disusun melalui investigasi bertahun-tahun. Memadukan bukti arkeologis, kritik manuskrip kuno, dan filsafat kebebasan rasional.
          </p>
        </div>

        {/* Featured Book Showcase Hero Card */}
        <div className="glass-card rounded-2xl p-8 sm:p-12 border border-white/10 glow-blue">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: 3D-styled Editorial Book Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 sm:w-72 aspect-[3/4] rounded-r-xl rounded-l-sm bg-gradient-to-tr from-slate-950 via-[#0c101d] to-[#12182b] p-7 border-y border-r border-blue-500/30 border-l-4 border-l-blue-700 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Book Spine Shadow effect */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/60 to-transparent" />

                <div className="space-y-2">
                  <div className="text-[10px] font-mono-code text-blue-400 tracking-widest uppercase">
                    Uncle Zein · Monograf 2026
                  </div>
                  <h3 className="text-2xl font-black font-display text-white tracking-tight leading-none">
                    MENDOBRAK KEPALSUAN
                  </h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                    Logika, Sejarah, & Eksistensi
                  </p>
                </div>

                {/* Minimalist Graphic Element */}
                <div className="my-auto py-6 flex justify-center">
                  <div className="w-20 h-20 rounded-full border border-blue-400/20 flex items-center justify-center">
                    <div className="w-10 h-10 border border-blue-400/40 transform rotate-45" />
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3 flex items-center justify-between text-[10px] font-mono-code text-slate-400">
                  <span>468 Halaman</span>
                  <span>Hardcover Edition</span>
                </div>
              </div>
            </div>

            {/* Right: Book Details & Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Zero-Pill Meta */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono-code">
                <span className="text-blue-400 font-semibold">{BOOKS_DATA.edition}</span>
                <span aria-hidden="true">·</span>
                <span>Tahun Terbit: {BOOKS_DATA.year}</span>
                <span aria-hidden="true">·</span>
                <span>{BOOKS_DATA.pages}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                {BOOKS_DATA.title}
              </h3>
              <p className="text-base text-blue-400 font-serif-title italic">
                {BOOKS_DATA.subtitle}
              </p>

              <p className="text-sm text-slate-300 leading-relaxed">
                {BOOKS_DATA.synopsis}
              </p>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-[11px] font-mono-code text-slate-400">STRUKTUR</div>
                  <div className="text-xs font-bold text-white mt-0.5">Bab I s.d. Bab IX</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-[11px] font-mono-code text-slate-400">FORMAT</div>
                  <div className="text-xs font-bold text-white mt-0.5">Edisi Kolektor Eksklusif</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-[11px] font-mono-code text-slate-400">BAHASA</div>
                  <div className="text-xs font-bold text-white mt-0.5">Indonesia (Anotasi Semitik)</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={onOrderBook}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wide uppercase transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer"
                >
                  <span>Pesan Edisi Fisik</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenSampleModal(BOOKS_DATA.chapters[0])}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span>Baca Sampel Bab I Gratis</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Chapter-by-Chapter Breakdown (Bab I - IX) */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-mono-code text-blue-400 uppercase">TABLE OF CONTENTS</div>
              <h3 className="text-2xl font-bold text-white font-display">Struktur Lengkap 9 Bab</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono-code hidden sm:inline">
              Pilih bab untuk melihat ringkasan tesis
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Chapter Selector List */}
            <div className="lg:col-span-6 space-y-2.5">
              {BOOKS_DATA.chapters.map((chapter, index) => {
                const isSelected = selectedChapterIndex === index;
                return (
                  <button
                    key={chapter.number}
                    onClick={() => setSelectedChapterIndex(index)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500 shadow-sm'
                        : 'glass-card border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono-code font-bold ${isSelected ? 'text-blue-400' : 'text-slate-400'}`}>
                          {chapter.number}
                        </span>
                        <span className="text-sm font-semibold text-white line-clamp-1">
                          {chapter.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {chapter.subtitle}
                      </p>
                    </div>

                    <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-blue-400 translate-x-1' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Selected Chapter Detailed Breakdown Panel */}
            <div className="lg:col-span-6 glass-card p-8 rounded-2xl border border-white/10 space-y-6 glow-blue sticky top-24">
              <div className="space-y-2 border-b border-white/10 pb-4">
                <span className="text-xs font-mono-code text-blue-400 font-bold uppercase">
                  {activeChapter.number}
                </span>
                <h4 className="text-xl font-bold text-white font-display">
                  {activeChapter.title}
                </h4>
                <p className="text-xs text-slate-400 font-serif-title italic">
                  {activeChapter.subtitle}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono-code text-blue-400 uppercase tracking-wider">
                  Sinopsis Argumen
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeChapter.summary}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <span className="text-xs font-mono-code text-emerald-400 font-bold uppercase">
                  Key Invariant / Kesimpulan Kunci:
                </span>
                <p className="text-xs sm:text-sm text-slate-200 font-serif-title italic leading-relaxed">
                  "{activeChapter.keyTakeaway}"
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => onOpenSampleModal(activeChapter)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Buka Pratinjau Teks {activeChapter.number}</span>
                </button>
                <span className="text-[11px] font-mono-code text-slate-400">Verifikasi Naskah</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
