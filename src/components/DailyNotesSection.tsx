import React, { useState } from 'react';
import { BookMarked, Calendar, MapPin, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { DAILY_NOTES_DATA, DailyNote } from '../data/siteData';

interface DailyNotesSectionProps {
  onSelectNote: (note: DailyNote) => void;
}

export const DailyNotesSection: React.FC<DailyNotesSectionProps> = ({ onSelectNote }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Renungan', 'Observasi', 'Alam Liar', 'Catatan Lapangan'];

  const filteredNotes = selectedCategory === 'all'
    ? DAILY_NOTES_DATA
    : DAILY_NOTES_DATA.filter((n) => n.category === selectedCategory);

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 uppercase tracking-widest font-bold">
              <span>CATATAN HARIAN</span>
              <span aria-hidden="true">/</span>
              <span>SHORT NOTES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display">
              Notes<span className="text-blue-500">.</span>
            </h2>
            <p className="text-base text-slate-300 max-w-2xl font-light leading-relaxed">
              Catatan pendek yang lebih personal dan santai tentang hal-hal kecil yang terlintas sehari-hari.
            </p>
          </div>

          {/* Category Filter Pills (Functional Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat === 'all' ? 'Semua Catatan' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => onSelectNote(note)}
              className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-0.5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Meta Bar - Zero-Pill Discipline */}
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono-code">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 font-semibold">{note.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{note.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3 h-3 text-blue-400" />
                    <span>{note.location}</span>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors font-display">
                  {note.title}
                </h4>

                <p className="text-sm text-slate-300 leading-relaxed font-serif-title italic">
                  "{note.snippet}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono-code">Mood: {note.mood}</span>
                <span className="text-blue-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Baca Catatan Lengkap <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
