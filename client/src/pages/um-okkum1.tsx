import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Card, CardContent } from "@/components/ui/card";
import { seoConfig } from "@/content/seo";

export default function UmOkkum1() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    document.title = "Um okkum - Design 1 - " + seoConfig.title;

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

      <main className="min-h-screen bg-white">
        {/* Minimalist Hero */}
        <Section className="py-32 border-b">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-6xl font-thin tracking-wide mb-4 text-gray-900">
              Um okkum
            </h1>
            <div className="w-24 h-0.5 bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg font-light text-gray-600 mb-2">
              Vit bera vitlíki til Føroyar – og víðari
            </p>
            <p className="text-base font-light text-gray-500">
              Stig fyri stig broytur vitlíki heimin. Vit syrgja fyri, at tú ikki dettur afturúr.
            </p>
          </div>
        </Section>

        {/* Mission - Clean Card */}
        <Section className="py-24">
          <div className="mx-auto max-w-3xl">
            <div className="bg-gray-50 p-16 rounded-none">
              <div className="text-center">
                <h2 className="text-3xl font-light mb-8 tracking-wide">Okkara uppgáva</h2>
                <p className="text-base text-gray-600 mb-4 font-light">
                  <span className="font-medium">Vitlíkisstovan</span> var stovna av einføldum orsøkum:
                </p>
                <p className="text-2xl font-thin text-gray-900 mb-6 tracking-wide">
                  At hjálpa føroyskum fyritøkum at brúka vitlíki.
                </p>
                <p className="text-sm text-gray-500 font-light">
                  Vit eru nú komin fram til at hettar skal gerast í trimum stigum og vit hjálpa allan vegin.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Story - Minimal Timeline */}
        <Section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-light text-center mb-16 tracking-wide">Okkara søga: Nýskapan</h2>
            
            <div className="space-y-12">
              {/* Personal Journey */}
              <div className="flex gap-8">
                <div className="w-16 text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center">
                    <span className="text-xs">01</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-light mb-4">Persónlig ferð</h3>
                  <p className="text-gray-600 mb-2 font-light">
                    Eg havi altíð verið bergtikin av <span className="font-medium">nýggjari tøkni</span> – øllum tí, sum broytir, hvussu vit arbeiða og liva.
                  </p>
                  <p className="text-gray-600 font-light">
                    Sum verkfrøðingur arbeiddi eg við framkomnum skipanum, men einkt fangaði meg sum vitlíki.
                  </p>
                </div>
              </div>

              {/* Realization */}
              <div className="flex gap-8">
                <div className="w-16 text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center">
                    <span className="text-xs">02</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-light mb-4">Eyðnarviðurkanning</h3>
                  <p className="text-gray-600 mb-4 font-light">So ein dag gekk tað upp fyri mær:</p>
                  <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                    <p className="text-gray-700">
                      <span className="font-medium">vitlíki er ikki bara fyri stórar tøkni-risar.</span>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">vitlíki er ikki bara framtíð – tað er nú.</span>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">vitlíki kann nýtast í øllum fyritøkum – eisini í Føroyum.</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Solution */}
              <div className="flex gap-8">
                <div className="w-16 text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center">
                    <span className="text-xs">03</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-light mb-4">Loysnin</h3>
                  <p className="text-gray-600 mb-3 font-light">
                    Trupulleikin? <span className="font-medium">Flestu hava ikki tíð at seta seg inn í tað.</span>
                  </p>
                  <p className="text-gray-600 mb-4 font-light">
                    Tí stovnaði eg <span className="font-medium">Vitlíkisstovuna</span> – fyri at byggja brúnna millum <span className="font-medium">møguleikarnar hjá vitlíkii</span> og <span className="font-medium">veruligu tørvin hjá føroyskum fyritøkum</span>.
                  </p>
                  <p className="text-gray-900 font-light">
                    Nú hjálpa vit fyritøkum at sjálvvirka uppgávur, effektivisera arbeiðið og brúka vitlíki fult út – so tær kunnu fokusera uppá tað, sum veruliga hevur týdning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Vision - Grid Layout */}
        <Section className="py-24">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light mb-6 tracking-wide">Okkara visjón: vitlíki til øll</h2>
              <p className="text-lg font-light text-gray-600">
                vitlíki er ikki bara fyri <span className="font-medium">Silicon Valley</span>. Tað er fyri tína fyritøku. Títt toymi. Tína gerandisdag.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-light text-center mb-12">Endamál</h3>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center p-8 border border-gray-200">
                  <div className="w-3 h-3 bg-gray-900 rounded-full mx-auto mb-6"></div>
                  <p className="font-medium mb-3">Lætt og atkomuligt</p>
                  <p className="text-sm text-gray-600 font-light">Gera vitlíki lætt og atkomuligt fyri øll.</p>
                </div>
                
                <div className="text-center p-8 border border-gray-200">
                  <div className="w-3 h-3 bg-gray-900 rounded-full mx-auto mb-6"></div>
                  <p className="font-medium mb-3">Spara tilfeingi</p>
                  <p className="text-sm text-gray-600 font-light">Hjálpa fyritøkum at spara tíð og tilfeingi – uttan at seta fleiri fólk í starv.</p>
                </div>
                
                <div className="text-center p-8 border border-gray-200">
                  <div className="w-3 h-3 bg-gray-900 rounded-full mx-auto mb-6"></div>
                  <p className="font-medium mb-3">Verulig úrslit</p>
                  <p className="text-sm text-gray-600 font-light">Skapa vitlíki-loysnir, sum veruliga rigga.</p>
                </div>
              </div>
              
              <div className="text-center mt-12 p-8 bg-gray-50">
                <p className="text-lg font-light text-gray-700">
                  Vit selja ikki bara "vitlíki-ráðgeving". Vit læra, innføra og byggja loysnir, sum geva verulig úrslit.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* What Makes Us Different */}
        <Section className="py-24 bg-gray-50">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-light text-center mb-6 tracking-wide">Hvat ger okkum øðrvísi?</h2>
            <p className="text-lg font-light text-gray-600 text-center mb-16">
              vitlíki er <span className="font-medium">allastaðni</span>, men flestu fyritøkur stríðast við somu spurningar
            </p>

            {/* Problems - Minimal List */}
            <div className="mb-16">
              <h3 className="text-xl font-light mb-8 text-center">Vanligar spurningar</h3>
              <div className="flex justify-center gap-12 text-center">
                <p className="text-gray-600">Hvar skulu vit byrja?</p>
                <span className="text-gray-300">|</span>
                <p className="text-gray-600">Hvussu riggar tað í verki?</p>
                <span className="text-gray-300">|</span>
                <p className="text-gray-600">Er vitlíki ov trupult fyri okkum?</p>
              </div>
            </div>

            {/* Our Approach - Clean List */}
            <div>
              <h3 className="text-2xl font-light mb-12 text-center">Tað, sum ger okkum øðrvísi</h3>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 border-l-2 border-gray-900">
                  <p className="font-medium mb-2">Vit tosa títt mál</p>
                  <p className="text-sm text-gray-600 font-light">Ongar torgreiddar forklaringar – bara greið ráðgeving.</p>
                </div>
                
                <div className="p-6 border-l-2 border-gray-900">
                  <p className="font-medium mb-2">Skjót úrslit</p>
                  <p className="text-sm text-gray-600 font-light">Vit leggja dent á skjót úrslit. Tú sært mun beinanvegin.</p>
                </div>
                
                <div className="p-6 border-l-2 border-gray-900">
                  <p className="font-medium mb-2">Føroyskar røtur</p>
                  <p className="text-sm text-gray-600 font-light">Vit kenna føroyska marknaðin. Vit skilja veruligu avbjóðingarnar.</p>
                </div>
                
                <div className="p-6 border-l-2 border-gray-900">
                  <p className="font-medium mb-2">Praktisk royndsla</p>
                  <p className="text-sm text-gray-600 font-light">Vit brúka sjálvi vitlíki hvønn dag. Tað her er ikki bara teori – vit vita, hvat riggar.</p>
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