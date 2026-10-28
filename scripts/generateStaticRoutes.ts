import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ARTICLES_DATA } from '../src/data/siteData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');
const indexPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('[Error] dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, 'utf-8');

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

// 1. Create main section folders (so Hostinger LiteSpeed serves HTTP 200 on /ideas, /article, etc.)
const sections = ['ideas', 'article', 'research', 'books', 'media', 'about', 'contact'];

sections.forEach((sec) => {
  const dir = path.join(distPath, sec);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const sectionHtml = baseHtml.replace(
    '</head>',
    `  <script>window.__INITIAL_TAB__ = "${sec}";</script>\n  </head>`
  );
  fs.writeFileSync(path.join(dir, 'index.html'), sectionHtml, 'utf-8');
});

console.log(`[Success] Generated physical static routes for: ${sections.join(', ')}`);

// 2. Create physical static HTML files for every article
// Both /article/[slug]/index.html and /ideas/[slug]/index.html
let articleCount = 0;

ARTICLES_DATA.forEach((article) => {
  const pageTitle = `${escapeHtml(article.title)} — Uncle Zein`;
  const pageDesc = escapeHtml(article.summary);
  const articleUrl = `https://unclezein.com/ideas?article=${encodeURIComponent(article.slug)}`;

  let articleHtml = baseHtml
    .replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`)
    .replace(
      /<meta property="og:title" content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${pageTitle}" />`
    )
    .replace(
      /<meta property="og:description" content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${pageDesc}" />`
    )
    .replace(
      /<meta name="description" content=".*?"\s*\/?>/i,
      `<meta name="description" content="${pageDesc}" />`
    );

  if (!articleHtml.includes('property="og:url"')) {
    articleHtml = articleHtml.replace(
      '</head>',
      `  <meta property="og:url" content="${articleUrl}" />\n  <link rel="canonical" href="${articleUrl}" />\n  <script>window.__PRELOADED_ARTICLE_SLUG__ = "${article.slug}";</script>\n  </head>`
    );
  } else {
    articleHtml = articleHtml
      .replace(
        /<meta property="og:url" content=".*?"\s*\/?>/i,
        `<meta property="og:url" content="${articleUrl}" />`
      )
      .replace(
        '</head>',
        `  <link rel="canonical" href="${articleUrl}" />\n  <script>window.__PRELOADED_ARTICLE_SLUG__ = "${article.slug}";</script>\n  </head>`
      );
  }

  // Write to /article/[slug]/index.html
  const articleDir = path.join(distPath, 'article', article.slug);
  if (!fs.existsSync(articleDir)) {
    fs.mkdirSync(articleDir, { recursive: true });
  }
  fs.writeFileSync(path.join(articleDir, 'index.html'), articleHtml, 'utf-8');

  // Also write to /ideas/[slug]/index.html
  const ideasSlugDir = path.join(distPath, 'ideas', article.slug);
  if (!fs.existsSync(ideasSlugDir)) {
    fs.mkdirSync(ideasSlugDir, { recursive: true });
  }
  fs.writeFileSync(path.join(ideasSlugDir, 'index.html'), articleHtml, 'utf-8');

  articleCount++;
});

console.log(`[Success] Generated ${articleCount} pre-rendered article pages for Instagram/social media crawlers & static web servers.`);

// 3. Ensure .htaccess exists in dist
const htaccessSource = path.resolve(__dirname, '../public/.htaccess');
const htaccessDest = path.join(distPath, '.htaccess');
if (fs.existsSync(htaccessSource)) {
  fs.copyFileSync(htaccessSource, htaccessDest);
  console.log('[Success] Copied .htaccess to dist/.htaccess');
}

// 4. Ensure 404.html exists in dist
const notFoundSource = path.resolve(__dirname, '../public/404.html');
const notFoundDest = path.join(distPath, '404.html');
if (fs.existsSync(notFoundSource)) {
  fs.copyFileSync(notFoundSource, notFoundDest);
  console.log('[Success] Copied 404.html to dist/404.html');
}
