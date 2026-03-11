import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import InlineContactForm from "@/components/site/InlineContactForm";
import { Badge } from "@/components/ui/badge";
import { updateMetaTags, trackViewContent } from "@/lib/meta";
import { seoConfig } from "@/content/seo";
import { Bot, ArrowLeft } from "lucide-react";

export default function Byrjunarskeidi() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    updateMetaTags({
      title: "Byrjunarskeið í ChatGPT - " + seoConfig.title,
      description:
        "Lær at brúka ChatGPT effektivt í gerandisarbeiði. Hóskar til bæði nýbyrjarar og yrkisfólk.",
      url: window.location.href,
      siteName: seoConfig.siteName,
    });

    trackViewContent({
      content_name: "Byrjunarskeið í ChatGPT",
      content_ids: ["byrjunarskeidi"],
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
                    <Bot className="h-7 w-7" />
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                      Byrjunarskeið í ChatGPT
                    </h1>
                    <div className="flex gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 border-green-200"
                      >
                        Besta fyrsta stigið
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-blue-200 text-blue-700"
                      >
                        Netskeið
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    Lær at brúka ChatGPT effektivt í tínum arbeiði. Skeiðið gevur
                    tær handalig vitan, sum tú straks kanst brúka – uttan at tú
                    tørvar nakra forkunnu.
                  </p>
                  <p className="text-muted-foreground">
                    Hóskar til skrivstovufólk, leiðarar og øll, ið vilja koma
                    rætt í gongd við vitlíki.
                  </p>
                </div>
              </div>

              <InlineContactForm serviceName="Byrjunarskeið í ChatGPT" />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
