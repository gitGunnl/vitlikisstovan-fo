---
name: Build-time Chromium PDF generation
description: How guide PDFs are generated at build and the Chromium binary gotcha
---

# Build-time PDF generation for guides

Interactive guide PDFs are generated at **build time only** (no runtime PDF gen)
by `scripts/generate-guide-pdfs.ts` (run via a `.js` tsx shim, mirroring
`prerender-seo`). The step renders each guide route from the already-built
`dist/public` static output with `puppeteer-core` + headless Chromium and writes
`dist/public/<pdfFilename>` so PDFs deploy at site root like legacy guide PDFs.

**Why `which chromium` instead of a hardcoded path:** the Nix store path for the
chromium binary is unstable across rebuilds, so the script resolves it at runtime
via `which chromium` (falling back to `PUPPETEER_EXECUTABLE_PATH`). Hardcoding the
`/nix/store/...` path will break on the next environment change.

**Other constraints that bit / matter:**
- Chromium must launch with `--no-sandbox --disable-setuid-sandbox` in the Replit
  container.
- Site chrome is hidden in PDFs via a global `@media print { .no-print }` rule in
  `index.css`; `Header`/`Footer` roots and the guide toolbars carry `no-print`.
  The script calls `page.emulateMediaType("print")` before `page.pdf()`.
- Guide data lives in `client/src/content/guides.ts` (framework-free, imported by
  both the React app and the Node build script). The build does a coverage check:
  every `/user-guides/*` route in `App.tsx` must have a matching guide entry and
  vice versa, else the build fails.
