import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { seoConfig } from "@/content/seo";
import Verkaetlanir from "@/components/vitliki-i-verki/themes/Verkaetlanir";
import Arkitekturur from "@/components/vitliki-i-verki/themes/Arkitekturur";
import ForoyskSoga from "@/components/vitliki-i-verki/themes/ForoyskSoga";
import Marknadarforing from "@/components/vitliki-i-verki/themes/Marknadarforing";
import Eksperiment from "@/components/vitliki-i-verki/themes/Eksperiment";

/**
 * Vitlíki í verki — gallery-style showcase.
 *
 * Structure:
 *  - Editorial hero (shared)
 *  - Underline tab navigation (shared, theme-based — no nested tabs)
 *  - One free-form theme component per tab (each is its own custom canvas)
 */

const themes = [
  { value: "verkaetlanir",   label: "Verkætlanir",      Component: Verkaetlanir },
  { value: "arkitekturur",   label: "Arkitekturur",     Component: Arkitekturur },
  { value: "foroysk-soga",   label: "Føroysk søga",     Component: ForoyskSoga },
  { value: "marknadarforing", label: "Marknaðarføring", Component: Marknadarforing },
  { value: "eksperiment",    label: "Eksperiment",      Component: Eksperiment },
];

export default function VitlikiIVerki() {
  const [activeTab, setActiveTab] = useState(themes[0].value);

  useEffect(() => {
    document.title = "Vitlíki í verki - " + seoConfig.siteName;

    const description =
      "Útvalt vitlíkis-genererað arbeiði frá Vitlíkisstovuni — myndir, filmar, ljóð, eksperiment og verkætlanir.";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, []);

  const activeIndex = themes.findIndex((t) => t.value === activeTab);

  return (
    <>
      <Header />

      <main className="bg-background">
        {/* Editorial hero */}
        <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-foreground/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-end">
              <div className="md:col-span-2">
                <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-foreground/60">
                  №&nbsp;001
                </span>
                <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-foreground/60 mt-1">
                  Samling
                </span>
              </div>
              <div className="md:col-span-7">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02]">
                  Vitlíki<br />
                  <span className="italic font-normal text-foreground/70">í verki.</span>
                </h1>
              </div>
              <div className="md:col-span-3">
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                  Útvalt arbeiði gjørt við vitlíki — myndir, filmar, ljóð,
                  eksperiment og verkætlanir. Ein opin samling, sum vaksur við
                  tíðini.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Theme tabs — underline / editorial style */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b border-foreground/10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="overflow-x-auto -mx-4 px-4">
                <div role="tablist" className="flex gap-6 sm:gap-10 min-w-max">
                  {themes.map((theme, i) => {
                    const isActive = theme.value === activeTab;
                    return (
                      <button
                        key={theme.value}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveTab(theme.value)}
                        data-testid={`tab-${theme.value}`}
                        className={`relative py-5 text-sm sm:text-[15px] whitespace-nowrap transition-colors ${
                          isActive
                            ? "text-foreground"
                            : "text-foreground/50 hover:text-foreground/80"
                        }`}
                      >
                        <span className="font-mono text-[10px] tracking-widest mr-2 text-foreground/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {theme.label}
                        <span
                          className={`absolute left-0 right-0 -bottom-px h-px transition-opacity ${
                            isActive ? "bg-foreground opacity-100" : "opacity-0"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Section meta strip */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
            <div className="flex items-baseline justify-between border-b border-foreground/10 pb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
                {String(activeIndex + 1).padStart(2, "0")} / {String(themes.length).padStart(2, "0")}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
                {themes[activeIndex]?.label}
              </span>
            </div>
          </div>

          {/* Theme content */}
          <section className="px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32 pt-10 sm:pt-14">
            <div className="max-w-6xl mx-auto">
              {themes.map(({ value, Component }) => (
                <TabsContent
                  key={value}
                  value={value}
                  className="mt-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <Component />
                </TabsContent>
              ))}
            </div>
          </section>
        </Tabs>
      </main>

      <Footer />
    </>
  );
}
