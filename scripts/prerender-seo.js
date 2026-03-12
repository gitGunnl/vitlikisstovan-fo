/**
 * Post-build prerender script.
 * Reads content from client/src/content/site.ts (single source of truth)
 * and generates static HTML for crawlers/LLMs.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist', 'public');
const BLOG_CONTENT_DIR = join(ROOT, 'client', 'src', 'content', 'blog');
const SITE_TS_PATH = join(ROOT, 'client', 'src', 'content', 'site.ts');

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function loadSiteConfig() {
  const source = readFileSync(SITE_TS_PATH, 'utf-8');
  const match = source.match(/export\s+const\s+siteConfig\s*=\s*([\s\S]+)/);
  if (!match) {
    console.error('ERROR: Could not find siteConfig export in site.ts');
    process.exit(1);
  }
  let objectLiteral = match[1].replace(/;\s*$/, '');
  try {
    return new Function('return ' + objectLiteral)();
  } catch (err) {
    console.error('ERROR: Failed to parse siteConfig from site.ts:', err.message);
    process.exit(1);
  }
}

const siteConfig = loadSiteConfig();
const DOMAIN = `https://${siteConfig.domain}`;

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
    const author = extractField(source, 'author') || siteConfig.siteName;
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
      pageTitle: `${title} - ${siteConfig.siteName}`,
    };
  });
}

function buildHomepageFallback() {
  const c = siteConfig;
  const heroSlide = c.hero.slides[0];

  let html = `<h1>${c.siteName} - ${c.tagline}</h1>`;
  html += `<p>${heroSlide.title} ${heroSlide.subtitle}</p>`;

  html += `<section>`;
  html += `<h2>${c.program.title}</h2>`;
  html += `<p>${c.program.subtitle}</p>`;

  html += `<h3>${c.program.whatWeDeliver.title}</h3><ul>`;
  for (const item of c.program.whatWeDeliver.items) {
    html += `<li><strong>${item.title}</strong> - ${item.description}</li>`;
  }
  html += `</ul>`;

  html += `<h3>${c.program.howItWorks.title}</h3><ol>`;
  for (const step of c.program.howItWorks.steps) {
    html += `<li><strong>${step.title}</strong> - ${step.description}</li>`;
  }
  html += `</ol>`;

  html += `<h3>${c.program.delivery.title}</h3><ul>`;
  for (const item of c.program.delivery.items) {
    html += `<li><strong>${item.title}</strong> - ${item.description}</li>`;
  }
  html += `</ul>`;
  html += `</section>`;

  html += `<section>`;
  html += `<h2>${c.consulting.title}</h2>`;
  html += `<p>${c.consulting.subtitle}</p><ul>`;
  for (const svc of c.consulting.services) {
    html += `<li><strong>${svc.title}</strong> - ${svc.description}</li>`;
  }
  html += `</ul></section>`;

  html += `<section>`;
  html += `<h2>${c.why.title}</h2>`;
  html += `<p>${c.why.subtitle}</p><ul>`;
  for (const feat of c.why.features) {
    html += `<li><strong>${feat.title}</strong> - ${feat.description}</li>`;
  }
  html += `</ul>`;
  html += `<h3>${c.why.founder.heading}</h3>`;
  html += `<p><strong>${c.why.founder.name}</strong> - ${c.why.founder.role}. ${c.why.founder.summary}</p>`;
  html += `</section>`;

  html += `<section>`;
  html += `<h2>${c.cases.title}</h2><ul>`;
  for (const h of c.cases.highlights) {
    html += `<li><strong>${h.title}</strong> - ${h.description}</li>`;
  }
  html += `</ul></section>`;

  html += `<section>`;
  html += `<h2>${c.contact.title}</h2>`;
  html += `<p>${c.contact.subtitle}</p>`;
  html += `<p>Teldupostur: <a href="mailto:${c.contact.email}">${c.contact.email}</a></p>`;
  html += `<p>Telefon: <a href="tel:${c.contact.phone.replace(/\s/g, '')}">${c.contact.phone}</a></p>`;
  html += `</section>`;

  return html;
}

function buildNavLinks() {
  const links = siteConfig.nav.links.map((l) => `<a href="${l.href}">${l.label}</a>`).join('');
  return links + `<a href="/blog">Bloggur</a><a href="/podcast">Podkast</a>`;
}

const blogPosts = loadBlogPosts();

const NAV_HTML = `<header><nav>${buildNavLinks()}</nav></header>`;
const FOOTER_HTML = `<footer><p>&copy; ${siteConfig.siteName}. Øll rættindi umsitin.</p>${siteConfig.social.facebook ? `<a href="${siteConfig.social.facebook}">Facebook</a>` : ''}${siteConfig.social.linkedin ? `<a href="${siteConfig.social.linkedin}">LinkedIn</a>` : ''}</footer>`;

function buildPageContent(path) {
  const c = siteConfig;
  const seo = c.seoPages[path];
  if (!seo) return `<h1>${path}</h1>`;

  switch (path) {
    case '/':
      return buildHomepageFallback();
    case '/um-okkum':
      return `<h1>${seo.title}</h1><p>${c.why.subtitle}</p>`;
    case '/okkara-taenastur':
      return `<h1>${seo.title}</h1><p>${c.consulting.subtitle}</p>`;
    case '/contact':
      return `<h1>${seo.title}</h1><p>${c.contact.subtitle}</p><p>Teldupostur: <a href="mailto:${c.contact.email}">${c.contact.email}</a></p><p>Telefon: <a href="tel:${c.contact.phone.replace(/\s/g, '')}">${c.contact.phone}</a></p>`;
    case '/blog':
      return `<h1>${seo.title}</h1><p>${seo.description}</p><ul>${blogPosts.map((post) => `<li><a href="/blog/${post.slug}">${post.title}</a><p>${post.excerpt}</p></li>`).join('')}</ul>`;
    case '/verkstova':
      return `<h1>${seo.title}</h1><p>${seo.description}</p>`;
    default:
      return `<h1>${seo.title}</h1>`;
  }
}

const staticPages = Object.entries(siteConfig.seoPages).map(([path, seo]) => ({
  path,
  title: seo.title,
  description: seo.description,
  content: buildPageContent(path),
  ...(seo.noindex ? { noindex: true } : {}),
}));

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

function generatePage(template, page) {
  let html = template;
  const pageUrl = `${DOMAIN}${page.path === '/' ? '' : page.path}`;

  const safeTitle = escapeAttr(page.title);
  const safeDesc = escapeAttr(page.description);
  const safeUrl = escapeAttr(pageUrl);

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${safeDesc}"`);
  html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${safeUrl}"`);
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${safeTitle}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${safeDesc}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${safeUrl}"`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${safeTitle}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${safeDesc}"`);

  if (page.noindex) {
    html = html.replace('</head>', `  <meta name="robots" content="noindex, nofollow" />\n  </head>`);
  }

  if (page.content) {
    const fallbackContent = `${NAV_HTML}<main>${page.content}</main>${FOOTER_HTML}`;
    const marker = '<!-- SEO_CONTENT_PLACEHOLDER -->';
    if (!html.includes(marker)) {
      console.error(`ERROR: SEO_CONTENT_PLACEHOLDER marker not found in template for ${page.path}`);
      process.exit(1);
    }
    html = html.replace(marker, fallbackContent);
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
  console.log(`📖 Loading site config from ${SITE_TS_PATH}`);
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
  console.log(`✅ SEO prerender: wrote ${pages.length} routes + sitemap.xml (content from site.ts)`);
}

main();
