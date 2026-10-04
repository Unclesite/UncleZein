import React, { useState } from 'react';
import { Book, Check, ArrowRight, Eye, Sparkles, BookOpen, Layers, ChevronDown, ChevronRight, Dna, Landmark, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { BOOKS_DATA, BookChapter } from '../data/siteData';

interface BooksSectionProps {
  onOpenSampleModal: (chapter: BookChapter) => void;
  onOrderBook: () => void;
}

export const BooksSection: React.FC<BooksSectionProps> = ({ onOpenSampleModal, onOrderBook }) => {
  const [selectedPartIndex, setSelectedPartIndex] = useState<number | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<BookChapter>(BOOKS_DATA.chapters[0]);

  return (
    <section id="books" className="py-10 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 uppercase tracking-widest font-bold">
            <span>BUKU & TULISAN PANJANG</span>
            <span aria-hidden="true">/</span>
            <span>UNCLE ZEIN</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-display">
            Books<span className="text-blue-500">.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Kumpulan catatan panjang dan buku yang sedang ditulis. Membaca kembali pertanyaan-pertanyaan lama tentang teks, sejarah, dan sains dengan lebih terbuka.
          </p>
        </div>

        {/* Book 01 Showcase Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-blue-500/40 relative overflow-hidden glow-blue bg-gradient-to-br from-[#0c1428] via-[#070b14] to-black space-y-10">
          {/* Top Status & Classification Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/40 font-mono-code text-xs font-bold">
                {BOOKS_DATA.bookNumber} · {BOOKS_DATA.statusBadge}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/[0.04] text-slate-300 border border-white/10 font-mono-code text-xs">
                {BOOKS_DATA.researchType}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono-code">
              <span className="text-slate-400">Classification:</span>
              <span className="text-amber-400 font-semibold border border-amber-500/30 px-2.5 py-0.5 rounded-md bg-amber-950/30">
                {BOOKS_DATA.classification}
              </span>
            </div>
          </div>

          {/* Book Header & Progress Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: 3D Editorial Book Spine Mockup */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-64 sm:w-72 aspect-[3/4.2] rounded-r-2xl rounded-l-sm bg-gradient-to-tr from-slate-950 via-[#0a1122] to-[#121c36] p-7 border-y border-r border-blue-500/40 border-l-4 border-l-blue-600 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between transform -rotate-1 hover:rotate-0 transition-transform duration-500 group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono-code text-blue-400 uppercase tracking-widest">
                    <span>{BOOKS_DATA.author}</span>
                    <span>{BOOKS_DATA.bookNumber}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight leading-tight">
                    {BOOKS_DATA.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 leading-snug font-serif-title italic">
                    {BOOKS_DATA.subtitle}
                  </p>
                </div>

                <div className="my-auto py-4 flex justify-center">
                  <div className="w-20 h-20 rounded-full border border-blue-400/30 flex items-center justify-center bg-blue-950/20 group-hover:scale-105 transition-transform">
                    <div className="w-10 h-10 border-2 border-blue-400/50 transform rotate-45" />
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3 space-y-1 text-[10px] font-mono-code text-slate-400">
                  <div className="flex justify-between">
                    <span>Progress Penelitian:</span>
                    <strong className="text-blue-400">{BOOKS_DATA.progress}%</strong>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${BOOKS_DATA.progress}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Book Metadata & Synopsis */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-mono-code text-blue-400 font-bold uppercase tracking-wider">
                  MONOGRAPH 01
                </div>
                <h3 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
                  {BOOKS_DATA.title}
                </h3>
                <p className="text-base sm:text-lg text-blue-300 font-serif-title italic">
                  {BOOKS_DATA.subtitle}
                </p>
              </div>

              {/* Progress & Status Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs font-mono-code">
                <div>
                  <span className="text-slate-400 block text-[11px]">STATUS:</span>
                  <span className="text-white font-bold">{BOOKS_DATA.status}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">PROGRESS:</span>
                  <span className="text-blue-400 font-bold">{BOOKS_DATA.progress}% Selesai</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">BOOK NUMBER:</span>
                  <span className="text-white font-bold">{BOOKS_DATA.bookNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">PENDEKATAN:</span>
                  <span className="text-blue-300 font-bold">3 Lensa Lintas Disiplin</span>
                </div>
              </div>

              {/* Synopsis */}
              <div className="space-y-4 pt-2">
                <div className="text-xs font-mono-code text-blue-400 uppercase font-bold tracking-widest">
                  SYNOPSIS
                </div>
                <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                  {BOOKS_DATA.synopsisParagraphs.map((para, idx) => (
                    <p key={idx} className={para.startsWith('«') || para.includes('«') ? 'font-serif-title italic text-blue-200 border-l-2 border-blue-500 pl-4 py-1 my-2 bg-blue-950/20 rounded-r-lg' : ''}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Actions & Official Portal Link */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="https://unclezein.com/books"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono-code font-bold tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] cursor-pointer"
                >
                  <span>Buka di unclezein.com/books</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => onOpenSampleModal(BOOKS_DATA.chapters[0])}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10 text-xs font-mono-code font-bold uppercase transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span>Baca Prologue: Satu Pertanyaan di Surabaya</span>
                </button>
              </div>
            </div>
          </div>

          {/* Methodology Framework (4 Levels of Certainty) */}
          <div className="border-t border-white/10 pt-10 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-mono-code text-blue-400 font-bold uppercase tracking-widest">
                METHODOLOGY & CLASSIFICATION
              </div>
              <h4 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Tingkat Kepastian & Prinsip Utama
              </h4>
              <p className="text-sm text-slate-300">
                Buku ini menggunakan pendekatan lintas disiplin. Setiap klaim dipisahkan berdasarkan tingkat kepastian secara transparan:
              </p>
            </div>

            {/* 4 Levels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {BOOKS_DATA.methodologyLevels.map((lvl) => (
                <div key={lvl.level} className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 font-mono-code text-sm font-bold text-white">
                    <span>{lvl.dot}</span>
                    <span>{lvl.level}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {lvl.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Main Principle Callout Box */}
            <div className="p-6 rounded-2xl bg-blue-950/30 border border-blue-500/40 space-y-3">
              <div className="text-xs font-mono-code text-blue-400 font-bold uppercase tracking-widest">
                PRINSIP UTAMA
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white font-display italic">
                {BOOKS_DATA.mainPrinciple}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {BOOKS_DATA.methodologyNote}
              </p>
            </div>
          </div>

          {/* Table of Contents (Prologue + 8 Parts, 32 Chapters) */}
          <div className="border-t border-white/10 pt-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-mono-code text-blue-400 uppercase font-bold">
                  TABLE OF CONTENTS
                </div>
                <h4 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                  Struktur Lengkap 32 Bab
                </h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  Meliputi Prologue serta Part I hingga Part VIII
                </p>
              </div>

              <div className="text-xs font-mono-code text-slate-400">
                Total: <strong className="text-white">1 Prologue + 32 Bab</strong>
              </div>
            </div>

            {/* Prologue Feature Card */}
            <div
              onClick={() => onOpenSampleModal(BOOKS_DATA.chapters[0])}
              className="p-6 rounded-2xl glass-card border border-blue-500/40 bg-blue-950/20 hover:bg-blue-900/30 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>PROLOGUE</span>
                </div>
                <h5 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors font-display">
                  {BOOKS_DATA.prologue.title}
                </h5>
                <p className="text-xs sm:text-sm text-slate-300 font-light">
                  {BOOKS_DATA.prologue.subtitle}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-mono-code font-bold uppercase shrink-0 group-hover:bg-blue-500 transition-all">
                <span>Baca Prolog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* 8 Parts Accordion / Grid */}
            <div className="space-y-4">
              {BOOKS_DATA.parts.map((part, pIdx) => {
                const isExpanded = selectedPartIndex === pIdx || selectedPartIndex === null;

                return (
                  <div key={part.partName} className="rounded-2xl glass-card border border-white/10 overflow-hidden">
                    {/* Part Header */}
                    <button
                      onClick={() => setSelectedPartIndex(selectedPartIndex === pIdx ? null : pIdx)}
                      className="w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.03] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-mono-code text-xs font-bold">
                          0{pIdx + 1}
                        </span>
                        <span className="text-base sm:text-lg font-bold text-white font-display">
                          {part.partName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400">
                        <span>{part.chapters.length} Bab</span>
                        {isExpanded ? <ChevronDown className="w-4 h-4 text-blue-400" /> : <ChevronRight className="w-4 h-4" />}
                      </div>
                    </button>

                    {/* Chapters Inside Part */}
                    {isExpanded && (
                      <div className="p-5 pt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 border-t border-white/5 mt-2">
                        {part.chapters.map((chap) => (
                          <div
                            key={chap.number}
                            onClick={() => onOpenSampleModal({ ...chap, number: `Bab ${chap.number}` })}
                            className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/40 hover:bg-blue-950/20 transition-all cursor-pointer space-y-1.5 group"
                          >
                            <div className="text-xs font-mono-code text-blue-400 font-bold">
                              BAB {chap.number}
                            </div>
                            <h6 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors font-display">
                              {chap.title}
                            </h6>
                            <p className="text-xs text-slate-400 leading-relaxed font-light line-clamp-2">
                              {chap.subtitle}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Research Status Box & Public Note Disclaimer */}
            <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
              <div className="text-xs font-mono-code text-blue-400 font-bold uppercase tracking-wider">
                RESEARCH STATUS SUMMARY
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono-code">
                <div>
                  <span className="text-slate-400 block">Book:</span>
                  <span className="text-white font-bold">{BOOKS_DATA.title}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Book Number:</span>
                  <span className="text-white font-bold">{BOOKS_DATA.bookNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Current Position:</span>
                  <span className="text-amber-400 font-bold">{BOOKS_DATA.classification}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Research Type:</span>
                  <span className="text-blue-300 font-bold">{BOOKS_DATA.researchType}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-400 italic leading-relaxed">
                {BOOKS_DATA.disclaimer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
