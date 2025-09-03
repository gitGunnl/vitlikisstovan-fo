import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Card, CardContent } from "@/components/ui/card";
import { seoConfig } from "@/content/seo";

export default function UmOkkum2() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    document.title = "Um okkum - Design 2 - " + seoConfig.title;

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

      <main className="overflow-x-hidden">
        {/* Bold Gradient Hero */}
        <div className="relative py-40 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative mx-auto max-w-6xl px-4">
            <h1 className="text-7xl md:text-9xl font-black text-white mb-8 transform -rotate-2">
              UM OKKUM
            </h1>
            <div className="max-w-2xl">
              <p className="text-3xl font-bold text-white mb-4">
                Vit bera vitlíki til Føroyar – og víðari
              </p>
              <p className="text-xl text-white/90 font-medium">
                Stig fyri stig broytur vitlíki heimin. Vit syrgja fyri, at tú ikki dettur afturúr.
              </p>
            </div>
          </div>
        </div>

        {/* Mission - Bold Card */}
        <Section className="py-32 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="mx-auto max-w-5xl">
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-yellow-400 rounded-full blur-2xl opacity-50"></div>
              <Card className="relative bg-gradient-to-br from-indigo-600 to-purple-700 border-0 shadow-2xl transform rotate-1">
                <CardContent className="p-12 text-white">
                  <h2 className="text-5xl font-black mb-8 text-center">OKKARA UPPGÁVA</h2>
                  <div className="text-center space-y-4">
                    <p className="text-xl">
                      <span className="font-bold text-yellow-300">Vitlíkisstovan</span> var stovna av einføldum orsøkum:
                    </p>
                    <p className="text-4xl font-black text-yellow-300 py-4">
                      At hjálpa føroyskum fyritøkum at brúka vitlíki.
                    </p>
                    <p className="text-lg text-white/90">
                      Vit eru nú komin fram til at hettar skal gerast í trimum stigum og vit hjálpa allan vegin.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pink-400 rounded-full blur-2xl opacity-50"></div>
            </div>
          </div>
        </Section>

        {/* Story - Dynamic Layout */}
        <Section className="py-32 bg-gradient-to-r from-cyan-50 to-blue-50">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-6xl font-black text-center mb-20 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              OKKARA SØGA: NÝSKAPAN
            </h2>
            
            {/* Personal Journey */}
            <div className="mb-24 relative">
              <div className="absolute -left-20 top-0 text-9xl font-black text-blue-100 -z-0">01</div>
              <div className="relative bg-white rounded-3xl shadow-xl p-10 transform -rotate-1">
                <h3 className="text-3xl font-black mb-6 text-blue-600">PERSÓNLIG FERÐ</h3>
                <p className="text-lg mb-4">
                  Eg havi altíð verið bergtikin av <span className="font-black text-purple-600 text-xl">nýggjari tøkni</span> – øllum tí, sum broytir, hvussu vit arbeiða og liva.
                </p>
                <p className="text-lg">
                  Sum verkfrøðingur arbeiddi eg við framkomnum skipanum, men einkt fangaði meg sum vitlíki.
                </p>
              </div>
            </div>

            {/* Realization */}
            <div className="mb-24 relative">
              <div className="absolute -right-20 top-0 text-9xl font-black text-yellow-100 -z-0">02</div>
              <div className="relative bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl shadow-xl p-10 transform rotate-1 text-white">
                <h3 className="text-3xl font-black mb-6">EYÐNARVIÐURKANNING</h3>
                <p className="text-lg mb-6 font-bold">So ein dag gekk tað upp fyri mær:</p>
                <div className="space-y-4">
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                    <p className="text-xl font-black">vitlíki er ikki bara fyri stórar tøkni-risar.</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                    <p className="text-xl font-black">vitlíki er ikki bara framtíð – tað er nú.</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                    <p className="text-xl font-black">vitlíki kann nýtast í øllum fyritøkum – eisini í Føroyum.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div className="relative">
              <div className="absolute -left-20 top-0 text-9xl font-black text-green-100 -z-0">03</div>
              <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-xl p-10 transform -rotate-1 text-white">
                <h3 className="text-3xl font-black mb-6">LOYSNIN</h3>
                <p className="text-lg mb-4">
                  Trupulleikin? <span className="font-black text-yellow-300 text-xl">Flestu hava ikki tíð at seta seg inn í tað.</span>
                </p>
                <p className="text-lg mb-6">
                  Tí stovnaði eg <span className="font-black text-yellow-300 text-xl">Vitlíkisstovuna</span> – fyri at byggja brúnna millum <span className="font-bold">møguleikarnar hjá vitlíkii</span> og <span className="font-bold">veruligu tørvin hjá føroyskum fyritøkum</span>.
                </p>
                <div className="bg-white/20 backdrop-blur rounded-xl p-6">
                  <p className="text-xl font-bold">
                    Nú hjálpa vit fyritøkum at sjálvvirka uppgávur, effektivisera arbeiðið og brúka vitlíki fult út – so tær kunnu fokusera uppá tað, sum veruliga hevur týdning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Vision - Vibrant Cards */}
        <Section className="py-32 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-20">
              <h2 className="text-6xl font-black text-white mb-8">OKKARA VISJÓN: VITLÍKI TIL ØLL</h2>
              <p className="text-2xl text-white/90 font-medium">
                vitlíki er ikki bara fyri <span className="text-yellow-400 font-black">Silicon Valley</span>. Tað er fyri tína fyritøku. Títt toymi. Tína gerandisdag.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="text-4xl font-black text-center mb-16 text-yellow-400">ENDAMÁL</h3>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-8 text-white transform hover:scale-105 transition-transform">
                  <div className="text-5xl mb-4">✅</div>
                  <p className="text-xl font-black mb-3">Lætt og atkomuligt</p>
                  <p className="font-medium">Gera vitlíki lætt og atkomuligt fyri øll.</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-8 text-white transform hover:scale-105 transition-transform">
                  <div className="text-5xl mb-4">💰</div>
                  <p className="text-xl font-black mb-3">Spara tilfeingi</p>
                  <p className="font-medium">Hjálpa fyritøkum at spara tíð og tilfeingi – uttan at seta fleiri fólk í starv.</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-8 text-white transform hover:scale-105 transition-transform">
                  <div className="text-5xl mb-4">⚡</div>
                  <p className="text-xl font-black mb-3">Verulig úrslit</p>
                  <p className="font-medium">Skapa vitlíki-loysnir, sum veruliga rigga.</p>
                </div>
              </div>
              
              <div className="text-center mt-16 p-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl">
                <p className="text-2xl font-black text-white">
                  Vit selja ikki bara "vitlíki-ráðgeving". Vit læra, innføra og byggja loysnir, sum geva verulig úrslit.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* What Makes Us Different */}
        <Section className="py-32 bg-gradient-to-b from-gray-100 to-white">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-6xl font-black text-center mb-8 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              HVAT GER OKKUM ØÐRVÍSI?
            </h2>
            <p className="text-2xl text-center mb-20 font-medium">
              vitlíki er <span className="font-black text-purple-600">allastaðni</span>, men flestu fyritøkur stríðast við somu spurningar
            </p>

            {/* Problems */}
            <div className="mb-20">
              <h3 className="text-4xl font-black text-center mb-12 text-red-600">VANLIGAR SPURNINGAR</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-red-500 text-white p-8 rounded-2xl transform rotate-2">
                  <p className="text-2xl font-black text-center">Hvar skulu vit byrja?</p>
                </div>
                <div className="bg-red-600 text-white p-8 rounded-2xl transform -rotate-1">
                  <p className="text-2xl font-black text-center">Hvussu riggar tað í verki?</p>
                </div>
                <div className="bg-red-700 text-white p-8 rounded-2xl transform rotate-1">
                  <p className="text-2xl font-black text-center">Er vitlíki ov trupult fyri okkum?</p>
                </div>
              </div>
            </div>

            {/* Our Approach */}
            <div>
              <h3 className="text-4xl font-black text-center mb-12 text-green-600">TÁ, SUM GER OKKUM ØÐRVÍSI</h3>
              
              <div className="grid gap-8 md:grid-cols-2">
                <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white p-8 rounded-2xl transform hover:-rotate-1 transition-transform">
                  <div className="text-4xl mb-4">💡</div>
                  <p className="text-2xl font-black mb-3">Vit tosa títt mál</p>
                  <p className="text-lg font-medium">Ongar torgreiddar forklaringar – bara greið ráðgeving.</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 rounded-2xl transform hover:rotate-1 transition-transform">
                  <div className="text-4xl mb-4">🚀</div>
                  <p className="text-2xl font-black mb-3">Skjót úrslit</p>
                  <p className="text-lg font-medium">Vit leggja dent á skjót úrslit. Tú sært mun beinanvegin.</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-2xl transform hover:-rotate-1 transition-transform">
                  <div className="text-4xl mb-4">🇫🇴</div>
                  <p className="text-2xl font-black mb-3">Føroyskar røtur</p>
                  <p className="text-lg font-medium">Vit kenna føroyska marknaðin. Vit skilja veruligu avbjóðingarnar.</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-8 rounded-2xl transform hover:rotate-1 transition-transform">
                  <div className="text-4xl mb-4">🤖</div>
                  <p className="text-2xl font-black mb-3">Praktisk royndsla</p>
                  <p className="text-lg font-medium">Vit brúka sjálvi vitlíki hvønn dag. Tað her er ikki bara teori – vit vita, hvat riggar.</p>
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