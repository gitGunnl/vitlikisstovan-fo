
import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { seoConfig } from "@/content/seo";

export default function CourseDetails() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Title and meta description are owned by the prerender step
    // (scripts/prerender-seo.ts via client/src/content/seo/registry.seo.ts).
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Header />
      
      <main>
        <Section className="py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              Lær meira um skeiðis
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Djúpari lýsing av okkara AI skeið og hvusso vit hjálpa fyrirtøkum at taka AI í nýtslu.
            </p>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
