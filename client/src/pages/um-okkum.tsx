
import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { seoConfig } from "@/content/seo";

export default function UmOkkum() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Set page metadata
    document.title = "Um okkum - " + seoConfig.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Lær meira um Vitlíkisstovan og okkara uppgávu at vegleiða føroysk fyrirtøk í vitlíkis tímanum.");
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = "Lær meira um Vitlíkisstovan og okkara uppgávu at vegleiða føroysk fyrirtøk í vitlíkis tímanum.";
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
              Um okkum
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Vit eru Vitlíkisstovan - okkara uppgáva er at hjálpa føroyskum fyrirtøkum at taka vitlíki í nýtslu.
            </p>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
