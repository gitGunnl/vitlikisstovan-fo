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
                      Ein fyrilestur, sum gevur yvirlit, vísir møguleikar og
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
                      hándsama hjálp til at innarbeiða KjattGPT ella Copilot í
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

        {/* FINAL CTA */}
        <Section className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-3">
              Vilt tú býrja tína vitlíki-ferð?
            </h3>
            <p className="mb-8">
              Byrja við okkara KjattGPT-skeiði í dag.
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
