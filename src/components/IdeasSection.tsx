import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Clock, Tag, ArrowRight, Bookmark, Filter, Check, Layers, Share2, Link2, MessageCircle } from 'lucide-react';
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
  const [copiedArticleId, setCopiedArticleId] = useState<string | null>(null);

  const categories = ['all', "Qur'an & Linguistics", "Qur'an & Philosophy", "Qur'an & Science", "Qur'an & Society", "Qur'an & Religion", "Qur'an & History", 'Filsafat', 'Sejarah', 'Kritik Teks', 'Pola Pikir', 'Eksistensial'];

  const getArticleShareUrl = (article: Article) => {
    if (typeof window === 'undefined') return `/ideas?article=${encodeURIComponent(article.slug)}`;
    return `${window.location.origin}/ideas?article=${encodeURIComponent(article.slug)}`;
  };

  const handleCopyLink = (e: React.MouseEvent, article: Article) => {
    e.stopPropagation();
    const shareUrl = getArticleShareUrl(article);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedArticleId(article.id);
        setTimeout(() => setCopiedArticleId(null), 2500);
      }).catch(() => {
        // fallback
        prompt('Salin link artikel ini:', shareUrl);
      });
    } else {
      prompt('Salin link artikel ini:', shareUrl);
    }
  };

  const handleWhatsAppShare = (e: React.MouseEvent, article: Article) => {
    e.stopPropagation();
    const shareUrl = getArticleShareUrl(article);
    const message = `${article.title}\n\nBaca artikel selengkapnya di Uncle Zein:\n${shareUrl}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = (e: React.MouseEvent, article: Article) => {
    e.stopPropagation();
    const shareUrl = getArticleShareUrl(article);
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.summary,
          url: shareUrl,
        })
        .catch(() => {
          handleCopyLink(e, article);
        });
      return;
    }
    handleCopyLink(e, article);
  };

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
    <section id="ideas" className="py-10 sm:py-24 relative">
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

                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display leading-snug">
                        <a
                          href={getArticleShareUrl(article)}
                          onClick={(e) => {
                            if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                              e.preventDefault();
                              onSelectArticle(article);
                            }
                          }}
                          className="text-white hover:text-blue-300 transition-colors cursor-pointer group-hover:text-blue-300 inline-block"
                        >
                          {article.title}
                        </a>
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

                      {/* Explicit Direct Shareable Link Box */}
                      <div className="pt-2 flex flex-wrap items-center gap-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono-code text-slate-300 group-hover:border-blue-500/30 transition-colors max-w-full overflow-hidden">
                          <Link2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span className="text-slate-400 shrink-0 text-[11px]">Link:</span>
                          <span className="truncate select-all text-blue-300 text-[11px] font-mono">
                            /ideas?article={article.slug}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleCopyLink(e, article)}
                            className="ml-1 px-2 py-0.5 rounded bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-white text-[11px] font-bold transition-all shrink-0 cursor-pointer"
                            title="Salin tautan langsung artikel"
                          >
                            {copiedArticleId === article.id ? (
                              <span className="text-emerald-400 font-bold flex items-center gap-1">
                                <Check className="w-3 h-3" /> Tersalin!
                              </span>
                            ) : (
                              'Salin'
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Tags List (Rendered as quiet text items) */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 font-mono-code pt-1">
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
                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2.5 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Direct Copy Link Button */}
                        <button
                          onClick={(e) => handleCopyLink(e, article)}
                          className={`px-3 py-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono-code ${
                            copiedArticleId === article.id
                              ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/50 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                              : 'text-slate-300 border-white/10 hover:text-white hover:bg-white/5 hover:border-slate-600'
                          }`}
                          title="Salin tautan langsung artikel ini untuk dibagikan"
                        >
                          {copiedArticleId === article.id ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-400" />
                              <span className="text-[11px]">Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Link2 className="w-4 h-4 text-blue-400" />
                              <span className="text-[11px]">Salin Link</span>
                            </>
                          )}
                        </button>

                        {/* WhatsApp Share Button */}
                        <button
                          onClick={(e) => handleWhatsAppShare(e, article)}
                          className="px-2.5 py-2 rounded-xl border border-white/10 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/20 hover:border-emerald-500/30 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono-code"
                          title="Bagikan langsung ke WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-[11px] hidden sm:inline">WA</span>
                        </button>

                        {/* Native Share Button */}
                        <button
                          onClick={(e) => handleNativeShare(e, article)}
                          className="p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                          title="Bagikan ke aplikasi lain"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>

                        {/* Save Bookmark */}
                        <button
                          onClick={() => onToggleSaveArticle(article.id)}
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            isSaved
                              ? 'bg-blue-600/20 text-blue-400 border-blue-500/40'
                              : 'text-slate-400 border-white/10 hover:text-white hover:bg-white/5'
                          }`}
                          title={isSaved ? 'Hapus dari daftar bacaan' : 'Simpan untuk dibaca nanti'}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      <a
                        href={getArticleShareUrl(article)}
                        onClick={(e) => {
                          if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                            e.preventDefault();
                            onSelectArticle(article);
                          }
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 text-xs font-semibold transition-all group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] cursor-pointer whitespace-nowrap"
                      >
                        <span>Baca Tuntas</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
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
