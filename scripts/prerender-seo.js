/**
 * Thin shim that loads the TypeScript implementation via tsx's runtime API.
 * The actual logic lives in scripts/prerender-seo.ts so it can use real TS
 * imports (and pull SEO data directly from client/src/content/**).
 */
import { tsImport } from "tsx/esm/api";

await tsImport("./prerender-seo.ts", import.meta.url);
