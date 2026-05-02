import { useEffect } from "react";
import { useLocation } from "wouter";
import type { PageSeo, PageSeoModule } from "@/content/seo/_types";

const seoModules = import.meta.glob<{ default: PageSeoModule }>(
  "../content/seo/*.seo.ts",
  { eager: true },
);

const seoByPath: Map<string, PageSeo> = (() => {
  const map = new Map<string, PageSeo>();
  for (const mod of Object.values(seoModules)) {
    const exported = mod.default;
    if (!exported) continue;
    const pages: PageSeo[] = Array.isArray(exported) ? exported : [exported];
    for (const page of pages) {
      map.set(page.path, page);
    }
  }
  return map;
})();

function setMetaDescription(description: string): void {
  let meta = document.querySelector(
    'meta[name="description"]',
  ) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", description);
}

export function useSeo(): void {
  const [location] = useLocation();

  useEffect(() => {
    const entry = seoByPath.get(location);
    if (!entry) return;
    document.title = entry.title;
    setMetaDescription(entry.description);
  }, [location]);
}
