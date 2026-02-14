import React, { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import CardFeature from "@/components/site/CardFeature";
import ContactSection from "@/components/site/ContactForm";
import VideoBackground from "@/components/site/VideoBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { siteConfig } from "@/content/site";
import { seoConfig } from "@/content/seo";
import {
  GraduationCap,
  Building2,
  Users,
  Palette,
  Globe,
  Lightbulb,
  MessageCircle,
  Zap,
  CheckCircle,
  FileText,
  Mail,
  Phone,
  Clock,
  CalendarCheck,
  BookOpen,
  FileBarChart,
  ChevronDown
} from "lucide-react";

function scrollToContact() {
  const el = document.querySelector("#contact-section");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function FrontpageV2() {
  const [isMounted, setIsMounted] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [programExpanded, setProgramExpanded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    document.title = `${siteConfig.siteName} - ${siteConfig.tagline}`;
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Header />

      <main>
        {/* ============================================================
            NEW HERO: Workshop-first with pricing
            ============================================================ */}
        <section
          id="hero"
          className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-20 sm:pt-24 lg:pt-28"
        >
          <VideoBackground
            videoSrc="/hero section video.webm"
            posterSrc="/images/hero-background.webp"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 w-full max-w-5xl mx-auto py-8 sm:py-12">
            {/* Tagline */}
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-white/70 text-sm sm:text-base font-medium tracking-wide uppercase mb-3">
                Vitlíkisstovan
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
                Gev tykkara starvsfólkum<br className="hidden sm:block" /> vitlíkisfatan á 3 tímar
              </h1>
              <p className="text-white/85 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                Praktisk verkstova har tykkara toym lærir at brúka vitlíki trygt og munagott. Inkl. fyribúgving, tilfar og eftirfylging.
              </p>
            </div>

            {/* Workshop Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto mb-6 sm:mb-8">
              {/* 3-hour workshop - Primary */}
              <div className="relative bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl p-6 sm:p-8 text-white ring-2 ring-emerald-400/50">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                    Mest vald
                  </span>
                </div>

                <div className="text-center mb-5">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg sm:text-xl font-bold">3-tíma verkstova</h3>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold mb-1">
                    25.000 <span className="text-lg font-normal text-white/70">kr.</span>
                  </div>
                  <p className="text-white/60 text-sm">Fyri toym upp til 15 fólk</p>
                </div>

                <ul className="space-y-2.5 text-sm text-white/90 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>30-min fyribúgvingarkall</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Byrjanarapakki (frymlar og dømur)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>1-síðu yvirlit til leiðslu + 30-daga áætlan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>45-min eftirfylging eftir 2–3 vikur</span>
                  </li>
                </ul>

                <button
                  onClick={scrollToContact}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all duration-200"
                >
                  Bílegg verkstovu
                </button>
              </div>

              {/* Full-day workshop */}
              <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 text-white">
                <div className="text-center mb-5">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CalendarCheck className="w-5 h-5 text-white/70" />
                    <h3 className="text-lg sm:text-xl font-bold">Heildagsverkstova</h3>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold mb-1">
                    45.000 <span className="text-lg font-normal text-white/70">kr.</span>
                  </div>
                  <p className="text-white/60 text-sm">Fyri toym upp til 25 fólk</p>
                </div>

                <ul className="space-y-2.5 text-sm text-white/90 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-white/50 mt-0.5 flex-shrink-0" />
                    <span>Alt í 3-tíma pakkanum, pluss:</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-white/50 mt-0.5 flex-shrink-0" />
                    <span>Dýpri venjing við egnum arbeiðsuppgávum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-white/50 mt-0.5 flex-shrink-0" />
                    <span>90-daga áætlan + tvær eftirfylgingar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-white/50 mt-0.5 flex-shrink-0" />
                    <span>Ítøkiligt yvirlit til leiðslu</span>
                  </li>
                </ul>

                <button
                  onClick={scrollToContact}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-all duration-200"
                >
                  Bílegg heildagsverkstovu
                </button>
              </div>
            </div>

            {/* Secondary: "Not sure?" path */}
            <div className="text-center">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm sm:text-base font-medium transition-colors duration-200 underline underline-offset-4 decoration-white/30 hover:decoration-white/60"
              >
                <MessageCircle className="w-4 h-4" />
                Ikki vís(ur)? Spyr meg fyrst
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================
            VALUE ADDS - What's included, expanded
            ============================================================ */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
                Hvat er við í verkstovuni?
              </h2>
              <p className="text-muted-foreground text-center text-base sm:text-lg mb-10 max-w-2xl mx-auto">
                Hetta er ikki "bara eitt skeið". Tit fáa alt tað, sum skal til fyri at koma gott í gongd.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-card border shadow-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Fyribúgvingarkall</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      30-minuttir áðrenn verkstovuna, har vit greiða frá tykkara tørvi og arbeiðshætti, so verkstovan verður skikka.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-card border shadow-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Byrjanarapakki</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Endurnýtiligir frymlar, dømur og birt, sum tit kunnu nýta beinleiðis eftir verkstovuna.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-card border shadow-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileBarChart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Yvirlit til leiðslu + áætlan</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Ein-síðu samandrátt, ið leiðslan kann nýta beinleiðis, pluss ein greið 30-daga áætlan fyri næstu stig.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-card border shadow-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CalendarCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Eftirfylging</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      45-minuttir eftir 2–3 vikur, har vit kanna hvussu tað gongur og svara spurningum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            DEMOTED 12-WEEK PROGRAMME (collapsible)
            ============================================================ */}
        <section className="py-12 sm:py-16 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => setProgramExpanded(!programExpanded)}
                className="w-full flex items-center justify-between p-5 sm:p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow duration-200 text-left"
              >
                <div>
                  <p className="text-xs sm:text-sm text-primary font-medium uppercase tracking-wide mb-1">
                    Fyri toym, sum vilja meira
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold">
                    12-viku innleiðingarskeið
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Fullstendig vitlíkisinnleiðing fyri tykkara skrivstovu – frá strategi til daglig brúk.
                  </p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-300 ${
                    programExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Expanded content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  programExpanded ? "max-h-[3000px] opacity-100 mt-6" : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-8">
                  {/* Programme title */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold tracking-tight mb-3">
                      {siteConfig.program.title}
                    </h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                      {siteConfig.program.subtitle}
                    </p>
                  </div>

                  {/* What We Deliver */}
                  {siteConfig.program.whatWeDeliver && (
                    <div>
                      <h4 className="text-xl font-bold text-center mb-4">
                        {siteConfig.program.whatWeDeliver.title}
                      </h4>
                      <Card className="bg-background border shadow-sm">
                        <CardContent className="p-6 sm:p-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {siteConfig.program.whatWeDeliver.items?.map((item, index) => {
                              const icons = [
                                <FileText key={index} className="w-5 h-5 text-primary" />,
                                <Building2 key={index} className="w-5 h-5 text-primary" />,
                                <GraduationCap key={index} className="w-5 h-5 text-primary" />,
                                <CheckCircle key={index} className="w-5 h-5 text-primary" />
                              ];
                              return (
                                <div key={index} className="flex items-start space-x-3">
                                  <div className="flex-shrink-0 mt-1">{icons[index]}</div>
                                  <div>
                                    <h5 className="font-semibold mb-1">{item.title}</h5>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* How It Works */}
                  {siteConfig.program.howItWorks && (
                    <div>
                      <h4 className="text-xl font-bold text-center mb-4">
                        {siteConfig.program.howItWorks.title}
                      </h4>
                      <Card className="bg-background border shadow-sm">
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            {siteConfig.program.howItWorks.steps?.map((step, index) => (
                              <React.Fragment key={index}>
                                <div className="flex-1 text-center">
                                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-primary-foreground font-bold text-lg">{step.number}</span>
                                  </div>
                                  <h5 className="font-semibold mb-1">{step.title}</h5>
                                  <p className="text-sm text-muted-foreground">{step.description}</p>
                                </div>
                                {index < siteConfig.program.howItWorks.steps.length - 1 && (
                                  <div className="hidden md:block text-muted-foreground">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                      <path d="M13 7l5 5-5 5M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </div>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Delivery */}
                  {siteConfig.program.delivery && (
                    <div>
                      <h4 className="text-xl font-bold text-center mb-2">
                        {siteConfig.program.delivery.title}
                      </h4>
                      <p className="text-muted-foreground text-center text-sm mb-4">
                        {siteConfig.program.delivery.subtitle}
                      </p>
                      <Card className="bg-background border shadow-sm">
                        <CardContent className="p-6 sm:p-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {siteConfig.program.delivery.items?.map((item, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <CheckCircle className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                  <h5 className="font-semibold mb-1">{item.title}</h5>
                                  <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          {siteConfig.program.delivery.note && (
                            <div className="mt-6 pt-4 border-t">
                              <p className="text-sm text-center italic text-muted-foreground">
                                {siteConfig.program.delivery.note}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* CTA for the programme */}
                  <div className="text-center">
                    <button
                      onClick={scrollToContact}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <Mail className="w-4 h-4" />
                      Spyr um 12-vikuskeiðið
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            EVERYTHING BELOW "Ráðgeving og verkætlanir" — UNCHANGED
            Copied verbatim from home.tsx lines 567–1044
            ============================================================ */}

        {/* Consulting & Projects */}
        {siteConfig.consulting && (
          <Section id="consulting" className="py-24">
            <div className="mx-auto max-w-4xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {siteConfig.consulting.title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {siteConfig.consulting.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {siteConfig.consulting.services?.map((service, index) => {
                const icons = [
                  <Building2 key={index} className="w-6 h-6" />,
                  <Users key={index} className="w-6 h-6" />,
                  <Palette key={index} className="w-6 h-6" />
                ];

                return (
                  <CardFeature
                    key={index}
                    icon={icons[index] || <Building2 className="w-6 h-6" />}
                    title={service.title}
                    description={service.description}
                  />
                );
              }) || []}
            </div>
          </Section>
        )}

        {/* Why Vitlíkisstovan */}
        {siteConfig.why && (
          <Section id="why" className="py-24 bg-muted/30">
            <div className="mx-auto max-w-4xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {siteConfig.why.title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {siteConfig.why.subtitle}
              </p>
            </div>

            {siteConfig.why.features && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {siteConfig.why.features.map((feature, index) => {
                  const icons = [
                    <Globe key={index} className="w-6 h-6" />,
                    <Lightbulb key={index} className="w-6 h-6" />,
                    <MessageCircle key={index} className="w-6 h-6" />,
                    <Zap key={index} className="w-6 h-6" />
                  ];

                  return (
                    <CardFeature
                      key={index}
                      icon={icons[index] || <Globe className="w-6 h-6" />}
                      title={feature.title}
                      description={feature.description}
                    />
                  );
                })}
              </div>
            )}

            {/* Founder Section */}
            {siteConfig.why.founder && (
              <div className="mx-auto max-w-4xl">
                <h3 className="text-2xl font-bold tracking-tight mb-8 text-center">
                  {siteConfig.why.founder.heading}
                </h3>
                <Card className="bg-background border shadow-lg">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                      <div className="lg:col-span-1 text-center lg:text-left">
                        <div className="w-32 h-32 mx-auto lg:mx-0 mb-4 overflow-hidden rounded-full border-4 border-primary/20">
                          <img
                            src="/me.jpg"
                            alt="Portrait of Gunnleygur Clementsen"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-xl font-bold mb-2">{siteConfig.why.founder.name}</h4>
                        <p className="text-sm text-primary font-medium mb-4">{siteConfig.why.founder.role}</p>
                      </div>

                      <div className="lg:col-span-2">
                        <p className="text-muted-foreground mb-6 leading-relaxed">{siteConfig.why.founder.summary}</p>

                        {siteConfig.why.founder.bullets && (
                          <ul className="space-y-3 mb-6">
                            {siteConfig.why.founder.bullets.map((bullet, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                                <span className="text-sm leading-relaxed">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {siteConfig.why.founder.quote && (
                          <blockquote className="border-l-4 border-primary pl-6 py-4 italic text-muted-foreground bg-muted/30 rounded-r-lg">
                            "{siteConfig.why.founder.quote}"
                          </blockquote>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </Section>
        )}

        {/* Case Highlights */}
        <Section id="cases" className="py-28">
          <div className="mx-auto max-w-4xl text-center mb-20">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {siteConfig.cases.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {siteConfig.cases.subtitle}
            </p>
          </div>

          <div className="space-y-16">
            {siteConfig.cases.highlights?.map((highlight, index) => {
              const isEven = index % 2 === 0;
              return (
                <Card key={index} className={`bg-card border overflow-hidden case-card-${index + 1}`}>
                  <CardContent className="p-0">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                      <div className={!isEven ? 'lg:col-start-2' : ''}>
                        <img
                          src={highlight.image}
                          alt={highlight.imageAlt}
                          className="w-full h-64 lg:h-full object-cover"
                        />
                      </div>
                      <div className={`p-10 lg:p-14 flex flex-col justify-center ${!isEven ? 'lg:col-start-1' : ''}`}>
                        <h3 className="text-2xl lg:text-3xl font-bold mb-8">{highlight.title}</h3>
                        <p className="text-muted-foreground mb-10 text-lg leading-[1.8]">
                          {highlight.description}
                        </p>

                        {highlight.dialogId && highlight.buttonText && (
                          <div>
                            <Button
                              variant={highlight.buttonVariant as "default" | "outline"}
                              size="lg"
                              onClick={() => setOpenDialog(highlight.dialogId!)}
                            >
                              {highlight.buttonText}
                            </Button>
                          </div>
                        )}

                        {highlight.showSocialLinks && (
                          <div className="space-y-4">
                            {highlight.followText && (
                              <p className="text-sm text-muted-foreground italic">
                                {highlight.followText}
                              </p>
                            )}
                            <div className="flex items-center gap-4">
                              {siteConfig.social.facebook && (
                                <a
                                  href={siteConfig.social.facebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                  </svg>
                                  Facebook
                                </a>
                              )}
                              {siteConfig.social.linkedin && (
                                <a
                                  href={siteConfig.social.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                  </svg>
                                  LinkedIn
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            }) || []}
          </div>

          {/* Dialog for Vegleiðingar */}
          <Dialog open={openDialog === 'vegleidingar'} onOpenChange={() => setOpenDialog(null)}>
            <DialogContent className="max-w-2xl max-h-[85vh]">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-xl font-bold mb-2">Vegleiðingar & Verkstovur</DialogTitle>
                <DialogDescription className="text-base leading-relaxed">
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[500px] px-4">
                <div className="space-y-8 pr-6">
                  <section className="space-y-4">
                    <h4 className="text-lg font-semibold mb-2">Ókeypis dømi (2 vegleiðingar)</h4>
                    <p className="text-muted-foreground leading-[1.7] mb-4">
                      Vit bjóða tvey ókeypis royndarskjøl: eitt ætlað <strong>lærarum</strong> og eitt ætlað
                      <strong> politikarum</strong>. Bæði innihalda listar við gagnligum nýtslum fyri hesi
                      starvsøki – og <em>eina neyva stig‑fyrir‑stig leiðbeining</em> um, hvussu tú gert hesar
                      uppgávur við vitlíki.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      <Button asChild className="w-full">
                        <a href="/vegleiding_undirvisarir.pdf" target="_blank" rel="noopener noreferrer">
                          <FileText className="mr-2 h-4 w-4" />
                          Tak niður: Lærarar (PDF)
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <a href="/Ein_handalig_vegleiding_til_politikarir.pdf" target="_blank" rel="noopener noreferrer">
                          <FileText className="mr-2 h-4 w-4" />
                          Tak niður: Politikarar (PDF)
                        </a>
                      </Button>
                    </div>
                  </section>
                  <section className="space-y-4">
                    <h4 className="text-lg font-semibold mb-2">"Vitlíki til arbeiðis"</h4>
                    <p className="text-muted-foreground leading-[1.7] mb-3">
                      <strong>Granskingargrunnurin</strong> hevur stuðlað mær í at menna <strong>"Vitlíki til arbeiðis"</strong> –
                    ein verkætlan har eg geri vegleiðingar, sum skulu hjálpa ávísum bólkum at koma gott ígongd við vitlíki. Felags fyri hesar bólkar er at tað eru bólkar, sum ikki sita við teldu dagliga, hesir bólkar eru í vanda fyri at koma ov seint ígongd við vitlíki og tí hjálpi eg júst teimum.
                    </p>
                    <p className="text-muted-foreground leading-[1.7] mb-4">
                      Fyrstu vegleiðingar vera klárar í byrjanini av novembur 2025.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-4">
                      <Button
                        onClick={() => {
                          setOpenDialog(null);
                          window.location.href = '/tilarbeidis';
                        }}
                        aria-label="Les meira um verkætlanina her"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Les meira um verkætlanina her
                      </Button>
                    </div>
                  </section>
                  <section className="space-y-4">
                    <h4 className="text-lg font-semibold mb-2">Bílegg eina vegleiðing.</h4>
                    <p className="text-muted-foreground leading-[1.7] mb-4">
                      Tú fært eina <strong>sergjørda vegleiðing</strong> til júst tínar arbeiðsuppgávur
                      fyri <strong>1600 DKK</strong>. So veit tú akkurát hvat tú skalt nýta vitlíki til.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button asChild aria-label="Bílegg vegleiðing">
                        <a href="/contact">
                          <Mail className="mr-2 h-4 w-4" />
                          Bílegg vegleiðing (1600 DKK)
                        </a>
                      </Button>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          {/* Dialog for Verkstovur */}
          <Dialog open={openDialog === 'verkstovur'} onOpenChange={() => setOpenDialog(null)}>
            <DialogContent className="max-w-2xl max-h-[85vh]">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-xl font-bold mb-2">Verkstovur og skeið</DialogTitle>
                <DialogDescription className="text-base leading-relaxed">
                  Eg havi hildið hópin av verkstovum um hvussu tú brúkar ChatGPT og onnur vitlíki‑amboð
                  í veruligum arbeiðsuppgávum.
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[500px] px-4">
                <div className="space-y-8 pr-6">
                  <section className="space-y-4">
                    <h4 className="text-lg font-semibold mb-2">Hvat luttakararnir læra</h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>At skilja møguleikar og avmarkingar við vitlíki.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>At brúka KjattGPT og onnur viðkomandi amboð í verki.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>At skapa munagóð birt, ið eru lagað til teirra egnu arbeiðsuppgávur.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Høvuðsdentur verður lagdur á felags venjingar við dømum úr gerandisdegnum.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Vit gjøgnumganga góðar mannagongdir fyri trygd og etikki innan vitlíki.</span>
                      </li>
                    </ul>
                  </section>
                  <section className="space-y-4">
                    <h4 className="text-lg font-semibold mb-2">Dømi um verkstovur</h4>
                    <div className="space-y-3">
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-semibold mb-1">Hálvdagsinnleiðsluskeið</h5>
                        <p className="text-sm text-muted-foreground">Hetta sniðið hevur riggað serliga væl til starvsfólk, eitt nú á skrivstovum, ið skulu koma skjótt í gongd.</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-semibold mb-1">Heildagsdýpdarskeið</h5>
                        <p className="text-sm text-muted-foreground">Vit hava brúkt hetta til størri bólkar, eitt nú tá vit undirvístu umleið 200 lærarum, har dentur varð lagdur á ítøkiligar nýtsluhættir at fyrireika tímarnar.</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-semibold mb-1">Skeiðsgongdir yvir fleiri dagar</h5>
                        <p className="text-sm text-muted-foreground">Til fyritøkur, sum ynskja at gera øll síni skrivstovufólk klár til at kunna arbeiða munagott og trygt við vitlíki. Hetta er viðmælt ein og hvørjari fyritøku sum vil taka vitlíki í álvara.</p>
                      </div>
                    </div>
                  </section>
                  <section className="space-y-4">
                    <h4 className="text-lg font-semibold mb-2">Bílegg eina verkstovu</h4>
                    <p className="text-muted-foreground leading-[1.7] mb-4">
                      Hevur tú áhuga í eini verkstovu til tína fyritøku? Set teg í samband við meg, so finna vit eina loysn, ið er lagað til júst tykkara tørv.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button asChild aria-label="Bílegg eina verkstovu">
                        <a href="/contact">
                          <Mail className="mr-2 h-4 w-4" />
                          Bílegg verkstovu
                        </a>
                      </Button>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          {/* Dialog for Týðingar */}
          <Dialog open={openDialog === 'tydingar'} onOpenChange={() => setOpenDialog(null)}>
            <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
              <DialogHeader className="pb-8">
                <DialogTitle className="text-2xl font-bold mb-3">Vitlíkistýðing – danskt til føroyskt</DialogTitle>
                <DialogDescription className="text-lg leading-relaxed pt-2">
                  Ein væl eydnað vitlíki‑verkætlan: Frá undankanning og frágreiðing til eitt hent amboð.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-10">
                <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-8 rounded-xl border">
                  <p className="text-foreground leading-[1.8] text-base">
                    Ein kundi skuldi týða ein hóp av skjalum úr <strong>donskum til føroyskt</strong> og spurdi,
                    um vitlíki kundi hjálpa. Eg segði "møguliga, men eg kann vísa tykkum akkurát hvussu gott vitlíki kann týða úr donskum til føroyskt og so kunnu tit taka avgerð, um tit vilja fara víðari við hesum. Fyrst gjørdu vit eitt sera gott birt <em>(prompt)</em>,
                    og síðani <strong>royndu vit hetta birt á øllum teimum bestu altjóða modellunum.</strong>"
                    Niðurstøðurnar vórðu lagdar fram í eini greiðari <strong>frágreiðing</strong>.
                  </p>
                </div>
                <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-background to-muted/20 p-8">
                  <div className="mb-8">
                    <h4 className="font-bold text-xl mb-4 text-foreground">Frá undankanning til amboð</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Kundin var væl nøgdur við hvussu vitlíki umsetti tekstin, og vit bygdu síðani eitt einfalt – men sterkt – amboð:
                    </p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-background/60 border border-border/50 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-base mb-2">Innlesing av skjølum</h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">Tekur inn donsk Word-skjøl.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-background/60 border border-border/50 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-base mb-2">Vitlíki‑týðing</h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">Nú brúktu vit birtið, sum vit høvdu gjørt frammanundan til at týða tekstin til føroyskt.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-background/60 border border-border/50 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-base mb-2">Yvirlit yvir allar setningar</h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Amboðið vísir allar teir umsettu setningarnar, soleiðis at eitt fólk kann rætta og góðkenna alt áðrenn tað fer víðari.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-background/60 border border-border/50 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-base mb-2">Góðkenning</h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Setningar kunnu merkjast sum "góðkendir" eftir rætting. Hetta kallast "Human in the loop" og er eitt sera vitalt ting at hava við, tá ið ein arbeiðir við vitlíki.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-background/60 border border-border/50 hover:shadow-md transition-shadow lg:col-span-2">
                      <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-base mb-2">Útflutningur til Word</h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Tá alt skjalið er góðkent, verður endaligi teksturin fluttur út sum Word‑fílu á føroyskum.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-8 rounded-xl border-l-4 border-primary mt-6">
                  <blockquote className="text-lg italic text-foreground leading-[1.7] font-medium">
                    Stutt sagt: ein sera væl eydnað vitlíkisverkætlan, sum riggaði væl – og gav skjót, dygdargóð úrslit.
                  </blockquote>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </Section>

        {/* Contact Section */}
        <div id="contact-section">
          <ContactSection />
        </div>
      </main>

      <Footer />
    </>
  );
}
