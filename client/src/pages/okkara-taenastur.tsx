import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { seoConfig } from "@/content/seo";
import {
  Bot,
  GraduationCap,
  Lightbulb,
  Presentation,
  Wrench,
  Settings,
  Rocket,
  ArrowRight,
} from "lucide-react";

export default function Taenastur() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // SEO
    document.title = "Tænastur - " + seoConfig.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    const content =
      "Vit hjálpa við øllum sum snýr seg um vitlíki. Les um skeið, fyrilestrar, ráðgeving og serloysnir – alt bygt til føroyskar fyritøkur og stovnar.";
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <Section className="py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Vit hjálpa við øllum sum snýr seg um vitlíki.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Vit hjálpa føroyskum fyritøkum og stovnum at taka
              vitlíki-tøkni til sín, við praktiskum amboðum sum ChatGPT og
              CoPilot, mynda og video generering, meaning av vitlíki amboðum.
              Við einari skipaðari tilgongd tryggja vit, at tykkara toymi kann
              nýta vitlíki á ein munagóðan hátt í gerandisdegnum.
            </p>

          </div>
        </Section>

        {/* START HERE: Útbúgving */}
        <Section id="skeid" className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-2">
              Byrja her: Útbúgving til skrivstovufólk
            </h2>
            <p className="italic text-muted-foreground mb-8">
              Eitt fullkomið innlit í vitlíki til tína fyritøku
            </p>

            <div className="rounded-3xl border bg-card text-card-foreground shadow-sm p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Bot className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2">
                    Býrjunarskeið í ChatGPT til Føroysk skrivstovufólk
                  </h3>

                  <p className="font-medium mb-1">(Besta fyrsta stig)</p>
                  <p className="font-medium mb-4">Net skeið</p>

                  <p className="leading-relaxed mb-4">
                    Okkara umfatandi skeið lærir teg at brúka KjattGPT
                    effektivt í gerandisarbeiði. Perfekt til bæði ný byrjandi
                    og yrkisfólk. Flestu av okkara kundum byrja sína vitlíki-ferð
                    her.
                  </p>

                  <p className="font-semibold mb-6">Prísur: 1.200 DKK</p>


                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* TÆNASTUR */}
        <Section id="taenastur" className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
              Tænastur
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {/* 1. 15 hættir */}
              <div className="rounded-3xl border bg-card text-card-foreground shadow-sm p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-chart-1/10">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">
                      1. 15 hættir at brúka KjattGPT
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      (Mælt til sum næsta stig)
                    </p>
                    <p className="leading-relaxed mb-4">
                      Spar tær vikur av feilum og skeivum royndum – vit geva tær
                      15 tillagaðar mátar at brúka KjattGPT í tínum arbeiði.
                      Hendan tænastan hjálpir tær at finna beinraktar uppgábur
                      tú kann brúka KjattGPT til í júst tínum arbeiði - í dag.
                    </p>
                    <p className="leading-relaxed mb-4">
                      Hettar gera vit við at taka ein fund, so fortelur tú mær
                      akkruát hvat tú gert og so sigi eg tær akkurát hvat tú
                      kann brúka ChatGPT til.
                    </p>
                    <p className="leading-relaxed mb-4">
                      Tað tekur 1 til 2 tímar og sparir fleiri vikur av leitan
                      og feilum.
                    </p>

                    <p className="font-semibold mb-4">Prísur: 1.200 DKK</p>



                    <p className="italic text-muted-foreground mt-4">
                      Hendan tænastan hjálpir tær at finna beinraktar uppgá.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. Fyrilestur */}
              <div className="rounded-3xl border bg-card text-card-foreground shadow-sm p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-chart-2/10">
                    <Presentation className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">
                      2. Fyrilestur: vitlíki: Frá Óvissu til Møguleikar
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      (Til toymir &amp; fyritøkur)
                    </p>
                    <p className="leading-relaxed mb-4">
                      vitlíki er komið – og tað broytir máta okkara at arbeiða
                      uppá. Men hvat merkir tað í veruleikanum? Hvat kann
                      vitlíki – og hvat kann tað ikki? Hetta fyrilesturin gevur
                      eina greiða fatan av, hvussu vitlíki kann nýtast í
                      gerandisdegnum, so óvissa og ivi verða skift út við
                      forvitni og nýggjar møguleikar.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                      <li>
                        🔹 <strong>Minni ógreiðni, meira greiða</strong> – Skil
                        vitlíki uttan torskilt tekniskt mál.
                      </li>
                      <li>
                        🔹 <strong>Frá ræðslu til spenning</strong> – Síggj,
                        hvussu vitlíki kann vera ein hjálp, ikki ein hóttan.
                      </li>
                      <li>
                        🔹 <strong>Konkret íblástur</strong> – Uppliv, hvussu
                        vitlíki kann gera arbeiðið lættari og meir munagott.
                      </li>
                    </ul>
                    <p className="leading-relaxed mb-4">
                      Ein fyrilestur, sum gevur yvirlit, vísur møguleikar og
                      leggur fram praktisk dømi, so tit fara avstað við nýggjari
                      tilgongd til vitlíki – og eini sterkari støðu í
                      framtíðini.
                    </p>

                    <p className="font-semibold mb-4">Prísur: 18.000 DKK</p>



                    <p className="italic text-muted-foreground mt-4">
                      Perfekt til fyritøkur, ið vilja vera á odda við vitlíkii –
                      uttan óneyðuga ótta ella óvissu.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. vitlíki-ráðgeving */}
              <div className="rounded-3xl border bg-card text-card-foreground shadow-sm p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/60">
                    <Settings className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">
                      3. vitlíki-ráðgeving
                    </h3>
                    <p className="text-muted-foreground mb-4">(Handalig hjálp)</p>
                    <p className="leading-relaxed mb-4">
                      Tá ið títt toymi hevur fingið grundvitan, veita vit
                      hjálp til at innarbeiða KjattGPT ella Copilot í
                      tykkara arbeiðsgongd. Vit arbeiða beinleiðis saman við
                      tykkara starvsfólki fyri at tryggja at øll fáa sum mest
                      burturúr hesa nýggju tøkni.
                    </p>



                    <p className="italic text-muted-foreground mt-4">
                      Okkara serfrøði ger tað nógv smidligari at fáa tykkara
                      toymi at innleiða vitlíki-amboð inn í teirra dagliga
                      arbeiði.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Serloysnir */}
              <div className="rounded-3xl border bg-card text-card-foreground shadow-sm p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Wrench className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">
                      4. Serloysnir til sjálvirkan
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      (Sniðgjørdar loysnir)
                    </p>
                    <p className="leading-relaxed mb-4">
                      Ger tínar vitlíki-automatións hugskot til veruleika við
                      okkara menningarserfrøði. Vit hjálpa tær at byggja
                      sniðgjørdar loysnir, ið hóska til tín tørv.
                    </p>



                    <p className="italic text-muted-foreground mt-4">
                      Hevur tú eina ítøkiliga mannagongd, tú vilt automatisera
                      við vitlíki? Ella hevur tú eitt slóðbrótandi hugskot til
                      hvussu tín vinna kann brúka vitlíki á ein nýggjan hátt?
                      Vit kunnu hjálpa við at gera tínar visjónir til veruleika.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* AI CREATIVE SERVICES */}
        <Section id="ai-art" className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border-2 bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-orange-50/80 border-purple-300/50 shadow-lg backdrop-blur-sm p-8 sm:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                  Skapandi vitlíki
                </h2>
                <p className="text-lg text-muted-foreground">
                  Vitlíki generera tilfar og kreativar verkstovur
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-12">
                {/* We Create for You */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Eg skapi fyri teg
                    </h3>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Um tú hevur brúk fyri flottum visuellum lutum, men ikki tíðna til at gera tað? Eg kann gera vitlíki tilfar sergjørt til tín smag ella tykkara brand - frá eygafangandi video og myndir til fullar heimasíður eg nýta vitlíki til at gera títt tilfar.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 text-sm rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-medium">Vitlíki video</span>
                    <span className="px-4 py-2 text-sm rounded-full bg-pink-100 text-pink-700 border border-pink-200 font-medium">Myndir & grafik</span>
                    <span className="px-4 py-2 text-sm rounded-full bg-orange-100 text-orange-700 border border-orange-200 font-medium">Branding tilfar</span>
                  </div>
                </div>

                {/* We Teach You */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Eg læri teg
                    </h3>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Vilt tú meistra vitlíki til kreativt arbeiði? Bílegg eina handaliga verkstovu har eg seti lag á og vísu tær hvørji amboð er røtt til tín og hvussu tú best kemur ígongd við at gera video, myndir, tónleik og annað kreativt tilfar, alt gjørt við vitlíki.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 text-sm rounded-full bg-blue-100 text-blue-700 border border-blue-200 font-medium">Verkstovur</span>
                    <span className="px-4 py-2 text-sm rounded-full bg-cyan-100 text-cyan-700 border border-cyan-200 font-medium">Handalig upplæring</span>
                    <span className="px-4 py-2 text-sm rounded-full bg-teal-100 text-teal-700 border border-teal-200 font-medium">Meistra vitlíki amboð</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-purple-200/30">
                <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 border border-purple-200/50 rounded-2xl p-8">
                  <div className="flex flex-col items-start gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-purple-800 mb-2">
                        ✨ Vil tú frígeva skapandi megina í vitlíki?
                      </p>
                      <p className="text-purple-700 mb-4">
                        Eg dugi at brúka vitlíki-amboð til at skapa myndir, video, tónleik og nógv annað tilfari, ið fangar áskoðaran. 
                      </p>
                      <p className="text-purple-700 mb-4">
                        Eg geri tilfar sum vanliga hevði tikið tímar at framleiða uppá stutta tíð – alt gjørt við nýggjastu og bestu vitlíki-tøknini.
                      </p>
                      <p className="text-purple-700 mb-4">
                        Um tú bara vilt hava meg at gera arbeiðið, ella sjálvur vilt læra at stýra hesum amboðum, so kan eg hjálpa tær við báðum.
                      </p>
                      <p className="text-purple-700 text-sm mb-4">
                        Fylg Vitlíkistovuna á sosialum miðlum fyri at síggja dømir av ymiskum tilfari, fáa íblástur og lær meira um, hvat ber til við vitlíki.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <a 
                          href="https://facebook.com/vitlikisstovan" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          Facebook
                        </a>
                        <a 
                          href="https://linkedin.com/company/vitlikisstovan" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* FINAL CTA */}
        <Section className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-3">
              Vilt tú byrja tína vitlíki-ferð?
            </h3>
            <p className="mb-8">
              Byrja við okkara ChatGPT-skeiði í dag.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-medium bg-primary text-primary-foreground hover:opacity-90 transition"
              aria-label="Byrja nú"
            >
              [Byrja nú]
              <Rocket className="h-5 w-5" />
            </a>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}