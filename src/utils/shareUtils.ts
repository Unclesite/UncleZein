import { Article } from '../data/siteData';

// Live App URL for this AI Studio instance
export const LIVE_APP_URL = 'https://ais-dev-buggbr34rwo4y5yq3ih2zv-962865382168.asia-east1.run.app';

/**
 * Returns the active, live base URL.
 * Uses window.location.origin directly whenever available so that whatever domain
 * the user is currently on (dev URL, custom domain, or shared app URL), the links
 * point to the actual working website that exists and loads.
 */
export const getPublicBaseUrl = (): string => {
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const { origin, hostname } = window.location;
    // If not local host and has a valid origin, use it directly
    if (origin && origin !== 'null' && !origin.startsWith('file:') && hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return origin;
    }
  }
  return LIVE_APP_URL;
};

/**
 * Generates a bulletproof, shareable permalink for an article.
 */
export const getArticleShareUrl = (article: Pick<Article, 'slug'>): string => {
  const base = getPublicBaseUrl();
  return `${base}/ideas?article=${encodeURIComponent(article.slug)}`;
};

/**
 * Formats WhatsApp share message with clean title and link.
 */
export const createWhatsAppShareUrl = (article: Pick<Article, 'title' | 'slug'>): string => {
  const shareUrl = getArticleShareUrl(article);
  const text = `*${article.title}*\n\nBaca tulisan selengkapnya di Uncle Zein:\n${shareUrl}`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
};

/**
 * Formats Twitter / X share link.
 */
export const createTwitterShareUrl = (article: Pick<Article, 'title' | 'slug'>): string => {
  const shareUrl = getArticleShareUrl(article);
  const text = `${article.title} — Uncle Zein`;
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
};
