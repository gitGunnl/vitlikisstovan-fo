/**
 * Post-build prerender step.
 *
 * Auto-discovers SEO modules at `client/src/content/seo/**\/*.seo.ts`.
 * Each module's default export is either a single PageSeo or an array of them.
 *
 * Outputs:
 *   - dist/public/<route>/index.html   (with title/description/canonical/OG/Twitter
 *     meta tags rewritten and a body fallback for crawlers/LLMs)
 *   - dist/public/<route>.html         (flat sibling for hosts that prefer it)
 *   - dist/public/sitemap.xml
 *
 * Coverage check: every <Route path="..."> in client/src/App.tsx must have a
 * matching SEO entry, otherwise the build fails. This means: when you add a
 * new page, you can't forget to give it a real prerendered shell.
 */

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
} from "fs";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { glob } from "glob";

import type { PageSeo } from "../client/src/content/seo/_types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist", "public");
const SEO_DIR = join(ROOT, "client", "src", "content", "seo");
const APP_TSX = join(ROOT, "client", "src", "App.tsx");
const SITE_TS = join(ROOT, "client", "src", "content", "site.ts");

function escapeAttr(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeXml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Escape a JSON payload so it is safe to embed inside a <script> tag.
 * Without this, a value containing "</script>" would break out of the script
 * context — a classic JSON-in-script injection sink.
 */
function escapeJsonForScript(json: string): string {
  return json
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

async function loadSeoModules(): Promise<PageSeo[]> {
  const files = await glob("**/*.seo.ts", {
    cwd: SEO_DIR,
    absolute: true,
  });
  const out: PageSeo[] = [];
  for (const file of files.sort()) {
    const mod = await import(pathToFileURL(file).href);
    const exported = mod.default;
    if (!exported) {
      throw new Error(`SEO module ${file} has no default export`);
    }
    const pages: PageSeo[] = Array.isArray(exported) ? exported : [exported];
    for (const p of pages) {
      if (!p?.path || !p?.title || !p?.description) {
        throw new Error(
          `SEO module ${file}: page missing path/title/description: ${JSON.stringify(p)}`,
        );
      }
      out.push(p);
    }
  }
  // Detect duplicates (two .seo.ts files claiming the same path) — that's a bug.
  const seen = new Map<string, PageSeo>();
  for (const p of out) {
    if (seen.has(p.path)) {
      throw new Error(
        `Duplicate SEO entry for path "${p.path}" — defined in more than one .seo.ts file.`,
      );
    }
    seen.set(p.path, p);
  }
  // Stable order, with `/` first
  return [...seen.values()].sort((a, b) => {
    if (a.path === "/") return -1;
    if (b.path === "/") return 1;
    return a.path.localeCompare(b.path);
  });
}

function loadAppRoutes(): string[] {
  const src = readFileSync(APP_TSX, "utf-8");
  const routes = new Set<string>();
  for (const m of src.matchAll(/<Route\s+path="([^"]+)"/g)) {
    const p = m[1];
    if (p.includes(":")) continue; // dynamic params (e.g. /blog/:slug) — handled by their own module
    routes.add(p);
  }
  return [...routes];
}

function readDomain(): string {
  const src = readFileSync(SITE_TS, "utf-8");
  const m = src.match(/domain:\s*["']([^"']+)["']/);
  return m ? `https://${m[1]}` : "https://vitlikisstovan.fo";
}

function readTemplate(): string {
  const indexPath = join(DIST, "index.html");
  if (!existsSync(indexPath)) {
    throw new Error(
      "dist/public/index.html not found. Run `vite build` first.",
    );
  }
  return readFileSync(indexPath, "utf-8");
}

const NAV_HTML =
  `<header><nav>` +
  `<a href="/">Heim</a>` +
  `<a href="/okkara-taenastur">Tænastur</a>` +
  `<a href="/um-okkum">Um okkum</a>` +
  `<a href="/blog">Bloggur</a>` +
  `<a href="/podcast">Podkast</a>` +
  `<a href="/contact">Samband</a>` +
  `</nav></header>`;

const FOOTER_HTML = `<footer><p>&copy; Vitlíkisstovan. Øll rættindi umsitin.</p></footer>`;

function generatePage(template: string, page: PageSeo, domain: string): string {
  let html = template;
  const pageUrl = `${domain}${page.path === "/" ? "" : page.path}`;
  const safeTitle = escapeAttr(page.title);
  const safeDesc = escapeAttr(page.description);
  const safeUrl = escapeAttr(pageUrl);

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${safeDesc}"`,
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${safeUrl}"`,
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${safeTitle}"`,
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${safeDesc}"`,
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${safeUrl}"`,
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${safeTitle}"`,
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${safeDesc}"`,
  );

  if (page.noindex) {
    html = html.replace(
      "</head>",
      `  <meta name="robots" content="noindex, nofollow" />\n  </head>`,
    );
  }

  const marker = "<!-- SEO_CONTENT_PLACEHOLDER -->";
  if (!html.includes(marker)) {
    throw new Error(
      `SEO_CONTENT_PLACEHOLDER not found in template (page ${page.path})`,
    );
  }

  const body = page.content
    ? `${NAV_HTML}<main>${page.content}</main>${FOOTER_HTML}`
    : `${NAV_HTML}<main><h1>${safeTitle}</h1><p>${safeDesc}</p></main>${FOOTER_HTML}`;
  html = html.replace(marker, body);

  if (page.jsonLd) {
    const blocks = Array.isArray(page.jsonLd) ? page.jsonLd : [page.jsonLd];
    const scripts = blocks
      .map((b) => {
        const json = JSON.stringify(
          { "@context": "https://schema.org", ...b, url: pageUrl },
          null,
          2,
        );
        return `<script type="application/ld+json">${escapeJsonForScript(json)}</script>`;
      })
      .join("\n  ");
    html = html.replace("</head>", `  ${scripts}\n  </head>`);
  }

  return html;
}

function generateSitemap(pages: PageSeo[], domain: string): string {
  const today = new Date().toISOString().split("T")[0];
  const urls = pages
    .filter((p) => !p.noindex)
    .map((page) => {
      const loc = escapeXml(
        page.path === "/" ? `${domain}/` : `${domain}${page.path}`,
      );
      const priority =
        page.sitemap?.priority ??
        (page.path === "/"
          ? "1.0"
          : page.path.startsWith("/blog/")
            ? "0.7"
            : "0.8");
      const changefreq =
        page.sitemap?.changefreq ??
        (page.path.startsWith("/blog/") ? "monthly" : "weekly");
      const lastmod = page.sitemap?.lastmod ?? today;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
}

function checkRouteCoverage(pages: PageSeo[]): void {
  const routes = loadAppRoutes();
  const seoPaths = new Set(pages.map((p) => p.path));
  const missing = routes.filter((r) => !seoPaths.has(r));
  if (missing.length > 0) {
    console.error("\n❌ SEO COVERAGE FAILURE");
    console.error(
      "The following routes in client/src/App.tsx have no .seo.ts entry:",
    );
    for (const m of missing) console.error(`  - ${m}`);
    console.error(
      "\nFix it by adding an entry to client/src/content/seo/registry.seo.ts",
    );
    console.error(
      "or by creating a dedicated client/src/content/seo/<name>.seo.ts file",
    );
    console.error(
      "with `export default { path, title, description, content?, jsonLd?, noindex? }`.\n",
    );
    process.exit(1);
  }
  const orphan = pages
    .map((p) => p.path)
    .filter((p) => !routes.includes(p) && !p.startsWith("/blog/"));
  if (orphan.length > 0) {
    console.warn(
      "\n⚠️  These SEO entries have no matching <Route> in App.tsx (still prerendered):",
    );
    for (const o of orphan) console.warn(`  - ${o}`);
  }
}

async function main() {
  console.log(`📖 Discovering SEO modules in ${SEO_DIR}`);
  const pages = await loadSeoModules();
  console.log(`✅ Found ${pages.length} pages`);

  checkRouteCoverage(pages);

  const template = readTemplate();
  const domain = readDomain();

  for (const page of pages) {
    const html = generatePage(template, page, domain);

    if (page.path === "/") {
      writeFileSync(join(DIST, "index.html"), html, "utf-8");
      continue;
    }

    const slug = page.path.slice(1);
    const dir = join(DIST, slug);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), html, "utf-8");

    const flatPath = join(DIST, `${slug}.html`);
    mkdirSync(dirname(flatPath), { recursive: true });
    writeFileSync(flatPath, html, "utf-8");
  }

  writeFileSync(
    join(DIST, "sitemap.xml"),
    generateSitemap(pages, domain),
    "utf-8",
  );
  console.log(
    `✅ SEO prerender: wrote ${pages.length} routes + sitemap.xml (auto-discovered from .seo.ts)`,
  );
}

main().catch((err) => {
  console.error("SEO prerender failed:", err);
  process.exit(1);
});
