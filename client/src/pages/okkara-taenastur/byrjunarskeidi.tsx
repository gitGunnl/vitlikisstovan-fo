import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Badge } from "@/components/ui/badge";
import { updateMetaTags, trackViewContent } from "@/lib/meta";
import { seoConfig } from "@/content/seo";
import { Bot, Rocket, ArrowLeft } from "lucide-react";

export default function Byrjunarskeidi() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    updateMetaTags({
      title: "Byrjunarskeið í ChatGPT - " + seoConfig.title,
      description:
        "Okkara umfatandi skeið lærir teg at brúka ChatGPT effektivt í gerandisarbeiði. Hóskar væl til bæði nýbyrjarar og yrkisfólk.",
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

            <div className="rounded-3xl border bg-card text-card-foreground shadow-sm p-6 sm:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Bot className="h-7 w-7" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                    Byrjunarskeið í ChatGPT til føroysk skrivstovufólk
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
                  Okkara umfatandi skeið lærir teg at brúka KjattGPT effektivt í
                  gerandisarbeiði. Hóskar væl til bæði nýbyrjarar og yrkisfólk.
                  Flestu av okkara kundum byrja sína vitlíkisferð her.
                </p>
                <p>
                  Skeiðið gevur tær eitt fullkomið innlit í vitlíki til tína
                  fyritøku. Tú fært handalig vitan, sum tú straks kanst brúka í
                  tínum arbeiði.
                </p>

                <h2 className="text-2xl font-semibold pt-4">
                  Hvat fær tú út av skeiðinum?
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Grundleggjandi fatan av, hvat KjattGPT er og hvussu tað virkar</li>
                  <li>Praktiskar ráðir til gerandisarbeiði á skrivstovuni</li>
                  <li>Fatan av prompt-skrivini – hvussu tú fær bestu svarini</li>
                  <li>Dømi og uppgávur, ið tú kanst brúka beinleiðis</li>
                </ul>

                <h2 className="text-2xl font-semibold pt-4">
                  Hvørjum hóskar skeiðið?
                </h2>
                <p>
                  Skeiðið er ætlað skrivstovufólki, løgfrøðingum, marknaðarfólki,
                  leiðarum og øllum, sum vilja fáa virkaligari nýtslu av vitlíki í
                  gerandisdegnum. Eingin forkunna er kravd.
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
