import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import InlineContactForm from "@/components/site/InlineContactForm";
import { Badge } from "@/components/ui/badge";
import { updateMetaTags, trackViewContent } from "@/lib/meta";
import { seoConfig } from "@/content/seo";
import { Lightbulb, ArrowLeft } from "lucide-react";

export default function FimmtanHaettir() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    updateMetaTags({
      title: "15 hættir at brúka KjattGPT - " + seoConfig.title,
      description:
        "Fá 15 tillagaðar mátar at brúka KjattGPT í tínum arbeiði. Spar vikur av leitan og feilum.",
      url: window.location.href,
      siteName: seoConfig.siteName,
    });

    trackViewContent({
      content_name: "15 hættir at brúka KjattGPT",
      content_ids: ["15-haettir"],
      content_type: "service",
      value: 1500,
      currency: "DKK",
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
                  <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-chart-1/10">
                    <Lightbulb className="h-7 w-7" />
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                      15 hættir at brúka KjattGPT
                    </h1>
                    <div className="flex gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-800 border-orange-200"
                      >
                        Mælt til sum næsta stigið
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    Vit taka ein fund, har tú fortelur um títt arbeiði – og so
                    finnur eg 15 konkrettar uppgávur, sum tú beinleiðis kanst
                    byrja at brúka KjattGPT til. Spar tær vikur av leitan og feilum.
                  </p>
                  <p className="font-semibold text-xl">Prísur: 1.500 DKK</p>
                </div>
              </div>

              <InlineContactForm serviceName="15 hættir at brúka KjattGPT" />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
