import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Card, CardContent } from "@/components/ui/card";
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
        {/* Hero Section */}
        <Section className="py-20 sm:py-28 bg-gradient-to-b from-background via-muted/20 to-background">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              Um okkum
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Vit bera vitlíki til Føroyar – og víðari
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stig fyri stig broytur vitlíki heimin. Vit syrgja fyri, at tú ikki dettur afturúr.
            </p>
          </div>
        </Section>

        {/* Mission Card */}
        <Section className="py-16">
          <div className="mx-auto max-w-4xl">
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold mb-4">Okkara uppgáva</h2>
                <p className="text-lg mb-4">
                  <strong>Vitlíkisstovan</strong> var stovna av einføldum orsøkum:
                </p>
                <p className="text-xl font-semibold text-primary mb-4">
                  At hjálpa føroyskum fyritøkum at brúka vitlíki.
                </p>
                <p className="text-muted-foreground">
                  Vit eru nú komin fram til at hettar skal gerast í trimum stigum og vit hjálpa allan vegin.
                </p>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Story Section */}
        <Section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Okkara søga: Nýskapan</h2>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              {/* Personal Journey Card */}
              <Card>
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Persónlig ferð</h3>
                  <p className="text-muted-foreground mb-4">
                    Eg havi altíð verið bergtikin av <strong>nýggjari tøkni</strong> – øllum tí, sum broytir, hvussu vit arbeiða og liva.
                  </p>
                  <p className="text-muted-foreground">
                    Sum verkfrøðingur arbeiddi eg við framkomnum skipanum, men einki fangaði meg sum vitlíki.
                  </p>
                </CardContent>
              </Card>

              {/* Realization Card */}
              <Card>
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded-lg flex items-center justify-center mb-6">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Eyðnarviðurkanning</h3>
                  <p className="text-muted-foreground mb-4">So ein dag gekk tað upp fyri mær:</p>
                  <div className="space-y-2 text-sm">
                    <p>💡 <strong>vitlíki er ikki bara fyri stórar tøkni-risar.</strong></p>
                    <p>💡 <strong>vitlíki er ikki bara framtíð – tað er nú.</strong></p>
                    <p>💡 <strong>vitlíki kann nýtast í øllum fyritøkum – eisini í Føroyum.</strong></p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Solution Card */}
            <Card className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🌉</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Loysnin</h3>
                </div>
                <p className="text-center text-muted-foreground mb-4">
                  Trupulleikin? <strong>Flestu hava ikki tíð at seta seg inn í tað.</strong>
                </p>
                <p className="text-center mb-6">
                  Tí stovnaði eg <strong>Vitlíkisstovuna</strong> – fyri at byggja brúnna millum <strong>møguleikarnar hjá vitlíkii</strong> og <strong>veruligu tørvin hjá føroyskum fyritøkum</strong>.
                </p>
                <p className="text-center font-semibold text-green-700">
                  Nú hjálpa vit fyritøkum at sjálvvirka uppgávur, effektivisera arbeiðið og brúka vitlíki fult út – so tær kunnu fokusera uppá tað, sum veruliga hevur týdning.
                </p>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Vision Section */}
        <Section className="py-16">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Okkara visjón: vitlíki til øll</h2>
              <p className="text-xl text-muted-foreground">
                vitlíki er ikki bara fyri <strong>Silicon Valley</strong>. Tað er fyri tína fyritøku. Títt toymi. Tína gerandisdag.
              </p>
            </div>

            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Endamål</h3>
                </div>
                
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">✅</span>
                    </div>
                    <p className="font-semibold mb-2">Lætt og atkomuligt</p>
                    <p className="text-sm text-muted-foreground">Gera vitlíki lætt og atkomuligt fyri øll.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">💰</span>
                    </div>
                    <p className="font-semibold mb-2">Spara tilfeingi</p>
                    <p className="text-sm text-muted-foreground">Hjálpa fyritøkum at spara tíð og tilfeingi – uttan at seta fleiri fólk í starv.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">⚡</span>
                    </div>
                    <p className="font-semibold mb-2">Verulig úrslit</p>
                    <p className="text-sm text-muted-foreground">Skapa vitlíki-loysnir, sum veruliga rigga.</p>
                  </div>
                </div>
                
                <div className="text-center mt-8 p-6 bg-white/50 rounded-lg">
                  <p className="text-lg font-semibold text-purple-700">
                    Vit selja ikki bara "vitlíki-ráðgeving". Vit læra, innføra og byggja loysnir, sum geva verulig úrslit.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* What Makes Us Different */}
        <Section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Hvat ger okkum øðrvísi?</h2>
              <p className="text-xl text-muted-foreground">
                vitlíki er <strong>allastaðni</strong>, men flestu fyritøkur stríðast við somu spurningar
              </p>
            </div>

            {/* Common Problems */}
            <Card className="mb-8 bg-red-50 border-red-200">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">❌</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Vanligar spurningar</h3>
                </div>
                <div className="grid gap-4 md:grid-cols-3 text-center">
                  <div className="p-4">
                    <p className="font-semibold text-red-700">Hvar skulu vit byrja?</p>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-red-700">Hvussu riggar tað í verki?</p>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-red-700">Er vitlíki ov trupult fyri okkum?</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Our Approach */}
            <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🌟</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Tað, sum ger okkum øðrvísi</h3>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">💡</span>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Vit tosa títt mál</p>
                      <p className="text-sm text-muted-foreground">Ongar torgreiddar forklaringar – bara greið ráðgeving.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🚀</span>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Skjót úrslit</p>
                      <p className="text-sm text-muted-foreground">Vit leggja dent á skjót úrslit. Tú sært mun beinanvegin.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🇫🇴</span>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Føroyskar røtur</p>
                      <p className="text-sm text-muted-foreground">Vit kenna føroyska marknaðin. Vit skilja veruligu avbjóðingarnar.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🤖</span>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Praktisk royndsla</p>
                      <p className="text-sm text-muted-foreground">Vit brúka sjálvi vitlíki hvønn dag. Tað her er ikki bara teori – vit vita, hvat riggar.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
