import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Badge } from "@/components/ui/badge";
import { updateMetaTags, trackViewContent } from "@/lib/meta";
import { seoConfig } from "@/content/seo";
import { Wrench, Rocket, ArrowLeft } from "lucide-react";

export default function Serloysnir() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    updateMetaTags({
      title: "Serloysnir til sjálvirkan - " + seoConfig.title,
      description:
        "Ger tíni vitlíkishugskot til veruleika. Eg hjálpi tær at byggja sniðgjørdar loysnir, ið hóska til tín tørv.",
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
                  Ger tíni vitlíkishugskot til veruleika við mínari
                  menningarserfrøði. Eg hjálpi tær at byggja sniðgjørdar loysnir,
                  ið hóska til tín tørv.
                </p>

                <h2 className="text-2xl font-semibold pt-4">
                  Hvat kann eg hjálpa við?
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sjálvvirking av itøkiligum mannagongdum</li>
                  <li>Byggjing av sniðgjørdum vitlíkisamboðum</li>
                  <li>Integratión av vitlíki í verandi kervi</li>
                  <li>Ráðgeving um, hvørji møguleikar vitlíki gevur tíni fyritøku</li>
                </ul>

                <p className="italic text-muted-foreground pt-4">
                  Hevur tú eina ítøkiliga mannagongd, sum tú vilt sjálvvirka
                  við vitlíki? Ella hevur tú eitt slóðbrótandi hugskot um,
                  hvussu tín vinna kann nýta vitlíki á ein nýggjan hátt? Eg
                  kann hjálpa við at gera tínar visjónir til veruleika.
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
