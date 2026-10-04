import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Clock, Tag, ArrowRight, Bookmark, Filter, Check, Layers } from 'lucide-react';
import { ARTICLES_DATA, Article } from '../data/siteData';

interface IdeasSectionProps {
  onSelectArticle: (article: Article) => void;
  savedArticleIds: string[];
  onToggleSaveArticle: (articleId: string) => void;
}

export const IdeasSection: React.FC<IdeasSectionProps> = ({
  onSelectArticle,
  savedArticleIds,
  onToggleSaveArticle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const categories = ['all', "Qur'an & Society", "Qur'an & Religion", "Qur'an & History", 'Filsafat', 'Sejarah', 'Kritik Teks', 'Pola Pikir', 'Eksistensial'];

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.mainTerm && article.mainTerm.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchesSaved = !showSavedOnly || savedArticleIds.includes(article.id);

      return matchesSearch && matchesCategory && matchesSaved;
    });
  }, [searchQuery, selectedCategory, showSavedOnly, savedArticleIds]);

  return (
    <section id="ideas" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 uppercase tracking-widest font-bold">
            <span>02</span>
            <span aria-hidden="true">/</span>
            <span>TULISAN & ESAI</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
            Tulisan, Catatan, dan Esai
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Tulisan, catatan, dan esai tentang berbagai hal yang sedang dipikirkan—dari teks keagamaan, sejarah, sains, hingga sudut pandang sehari-hari.
          </p>
        </div>

        {/* Guiding Principle Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-blue-950/20 border border-blue-500/30 flex items-start gap-3.5">
          <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 shrink-0 animate-pulse" />
          <p className="text-sm sm:text-base text-slate-200 font-serif-title italic leading-relaxed">
            “Membaca dan mencari tahu bukan untuk mencari pembenaran, melainkan untuk melihat berbagai hal dengan lebih terbuka.”
          </p>
        </div>

        {/* Dynamic Search & Filter Bar */}
        <div className="p-4 sm:p-5 rounded-2xl glass-card border border-white/10 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari esai, topik (e.g. Wahyu, Epistemologi, Mitos, Naskah)..."
                className="w-full pl-11 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Bookmark Filter Toggle */}
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                showSavedOnly
                  ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                  : 'bg-black/30 border-white/10 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-current' : ''}`} />
              <span>Tersimpan ({savedArticleIds.length})</span>
            </button>
          </div>

          {/* Category Selector Tabs (Segmented Controls) */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
            <span className="text-xs text-slate-400 font-mono-code mr-1">Filter Kategori:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat === 'all' ? 'Semua Topik' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 glass-card rounded-2xl border border-white/5 space-y-3">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
              <h4 className="text-base font-semibold text-white">Tidak Ada Artikel Ditemukan</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Coba sesuaikan kata kunci pencarian atau ubah filter kategori di atas.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setShowSavedOnly(false);
                }}
                className="mt-2 text-xs text-blue-400 hover:underline"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            filteredArticles.map((article) => {
              const isSaved = savedArticleIds.includes(article.id);
              return (
                <article
                  key={article.id}
                  className={`glass-card rounded-2xl p-6 sm:p-8 border transition-all duration-300 group relative ${
                    article.featured ? 'border-blue-500/40 glow-blue bg-blue-950/[0.07]' : 'border-white/10 hover:border-blue-500/40'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-3 flex-1">
                      {/* Zero-Pill Metadata */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono-code">
                        {article.essayNumber && (
                          <>
                            <span className="text-white font-bold">{article.essayNumber}</span>
                            <span aria-hidden="true">·</span>
                          </>
                        )}
                        <span className="text-blue-400 font-semibold">{article.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{article.date}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime}</span>
                        </span>
                        {article.evidenceLevel && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-amber-400">Level: {article.evidenceLevel}</span>
                          </>
                        )}
                        {article.featured && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-cyan-400 font-semibold">Featured Monograph</span>
                          </>
                        )}
                      </div>

                      <h3
                        onClick={() => onSelectArticle(article)}
                        className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-blue-300 transition-colors font-display cursor-pointer leading-snug"
                      >
                        {article.title}
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                        {article.summary}
                      </p>

                      {/* Main term highlight if available */}
                      {article.mainTerm && (
                        <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400 pt-1">
                          <span>Akar Kata / Istilah Kunci:</span>
                          <span className="text-blue-400 font-semibold">{article.mainTerm}</span>
                        </div>
                      )}

                      {/* Tags List (Rendered as quiet text items) */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 font-mono-code pt-2">
                        <span>Topik:</span>
                        {article.tags.map((tag, idx) => (
                          <span key={tag}>
                            #{tag}
                            {idx < article.tags.length - 1 ? ' · ' : ''}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                      <button
                        onClick={() => onToggleSaveArticle(article.id)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                          isSaved
                            ? 'bg-blue-600/20 text-blue-400 border-blue-500/40'
                            : 'text-slate-400 border-white/10 hover:text-white hover:bg-white/5'
                        }`}
                        title={isSaved ? 'Hapus dari daftar bacaan' : 'Simpan untuk dibaca nanti'}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={() => onSelectArticle(article)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 text-xs font-semibold transition-all group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] cursor-pointer whitespace-nowrap"
                      >
                        <span>Baca Tuntas (25 Poin)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
