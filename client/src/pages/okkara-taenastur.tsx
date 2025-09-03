
import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { seoConfig } from "@/content/seo";

export default function OkkaraTaenastur() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Set page metadata
    document.title = "Okkara Tænastur - " + seoConfig.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Kanna okkara AI útbúgvingar og ráðgevingar tænastur til føroysk fyrirtøk.");
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = "Kanna okkara AI útbúgvingar og ráðgevingar tænastur til føroysk fyrirtøk.";
      document.head.appendChild(meta);
    }
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
              Okkara Tænastur
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Vit bjóða fram AI útbúgvingar og ráðgevingar tænastur til at hjálpa tykkara fyrirtøki at veksa.
            </p>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
