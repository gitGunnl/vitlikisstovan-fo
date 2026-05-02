import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { seoConfig } from "@/content/seo";
import Verkaetlanir from "@/components/vitliki-i-verki/themes/Verkaetlanir";
import Arkitekturur from "@/components/vitliki-i-verki/themes/Arkitekturur";
import ForoyskSoga from "@/components/vitliki-i-verki/themes/ForoyskSoga";
import Marknadarforing from "@/components/vitliki-i-verki/themes/Marknadarforing";
import Eksperiment from "@/components/vitliki-i-verki/themes/Eksperiment";

/**
 * Vitlíki í verki
 *
 * Showcase page for AI-generated work from Vitlíkisstovan.
 *
 * Structure:
 *  - Hero (shared)
 *  - Tab navigation (shared, theme-based — NOT media-type based, NO nested tabs)
 *  - One free-form theme component per tab (each is its own custom canvas)
 *
 * To add a new theme tab:
 *   1. Create a new component in client/src/components/vitliki-i-verki/themes/
 *   2. Import it below
 *   3. Add a new entry to the `themes` array
 * The outer frame stays the same; the content inside is fully custom per theme.
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

  return (
    <>
      <Header />

      <main>
        {/* Hero — kept simple and minimal */}
        <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/40 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              Frá Vitlíkisstovuni
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              Vitlíki í verki
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Útvalt arbeiði gjørt við vitlíki — myndir, filmar, ljóð, eksperiment
              og verkætlanir. Hetta er ein opin samling, sum vaksur við tíðini.
            </p>
          </div>
        </section>

        {/* Theme tabs — single level, no nested tabs */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Scrollable tab bar so it stays usable on mobile */}
              <div className="flex justify-center mb-10 sm:mb-12">
                <div className="overflow-x-auto -mx-4 px-4 max-w-full">
                  <TabsList className="h-auto p-1 bg-muted/60 inline-flex">
                    {themes.map((theme) => (
                      <TabsTrigger
                        key={theme.value}
                        value={theme.value}
                        className="px-3 sm:px-5 py-2 text-sm sm:text-base whitespace-nowrap"
                        data-testid={`tab-${theme.value}`}
                      >
                        {theme.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </div>

              {/*
                Each TabsContent renders its own theme component. Replace the
                content of any theme component with whatever custom layout
                you want — they are fully independent canvases.
              */}
              {themes.map(({ value, Component }) => (
                <TabsContent
                  key={value}
                  value={value}
                  className="mt-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <Component />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
