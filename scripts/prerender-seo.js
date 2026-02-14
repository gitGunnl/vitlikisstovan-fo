/**
 * Post-build prerender script.
 *
 * Generates per-route HTML files so every important page returns
 * crawlable HTML content on a plain HTTP fetch (no JavaScript needed).
 * Also generates sitemap.xml.
 *
 * Run after `vite build`:
 *   node scripts/prerender-seo.js
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist', 'public');
const DOMAIN = 'https://vitlikisstovan.fo';

// ---------------------------------------------------------------------------
// Per-page SEO configuration
// ---------------------------------------------------------------------------
const pages = [
  {
    path: '/',
    title: 'Vitlíkisstovan - Vitlíki til arbeiði í Føroyum',
    description: 'Vitlíki upplæring til øll á skrivstovuni og uttanfyri. Vitlíki ráðgeving og menning av vitlíki amboðum. Fyrsta vitlíkisfyritøkan í Føroyum.',
    // Home already has content in index.html seo-fallback
    skipContent: true,
  },
  {
    path: '/um-okkum',
    title: 'Um okkum - Vitlíkisstovan',
    description: 'Lær meira um Vitlíkisstovuna og okkara uppgávu at vegleiða føroyskar fyritøkur í vitlíki.',
    content: `
      <h1>Um Vitlíkisstovuna</h1>
      <p>Vitlíkisstovan er fyrsta vitlíkisfyritøkan í Føroyum. Vit veita praktiska vitlíkisvenjing og ráðgeving til føroyskar skrivstovur og stovnar.</p>
      <h2>Okkara søga</h2>
      <p>Vitlíkisstovan varð stovnað av Gunnleygi Clementsen, einum el-verkfrøðingi, sum síðani 2022 hevur brúkt vitlíki (AI) dagliga í sínum arbeiði. Fyrst sum verkfrøðingur í Danmark, og nú við at hjálpa føroyskum stovnum og fyritøkum at taka vitlíki til sín.</p>
      <h2>Okkara uppgáva</h2>
      <p>Vit hjálpa føroyskum fyritøkum og stovnum at skilja og brúka vitlíki á munagóðan og tryggan hátt. Málið er ikki einans at nýta nýggj amboð, men at betra arbeiðshættir og gera vitlíki til eitt gagnligt amboð í tykkara arbeiðsmentan.</p>
    `,
  },
  {
    path: '/okkara-taenastur',
    title: 'Tænastur - Vitlíkisstovan',
    description: 'Skeið, fyrilestrar, ráðgeving og serloysnir í vitlíki – alt bygt til føroyskar fyritøkur og stovnar.',
    content: `
      <h1>Okkara tænastur</h1>
      <p>Eg hjálpi við øllum, sum snýr seg um vitlíki. Skeið, fyrilestrar, ráðgeving og serloysnir – alt bygt til føroyskar fyritøkur og stovnar.</p>
      <h2>Skeið og verkstovur</h2>
      <p>12-viku vitlíkisskeið til skrivstovufólk. Hálvdags- og heildagsverkstovur. Skeiðsgongdir yvir fleiri dagar fyri stór toym.</p>
      <h2>Ráðgeving</h2>
      <p>Vitlíkistrategi, vegleiðing í vitlíki verkætlanar, og serloysnir til tykkara tørv.</p>
      <h2>Kreativt vitlíki</h2>
      <p>Myndir, heimasíður, filmar, tónleikur - alt mennt við vitlíki.</p>
      <h2>Framløgur</h2>
      <p>Framløgur um vitlíki og málrættaðar vitlíkisverkstovur. Visjónir og heildarætlanir fyri vitlíki.</p>
    `,
    jsonLd: {
      '@type': 'Service',
      name: 'Vitlíki ráðgeving og venjing',
      provider: { '@id': `${DOMAIN}/#organization` },
      description: 'Skeið, fyrilestrar, ráðgeving og serloysnir í vitlíki fyri føroyskar fyritøkur.',
      areaServed: { '@type': 'Country', name: 'Faroe Islands' },
    },
  },
  {
    path: '/contact',
    title: 'Samband - Vitlíkisstovan',
    description: 'Set teg í samband við Vitlíkisstovuna. Teldupostur: info@vitlikisstovan.fo. Telefon: +298 919444.',
    content: `
      <h1>Samband</h1>
      <p>Sig mær hvat tú hugsar, so sigi eg tær, hvussu vitlíki kann hjálpa.</p>
      <p>Teldupostur: <a href="mailto:info@vitlikisstovan.fo">info@vitlikisstovan.fo</a></p>
      <p>Telefon: <a href="tel:+298919444">+298 919444</a></p>
      <p>Allir spurningar eru vælkomnir. Antin tú hevur áhugað í skeiðnum, ráðgeving, íkast til eina kreativa verkætlan ella eitt fjórða - so svari eg tær áðrenn næsti gerandisdagur er lokin.</p>
    `,
  },
  {
    path: '/blog',
    title: 'Bloggur - Vitlíkisstovan',
    description: 'Les greinir um vitlíki (AI) í Føroyum. Vitlíkistíðindi, ráð og gransking.',
    content: `
      <h1>Bloggur</h1>
      <p>Les greinir um vitlíki (AI) í Føroyum.</p>
      <ul>
        <li><a href="/blog/vitliki-i-foroyum">Føroysk vitlíkismodell 2025: Hvørji eru tøk, hvussu væl rigga tey – og hvat kunnu tey brúkast til?</a></li>
        <li><a href="/blog/fra-vitlikisottan-til-vitlikisdirvi">Frá vitlíkisótta til vitlíkisdirvi: Hví førleikamenning nú er ein avgerandi íløga</a></li>
      </ul>
    `,
  },
  {
    path: '/blog/vitliki-i-foroyum',
    title: 'Føroysk vitlíkismodell 2025 - Vitlíkisstovan',
    description: 'Eitt skjótt yvirlit yvir føroysku modellini, meting av avrikum og ein hugleiðing um hvat eigur at mennast næst.',
    content: `
      <h1>Føroysk vitlíkismodell 2025: Hvørji eru tøk, hvussu væl rigga tey – og hvat kunnu tey brúkast til?</h1>
      <p>Eitt skjótt yvirlit yvir føroysku modellini, meting av avrikum og ein hugleiðing um hvat eigur at mennast næst — við greiðum stigum fyri fyritøkur og gransking.</p>
    `,
    jsonLd: {
      '@type': 'BlogPosting',
      headline: 'Føroysk vitlíkismodell 2025',
      author: { '@type': 'Person', name: 'Gunnleygur Clementsen' },
      publisher: { '@id': `${DOMAIN}/#organization` },
      inLanguage: 'fo',
    },
  },
  {
    path: '/blog/fra-vitlikisottan-til-vitlikisdirvi',
    title: 'Frá vitlíkisótta til vitlíkisdirvi - Vitlíkisstovan',
    description: 'Tøknin er bert amboðið — tann varandi vinningurin kemur frá fólkunum. Hví førleikamenning nú er ein avgerandi íløga.',
    content: `
      <h1>Frá vitlíkisótta til vitlíkisdirvi: Hví førleikamenning nú er ein avgerandi íløga</h1>
      <p>Umrøðan av vitlíki hoyrist nú allastaðni, í øllum vinnugreinum. Tøknin er bert amboðið — tann varandi ávirkanin kemur frá fólkunum, ið brúka og stýra tøknini.</p>
    `,
    jsonLd: {
      '@type': 'BlogPosting',
      headline: 'Frá vitlíkisótta til vitlíkisdirvi',
      author: { '@type': 'Person', name: 'Gunnleygur Clementsen' },
      publisher: { '@id': `${DOMAIN}/#organization` },
      inLanguage: 'fo',
    },
  },
  {
    path: '/tilarbeidis',
    title: 'Vitlíki til arbeiðis - Vitlíkisstovan',
    description: 'Verkætlanin "Vitlíki til arbeiðis" - vegleiðingar og tilfar til at hjálpa bólkum at koma gott ígongd við vitlíki.',
    content: `
      <h1>Vitlíki til arbeiðis</h1>
      <p>Verkætlanin "Vitlíki til arbeiðis" hevur til endamál at gera vegleiðingar, sum hjálpa ávísum bólkum at koma gott ígongd við vitlíki.</p>
    `,
  },
  {
    path: '/verkstova',
    title: 'Verkstova - Vitlíkisstovan',
    description: 'Handalig vitlíkisverkstova. Lær at brúka ChatGPT og onnur vitlíki-amboð í veruligum arbeiðsuppgávum.',
    content: `
      <h1>Verkstova</h1>
      <p>Hetta innihald er loyndarorðsverndað og er einans fyri skrásettar brúkarar.</p>
    `,
    noindex: true,
  },
  {
    path: '/podcast',
    title: 'Podkast - Vitlíkisstovan',
    description: 'Hoyr podkast um vitlíki í Føroyum. Umrøðan, greiðingar og ráð um vitlíki.',
    content: `
      <h1>Podkast</h1>
      <p>Hoyr podkast um vitlíki í Føroyum. Umrøðan, greiðingar og ráð um vitlíki.</p>
    `,
  },
  {
    path: '/ai-guide',
    title: 'Vitlíki vegleiðing - Vitlíkisstovan',
    description: 'Vegleiðing í vitlíki - lær at brúka vitlíki í arbeiði á einfaldan og greiðan hátt.',
    content: `
      <h1>Vitlíki vegleiðing</h1>
      <p>Lær at brúka vitlíki í arbeiði á einfaldan og greiðan hátt.</p>
    `,
  },
  {
    path: '/user-guides',
    title: 'Brúkaravegleiðingar - Vitlíkisstovan',
    description: 'Vegleiðingar og tilfar til at læra vitlíki. Fyri undirvísarar, umsorgarfólk og onnur.',
    content: `
      <h1>Brúkaravegleiðingar</h1>
      <p>Vegleiðingar og tilfar til at læra vitlíki.</p>
      <ul>
        <li><a href="/user-guides/getting-started">At koma ígongd</a></li>
        <li><a href="/user-guides/best-practices">Bestu mannagongdir</a></li>
        <li><a href="/user-guides/ai-for-kindergarten-guide">Vitlíki fyri barnagrunnar</a></li>
        <li><a href="/user-guides/ai-for-caretakers-guide">Vitlíki fyri umsorgarfólk</a></li>
      </ul>
    `,
  },
  {
    path: '/user-guides/getting-started',
    title: 'At koma ígongd við vitlíki - Vitlíkisstovan',
    description: 'Vegleiðing til at koma ígongd við vitlíki. Stig fyri stig.',
    content: `<h1>At koma ígongd við vitlíki</h1><p>Stig fyri stig vegleiðing til nýbyrjarar.</p>`,
  },
  {
    path: '/user-guides/best-practices',
    title: 'Bestu mannagongdir við vitlíki - Vitlíkisstovan',
    description: 'Bestu mannagongdir fyri at brúka vitlíki trygt og munagott.',
    content: `<h1>Bestu mannagongdir við vitlíki</h1><p>Ráð og vegleiðingar fyri at brúka vitlíki trygt og munagott.</p>`,
  },
  {
    path: '/user-guides/ai-for-kindergarten-guide',
    title: 'Vitlíki fyri barnagrunnar - Vitlíkisstovan',
    description: 'Vegleiðing til barnagrunnsfólk um hvussu vitlíki kann brúkast.',
    content: `<h1>Vitlíki fyri barnagrunnar</h1><p>Vegleiðing til barnagrunnsfólk um hvussu vitlíki kann brúkast.</p>`,
  },
  {
    path: '/user-guides/ai-for-caretakers-guide',
    title: 'Vitlíki fyri umsorgarfólk - Vitlíkisstovan',
    description: 'Vegleiðing til umsorgarfólk um hvussu vitlíki kann brúkast.',
    content: `<h1>Vitlíki fyri umsorgarfólk</h1><p>Vegleiðing til umsorgarfólk um hvussu vitlíki kann brúkast.</p>`,
  },
  {
    path: '/annad-fra-vitlikisstovuni',
    title: 'Annað frá Vitlíkisstovuni',
    description: 'Ymiskt tilfar og tíðindi frá Vitlíkisstovuni.',
    content: `<h1>Annað frá Vitlíkisstovuni</h1><p>Ymiskt tilfar og tíðindi frá Vitlíkisstovuni.</p>`,
  },
  {
    path: '/course-details',
    title: 'Skeiðsupplýsingar - Vitlíkisstovan',
    description: 'Nærri upplýsingar um vitlíkisskeið hjá Vitlíkisstovuni. Innihald, uppbygging og praktiskar upplýsingar.',
    content: `
      <h1>Skeiðsupplýsingar</h1>
      <p>Nærri upplýsingar um vitlíkisskeið hjá Vitlíkisstovuni. Innihald, uppbygging og praktiskar upplýsingar.</p>
    `,
  },
];

// ---------------------------------------------------------------------------
// Read base HTML template
// ---------------------------------------------------------------------------
function readTemplate() {
  const indexPath = join(DIST, 'index.html');
  if (!existsSync(indexPath)) {
    console.error('ERROR: dist/public/index.html not found. Run `vite build` first.');
    process.exit(1);
  }
  return readFileSync(indexPath, 'utf-8');
}

// ---------------------------------------------------------------------------
// Shared navigation and footer for sub-pages (same as homepage seo-fallback)
// ---------------------------------------------------------------------------
const NAV_HTML = `
      <header>
        <nav>
          <a href="/">Heim</a>
          <a href="/um-okkum">Um okkum</a>
          <a href="/okkara-taenastur">Okkara tænastur</a>
          <a href="/contact">Samband</a>
          <a href="/blog">Bloggur</a>
          <a href="/podcast">Podkast</a>
        </nav>
      </header>`;

const FOOTER_HTML = `
      <footer>
        <p>&copy; Vitlíkisstovan. Øll rættindi umsitin.</p>
        <a href="https://facebook.com/vitlikisstovan">Facebook</a>
        <a href="https://linkedin.com/company/vitlikisstovan">LinkedIn</a>
      </footer>`;

// ---------------------------------------------------------------------------
// Generate a page-specific HTML file
// ---------------------------------------------------------------------------
function generatePage(template, page) {
  let html = template;

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${page.title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${page.description}"`
  );

  // Replace canonical URL
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${DOMAIN}${page.path === '/' ? '' : page.path}"`
  );

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${page.title}"`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${page.description}"`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${DOMAIN}${page.path === '/' ? '' : page.path}"`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${page.title}"`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${page.description}"`
  );

  // Add noindex for private pages (e.g. /verkstova)
  if (page.noindex) {
    html = html.replace(
      '</head>',
      `  <meta name="robots" content="noindex, nofollow" />\n  </head>`
    );
  }

  // Inject page-specific content into seo-fallback (replace existing content)
  if (page.content && !page.skipContent) {
    const fallbackContent = `${NAV_HTML}\n      <main>${page.content}</main>${FOOTER_HTML}`;
    html = html.replace(
      /(<div id="seo-fallback">)([\s\S]*?)(<\/div>\s*<script>document\.getElementById\('seo-fallback'\))/,
      `$1${fallbackContent}\n    $3`
    );
  }

  // Add page-specific JSON-LD if present
  if (page.jsonLd) {
    const ldJson = JSON.stringify({
      '@context': 'https://schema.org',
      ...page.jsonLd,
      url: `${DOMAIN}${page.path}`,
    }, null, 2);
    html = html.replace(
      '</head>',
      `<script type="application/ld+json">${ldJson}</script>\n  </head>`
    );
  }

  return html;
}

// ---------------------------------------------------------------------------
// Generate sitemap.xml
// ---------------------------------------------------------------------------
function generateSitemap() {
  const now = new Date().toISOString().split('T')[0];
  const urls = pages.filter(p => !p.noindex).map(p => {
    const loc = p.path === '/' ? DOMAIN + '/' : DOMAIN + p.path;
    const priority = p.path === '/' ? '1.0' : p.path.includes('/blog/') ? '0.7' : '0.8';
    const changefreq = p.path.includes('/blog/') ? 'monthly' : 'weekly';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  console.log('🔍 SEO prerender: generating per-route HTML files...');

  const template = readTemplate();
  let count = 0;

  for (const page of pages) {
    const html = generatePage(template, page);

    if (page.path === '/') {
      // Home page — overwrite index.html in place
      writeFileSync(join(DIST, 'index.html'), html, 'utf-8');
    } else {
      // Create directory and write index.html (for /path/ requests)
      const dir = join(DIST, page.path.slice(1)); // remove leading /
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, 'index.html'), html, 'utf-8');

      // Also write a flat .html file (for /path requests on static hosts).
      // Replit static hosting rewrites clean URLs to these flat files.
      const parentDir = dirname(join(DIST, page.path.slice(1)));
      if (parentDir !== DIST) {
        mkdirSync(parentDir, { recursive: true });
      }
      writeFileSync(join(DIST, page.path.slice(1) + '.html'), html, 'utf-8');
    }
    count++;
  }

  // Write sitemap.xml
  writeFileSync(join(DIST, 'sitemap.xml'), generateSitemap(), 'utf-8');
  console.log(`✅ SEO prerender: wrote ${count} HTML files (directory + flat) + sitemap.xml`);
}

main();
