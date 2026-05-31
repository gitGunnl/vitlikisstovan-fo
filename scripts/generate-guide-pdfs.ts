/**
 * Post-build step: generate real, text-selectable PDFs for every interactive
 * guide.
 *
 * For each guide in `client/src/content/guides.ts` we render its in-app route
 * with headless Chromium (driving the already-built static site in
 * `dist/public`) and save a print-styled PDF to `dist/public/<pdfFilename>`.
 * Because the site root is the deploy root, the PDF ships at `/<pdfFilename>`
 * exactly like the legacy hand-made guide PDFs, so the in-app "download PDF"
 * links resolve in production.
 *
 * Coverage check (mirrors scripts/prerender-seo.ts): every
 * `/user-guides/<sub>` route declared in `client/src/App.tsx` must have a
 * matching interactive guide entry, and vice versa. A mismatch fails the
 * build, so a new guide page can't ship without a generated PDF.
 *
 * This runs at build time only — there is no runtime PDF generation.
 */

import {
  readFileSync,
  existsSync,
  statSync,
} from "fs";
import { dirname, join, extname } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { execSync } from "child_process";

import puppeteer from "puppeteer-core";

import { interactiveGuides } from "../client/src/content/guides";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist", "public");
const APP_TSX = join(ROOT, "client", "src", "App.tsx");

const LISTING_ROUTE = "/user-guides";

// ---------------------------------------------------------------------------
// Coverage check
// ---------------------------------------------------------------------------

function loadGuideRoutesFromApp(): string[] {
  const src = readFileSync(APP_TSX, "utf-8");
  const routes = new Set<string>();
  for (const m of src.matchAll(/<Route\s+path="([^"]+)"/g)) {
    const p = m[1];
    if (p.includes(":")) continue; // dynamic params handled elsewhere
    if (p === LISTING_ROUTE) continue; // the listing page itself, not a guide
    if (p.startsWith(`${LISTING_ROUTE}/`)) routes.add(p);
  }
  return [...routes];
}

function checkRouteCoverage(): void {
  const appRoutes = loadGuideRoutesFromApp();
  const guideRoutes = new Set(interactiveGuides.map((g) => g.route));
  const appRouteSet = new Set(appRoutes);

  const missingGuide = appRoutes.filter((r) => !guideRoutes.has(r));
  const missingRoute = [...guideRoutes].filter((r) => !appRouteSet.has(r));

  if (missingGuide.length > 0 || missingRoute.length > 0) {
    console.error("\n❌ Guide PDF coverage check failed.\n");
    if (missingGuide.length > 0) {
      console.error(
        "These /user-guides/* routes in client/src/App.tsx have no entry in client/src/content/guides.ts:",
      );
      for (const r of missingGuide) console.error(`  - ${r}`);
      console.error(
        "Add them to `interactiveGuides` (with a pdfFilename) so a PDF is generated.\n",
      );
    }
    if (missingRoute.length > 0) {
      console.error(
        "These guide routes in client/src/content/guides.ts have no matching <Route> in client/src/App.tsx:",
      );
      for (const r of missingRoute) console.error(`  - ${r}`);
      console.error("Fix the route or remove the guide entry.\n");
    }
    process.exit(1);
  }

  // Guard against duplicate PDF filenames clobbering each other.
  const seen = new Map<string, string>();
  for (const g of interactiveGuides) {
    const prev = seen.get(g.pdfFilename);
    if (prev) {
      console.error(
        `\n❌ Duplicate PDF filename "${g.pdfFilename}" used by both "${prev}" and "${g.id}".\n`,
      );
      process.exit(1);
    }
    seen.set(g.pdfFilename, g.id);
  }
}

// ---------------------------------------------------------------------------
// Minimal static file server over dist/public (with SPA fallback)
// ---------------------------------------------------------------------------

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function resolveFile(urlPath: string): string | null {
  // Strip query/hash and decode.
  const clean = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  // Prevent path traversal.
  const safe = join(DIST, clean).normalize();
  if (!safe.startsWith(DIST)) return null;

  if (existsSync(safe)) {
    const s = statSync(safe);
    if (s.isFile()) return safe;
    if (s.isDirectory()) {
      const idx = join(safe, "index.html");
      if (existsSync(idx)) return idx;
    }
  }
  return null;
}

function startStaticServer(): Promise<{ port: number; close: () => void }> {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const filePath = resolveFile(req.url || "/");
      const target = filePath ?? join(DIST, "index.html"); // SPA fallback
      if (!existsSync(target)) {
        res.statusCode = 404;
        res.end("Not found");
        return;
      }
      const ext = extname(target).toLowerCase();
      res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
      res.end(readFileSync(target));
    });
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      const port = typeof addr === "object" && addr ? addr.port : 0;
      resolve({ port, close: () => server.close() });
    });
  });
}

// ---------------------------------------------------------------------------
// Chromium resolution
// ---------------------------------------------------------------------------

function resolveChromium(): string {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  for (const bin of ["chromium", "chromium-browser", "google-chrome"]) {
    try {
      const p = execSync(`which ${bin}`, { encoding: "utf-8" }).trim();
      if (p) return p;
    } catch {
      // try next candidate
    }
  }
  throw new Error(
    "Could not find a Chromium executable. Install `chromium` (system dependency) or set PUPPETEER_EXECUTABLE_PATH.",
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    throw new Error(
      "dist/public/index.html not found. Run `vite build` (and prerender) first.",
    );
  }

  checkRouteCoverage();

  const executablePath = resolveChromium();
  const { port, close } = await startStaticServer();
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    for (const guide of interactiveGuides) {
      const page = await browser.newPage();
      try {
        await page.goto(`${baseUrl}${guide.route}`, {
          waitUntil: "networkidle0",
          timeout: 60_000,
        });
        // Ensure the SPA actually rendered the article (h1 is present on every
        // guide) and that web fonts are loaded before snapshotting.
        await page.waitForSelector("h1", { timeout: 30_000 });
        await page.evaluate(async () => {
          await (document as any).fonts?.ready;
        });
        // Apply print media so .no-print chrome is hidden in the PDF.
        await page.emulateMediaType("print");

        const outPath = join(DIST, guide.pdfFilename);
        await page.pdf({
          path: outPath,
          format: "A4",
          printBackground: true,
          margin: {
            top: "18mm",
            bottom: "18mm",
            left: "16mm",
            right: "16mm",
          },
        });
        console.log(`  ✓ ${guide.pdfFilename}  (${guide.route})`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    close();
  }

  console.log(
    `\n✅ Generated ${interactiveGuides.length} guide PDF(s) into dist/public/`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
