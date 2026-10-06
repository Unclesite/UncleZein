import React, { useState, useRef, useEffect } from 'react';
import { X, Clock, Bookmark, Share2, Check, ArrowLeft, Layers, Sparkles, CheckCircle2, HelpCircle, ShieldAlert, ListOrdered, ChevronRight, Type, Eye, BookOpen, Link2, MessageCircle } from 'lucide-react';
import { Article } from '../data/siteData';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

type ReadingTheme = 'obsidian' | 'sepia' | 'midnight';
type FontSize = 'compact' | 'comfortable' | 'spacious';

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<ReadingTheme>('obsidian');
  const [fontSize, setFontSize] = useState<FontSize>('comfortable');
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const totalScroll = scrollHeight - clientHeight;
        if (totalScroll > 0) {
          setScrollProgress((scrollTop / totalScroll) * 100);
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [article]);

  if (!article) return null;

  const handleShare = () => {
    const articleUrl = `${window.location.origin}/ideas?article=${encodeURIComponent(article.slug)}`;
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: articleUrl,
      }).catch(() => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(articleUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        }
      });
      return;
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    if (!article) return;
    const articleUrl = `${window.location.origin}/ideas?article=${encodeURIComponent(article.slug)}`;
    const msg = `${article.title}\n\nBaca tulisan ini di Uncle Zein:\n${articleUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const handleTwitterShare = () => {
    if (!article) return;
    const articleUrl = `${window.location.origin}/ideas?article=${encodeURIComponent(article.slug)}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ESTABLISHED':
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      case 'PROBABLE':
        return 'text-blue-400 bg-blue-950/40 border-blue-500/30';
      case 'HYPOTHESIS':
        return 'text-amber-400 bg-amber-950/40 border-amber-500/30';
      case 'RESEARCH QUESTION':
        return 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30';
      default:
        return 'text-slate-400 bg-slate-900 border-white/10';
    }
  };

  const scrollToHeading = (text: string) => {
    const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'sepia':
        return {
          wrapper: 'bg-[#120f0d] text-[#d6c7b2]',
          header: 'bg-[#0f0c0a]/95 border-[#2c241e]',
          prose: 'text-[#e2d5c3]',
          card: 'bg-[#1a1512] border-[#2e2620]',
          accent: 'text-[#e5a968]',
          accentBg: 'bg-[#2b1f15]',
        };
      case 'midnight':
        return {
          wrapper: 'bg-[#070d18] text-[#cbd5e1]',
          header: 'bg-[#050912]/95 border-[#172554]/40',
          prose: 'text-[#e2e8f0]',
          card: 'bg-[#0c1527] border-[#1e293b]',
          accent: 'text-[#60a5fa]',
          accentBg: 'bg-[#1e3a8a]/20',
        };
      case 'obsidian':
      default:
        return {
          wrapper: 'bg-[#07090e] text-[#cbd5e1]',
          header: 'bg-[#05070b]/95 border-white/10',
          prose: 'text-[#e2e8f0]',
          card: 'bg-white/[0.02] border-white/10',
          accent: 'text-blue-400',
          accentBg: 'bg-blue-950/20',
        };
    }
  };

  const getFontSizeStyles = () => {
    switch (fontSize) {
      case 'compact':
        return 'text-[15px] leading-[1.75]';
      case 'spacious':
        return 'text-[18px] sm:text-[19px] leading-[1.95] tracking-[0.01em]';
      case 'comfortable':
      default:
        return 'text-[16px] sm:text-[17px] leading-[1.85] tracking-[0.005em]';
    }
  };

  const themeStyles = getThemeStyles();

  const renderTable = (tableMarkdown: string, key: number) => {
    const lines = tableMarkdown.trim().split('\n').filter(Boolean);
    if (lines.length < 2) return null;

    const parseRow = (row: string) =>
      row
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim());

    const headerCells = parseRow(lines[0]);
    const bodyRows = lines.slice(2).map(parseRow);

    return (
      <div key={key} className="overflow-x-auto my-8 rounded-2xl border border-white/10 shadow-lg bg-black/40">
        <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
          <thead>
            <tr className="border-b border-white/15 bg-white/[0.05] text-slate-300 font-mono-code">
              {headerCells.map((h, i) => (
                <th key={i} className="py-3.5 px-4 font-bold tracking-wide">
                  {h.replace(/\*\*/g, '')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {bodyRows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-white/[0.03] transition-colors">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="py-3.5 px-4 text-slate-200">
                    {cell.startsWith('**') && cell.endsWith('**') ? (
                      <strong className="text-white font-semibold">{cell.replace(/\*\*/g, '')}</strong>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTableOfContents = (content: string, key: number) => {
    const lines = content
      .split('\n')
      .filter((l) => /^\s*(\d+\.|-)\s+/.test(l.trim()));

    return (
      <div key={key} className={`my-10 rounded-2xl border p-6 sm:p-8 shadow-xl space-y-5 ${themeStyles.card}`}>
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border border-blue-500/30 ${themeStyles.accentBg}`}>
              <ListOrdered className={`w-4 h-4 ${themeStyles.accent}`} />
            </div>
            <div>
              <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-200">
                DAFTAR ISI & PETA STRUKTUR RISALAH
              </h4>
              <p className="text-[11px] text-slate-400">Pilih bagian untuk langsung melompat ke pembahasan</p>
            </div>
          </div>
          <span className="text-[11px] font-mono-code text-blue-400 hidden sm:inline font-semibold">
            {lines.length} Butir Pembahasan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {lines.map((line, idx) => {
            const cleanText = line.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '');
            const parts = cleanText.split('—');
            const mainTitle = parts[0]?.replace(/\*\*/g, '').trim() || cleanText;
            const subtitle = parts[1]?.trim();

            return (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToHeading(mainTitle)}
                className="text-left p-3.5 rounded-xl bg-white/[0.02] hover:bg-blue-600/15 border border-white/5 hover:border-blue-500/40 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="space-y-0.5 pr-2">
                  <div className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-blue-300 transition-colors line-clamp-1">
                    {mainTitle}
                  </div>
                  {subtitle && (
                    <div className="text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors line-clamp-1">
                      {subtitle}
                    </div>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0 ml-1" />
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Container */}
      <div className={`relative w-full max-w-4xl rounded-2xl border overflow-hidden shadow-2xl max-h-[94vh] flex flex-col transition-colors duration-300 ${themeStyles.wrapper} border-white/10`}>
        {/* Reading Progress Indicator Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-50">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Modal Top Control Bar */}
        <div className={`px-4 sm:px-8 py-3 border-b backdrop-blur-md shrink-0 space-y-2.5 sm:space-y-0 ${themeStyles.header}`}>
          <div className="flex items-center justify-between gap-2">
            {/* Back Button */}
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 py-1.5 px-2.5 -ml-1 text-xs font-semibold text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-blue-400" />
              <span className="font-mono-code font-bold text-slate-200 text-xs">KEMBALI</span>
            </button>

            {/* Desktop Center: Reading Preferences on sm+ */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Theme Selector */}
              <div className="flex items-center p-1 bg-white/5 rounded-xl border border-white/10 gap-1">
                <button
                  onClick={() => setTheme('obsidian')}
                  className={`px-2.5 py-1 text-[11px] font-mono-code rounded-lg transition-all cursor-pointer ${
                    theme === 'obsidian' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Tema Obsidian Dark"
                >
                  Dark
                </button>
                <button
                  onClick={() => setTheme('sepia')}
                  className={`px-2.5 py-1 text-[11px] font-mono-code rounded-lg transition-all cursor-pointer ${
                    theme === 'sepia' ? 'bg-[#b8864e] text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Tema Warm Sepia"
                >
                  Sepia
                </button>
                <button
                  onClick={() => setTheme('midnight')}
                  className={`px-2.5 py-1 text-[11px] font-mono-code rounded-lg transition-all cursor-pointer ${
                    theme === 'midnight' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Tema Midnight Blue"
                >
                  Midnight
                </button>
              </div>

              {/* Font Size Selector */}
              <div className="flex items-center p-1 bg-white/5 rounded-xl border border-white/10 gap-0.5">
                <button
                  onClick={() => setFontSize('compact')}
                  className={`px-2.5 py-1 text-[11px] font-mono-code rounded-lg transition-all cursor-pointer ${
                    fontSize === 'compact' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Ukuran Font Kompak (15px)"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('comfortable')}
                  className={`px-2.5 py-1 text-[11px] font-mono-code rounded-lg transition-all cursor-pointer ${
                    fontSize === 'comfortable' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Ukuran Font Nyaman (17px)"
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('spacious')}
                  className={`px-2.5 py-1 text-[11px] font-mono-code rounded-lg transition-all cursor-pointer ${
                    fontSize === 'spacious' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Ukuran Font Besar (19px)"
                >
                  A++
                </button>
              </div>
            </div>

            {/* Right: Actions ALWAYS Visible & Prominent */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Save Bookmark */}
              <button
                onClick={onToggleSave}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer text-xs font-mono-code font-semibold ${
                  isSaved
                    ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                    : 'text-slate-300 border-white/10 hover:text-white bg-white/5 hover:bg-white/10'
                }`}
                title={isSaved ? 'Tersimpan di Bookmark' : 'Simpan Bacaan'}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-white' : 'text-blue-400'}`} />
                <span className="hidden xs:inline sm:inline">{isSaved ? 'Tersimpan' : 'Simpan'}</span>
              </button>

              {/* Share Link */}
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-300 border border-white/10 hover:text-white bg-white/5 hover:bg-white/10 transition-all cursor-pointer text-xs font-mono-code font-semibold"
                title="Salin Tautan"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-blue-400" />
                    <span className="hidden xs:inline sm:inline">Bagikan</span>
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/10 cursor-pointer ml-1"
                title="Tutup Modal"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Reading Controls Sub-Bar (visible on screens < sm) */}
          <div className="flex sm:hidden items-center justify-between gap-2 pt-2 border-t border-white/10">
            {/* Mobile Theme Selector */}
            <div className="flex items-center p-0.5 bg-white/5 rounded-lg border border-white/10 gap-0.5">
              <button
                onClick={() => setTheme('obsidian')}
                className={`px-2.5 py-1 text-[11px] font-mono-code rounded transition-all cursor-pointer ${
                  theme === 'obsidian' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`px-2.5 py-1 text-[11px] font-mono-code rounded transition-all cursor-pointer ${
                  theme === 'sepia' ? 'bg-[#b8864e] text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sepia
              </button>
              <button
                onClick={() => setTheme('midnight')}
                className={`px-2.5 py-1 text-[11px] font-mono-code rounded transition-all cursor-pointer ${
                  theme === 'midnight' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Midnight
              </button>
            </div>

            {/* Mobile Font Size Selector */}
            <div className="flex items-center p-0.5 bg-white/5 rounded-lg border border-white/10 gap-0.5">
              <button
                onClick={() => setFontSize('compact')}
                className={`px-2.5 py-1 text-[11px] font-mono-code rounded transition-all cursor-pointer ${
                  fontSize === 'compact' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('comfortable')}
                className={`px-2.5 py-1 text-[11px] font-mono-code rounded transition-all cursor-pointer ${
                  fontSize === 'comfortable' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('spacious')}
                className={`px-2.5 py-1 text-[11px] font-mono-code rounded transition-all cursor-pointer ${
                  fontSize === 'spacious' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                A++
              </button>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div
          ref={scrollContainerRef}
          className="p-6 sm:p-10 md:p-14 overflow-y-auto space-y-10 focus:outline-none"
        >
          {/* Article Header & Editorial Title */}
          <div className="space-y-5 max-w-3xl mx-auto">
            {/* Meta tags strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-slate-400">
                {article.essayNumber && (
                  <>
                    <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">{article.essayNumber}</span>
                    <span aria-hidden="true">·</span>
                  </>
                )}
                <span className={`${themeStyles.accent} font-semibold`}>{article.category}</span>
                <span aria-hidden="true">·</span>
                <span>{article.date}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime}</span>
                </span>
              </div>

              {article.evidenceLevel && (
                <div className="flex items-center gap-2 text-xs font-mono-code">
                  <span className="text-slate-400">Evidence Level:</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold">
                    {article.evidenceLevel}
                  </span>
                </div>
              )}
            </div>

            {/* Evidence Note Banner */}
            {article.evidenceNote && (
              <div className="p-4 rounded-xl bg-amber-950/25 border border-amber-500/30 text-xs text-amber-200/95 leading-relaxed font-sans shadow-sm">
                <strong className="font-semibold">Catatan Level Bukti:</strong> {article.evidenceNote}
              </div>
            )}

            {/* Field & Main Term metadata */}
            {(article.field || article.mainTerm) && (
              <div className="flex flex-wrap items-center gap-5 text-xs font-mono-code text-slate-400 bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                {article.field && (
                  <div>
                    <span className="text-slate-400">Bidang:</span> <span className="text-slate-200 font-semibold">{article.field}</span>
                  </div>
                )}
                {article.mainTerm && (
                  <div>
                    <span className="text-slate-400">Istilah Kunci:</span> <span className={`${themeStyles.accent} font-bold text-sm tracking-wide`}>{article.mainTerm}</span>
                  </div>
                )}
              </div>
            )}

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display leading-[1.12] tracking-tight text-balance">
              {article.title}
            </h1>

            {/* Direct Share Link Bar */}
            <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono-code">
              <div className="flex items-center gap-2 truncate text-slate-400">
                <span className="text-blue-400 font-semibold shrink-0">LINK ARTIKEL:</span>
                <span className="truncate select-all text-slate-300">
                  {typeof window !== 'undefined' ? `${window.location.origin}/ideas?article=${encodeURIComponent(article.slug)}` : `/ideas?article=${article.slug}`}
                </span>
              </div>
              <button
                onClick={handleShare}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 transition-all cursor-pointer font-bold"
                title="Salin tautan artikel ke clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Salin Link</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-base sm:text-lg text-slate-300 font-light italic border-l-3 border-blue-500 pl-5 py-1.5 leading-relaxed bg-white/[0.01] rounded-r-lg">
              {article.summary}
            </p>
          </div>

          {/* Article Prose Content (Editorial Flow with optimal measure & spacing) */}
          <div className={`max-w-3xl mx-auto space-y-7 border-t border-white/10 pt-10 font-sans ${themeStyles.prose} ${getFontSizeStyles()}`}>
            {article.content.split('\n\n').map((paragraph, index) => {
              // Table of Contents block detection
              if (
                paragraph.toLowerCase().includes('### daftar isi') ||
                paragraph.toLowerCase().includes('### daftar isi risalah') ||
                paragraph.toLowerCase().startsWith('daftar isi')
              ) {
                return renderTableOfContents(paragraph, index);
              }

              // Markdown Table block detection
              if (paragraph.trim().startsWith('|') && paragraph.includes('\n|')) {
                return renderTable(paragraph, index);
              }

              // Section H2
              if (paragraph.startsWith('## ')) {
                const headingText = paragraph.replace('## ', '');
                const slug = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return (
                  <div key={index} id={slug} className="pt-10 pb-2 scroll-mt-20 border-b border-white/10">
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance leading-snug">
                      {headingText}
                    </h2>
                  </div>
                );
              }

              // Section H3
              if (paragraph.startsWith('### ')) {
                const headingText = paragraph.replace('### ', '');
                const slug = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return (
                  <h3
                    key={index}
                    id={slug}
                    className={`text-xl sm:text-2xl font-bold font-display pt-6 scroll-mt-20 leading-snug ${themeStyles.accent}`}
                  >
                    {headingText}
                  </h3>
                );
              }

              // Blockquotes
              if (paragraph.startsWith('> ')) {
                const quoteLines = paragraph
                  .split('\n')
                  .map((l) => l.replace(/^>\s*/, ''))
                  .join('\n');

                return (
                  <div key={index} className="p-5 sm:p-6 rounded-2xl bg-blue-950/25 border-l-4 border-blue-500 text-slate-100 font-sans my-6 shadow-md space-y-2">
                    {quoteLines.split('\n').map((qLine, qIdx) => (
                      <p key={qIdx} className="italic leading-relaxed">
                        {qLine}
                      </p>
                    ))}
                  </div>
                );
              }

              // Code / Diagram Blocks
              if (paragraph.startsWith('```')) {
                const codeContent = paragraph.replace(/^```[a-z]*\n?/, '').replace(/\n?```$/, '');
                return (
                  <div key={index} className="my-6 rounded-2xl bg-black/60 border border-white/15 p-4 sm:p-6 overflow-x-auto shadow-xl">
                    <pre className="text-xs sm:text-sm font-mono-code text-blue-300 leading-relaxed tracking-normal">
                      {codeContent}
                    </pre>
                  </div>
                );
              }

              // Horizontal Divider
              if (paragraph.startsWith('---')) {
                return <hr key={index} className="border-white/10 my-10" />;
              }

              // Unordered Lists
              if (paragraph.startsWith('- ')) {
                const listItems = paragraph.split('\n').filter(Boolean);
                return (
                  <ul key={index} className="space-y-3 pl-5 list-disc marker:text-blue-400 my-4">
                    {listItems.map((li, liIdx) => (
                      <li key={liIdx} className="leading-relaxed">
                        {li.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Section Headings like "1. TITIK TOLAK..." or "1.1 Pendahuluan"
              if (/^\d+(\.\d+)*\.\s+[A-Z\u0600-\u06FF]/.test(paragraph) && !paragraph.includes('\n')) {
                const headingText = paragraph.trim();
                const slug = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return (
                  <div key={index} id={slug} className="pt-8 pb-2 scroll-mt-20 border-b border-white/10">
                    <h3 className={`text-xl sm:text-2xl font-bold font-display tracking-tight text-white ${themeStyles.accent}`}>
                      {headingText}
                    </h3>
                  </div>
                );
              }

              // Math / Formula calculation block
              if (paragraph.includes('\\text{') || paragraph.includes('\\overline{')) {
                return (
                  <div key={index} className="my-6 p-5 sm:p-6 rounded-2xl bg-blue-950/30 border border-blue-500/30 font-mono-code text-sm sm:text-base text-blue-200 overflow-x-auto shadow-lg space-y-2">
                    {paragraph.split('\n').map((mLine, mIdx) => {
                      const cleanMath = mLine
                        .replace(/\\text\{([^}]+)\}/g, '$1')
                        .replace(/\\overline\{([^}]+)\}/g, '──────── $1 ────────')
                        .trim();
                      return cleanMath ? (
                        <div key={mIdx} className="font-semibold tracking-wide">
                          {cleanMath}
                        </div>
                      ) : null;
                    })}
                  </div>
                );
              }

              // Numbered Lists
              if (/^\d+\.\s/.test(paragraph)) {
                const listItems = paragraph.split('\n').filter(Boolean);
                return (
                  <ol key={index} className="space-y-3.5 pl-6 list-decimal marker:text-blue-400 font-mono-code text-xs my-4">
                    {listItems.map((li, liIdx) => (
                      <li key={liIdx} className={`leading-relaxed font-sans ${getFontSizeStyles()} ${themeStyles.prose}`}>
                        {li.replace(/^\d+\.\s*/, '')}
                      </li>
                    ))}
                  </ol>
                );
              }

              // Standard Paragraph with generous line height and paragraph breathing room
              return (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Status Penelitian Table */}
          {article.researchStatusTable && article.researchStatusTable.length > 0 && (
            <div className="max-w-3xl mx-auto space-y-4 pt-10 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 uppercase tracking-wider font-bold">
                <Layers className="w-4 h-4" />
                <span>Status Penelitian & Validasi Bukti</span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-xl">
                <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
                  <thead>
                    <tr className="border-b border-white/15 bg-white/[0.05] text-slate-300 font-mono-code">
                      <th className="p-4 w-44 font-bold">Status Metodologis</th>
                      <th className="p-4 font-bold">Pernyataan & Kesimpulan Riset</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {article.researchStatusTable.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/[0.03] transition-colors">
                        <td className="p-4 align-top">
                          <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-mono-code font-bold border ${getStatusBadge(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="p-4 text-slate-200 leading-relaxed">
                          {row.statement}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sign-off Banner */}
          {article.signOff && (
            <div className="max-w-3xl mx-auto p-7 rounded-2xl bg-gradient-to-r from-blue-950/50 via-slate-900 to-black border border-blue-500/40 text-center space-y-2 shadow-2xl">
              <p className="text-sm sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-200 font-mono-code tracking-wide">
                "{article.signOff}"
              </p>
            </div>
          )}

          {/* Bagikan Tulisan Ini Card */}
          <div className="max-w-3xl mx-auto p-6 rounded-2xl glass-card border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-blue-400" />
                  <span>Bagikan Tulisan Ini</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Tautan langsung untuk membagikan naskah ini kepada rekan atau media sosial:
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleWhatsAppShare}
                  className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 text-xs font-mono-code font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Bagikan ke WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={handleTwitterShare}
                  className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-mono-code font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Bagikan ke X / Twitter"
                >
                  <span>X / Twitter</span>
                </button>
              </div>
            </div>

            {/* Direct Link Input with One-Click Copy */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-black/60 border border-white/10">
              <Link2 className="w-4 h-4 text-blue-400 shrink-0 ml-2" />
              <input
                type="text"
                readOnly
                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/ideas?article=${article.slug}`}
                className="bg-transparent text-xs font-mono-code text-blue-200 select-all w-full focus:outline-none"
              />
              <button
                onClick={handleShare}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono-code tracking-wide shrink-0 transition-all cursor-pointer ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                {copied ? 'Tersalin! ✓' : 'Salin Link'}
              </button>
            </div>
          </div>

          {/* Bottom Footer Tags & Finished Reading Action */}
          <div className="max-w-3xl mx-auto pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-slate-400">
              <span>Topik:</span>
              {article.tags.map((t) => (
                <span key={t} className="text-slate-300 bg-white/5 px-2 py-0.5 rounded">
                  #{t}
                </span>
              ))}
            </div>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wide shadow-lg hover:shadow-blue-500/25 transition-all cursor-pointer"
            >
              Selesai Membaca
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
