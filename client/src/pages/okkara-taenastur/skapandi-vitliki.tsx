import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import InlineContactForm from "@/components/site/InlineContactForm";
import { Badge } from "@/components/ui/badge";
import { updateMetaTags, trackViewContent } from "@/lib/meta";
import { seoConfig } from "@/content/seo";
import { ArrowLeft } from "lucide-react";

export default function SkapandiVitliki() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    updateMetaTags({
      title: "Skapandi vitlíki - " + seoConfig.title,
      description:
        "Eg skapi tilfar við vitlíki og haldi kreativar verkstovur. Video, myndir, grafikkur og meira.",
      url: window.location.href,
      siteName: seoConfig.siteName,
    });

    trackViewContent({
      content_name: "Skapandi vitlíki",
      content_ids: ["skapandi-vitliki"],
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
                  <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                      Skapandi vitlíki
                    </h1>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-purple-100 text-purple-700 border border-purple-200">
                        Video &amp; myndir
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
                        Verkstovur
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    Eg skapi flott visuelt tilfar við vitlíki – video, myndir,
                    grafikkur og branding tilfar – sergjørt til tín smakk ella
                    tykkara brand.
                  </p>
                  <p className="text-muted-foreground">
                    Vilt tú heldur læra sjálv/ur? Eg haldi eisini handaliga
                    verkstovur, har tú lærir at meistra vitlíkisamboðini.
                  </p>
                </div>
              </div>

              <InlineContactForm serviceName="Skapandi vitlíki" />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
