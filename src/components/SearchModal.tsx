import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, BookMarked, Compass, ArrowRight, Layers } from 'lucide-react';
import { ARTICLES_DATA, DAILY_NOTES_DATA, PASSIONS_DATA, BOOKS_DATA, Article, DailyNote, Passion } from '../data/siteData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  onSelectNote: (note: DailyNote) => void;
  onSelectPassion: (passion: Passion) => void;
  onNavigate: (tab: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
  onSelectNote,
  onSelectPassion,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // toggle search handled externally
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const matchedArticles = ARTICLES_DATA.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.summary.toLowerCase().includes(query.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const matchedNotes = DAILY_NOTES_DATA.filter(
    (n) =>
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.snippet.toLowerCase().includes(query.toLowerCase()) ||
      n.category.toLowerCase().includes(query.toLowerCase())
  );

  const matchedPassions = PASSIONS_DATA.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  const matchedChapters = BOOKS_DATA.chapters.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      (c.summary && c.summary.toLowerCase().includes(query.toLowerCase()))
  );

  const totalResults =
    (query ? matchedArticles.length + matchedNotes.length + matchedPassions.length + matchedChapters.length : 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 pt-20 animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-[#090c13] flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-6 py-4 border-b border-white/10 bg-[#07090e]/80 shrink-0">
          <Search className="w-5 h-5 text-blue-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari naskah, ide, catatan harian, passion, atau bab buku..."
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs text-slate-400 hover:text-white mr-3">
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!query ? (
            <div className="space-y-4">
              <div className="text-xs font-mono-code text-slate-400 uppercase">
                Pencarian Populer:
              </div>
              <div className="flex flex-wrap gap-2">
                {['Epistemologi', 'Isa / Yesus Ayah Kandung', 'Spearfishing', 'Naskah Kuno P46', 'Mendobrak Kepalsuan', 'Keraguan Sehat'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 border border-white/5 transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <p className="text-sm text-white">Tidak ada hasil untuk "{query}"</p>
              <p className="text-xs">Coba kata kunci lain atau periksa ejaan.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Articles */}
              {matchedArticles.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-mono-code text-blue-400 uppercase flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Esai & Pemikiran ({matchedArticles.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedArticles.map((art) => (
                      <button
                        key={art.id}
                        onClick={() => {
                          onClose();
                          onSelectArticle(art);
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-blue-300">
                            {art.title}
                          </div>
                          <div className="text-xs text-slate-400">{art.category} · {art.readTime}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Daily Notes */}
              {matchedNotes.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-mono-code text-blue-400 uppercase flex items-center gap-1.5">
                    <BookMarked className="w-3.5 h-3.5" />
                    <span>Catatan Harian ({matchedNotes.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedNotes.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => {
                          onClose();
                          onSelectNote(n);
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-blue-300">
                            {n.title}
                          </div>
                          <div className="text-xs text-slate-400">{n.category} · {n.location}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Passions */}
              {matchedPassions.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-mono-code text-blue-400 uppercase flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Personal Passions ({matchedPassions.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedPassions.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onClose();
                          onSelectPassion(p);
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-blue-300">
                            {p.title}
                          </div>
                          <div className="text-xs text-slate-400">{p.subtitle}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Book Chapters */}
              {matchedChapters.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-mono-code text-blue-400 uppercase flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Bab Buku Mendobrak Kepalsuan ({matchedChapters.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedChapters.map((c) => (
                      <button
                        key={c.number}
                        onClick={() => {
                          onClose();
                          onNavigate('books');
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-blue-300">
                            {c.number}: {c.title}
                          </div>
                          <div className="text-xs text-slate-400">{c.subtitle}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#07090e]/80 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
          <span>Tekan ESC untuk menutup</span>
          <span>Index Universal Uncle Zein</span>
        </div>
      </div>
    </div>
  );
};
