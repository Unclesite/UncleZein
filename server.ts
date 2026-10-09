import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { ARTICLES_DATA } from './src/data/siteData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

// Helper to escape HTML characters
const escapeHtml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

// Serve static assets with caching headers
app.use(
  express.static(distPath, {
    maxAge: '1d',
    index: false,
  })
);

// Fallback for root and all SPA routes (/ideas, /ideas?article=..., /article/..., etc.)
app.get('*', (req, res) => {
  if (!fs.existsSync(indexPath)) {
    return res.status(200).send(`
      <!doctype html>
      <html lang="id">
        <head>
          <meta charset="UTF-8" />
          <title>Uncle Zein</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="background:#07090e;color:#e2e8f0;font-family:sans-serif;padding:2rem;text-align:center;">
          <h1>Uncle Zein</h1>
          <p>Aplikasi sedang disiapkan. Silakan muat ulang beberapa saat lagi.</p>
        </body>
      </html>
    `);
  }

  let html = fs.readFileSync(indexPath, 'utf-8');

  // Check if an article is being requested via query param or path
  const articleParam =
    (req.query.article as string) ||
    (req.query.slug as string) ||
    (req.query.id as string) ||
    (req.path.startsWith('/ideas/') ? req.path.replace(/^\/ideas\//, '') : '') ||
    (req.path.startsWith('/article/') ? req.path.replace(/^\/article\//, '') : '');

  if (articleParam) {
    try {
      const decodedParam = decodeURIComponent(articleParam);
      const cleanParam = decodedParam
        .toLowerCase()
        .replace(/[./\\_ -]+/g, '-')
        .replace(/^-+|-+$/g, '');

      let found = ARTICLES_DATA.find((a) => {
        const normSlug = a.slug.toLowerCase().replace(/[./\\_ -]+/g, '-');
        const normTitle = a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const matchAlias = a.aliases?.some((al) => {
          const normAl = al.toLowerCase().replace(/[./\\_ -]+/g, '-');
          return normAl === cleanParam || normAl.includes(cleanParam) || cleanParam.includes(normAl);
        });
        return (
          normSlug === cleanParam ||
          normTitle === cleanParam ||
          a.id.toLowerCase() === cleanParam ||
          a.id.toLowerCase() === `art-${cleanParam}` ||
          normSlug.includes(cleanParam) ||
          cleanParam.includes(normSlug) ||
          normTitle.includes(cleanParam) ||
          Boolean(matchAlias)
        );
      });

      if (!found && cleanParam.length >= 3) {
        const searchWords = cleanParam.split('-').filter((w) => w.length >= 3);
        if (searchWords.length > 0) {
          found = ARTICLES_DATA.find((a) => {
            const combined = `${a.slug} ${a.title} ${(a.aliases || []).join(' ')}`.toLowerCase();
            return searchWords.every((w) => combined.includes(w));
          });
        }
      }

      if (found) {
        const pageTitle = `${escapeHtml(found.title)} — Uncle Zein`;
        const pageDesc = escapeHtml(found.summary);
        const host = req.get('host') || 'ais-dev-buggbr34rwo4y5yq3ih2zv-962865382168.asia-east1.run.app';
        const protocol = req.protocol === 'http' && !host.includes('localhost') ? 'https' : req.protocol;
        const articleUrl = `${protocol}://${host}/ideas?article=${encodeURIComponent(found.slug)}`;

        // Replace metadata for WhatsApp, Facebook, Twitter link previews
        html = html
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

        if (!html.includes('property="og:url"')) {
          html = html.replace(
            '</head>',
            `  <meta property="og:url" content="${articleUrl}" />\n  </head>`
          );
        }
      }
    } catch {
      // ignore parse errors and serve index.html
    }
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.send(html);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Uncle Zein server running on http://0.0.0.0:${PORT}`);
});
