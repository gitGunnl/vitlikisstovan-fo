import { useEffect } from "react";
import { ArrowRight, CheckCircle2, MessageSquareHeart, ShieldCheck, Sparkles } from "lucide-react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import VideoBackground from "@/components/site/VideoBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/content/site";
import { updateMetaTags } from "@/lib/meta";

const practicalSteps = [
  {
    title: "1. Stutt samrøða",
    description: "Vit staðfesta tørvin, avmarka uppgávuna og gera eina greiða byrjanarætlan.",
  },
  {
    title: "2. Trygg uppseting",
    description: "Vit seta leiðreglur, arbeiðshættir og amboð upp, so toymið kennir seg trygt.",
  },
  {
    title: "3. Handalig verkstova",
    description: "Fólk læra at brúka vitlíki til veruligar uppgávur frá sínum egna arbeiðsdegi.",
  },
];

const offerCards = [
  "Verkstovur fyri stovnar og fyritøkur",
  "Sergjørd vegleiðing til tykkara arbeiðsgongdir",
  "Ráðgeving um tryggan og ábyrgdarfullan vitlíkisbrúk",
  "Hjálp við at velja røttu amboðini",
];

export default function FrontpageV3() {
  useEffect(() => {
    updateMetaTags({
      title: "Vitlíkisstovan – frontpage v3 preview",
      description: "Preview av nýggjari forsíðu við greiðari leiðing, tryggleika og praktiskari byrjan.",
      image: "/images/og-image.png",
      url: `${window.location.origin}/frontpage-v3`,
      siteName: siteConfig.siteName,
    });
  }, []);

  return (
    <>
      <Header />
      <main className="bg-background">
        <section className="relative isolate overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pt-28">
          <VideoBackground videoSrc="/hero section video.webm" posterSrc="/images/hero-background.webp" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_35%)] pointer-events-none" />

          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12">
            <div className="max-w-3xl rounded-3xl border border-white/20 bg-black/30 p-6 shadow-2xl backdrop-blur-sm sm:p-10">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/90">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Praktiskt vitlíki til føroyskt arbeiðslív
              </p>
              <h1 className="text-balance text-3xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Ein tryggur og greiður máti at byrja við vitlíki
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
                Vit hjálpa stovnum og fyritøkum at brúka vitlíki til veruligt arbeiði. Eingin hype, eingin óneyðug kompleksitetur – bara greið mannagongd, góð ráðgeving og úrslit sum síggjast.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="h-12 rounded-xl px-6 text-base font-semibold">
                  <a href="/contact">
                    Bílegg verkstovu <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-xl border-white/40 bg-white/10 px-6 text-base text-white hover:bg-white/20 hover:text-white">
                  <a href="#for-tekur">Eg eri ikki heilt vís/ur enn</a>
                </Button>
              </div>

              <div className="mt-8 grid gap-3 text-sm text-white/85 sm:grid-cols-3">
                <p className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />Skjót og trygg byrjan</p>
                <p className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />Dentur á ábyrgd og professionalismu</p>
                <p className="inline-flex items-center gap-2"><MessageSquareHeart className="h-4 w-4 text-primary" aria-hidden="true" />Greitt mál, lætt at skilja</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-6xl gap-4 rounded-3xl border border-border/70 bg-card/70 p-5 backdrop-blur sm:grid-cols-3 sm:p-8">
            <p className="text-sm font-medium text-muted-foreground">Arbeitt við bæði almennum stovnum og privatum fyritøkum.</p>
            <p className="text-sm font-medium text-muted-foreground">Verkstovur, vegleiðing og ráðgeving lagað til føroyskar umstøður.</p>
            <p className="text-sm font-medium text-muted-foreground">Fokus á veruligar arbeiðsgongdir heldur enn tekniska show-off.</p>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="text-2xl font-semibold sm:text-3xl">Soleiðis gera vit fyrstu íløgu trygga og handaliga</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">Henda gongdin er gjørd til toymi, ið vilja hava eina góða byrjan uttan óneyðugan risiko og forvirring.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {practicalSteps.map((step) => (
                <Card key={step.title} className="rounded-2xl border-border/70 bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm leading-relaxed text-muted-foreground">{step.description}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="for-tekur" className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-2">
            <Card className="rounded-3xl border-border/70 bg-card p-2 shadow-sm">
              <CardHeader>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Til tykkum, sum eru klár</p>
                <CardTitle className="text-2xl">Byrjið við einari verkstovu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">Tá green light longu er har, gera vit næsta stig einfalt: ein greið avtala, ein greið agenda og ein verkstova við beinleiðis virði.</p>
                <Button asChild className="rounded-xl px-6">
                  <a href="/verkstova">Sí verkstovu</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-border/70 bg-card p-2 shadow-sm">
              <CardHeader>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Til tykkum, sum ivast</p>
                <CardTitle className="text-2xl">Fá greiðu á, um vitlíkisstovan er rætt fyri tykkum</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">Vit kunnu byrja við einum stuttum práti um tørv, avmarkingar og hvat gevur meining fyri tykkara slag av arbeiði.</p>
                <Button asChild variant="outline" className="rounded-xl px-6">
                  <a href="/contact">Bílegg eitt prát</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="px-4 pb-20 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl rounded-3xl border border-border/70 bg-gradient-to-b from-card to-muted/20 p-6 sm:p-10">
            <h2 className="text-2xl font-semibold sm:text-3xl">Tænastur, tit kunnu skanna eftir fáum sekundum</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {offerCards.map((item) => (
                <div key={item} className="rounded-xl border border-border/70 bg-background/80 px-4 py-3 text-sm text-foreground/90">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-xl"><a href="/okkara-taenastur">Sí allar tænastur</a></Button>
              <Button asChild variant="ghost" className="rounded-xl"><a href="/um-okkum">Les um arbeiðsháttin</a></Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
