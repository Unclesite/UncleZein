import React from 'react';
import { X, MapPin, Calendar, BookMarked, ArrowLeft, Quote } from 'lucide-react';
import { DailyNote } from '../data/siteData';

interface DailyNoteModalProps {
  note: DailyNote | null;
  onClose: () => void;
}

export const DailyNoteModal: React.FC<DailyNoteModalProps> = ({ note, onClose }) => {
  if (!note) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-[#090c13] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#07090e]/80 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400">
            <BookMarked className="w-4 h-4" />
            <span>CATATAN HARIAN & JURNAL</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-slate-400">
              <span className="text-blue-400 font-semibold">{note.category}</span>
              <span aria-hidden="true">·</span>
              <span>{note.date}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3 h-3 text-blue-400" />
                {note.location}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              {note.title}
            </h3>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 relative">
            <Quote className="w-8 h-8 text-blue-500/20 absolute top-4 right-4" />
            <p className="text-base sm:text-lg text-slate-200 font-serif-title italic leading-relaxed">
              "{note.snippet}"
            </p>
          </div>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            <p>{note.fullNote}</p>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono-code text-slate-400">
            <span>Kondisi Batin: {note.mood}</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
            >
              Tutup Catatan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
