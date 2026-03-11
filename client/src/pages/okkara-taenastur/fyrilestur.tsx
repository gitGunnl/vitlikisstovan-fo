import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Badge } from "@/components/ui/badge";
import { updateMetaTags, trackViewContent } from "@/lib/meta";
import { seoConfig } from "@/content/seo";
import { Presentation, Rocket, ArrowLeft } from "lucide-react";

export default function Fyrilestur() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    updateMetaTags({
      title: "Fyrilestur: Vitlíki - Frá Óvissu til Møguleikar - " + seoConfig.title,
      description:
        "Vitlíki er komið – og tað broytir okkara arbeiðishættir. Hesin fyrilesturin gevur eina greiða fatan av, hvussu vitlíki kann nýtast í gerandisdegnum.",
      url: window.location.href,
      siteName: seoConfig.siteName,
    });

    trackViewContent({
      content_name: "Fyrilestur: Vitlíki - Frá Óvissu til Møguleikar",
      content_ids: ["fyrilestur"],
      content_type: "service",
      value: 18000,
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
                <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-chart-2/10">
                  <Presentation className="h-7 w-7" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                    Fyrilestur: Vitlíki - Frá Óvissu til Møguleikar
                  </h1>
                  <div className="flex gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-800 border-purple-200"
                    >
                      Til toymir &amp; fyritøkur
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Vitlíki er komið – og tað broytir okkara arbeiðishættir. Men
                  hvat merkir tað í veruleikanum? Hvat kann vitlíki – og hvat
                  kann tað ikki? Hesin fyrilesturin gevur eina greiða fatan av,
                  hvussu vitlíki kann nýtast í gerandisdegnum, so óvissa og ivi
                  verða skift út við forvitni og nýggjar møguleikar.
                </p>

                <h2 className="text-2xl font-semibold pt-4">
                  Hvat fær tú út av fyrilestrinum?
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Minni ivi, meira greiði</strong> – Skil vitlíki uttan
                    torskilt tekniskt mál.
                  </li>
                  <li>
                    <strong>Frá ræðslu til spenning</strong> – Síggj, hvussu
                    vitlíki kann vera ein hjálp, ikki ein hóttan.
                  </li>
                  <li>
                    <strong>Ítøkiligur íblástur</strong> – Uppliv, hvussu
                    vitlíki kann gera arbeiðið lættari og meira munagott.
                  </li>
                </ul>

                <p>
                  Ein fyrilestur, sum gevur yvirlit, vísur møguleikar og leggur
                  fram praktisk dømi, so tit læra eina nýggja tilgongd til
                  vitlíki.
                </p>

                <p className="font-semibold text-xl pt-4">Prísur: 18.000 DKK</p>

                <p className="italic text-muted-foreground">
                  Hóskar væl til fyritøkur, ið vilja vera á odda við vitlíki –
                  og ynskja starvsfólk uttan óneyðugan ótta ella óvissu.
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
