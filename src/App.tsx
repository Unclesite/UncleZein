/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { AboutSection } from './components/AboutSection';
import { DailyNotesSection } from './components/DailyNotesSection';
import { IdeasSection } from './components/IdeasSection';
import { ResearchLabSection } from './components/ResearchLabSection';
import { BooksSection } from './components/BooksSection';
import { MediaSection } from './components/MediaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import { DailyNoteModal } from './components/DailyNoteModal';
import { PassionDetailModal } from './components/PassionDetailModal';
import { ChapterSampleModal } from './components/ChapterSampleModal';
import { SearchModal } from './components/SearchModal';
import { LoginModal } from './components/LoginModal';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { Article, DailyNote, Passion, BookChapter, ARTICLES_DATA, BOOKS_DATA } from './data/siteData';
import { ShoppingBag, AlertCircle, X } from 'lucide-react';
import { getArticleShareUrl } from './utils/shareUtils';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(() => {
    try {
      const path = window.location.pathname.replace(/^\//, '').replace(/\.html$/, '');
      if (['ideas', 'research', 'books', 'media', 'about', 'contact'].includes(path)) {
        return path;
      }
    } catch {
      // ignore
    }
    return 'home';
  });

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedNote, setSelectedNote] = useState<DailyNote | null>(null);
  const [selectedPassion, setSelectedPassion] = useState<Passion | null>(null);
  const [selectedChapterSample, setSelectedChapterSample] = useState<BookChapter | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [showOrderToast, setShowOrderToast] = useState<boolean>(false);
  const [notFoundSlug, setNotFoundSlug] = useState<string | null>(null);

  // Saved Articles bookmark state with local storage
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('uz_saved_articles');
      return saved ? JSON.parse(saved) : ['art-malaikat-akar-bahasa-narasi', 'art-wahyu-makna-kata'];
    } catch {
      return ['art-malaikat-akar-bahasa-narasi', 'art-wahyu-makna-kata'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('uz_saved_articles', JSON.stringify(savedArticleIds));
    } catch {
      // ignore
    }
  }, [savedArticleIds]);

  // Handle browser back/forward buttons and initial deep linking for articles
  useEffect(() => {
    const syncRouteAndArticle = () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        let articleParam =
          searchParams.get('article') ||
          searchParams.get('id') ||
          searchParams.get('slug') ||
          searchParams.get('p');

        // Check if query params were passed inside hash e.g. /#ideas?article=slug or /#/?article=slug
        if (!articleParam && window.location.hash.includes('?')) {
          const hashQuery = window.location.hash.split('?')[1];
          const hashParams = new URLSearchParams(hashQuery);
          articleParam =
            hashParams.get('article') ||
            hashParams.get('id') ||
            hashParams.get('slug') ||
            hashParams.get('p');
        }

        const rawHash = window.location.hash.replace(/^#/, '');
        const pathParts = window.location.pathname.replace(/^\//, '').split('/');

        let targetSlug = articleParam || '';
        if (targetSlug) {
          try {
            targetSlug = decodeURIComponent(targetSlug);
          } catch {
            // ignore
          }
        }

        if (!targetSlug && (pathParts[0] === 'ideas' || pathParts[0] === 'article') && pathParts[1]) {
          try {
            targetSlug = decodeURIComponent(pathParts[1]);
          } catch {
            targetSlug = pathParts[1];
          }
        }

        if (!targetSlug && rawHash) {
          let cleanHash = rawHash.split('?')[0];
          if (cleanHash.startsWith('article-')) {
            cleanHash = cleanHash.replace('article-', '');
          } else if (cleanHash.startsWith('article/')) {
            cleanHash = cleanHash.replace('article/', '');
          } else if (cleanHash.startsWith('ideas/')) {
            cleanHash = cleanHash.replace('ideas/', '');
          }
          try {
            cleanHash = decodeURIComponent(cleanHash);
          } catch {
            // ignore
          }
          if (cleanHash && cleanHash !== 'ideas' && cleanHash !== 'home' && cleanHash !== 'research') {
            targetSlug = cleanHash;
          }
        }

        if (targetSlug) {
          const cleanTarget = targetSlug.replace(/[./\\_ -]+$/, '').trim();
          const normalizedTarget = cleanTarget
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

          let found = ARTICLES_DATA.find((a) => {
            const aSlugNorm = a.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            const aTitleNorm = a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            return (
              a.slug.toLowerCase() === cleanTarget.toLowerCase() ||
              a.id.toLowerCase() === cleanTarget.toLowerCase() ||
              a.id.toLowerCase() === `art-${cleanTarget.toLowerCase()}` ||
              aSlugNorm === normalizedTarget ||
              aTitleNorm === normalizedTarget
            );
          });

          // Fallback partial match if URL got truncated
          if (!found && normalizedTarget.length >= 4) {
            found = ARTICLES_DATA.find((a) => {
              const aSlugNorm = a.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return aSlugNorm.includes(normalizedTarget) || normalizedTarget.includes(aSlugNorm);
            });
          }

          if (found) {
            setSelectedArticle(found);
            setActiveTab('ideas');
            setNotFoundSlug(null);
            document.title = `${found.title} — Uncle Zein`;
            return;
          } else {
            // Slug was provided in link but article not found
            setNotFoundSlug(cleanTarget);
            setSelectedArticle(null);
            setActiveTab('ideas');
            document.title = 'Uncle Zein — Ideas';
            return;
          }
        } else {
          setSelectedArticle(null);
          setNotFoundSlug(null);
          document.title = 'Uncle Zein';
        }

        const rootPath = pathParts[0]?.replace(/\.html$/, '');
        if (['ideas', 'research', 'books', 'media', 'about', 'contact'].includes(rootPath)) {
          setActiveTab(rootPath);
        } else {
          setActiveTab('home');
        }
      } catch {
        // ignore
      }
    };

    syncRouteAndArticle();

    const handlePopState = () => {
      syncRouteAndArticle();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (tab: string, path?: string) => {
    setActiveTab(tab);
    setSelectedArticle(null);
    setNotFoundSlug(null);
    try {
      window.history.pushState({}, '', path || `/${tab === 'home' ? '' : tab}`);
      document.title = 'Uncle Zein';
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
    setNotFoundSlug(null);
    try {
      window.history.pushState(
        { articleSlug: article.slug },
        '',
        `/ideas?article=${encodeURIComponent(article.slug)}`
      );
      document.title = `${article.title} — Uncle Zein`;
    } catch {
      // ignore
    }
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    try {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has('article') || searchParams.has('slug') || searchParams.has('id')) {
        window.history.pushState({}, '', `/${activeTab === 'home' ? '' : activeTab}`);
      }
      document.title = 'Uncle Zein';
    } catch {
      // ignore
    }
  };

  const toggleSaveArticle = (id: string) => {
    setSavedArticleIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenArticleById = (articleId: string) => {
    const found = ARTICLES_DATA.find((a) => a.id === articleId);
    if (found) {
      handleOpenArticle(found);
    }
  };

  const handleOrderBook = () => {
    setShowOrderToast(true);
    setTimeout(() => {
      setShowOrderToast(false);
    }, 4000);

    handleNavigate('contact', '/contact');
  };

  // Keyboard shortcut Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#07090e] text-[#e2e8f0] selection:bg-blue-600/30 selection:text-blue-200">
      {/* Universal Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => handleNavigate(tab, `/${tab === 'home' ? '' : tab}`)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* Main Dynamic View Area */}
      <main className="pt-14 sm:pt-20">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenArticle={handleOpenArticle}
            onOpenNote={setSelectedNote}
          />
        )}

        {activeTab === 'ideas' && (
          <>
            {notFoundSlug && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-start justify-between gap-3 text-amber-200 shadow-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-300">Tautan Artikel Tidak Ditemukan</p>
                      <p className="text-xs text-amber-200/80 mt-0.5">
                        Artikel dengan rujukan <span className="font-mono bg-black/40 px-1.5 py-0.5 rounded text-amber-300">"{notFoundSlug}"</span> tidak ditemukan atau telah diperbarui. Silakan pilih dari arsip tulisan yang tersedia berikut:
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotFoundSlug(null)}
                    className="p-1 rounded-lg hover:bg-white/10 text-amber-300 transition-colors cursor-pointer"
                    title="Tutup pemberitahuan"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            <IdeasSection
              onSelectArticle={handleOpenArticle}
              savedArticleIds={savedArticleIds}
              onToggleSaveArticle={toggleSaveArticle}
            />
          </>
        )}

        {activeTab === 'research' && (
          <ResearchLabSection />
        )}

        {activeTab === 'books' && (
          <BooksSection
            onOpenSampleModal={setSelectedChapterSample}
            onOrderBook={handleOrderBook}
          />
        )}

        {activeTab === 'about' && (
          <div className="space-y-12">
            <AboutSection
              onSelectPassion={setSelectedPassion}
              onNavigate={handleNavigate}
            />
            <DailyNotesSection
              onSelectNote={setSelectedNote}
            />
          </div>
        )}

        {activeTab === 'media' && (
          <MediaSection />
        )}

        {activeTab === 'contact' && (
          <ContactSection />
        )}
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals */}
      <ArticleModal
        article={selectedArticle}
        onClose={handleCloseArticle}
        isSaved={selectedArticle ? savedArticleIds.includes(selectedArticle.id) : false}
        onToggleSave={() => selectedArticle && toggleSaveArticle(selectedArticle.id)}
      />

      <DailyNoteModal
        note={selectedNote}
        onClose={() => setSelectedNote(null)}
      />

      <PassionDetailModal
        passion={selectedPassion}
        onClose={() => setSelectedPassion(null)}
      />

      <ChapterSampleModal
        chapter={selectedChapterSample}
        onClose={() => setSelectedChapterSample(null)}
        onOrder={handleOrderBook}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={handleOpenArticle}
        onSelectNote={setSelectedNote}
        onSelectPassion={setSelectedPassion}
        onNavigate={handleNavigate}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      {/* Toast Feedback */}
      {showOrderToast && (
        <div className="fixed bottom-6 right-6 z-50 glass-card p-4 rounded-xl border border-blue-500/40 shadow-2xl bg-[#090c13] flex items-center gap-3 animate-fadeIn">
          <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <div className="font-bold text-white">Pemesanan Buku "Mendobrak Kepalsuan"</div>
            <div className="text-slate-400">Silakan lengkapi formulir di bawah untuk konfirmasi pengiriman.</div>
          </div>
        </div>
      )}
      {/* PWA Install Banner */}
      <PWAInstallBanner />
    </div>
  );
}
