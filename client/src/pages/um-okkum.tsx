import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { seoConfig } from "@/content/seo";
import { Separator } from "@/components/ui/separator";

export default function UmOkkum() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    document.title = "Um okkum - " + seoConfig.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    const content =
      "Lær meira um Vitlíkisstovuna og okkara uppgávu at vegleiða føroyskar fyritøkur í vitlíki.";
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

      <main className="bg-gray-50">
        {/* Magazine-style Header */}
        <div className="bg-white border-b-4 border-black">
          <Section className="py-16">
            <div className="mx-auto max-w-7xl">
              <h1 className="text-5xl md:text-7xl font-serif text-center mb-8">
                Um Vitlíkisstovuna
              </h1>
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-2xl font-serif italic text-gray-700 mb-4">
                  "Eg royni at grundfesta vitlíki í Føroyum – og víðari"
                </p>
                <Separator className="my-6" />
                <p className="text-lg text-gray-600">
                  Stig fyri stig broytir vitlíki heimin. Eg kann syrgja fyri, at tú ikki verður afturúrsigldur.
                </p>
              </div>
            </div>
          </Section>
        </div>

        {/* Main Content Area - Two Column Layout */}
        <Section className="py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-3 gap-12">
              {/* Main Content Column */}
              <div className="md:col-span-2 space-y-12">
                
                {/* Mission Article */}
                <article className="bg-white p-8 border">
                  <header className="mb-6">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">MISSIÓN</p>
                    <h2 className="text-3xl font-serif mb-4">Mín uppgáva</h2>
                    <div className="w-24 h-0.5 bg-gray-300"></div>
                  </header>
                  <div className="prose max-w-none">
                    <p className="text-lg leading-relaxed mb-4">
                      <span className="font-bold text-xl">Vitlíkisstovan</span> varð stovnað av einføldum orsøkum:
                    </p>
                    <blockquote className="border-l-4 border-black pl-6 my-6 text-xl font-serif italic">
                      "At hjálpa føroyskum fyritøkum at brúka vitlíki."
                    </blockquote>
                    <p className="text-gray-700">
                      Mín niðurstøða er, at hetta skal gerast í trimum stigum og eg kann hjálpa allan vegin.
                    </p>
                  </div>
                </article>

                {/* Story Article */}
                <article className="bg-white p-8 border">
                  <header className="mb-6">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">SØGA</p>
                    <h2 className="text-3xl font-serif mb-4">Søgan: Nýskapan</h2>
                    <div className="w-24 h-0.5 bg-gray-300"></div>
                  </header>
                  
                  <div className="space-y-8">
                    {/* Chapter 1 */}
                    <div className="border-t pt-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <span className="bg-black text-white w-8 h-8 rounded-full inline-flex items-center justify-center mr-3 text-sm">1</span>
                        Persónlig ferð
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Eg havi altíð verið bergtikin av <strong>nýggjari tøkni</strong> – øllum tí, sum broytir, hvussu vit arbeiða og liva.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        Sum verkfrøðingur arbeiddi eg við framkomnum skipanum, men vitlíki fangaði meg meira enn nakað annað.
                      </p>
                    </div>

                    {/* Chapter 2 */}
                    <div className="border-t pt-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <span className="bg-black text-white w-8 h-8 rounded-full inline-flex items-center justify-center mr-3 text-sm">2</span>
                        Ein nýggj ásannan
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">So ein dag gekk tað upp fyri mær:</p>
                      <ul className="space-y-2 ml-12">
                        <li className="list-disc"><strong>vitlíki er ikki bara fyri stórar tøknirisar.</strong></li>
                        <li className="list-disc"><strong>vitlíki er ikki bara framtíð – tað er nú.</strong></li>
                        <li className="list-disc"><strong>vitlíki kann nýtast í øllum fyritøkum – eisini í Føroyum.</strong></li>
                      </ul>
                    </div>

                    {/* Chapter 3 */}
                    <div className="border-t pt-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <span className="bg-black text-white w-8 h-8 rounded-full inline-flex items-center justify-center mr-3 text-sm">3</span>
                        Loysnin
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Trupulleikin? <strong>Flestu hava ikki tíð at seta seg inn í tað.</strong>
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Tí stovnaði eg <strong>Vitlíkisstovuna</strong> – fyri at byggja brúnna millum <strong>møguleikarnar í vitlíki</strong> og <strong>veruliga tørvin hjá føroyskum fyritøkum</strong>.
                      </p>
                      <div className="bg-gray-100 p-4 border-l-4 border-black">
                        <p className="font-medium">
                          Nú hjálpa vit fyritøkum at sjálvvirka uppgávur, effektivisera arbeiðið og brúka vitlíki fult út – so tær kunnu leggja dent á tað, sum veruliga hevur týdning.
                        </p>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Vision Article */}
                <article className="bg-white p-8 border">
                  <header className="mb-6">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">VISJÓN</p>
                    <h2 className="text-3xl font-serif mb-4">Mín visjón: vitlíki til øll</h2>
                    <div className="w-24 h-0.5 bg-gray-300"></div>
                  </header>
                  
                  <div className="space-y-8">
                    <p className="text-xl font-serif italic text-gray-800 leading-relaxed">
                      vitlíki er ikki bara til <strong>Silicon Valley</strong>. Tað er til tína fyritøku. Títt toymi. Tín gerandisdag.
                    </p>
                    
                    <div className="border-t pt-8">
                      <h3 className="text-2xl font-serif mb-8 text-gray-900">Endamál</h3>
                      
                      <div className="space-y-8">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">✅</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold mb-2 text-gray-900">Lætt og atkomuligt</h4>
                            <p className="text-gray-700 leading-relaxed">Vitlíki kann verða greitt frá á ein sera fløktan hátt, men eisini á ein einfaldan hátt. Eg geri vitlíki lætt og atkomuligt fyri øll.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-14 h-14 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">💰</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold mb-2 text-gray-900">At skilja</h4>
                            <p className="text-gray-700 leading-relaxed">At hjálpa øllum í Føroyum at skilja, hvat teirra pláss kemur at vera, so við og við sum vitlíki verður klókari.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">⚡</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold mb-2 text-gray-900">Verulig úrslit</h4>
                            <p className="text-gray-700 leading-relaxed">At skapa vitlíki-loysnir, sum veruliga rigga. Tað er ov nógv tóm luft og dreymar í vitlíkisprátinum. Eg skeri ígjøgnum alt tað, sum ikki riggar.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-black text-white p-8 rounded-lg">
                      <p className="text-lg font-serif text-center leading-relaxed">
                        "Eg selji ikki bara 'vitlíki-ráðgeving'. Eg læri teg at nýta vitlíki munagott og trygt."
                      </p>
                    </div>
                  </div>
                </article>

              </div>

              {/* Sidebar */}
              <div className="md:col-span-1 space-y-8">
                
                {/* Quick Facts Card */}
                <Card className="border-2 border-black">
                  <CardHeader className="bg-black text-white rounded-t-[calc(theme(borderRadius.lg)-7px)]">
                    <CardTitle className="text-sm uppercase tracking-widest">Skjót fakta</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <p className="text-xs uppercase text-gray-500 mb-1">Stovnað</p>
                      <p className="font-bold">2023</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-xs uppercase text-gray-500 mb-1">Fokus</p>
                      <p className="font-bold">Vitlíkisupplæring, ráðgeving og menning</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-xs uppercase text-gray-500 mb-1">Málbólkur</p>
                      <p className="font-bold">Føroyskar fyritøkur</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-xs uppercase text-gray-500 mb-1">Høvuðsskeið</p>
                      <p className="font-bold">12 vikur</p>
                    </div>
                  </CardContent>
                </Card>

                {/* What Makes Us Different - Sidebar */}
                <Card className="border-2 border-black">
                  <CardHeader className="bg-black text-white rounded-t-[calc(theme(borderRadius.lg)-7px)]">
                    <CardTitle className="text-sm uppercase tracking-widest">Hvat ger okkum øðrvísi?</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                   
                    
                    <div>
                      <h4 className="font-bold text-green-600 mb-3">Okkara loysnir:</h4>
                      <ul className="space-y-3 text-sm">
                        <li>
                          <span className="font-bold block">Vit tosa títt mál</span>
                          <span className="text-gray-600">Ongar torgreiddar frágreiðingar</span>
                        </li>
                        <li>
                          <span className="font-bold block">Skjót úrslit</span>
                          <span className="text-gray-600">Tú sært mun beinanvegin</span>
                        </li>
                        <li>
                          <span className="font-bold block">Føroyskar røtur</span>
                          <span className="text-gray-600">Eg kenni marknaðin og fólkini</span>
                        </li>
                        <li>
                          <span className="font-bold block">Praktisk nýtsla</span>
                          <span className="text-gray-600">Mítt mál er, at tú fært gagn av vitlíki</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Call to Action Box */}
                <div className="bg-black text-white p-6">
                  <p className="text-xs uppercase tracking-widest mb-3">Til reiðar?</p>
                  <p className="font-serif text-xl mb-4">Set teg í samband við meg.</p>
                  <div className="w-full h-0.5 bg-white/30"></div>
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