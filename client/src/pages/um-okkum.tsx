import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { seoConfig } from "@/content/seo";

export default function UmOkkum() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Set page metadata
    document.title = "Um okkum - " + seoConfig.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    const content =
      "Lær meira um Vitlíkisstovan og okkara uppgávu at vegleiða føroysk fyrirtøk í vitlíkis tímanum.";
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Header />

      <main>
        <Section className="py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">
              Um okkum
            </h1>

            {/* Section: Vit bera vitlíki… */}
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              Vit bera vitlíki til Føroyar – og víðari
            </h2>
            <p className="leading-relaxed mb-6">
              Stig fyri stig broytur vitlíki heimin. Vit syrgja fyri, at tú ikki
              dettur afturúr.
            </p>
            <p className="leading-relaxed mb-3">
              <strong>Vitlíkisstovan</strong> var stovna av einføldum orsøkum:
            </p>
            <p className="leading-relaxed mb-3">
              <strong>At hjálpa føroyskum fyritøkum at brúka vitlíki.</strong>
            </p>
            <p className="leading-relaxed mb-10">
              Vit eru nú komin fram til at hettar skal gerast í trimum stigum og
              vit hjálpa allan vegin.
            </p>

            {/* Section: Okkara søga */}
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              Okkara søga: Nýskapan
            </h2>
            <p className="leading-relaxed mb-4">
              Eg havi altíð verið bergtikin av{" "}
              <strong>nýggjari tøkni</strong> – øllum tí, sum broytir, hvussu vit
              arbeiða og liva.
            </p>
            <p className="leading-relaxed mb-4">
              Sum verkfrøðingur arbeiddi eg við framkomnum skipanum, men einki
              fangaði meg sum vitlíki.
            </p>
            <p className="leading-relaxed mb-4">So ein dag gekk tað upp fyri mær:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                💡 <strong>vitlíki er ikki bara fyri stórar tøkni-risar.</strong>
              </li>
              <li>
                💡 <strong>vitlíki er ikki bara framtíð – tað er nú.</strong>
              </li>
              <li>
                💡{" "}
                <strong>
                  vitlíki kann nýtast í øllum fyritøkum – eisini í Føroyum.
                </strong>
              </li>
            </ul>
            <p className="leading-relaxed mb-4">
              Trupulleikin? <strong>Flestu hava ikki tíð at seta seg inn í tað.</strong>
            </p>
            <p className="leading-relaxed mb-4">
              Tí stovnaði eg <strong>Tøkni Tænastuna</strong> – fyri at byggja
              brúnna millum <strong>møguleikarnar hjá vitlíkii</strong> og{" "}
              <strong>veruligu tørvin hjá føroyskum fyritøkum</strong>.
            </p>
            <p className="leading-relaxed mb-10">
              Nú hjálpa vit fyritøkum at{" "}
              <strong>
                sjálvvirka uppgávur, effektivisera arbeiðið og brúka vitlíki
                fult út
              </strong>{" "}
              – so tær kunnu fokusera uppá tað, sum veruliga hevur týdning.
            </p>

            {/* Section: Okkara visjón */}
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              Okkara visjón: vitlíki til øll
            </h2>
            <p className="leading-relaxed mb-4">
              vitlíki er ikki bara fyri <strong>Silicon Valley</strong>. Tað er fyri
              tína fyritøku. Títt toymi. Tína gerandisdag.
            </p>
            <p className="leading-relaxed mb-3">Mál okkara hjá <strong>Tøkni Tænastuni</strong> er at:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                ✅ <strong>Gera vitlíki lætt og atkomuligt</strong> fyri øll.
              </li>
              <li>
                ✅ <strong>Hjálpa fyritøkum at spara tíð og tilfeingi</strong> – uttan
                at seta fleiri fólk í starv.
              </li>
              <li>
                ✅ <strong>Skapa vitlíki-loysnir, sum veruliga rigga.</strong>
              </li>
            </ul>
            <p className="leading-relaxed mb-10">
              Vit selja ikki bara "vitlíki-ráðgeving". Vit{" "}
              <strong>læra, innføra og byggja</strong> loysnir, sum geva{" "}
              <strong>verulig úrslit</strong>.
            </p>

            {/* Section: Hvat ger okkum øðrvísi? */}
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              Hvat ger okkum øðrvísi?
            </h2>
            <p className="leading-relaxed mb-4">
              vitlíki er <strong>allastaðni</strong>, men flestu fyritøkur stríðast við
              somu spurningar:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>❌ <strong>Hvar skulu vit byrja?</strong></li>
              <li>❌ <strong>Hvussu riggar tað í verki?</strong></li>
              <li>❌ <strong>Er vitlíki ov trupult fyri okkum?</strong></li>
            </ul>
            <p className="leading-relaxed mb-3">Tað, sum ger okkum øðrvísi:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                💡 <strong>Vit tosa títt mál.</strong> Ongar torgreiddar
                forklaringar – bara greið ráðgeving.
              </li>
              <li>
                🚀 <strong>Vit leggja dent á skjót úrslit.</strong> Tú sært mun
                beinanvegin.
              </li>
              <li>
                🇫🇴 <strong>Vit kenna føroyska marknaðin.</strong> Vit skilja
                veruligu avbjóðingarnar.
              </li>
              <li>
                🤖 <strong>Vit brúka sjálvi vitlíki hvønn dag.</strong> Tað her er
                ikki bara teori – vit vita, hvat riggar.
              </li>
            </ul>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
