import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import InlineContactForm from "@/components/site/InlineContactForm";
import { Badge } from "@/components/ui/badge";
import { updateMetaTags, trackViewContent } from "@/lib/meta";
import { seoConfig } from "@/content/seo";
import { Wrench, ArrowLeft } from "lucide-react";

export default function Serloysnir() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    updateMetaTags({
      title: "Serloysnir til sjálvirkan - " + seoConfig.title,
      description:
        "Sniðgjørdar vitlíkisloysnir, ið hóska til tín tørv. Sjálvvirking, integratión og ráðgeving.",
      url: window.location.href,
      siteName: seoConfig.siteName,
    });

    trackViewContent({
      content_name: "Serloysnir til sjálvirkan",
      content_ids: ["serloysnir"],
      content_type: "service",
    });
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Header />
      <main>
        <Section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <a
              href="/okkara-taenastur"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Aftur til tænastur
            </a>

            <div className="grid gap-8 lg:grid-cols-[1fr,380px]">
              <div className="rounded-3xl border bg-card text-card-foreground shadow-sm p-6 sm:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Wrench className="h-7 w-7" />
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                      Serloysnir til sjálvirkan
                    </h1>
                    <div className="flex gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-pink-100 text-pink-800 border-pink-200"
                      >
                        Sniðgjørdar loysnir
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    Ger tíni vitlíkishugskot til veruleika. Eg hjálpi tær at
                    byggja sniðgjørdar loysnir – frá sjálvvirking av mannagongdum
                    til integratión av vitlíki í tykkara verandi kervi.
                  </p>
                  <p className="text-muted-foreground">
                    Hvort ið tú hevur eitt ítøkiligt hugskot ella tørvar ráðgeving,
                    so kann eg hjálpa.
                  </p>
                </div>
              </div>

              <InlineContactForm serviceName="Serloysnir til sjálvirkan" />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
