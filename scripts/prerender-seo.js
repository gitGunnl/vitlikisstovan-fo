/**
 * Post-build prerender script.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist', 'public');
const BLOG_CONTENT_DIR = join(ROOT, 'client', 'src', 'content', 'blog');
const DOMAIN = 'https://vitlikisstovan.fo';

function extractField(source, fieldName) {
  const pattern = new RegExp(`${fieldName}:\\s*(["'])([\\s\\S]*?)\\1,`);
  const match = source.match(pattern);
  return match ? match[2] : '';
}

function extractTemplateField(source, fieldName) {
  const pattern = new RegExp(`${fieldName}:\\s*` + '`([\\s\\S]*?)`\\s*,');
  const match = source.match(pattern);
  return match ? match[1].trim() : '';
}

function loadBlogPosts() {
  const files = readdirSync(BLOG_CONTENT_DIR)
    .filter((file) => file.endsWith('.ts') && file !== 'index.ts')
    .sort();

  return files.map((file) => {
    const source = readFileSync(join(BLOG_CONTENT_DIR, file), 'utf-8');
    const title = extractField(source, 'title');
    const slug = extractField(source, 'slug');
    const excerpt = extractField(source, 'excerpt');
    const description = extractField(source, 'description') || excerpt;
    const date = extractField(source, 'date') || new Date().toISOString().split('T')[0];
    const author = extractField(source, 'author') || 'Vitlíkisstovan';
    const content = extractTemplateField(source, 'content');

    return {
      title,
      slug,
      excerpt,
      description,
      date,
      author,
      content,
      path: `/blog/${slug}`,
      pageTitle: `${title} - Vitlíkisstovan`,
    };
  });
}

const blogPosts = loadBlogPosts();

const staticPages = [
  {
    path: '/',
    title: 'Vitlíkisstovan - Vitlíki til arbeiði í Føroyum',
    description: 'Vitlíki upplæring til øll á skrivstovuni og uttanfyri. Vitlíki ráðgeving og menning av vitlíki amboðum. Fyrsta vitlíkisfyritøkan í Føroyum.',
    skipContent: true,
  },
  {
    path: '/um-okkum',
    title: 'Um okkum - Vitlíkisstovan',
    description: 'Lær meira um Vitlíkisstovuna og okkara uppgávu at vegleiða føroyskar fyritøkur í vitlíki.',
    content: '<h1>Um Vitlíkisstovuna</h1><p>Vitlíkisstovan er fyrsta vitlíkisfyritøkan í Føroyum.</p>',
  },
  {
    path: '/okkara-taenastur',
    title: 'Tænastur - Vitlíkisstovan',
    description: 'Skeið, fyrilestrar, ráðgeving og serloysnir í vitlíki – alt bygt til føroyskar fyritøkur og stovnar.',
    content: '<h1>Okkara tænastur</h1><p>Skeið, ráðgeving og serloysnir í vitlíki.</p>',
  },
  {
    path: '/contact',
    title: 'Samband - Vitlíkisstovan',
    description: 'Set teg í samband við Vitlíkisstovuna. Teldupostur: info@vitlikisstovan.fo. Telefon: +298 919444.',
    content: '<h1>Samband</h1><p>Set teg í samband við okkum.</p>',
  },
  {
    path: '/blog',
    title: 'Bloggur - Vitlíkisstovan',
    description: 'Les greinir um vitlíki (AI) í Føroyum. Vitlíkistíðindi, ráð og gransking.',
    content: `
      <h1>Bloggur</h1>
      <p>Les greinir um vitlíki (AI) í Føroyum.</p>
      <ul>
        ${blogPosts.map((post) => `<li><a href="/blog/${post.slug}">${post.title}</a><p>${post.excerpt}</p></li>`).join('')}
      </ul>
    `,
  },
  {
    path: '/tilarbeidis',
    title: 'Vitlíki til arbeiðis - Vitlíkisstovan',
    description: 'Verkætlanin "Vitlíki til arbeiðis" - vegleiðingar og tilfar til at hjálpa bólkum at koma gott ígongd við vitlíki.',
    content: '<h1>Vitlíki til arbeiðis</h1>',
  },
  {
    path: '/verkstova',
    title: 'Verkstova - Vitlíkisstovan',
    description: 'Handalig vitlíkisverkstova. Lær at brúka ChatGPT og onnur vitlíki-amboð í veruligum arbeiðsuppgávum.',
    content: '<h1>Verkstova</h1><p>Hetta innihald er loyndarorðsverndað og er einans fyri skrásettar brúkarar.</p>',
    noindex: true,
  },
  { path: '/podcast', title: 'Podkast - Vitlíkisstovan', description: 'Hoyr podkast um vitlíki í Føroyum.', content: '<h1>Podkast</h1>' },
  { path: '/ai-guide', title: 'Vitlíki vegleiðing - Vitlíkisstovan', description: 'Vegleiðing í vitlíki.', content: '<h1>Vitlíki vegleiðing</h1>' },
  { path: '/user-guides', title: 'Brúkaravegleiðingar - Vitlíkisstovan', description: 'Vegleiðingar og tilfar.', content: '<h1>Brúkaravegleiðingar</h1>' },
  { path: '/user-guides/getting-started', title: 'At koma ígongd við vitlíki - Vitlíkisstovan', description: 'Vegleiðing til at koma ígongd.', content: '<h1>At koma ígongd við vitlíki</h1>' },
  { path: '/user-guides/best-practices', title: 'Bestu mannagongdir við vitlíki - Vitlíkisstovan', description: 'Bestu mannagongdir fyri at brúka vitlíki.', content: '<h1>Bestu mannagongdir</h1>' },
  { path: '/user-guides/ai-for-kindergarten-guide', title: 'Vitlíki fyri barnagrunnar - Vitlíkisstovan', description: 'Vegleiðing til barnagrunnsfólk.', content: '<h1>Vitlíki fyri barnagrunnar</h1>' },
  { path: '/user-guides/ai-for-caretakers-guide', title: 'Vitlíki fyri umsorgarfólk - Vitlíkisstovan', description: 'Vegleiðing til umsorgarfólk.', content: '<h1>Vitlíki fyri umsorgarfólk</h1>' },
  { path: '/annad-fra-vitlikisstovuni', title: 'Annað frá Vitlíkisstovuni', description: 'Ymiskt tilfar og tíðindi.', content: '<h1>Annað frá Vitlíkisstovuni</h1>' },
  { path: '/course-details', title: 'Skeiðsupplýsingar - Vitlíkisstovan', description: 'Nærri upplýsingar um vitlíkisskeið.', content: '<h1>Skeiðsupplýsingar</h1>' },
];

const blogPages = blogPosts.map((post) => ({
  path: post.path,
  title: post.pageTitle,
  description: post.description,
  content: `<h1>${post.title}</h1>${post.content}`,
  jsonLd: {
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@id': `${DOMAIN}/#organization` },
    datePublished: post.date,
    inLanguage: 'fo',
  },
}));

const pages = [...staticPages, ...blogPages];

function readTemplate() {
  const indexPath = join(DIST, 'index.html');
  if (!existsSync(indexPath)) {
    console.error('ERROR: dist/public/index.html not found. Run `vite build` first.');
    process.exit(1);
  }
  return readFileSync(indexPath, 'utf-8');
}

const NAV_HTML = `<header><nav><a href="/">Heim</a><a href="/um-okkum">Um okkum</a><a href="/okkara-taenastur">Okkara tænastur</a><a href="/contact">Samband</a><a href="/blog">Bloggur</a><a href="/podcast">Podkast</a></nav></header>`;
const FOOTER_HTML = `<footer><p>&copy; Vitlíkisstovan. Øll rættindi umsitin.</p></footer>`;

function generatePage(template, page) {
  let html = template;
  const pageUrl = `${DOMAIN}${page.path === '/' ? '' : page.path}`;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${page.description}"`);
  html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${pageUrl}"`);
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${page.title}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${page.description}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${pageUrl}"`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${page.title}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${page.description}"`);

  if (page.noindex) {
    html = html.replace('</head>', `  <meta name="robots" content="noindex, nofollow" />\n  </head>`);
  }

  if (page.content && !page.skipContent) {
    const fallbackContent = `${NAV_HTML}<main>${page.content}</main>${FOOTER_HTML}`;
    html = html.replace(/(<div id="seo-fallback">)([\s\S]*?)(<\/div>\s*<script>document\.getElementById\('seo-fallback'\))/, `$1${fallbackContent}\n    $3`);
  }

  if (page.jsonLd) {
    const ldJson = JSON.stringify({ '@context': 'https://schema.org', ...page.jsonLd, url: pageUrl }, null, 2);
    html = html.replace('</head>', `<script type="application/ld+json">${ldJson}</script>\n  </head>`);
  }

  return html;
}

function generateSitemap() {
  const now = new Date().toISOString().split('T')[0];
  const urls = pages
    .filter((page) => !page.noindex)
    .map((page) => {
      const loc = page.path === '/' ? `${DOMAIN}/` : `${DOMAIN}${page.path}`;
      const priority = page.path === '/' ? '1.0' : page.path.includes('/blog/') ? '0.7' : '0.8';
      const changefreq = page.path.includes('/blog/') ? 'monthly' : 'weekly';
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
}

function main() {
  const template = readTemplate();

  for (const page of pages) {
    const html = generatePage(template, page);

    if (page.path === '/') {
      writeFileSync(join(DIST, 'index.html'), html, 'utf-8');
      continue;
    }

    const dir = join(DIST, page.path.slice(1));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html, 'utf-8');

    const parentDir = dirname(join(DIST, page.path.slice(1)));
    if (parentDir !== DIST) {
      mkdirSync(parentDir, { recursive: true });
    }
    writeFileSync(join(DIST, `${page.path.slice(1)}.html`), html, 'utf-8');
  }

  writeFileSync(join(DIST, 'sitemap.xml'), generateSitemap(), 'utf-8');
  console.log(`✅ SEO prerender: wrote ${pages.length} routes + sitemap.xml`);
}

main();
