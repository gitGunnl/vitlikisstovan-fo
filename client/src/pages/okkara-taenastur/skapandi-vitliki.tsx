import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Badge } from "@/components/ui/badge";
import { updateMetaTags, trackViewContent } from "@/lib/meta";
import { seoConfig } from "@/content/seo";
import { GraduationCap, Rocket, ArrowLeft } from "lucide-react";

export default function SkapandiVitliki() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    updateMetaTags({
      title: "Skapandi vitlíki - " + seoConfig.title,
      description:
        "Eg skapi tilfar við vitlíki og haldi kreativar verkstovur. Vitlíkisvideo, myndir, grafikkur og branding tilfar.",
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

            <div className="rounded-3xl border-2 bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-orange-50/80 border-purple-300/50 shadow-lg backdrop-blur-sm p-6 sm:p-10">
              <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                  Skapandi vitlíki
                </h1>
                <p className="text-lg text-muted-foreground">
                  Eg skapi tilfar við vitlíki og haldi kreativar verkstovur
                </p>
              </div>

              <div className="flex flex-col gap-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                      <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Eg skapi fyri teg
                    </h2>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Hevur tú tørv á flottum visuellum lutum, men ikki tíðina til at gera tað? Eg kann gera vitlíkistilfar sergjørt til tín smakk ella tykkara brand - frá eygafangandi video og myndir til fullar heimasíður.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Badge className="px-4 py-2 bg-purple-100 text-purple-700 border border-purple-200">Vitlíkisvideo</Badge>
                    <Badge className="px-4 py-2 bg-pink-100 text-pink-700 border border-pink-200">Myndir &amp; grafikkur</Badge>
                    <Badge className="px-4 py-2 bg-orange-100 text-orange-700 border border-orange-200">Branding tilfar</Badge>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <GraduationCap className="h-7 w-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Eg læri teg
                    </h2>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Vilt tú meistra vitlíki til kreativt arbeiði? Bílegg eina handaliga verkstovu, har eg seti lag á og vísi tær, hvørji amboð eru røtt til tín, og hvussu tú best kemur í gongd við at gera video, myndir, tónleik og annað kreativt tilfar, alt gjørt við vitlíki.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Badge className="px-4 py-2 bg-blue-100 text-blue-700 border border-blue-200">Verkstovur</Badge>
                    <Badge className="px-4 py-2 bg-cyan-100 text-cyan-700 border border-cyan-200">Handalig upplæring</Badge>
                    <Badge className="px-4 py-2 bg-teal-100 text-teal-700 border border-teal-200">Meistra vitlíkisamboð</Badge>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-purple-200/30">
                <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 border border-purple-200/50 rounded-2xl p-8">
                  <p className="text-lg font-semibold text-purple-800 mb-3">
                    Vilt tú frígeva skapandi megina í vitlíki?
                  </p>
                  <p className="text-purple-700 mb-4">
                    Eg dugi at brúka vitlíkisamboð til at skapa myndir, video, tónleik og nógv annað tilfar, ið fangar áskoðaran.
                  </p>
                  <p className="text-purple-700 mb-4">
                    Við vitlíki kann ein ofta gera tilfar, sum vanliga hevði tikið tímar at framleiða, eftir stuttari tíð – alt gjørt við nýggjastu og bestu vitlíkistøknini.
                  </p>
                  <p className="text-purple-700 mb-6">
                    Um tú bara vilt hava meg at gera arbeiðið, ella sjálvur vilt læra at stýra hesum amboðum, so kann eg hjálpa tær við báðum.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://facebook.com/vitlikisstovan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium transition-colors"
                    >
                      Facebook
                    </a>
                    <a
                      href="https://linkedin.com/company/vitlikisstovan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-purple-200/30">
                <div className="text-center">
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
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
