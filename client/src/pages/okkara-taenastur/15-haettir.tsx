import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Badge } from "@/components/ui/badge";
import { updateMetaTags, trackViewContent } from "@/lib/meta";
import { seoConfig } from "@/content/seo";
import { Lightbulb, Rocket, ArrowLeft } from "lucide-react";

export default function FimmtanHaettir() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    updateMetaTags({
      title: "15 hættir at brúka KjattGPT - " + seoConfig.title,
      description:
        "Spar tær vikur av feilum og skeivum royndum – vit geva tær 15 tillagaðar mátar at brúka KjattGPT í tínum arbeiði.",
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
                  Spar tær vikur av feilum og skeivum royndum – vit geva tær 15
                  tillagaðar mátar at brúka KjattGPT í tínum arbeiði. Hendan
                  tænastan hjálpir tær at finna beinraktar uppgávur, sum tú kanst
                  brúka KjattGPT til í júst tínum arbeiði - í dag.
                </p>
                <p>
                  Hetta gera vit við at taka ein fund, so fortelur tú mær
                  akkurát, hvat tú gert, og so sigi eg tær akkurát, hvat tú
                  kanst brúka ChatGPT til.
                </p>

                <h2 className="text-2xl font-semibold pt-4">
                  Hvussu virkar tað?
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Vit taka ein fund, har tú fortelur um títt arbeiði</li>
                  <li>Eg seri á tínar arbeiðsuppgávur og finnur 15 hættir at brúka KjattGPT</li>
                  <li>Tú fært eina lista av uppgávum, ið tú beinleiðis kanst byrja at brúka</li>
                  <li>Tað tekur 1 til 2 tímar og sparir fleiri vikur av leitan og feilum</li>
                </ul>

                <p className="font-semibold text-xl pt-4">Prísur: 1.500 DKK</p>

                <p className="italic text-muted-foreground">
                  Hendan tænastan hjálpir tær at finna út av akkurát hvørja
                  uppgávu TÚ kanst nýta vitlíki til.
                </p>
              </div>

              <div className="mt-10 pt-6 border-t">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-medium bg-primary text-primary-foreground hover:opacity-90 transition"
                >
                  Bílegg nú
                  <Rocket className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
