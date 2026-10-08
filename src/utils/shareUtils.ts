import { Article } from '../data/siteData';

// Public Shared App URL deployed on Cloud Run / AI Studio
export const PUBLIC_APP_URL = 'https://ais-pre-buggbr34rwo4y5yq3ih2zv-962865382168.asia-east1.run.app';

/**
 * Returns the public, globally accessible base URL.
 * Automatically converts internal AI Studio dev URLs ('ais-dev-') or localhost
 * to the publicly accessible Shared App URL ('ais-pre-') so links opened from
 * WhatsApp, Telegram, Twitter, etc. work seamlessly without requiring login or throwing 404.
 */
export const getPublicBaseUrl = (): string => {
  if (typeof window === 'undefined') {
    return PUBLIC_APP_URL;
  }

  const { hostname, origin } = window.location;

  // AI Studio internal development preview -> rewrite to public shared URL
  if (hostname.includes('ais-dev-')) {
    return origin.replace('ais-dev-', 'ais-pre-');
  }

  // Local development -> use public production URL so sharing to WhatsApp works
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0') {
    return PUBLIC_APP_URL;
  }

  // Already on public URL or custom domain
  return origin;
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
