/**
 * Thin shim that loads the TypeScript implementation via tsx's runtime API.
 * The actual logic lives in scripts/generate-guide-pdfs.ts so it can use real
 * TS imports (and pull guide data directly from client/src/content/guides.ts).
 */
import { tsImport } from "tsx/esm/api";

await tsImport("./generate-guide-pdfs.ts", import.meta.url);
