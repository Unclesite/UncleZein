import React from 'react';
import { X, BookOpen, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';
import { BookChapter, BOOKS_DATA } from '../data/siteData';

interface ChapterSampleModalProps {
  chapter: BookChapter | null;
  onClose: () => void;
  onOrder: () => void;
}

export const ChapterSampleModal: React.FC<ChapterSampleModalProps> = ({
  chapter,
  onClose,
  onOrder,
}) => {
  if (!chapter) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-[#090c13] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#07090e]/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400">
            <BookOpen className="w-4 h-4" />
            <span>PRATINJAU BAB // {BOOKS_DATA.bookNumber}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono-code text-blue-400 font-bold uppercase">
              {chapter.number} · {BOOKS_DATA.title}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
              {chapter.title}
            </h3>
            <p className="text-sm text-slate-300 font-serif-title italic">
              {chapter.subtitle}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <span className="text-xs font-mono-code text-blue-400 uppercase font-bold">Ringkasan Topik Bab:</span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
              {chapter.summary || `Pembahasan mendalam pada ${chapter.number} mengenai "${chapter.title}" yang menelaah bukti-bukti primer dari biologi reproduksi, dialektika teks Al-Qur'an, dan historiografi Palestina abad pertama.`}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/30 space-y-2">
            <span className="text-xs font-mono-code text-blue-400 uppercase font-bold">
              Prinsip Metodologis:
            </span>
            <p className="text-sm text-slate-200 font-serif-title italic leading-relaxed">
              «Hipotesis tidak boleh menyamar sebagai fakta. Sumber primer dibaca terlebih dahulu, kemudian dibandingkan dengan literatur akademik, sejarah, linguistik, biologi, dan tradisi penafsiran.»
            </p>
          </div>

          {/* Excerpt note */}
          <div className="space-y-3 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-white/10 pt-4">
            <p className="italic">
              {BOOKS_DATA.disclaimer}
            </p>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer font-mono-code"
            >
              Tutup Pratinjau
            </button>

            <a
              href="https://unclezein.com/books"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono-code font-bold uppercase flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Kunjungi unclezein.com/books</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
