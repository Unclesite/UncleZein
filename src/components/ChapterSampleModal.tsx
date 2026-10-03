import React from 'react';
import { X, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';
import { BookChapter } from '../data/siteData';

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
            <span>PRATINJAU BAB MONOGRAF</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono-code text-blue-400 font-bold uppercase">
              {chapter.number} · MENDOBRAK KEPALSUAN
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {chapter.title}
            </h3>
            <p className="text-sm text-slate-400 font-serif-title italic">
              {chapter.subtitle}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <span className="text-xs font-mono-code text-blue-400 uppercase">Sinopsis Tesis:</span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
              {chapter.summary}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-blue-950/20 border border-blue-500/20 space-y-2">
            <span className="text-xs font-mono-code text-emerald-400 uppercase font-semibold">
              Kesimpulan Inti (Core Takeaway):
            </span>
            <p className="text-base text-slate-100 font-serif-title italic leading-relaxed">
              "{chapter.keyTakeaway}"
            </p>
          </div>

          {/* Excerpt simulation */}
          <div className="space-y-4 text-slate-300 text-sm leading-relaxed border-t border-white/10 pt-6">
            <p>
              <em>Kutipan Pembuka:</em> "Bila sebuah keyakinan runtuh hanya karena kamu bertanya 'mengapa', maka keyakinan itu sejak awal dibangun di atas pasir hisap ketidaktahuan. Jangan pernah berterima kasih pada dogma yang menuntutmu mematikan akal budi."
            </p>
            <p>
              Untuk membaca ulasan lengkap dan bedah manuskrip pada bab ini (termasuk referensi filologi bahasa Semitik dan catatan kaki kritis), Anda dapat memesan edisi buku fisik lengkap.
            </p>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Tutup Pratinjau
            </button>

            <button
              onClick={() => {
                onClose();
                onOrder();
              }}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-sm"
            >
              <span>Pesan Buku Lengkap (468 Hal)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
