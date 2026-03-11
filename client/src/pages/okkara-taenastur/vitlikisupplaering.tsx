import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Badge } from "@/components/ui/badge";
import { updateMetaTags, trackViewContent } from "@/lib/meta";
import { seoConfig } from "@/content/seo";
import { Settings, Rocket, ArrowLeft } from "lucide-react";

export default function Vitlikisupplaering() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    updateMetaTags({
      title: "Vitlíkisupplæring - " + seoConfig.title,
      description:
        "Handalig hjálp til at innarbeiða KjattGPT ella Copilot í tykkara arbeiðsgongd. Vit arbeiða beinleiðis saman við tykkara starvsfólkum.",
      url: window.location.href,
      siteName: seoConfig.siteName,
    });

    trackViewContent({
      content_name: "Vitlíkisupplæring",
      content_ids: ["vitlikisupplaering"],
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
                <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/60">
                  <Settings className="h-7 w-7" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                    Vitlíkisupplæring
                  </h1>
                  <div className="flex gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-cyan-100 text-cyan-800 border-cyan-200"
                    >
                      Handalig hjálp
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Tá ið títt toymi hevur fingið grundvitan, veita vit hjálp til
                  at innarbeiða KjattGPT ella Copilot í tykkara arbeiðsgongd. Vit
                  arbeiða beinleiðis saman við tykkara starvsfólkum fyri at
                  tryggja, at øll fáa sum mest burtur úr hesari nýggju tøkni.
                </p>

                <h2 className="text-2xl font-semibold pt-4">
                  Hvat inniheldur upplæringin?
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Beinleiðis samstarv við tykkara toymi</li>
                  <li>Sniðgjørd upplæring eftir tykkara arbeiðsuppgávum</li>
                  <li>Handalig vegleiðing í at brúka KjattGPT og Copilot</li>
                  <li>Uppfylgjing og stuðul eftir upplæringina</li>
                </ul>

                <p className="italic text-muted-foreground pt-4">
                  Okkara serfrøði ger tað nógv smidligari at fáa tykkara toymi
                  at innleiða vitlíkisamboð inn í teirra dagliga arbeiði.
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
