import React, { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import CardFeature from "@/components/site/CardFeature";
import CTAButtons from "@/components/site/CTAButtons";
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
  Video,
  Mail,
  Phone,
  Download,
  Calendar,
  Briefcase,
  HelpCircle,
  ArrowRight,
  Package
} from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

// Utility function to update meta tags
function updateMetaTags({ title, description, image, url, type, siteName }) {
  const updateTag = (name, content) => {
    let tag = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      if (name.startsWith('og:')) {
        tag.setAttribute('property', name);
      } else {
        tag.setAttribute('name', name);
      }
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  document.title = title;
  updateTag('description', description);
  updateTag('og:title', title);
  updateTag('og:description', description);
  updateTag('og:image', image);
  updateTag('og:url', url);
  updateTag('og:type', type);
  if (siteName) {
    updateTag('og:site_name', siteName);
  }

  // Add Twitter card specific tags
  updateTag('twitter:card', 'summary_large_image');
  updateTag('twitter:title', title);
  updateTag('twitter:description', description);
  updateTag('twitter:image', image);
}

export default function FrontpageV3() {
  const [isMounted, setIsMounted] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [programOpen, setProgramOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Set page metadata with Open Graph support
    const fullTitle = `${siteConfig.siteName} - ${siteConfig.tagline}`;

    updateMetaTags({
      title: fullTitle,
      description: seoConfig.description,
      image: seoConfig.ogImage,
      url: window.location.origin,
      type: 'website',
      siteName: seoConfig.siteName
    });

    // Handle hash navigation (e.g., #contact)
    const hash = window.location.hash;
    if (hash) {
      // Wait a bit for the page to fully render
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
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
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-24 sm:pt-32 pb-16"
        >
          {/* Video Background with Image Fallback */}
          <VideoBackground
            videoSrc="/hero section video.webm"
            posterSrc="/images/hero-background.webp"
          />

          {/* Background overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background/90 hero-overlay pointer-events-none"></div>

          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

              {/* Left Column: Primary Pitch & 3-hour Workshop */}
              <div className="space-y-8 animate-slide-up">
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    <span className="text-emerald-400">Vitlíki</span> <br />
                    á tíni skrivstovu
                  </h1>
                  <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                    {siteConfig.hero.slides[0].subtitle}
                  </p>
                </div>

                {/* 3-Hour Workshop Card (Primary) */}
                <Card className="bg-background/95 backdrop-blur border-emerald-500/50 shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
                  <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">3 tíma verkstova</h3>
                        <p className="text-emerald-600 font-medium">Besta byrjanin fyri flestu toymi</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-foreground">25.000 kr.</span>
                        <span className="text-xs text-muted-foreground block">+ mvg</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6">
                      Eg komi út til tykkum, og vit fara ígjøgnum grundleggjandi vitlíki, uppseting av amboðum, og loysa ítøkiligar uppgávur saman.
                    </p>

                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-3 text-sm">
                        <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span>Fyrireikingarsamrøða áðrenn vit møtast</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <Package className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span>Startpakki við skabelónum og dømum</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <FileText className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span>One-pager og 30-daga ætlan til leiðsluna</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <Calendar className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span>45 min uppfylging 2-3 vikur seinni</span>
                      </li>
                    </ul>

                    <Button
                      size="lg"
                      className="w-full text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-emerald-500/25 h-14"
                      onClick={() => {
                        const element = document.querySelector('#contact');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      Bílegg 3 tíma verkstovu
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Full Day Option & Secondary Actions */}
              <div className="space-y-6 lg:mt-24 animate-slide-up" style={{ animationDelay: '150ms' }}>
                {/* Full Day Card */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">Heilur dagur</h3>
                      <span className="text-2xl font-bold">45.000 kr.</span>
                    </div>
                    <p className="text-white/80 text-sm mb-4">
                      Fyri størri toymi ella tá tit vilja fara djúpri. Inniheldur alt frá 3-tíma verkstovuni, pluss meira tíð til venjing og 2 uppfylgingar.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-white/40 text-white hover:bg-white hover:text-emerald-900"
                      onClick={() => {
                        const element = document.querySelector('#contact');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      Vel heilan dag
                    </Button>
                  </CardContent>
                </Card>

                {/* Not Sure Link */}
                <div className="text-center">
                  <button
                    onClick={() => {
                      const element = document.querySelector('#contact');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
                  >
                    <HelpCircle className="w-5 h-5" />
                    <span className="underline decoration-white/30 underline-offset-4 group-hover:decoration-white">
                      Er tú ivasam/ur? Spyr meg her
                    </span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Collapsible Program Section */}
        <section className="py-12 bg-muted/30 border-b">
          <div className="max-w-4xl mx-auto px-4">
            <Collapsible open={programOpen} onOpenChange={setProgramOpen}>
              <div className="flex flex-col items-center gap-4">
                <p className="text-muted-foreground font-medium">Leitar tú eftir tí stóra 12-vikuskeiðnum?</p>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    {programOpen ? 'Fjal 12-vika skránna' : 'Les um 12-vika skránna'}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${programOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="mt-8 space-y-16 animate-slide-down overflow-hidden data-[state=closed]:animate-slide-up">

                {/* The Flagship Program */}
                <Section id="program" className="py-24 sm:py-32 bg-gradient-to-b from-muted to-background">
                  <div className="mx-auto max-w-4xl text-center mb-16 animate-slide-up">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                      {siteConfig.program.title}
                    </h2>
                    <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                      {siteConfig.program.subtitle}
                    </p>
                  </div>

                  {/* What We Deliver Section */}
                  {siteConfig.program.whatWeDeliver && (
                    <div className="mb-16">
                      <div className="mx-auto max-w-4xl text-center mb-8">
                        <h3 className="text-2xl font-bold tracking-tight mb-4">
                          {siteConfig.program.whatWeDeliver.title}
                        </h3>
                      </div>

                      <Card className="bg-background max-w-4xl mx-auto border shadow-lg">
                        <CardContent className="p-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {siteConfig.program.whatWeDeliver.items?.map((item, index) => {
                              const icons = [
                                <FileText key={index} className="w-6 h-6 text-primary" />,
                                <Building2 key={index} className="w-6 h-6 text-primary" />,
                                <GraduationCap key={index} className="w-6 h-6 text-primary" />,
                                <CheckCircle key={index} className="w-6 h-6 text-primary" />
                              ];

                              return (
                                <div key={index} className="flex items-start space-x-4 p-2">
                                  <div className="flex-shrink-0 mt-1">
                                    {icons[index]}
                                  </div>
                                  <div>
                                    <h4 className="text-lg font-semibold mb-3 text-foreground">{item.title}</h4>
                                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                                  </div>
                                </div>
                              );
                            }) || []}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* How It Works Process */}
                  {siteConfig.program.howItWorks && (
                    <div className="mb-24">
                      <div className="mx-auto max-w-4xl text-center mb-12">
                        <h3 className="text-2xl font-bold tracking-tight mb-4">
                          {siteConfig.program.howItWorks.title}
                        </h3>
                      </div>

                      <Card className="bg-background max-w-5xl mx-auto border shadow-sm">
                        <CardContent className="p-8">
                          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            {siteConfig.program.howItWorks.steps?.map((step, index) => (
                              <React.Fragment key={index}>
                                <div className="flex-1 text-center">
                                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-primary-foreground font-bold text-xl">{step.number}</span>
                                  </div>
                                  <h4 className="font-semibold mb-2">{step.title}</h4>
                                  <p className="text-sm text-muted-foreground">{step.description}</p>
                                </div>

                                {index < siteConfig.program.howItWorks.steps.length - 1 && (
                                  <div className="hidden md:block text-muted-foreground">
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                                      <path d="M13 7l5 5-5 5M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                )}
                              </React.Fragment>
                            )) || []}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Delivery Section */}
                  {siteConfig.program.delivery && (
                    <div className="mb-16">
                      <div className="mx-auto max-w-4xl text-center mb-8">
                        <h3 className="text-2xl font-bold tracking-tight mb-4">
                          {siteConfig.program.delivery.title}
                        </h3>
                      </div>

                      <Card className="bg-background max-w-5xl mx-auto border shadow-sm">
                        <CardContent className="p-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                              {siteConfig.program.delivery.items?.slice(0, Math.ceil(siteConfig.program.delivery.items.length / 2)).map((item, index) => {
                                const icons = [
                                  <FileText className="w-5 h-5 text-primary" />,
                                  <Building2 className="w-5 h-5 text-primary" />,
                                  <GraduationCap className="w-5 h-5 text-primary" />,
                                  <Users className="w-5 h-5 text-primary" />
                                ];

                                return (
                                  <div key={index} className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                      {icons[index] || <CheckCircle className="w-5 h-5 text-primary" />}
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">{item.title}</h4>
                                      <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                  </div>
                                );
                              }) || []}
                            </div>

                            <div className="space-y-4">
                              {siteConfig.program.delivery.items?.slice(Math.ceil(siteConfig.program.delivery.items.length / 2)).map((item, index) => {
                                const icons = [
                                  <CheckCircle className="w-5 h-5 text-primary" />,
                                  <Lightbulb className="w-5 h-5 text-primary" />,
                                  <MessageCircle className="w-5 h-5 text-primary" />
                                ];

                                return (
                                  <div key={index} className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                      {icons[index] || <CheckCircle className="w-5 h-5 text-primary" />}
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">{item.title}</h4>
                                      <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                  </div>
                                );
                              }) || []}
                            </div>
                          </div>

                          {siteConfig.program.delivery.note && (
                            <div className="mt-8 pt-6 border-t">
                              <p className="text-sm text-center italic text-muted-foreground">
                                {siteConfig.program.delivery.note}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  )}

                </Section>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </section>

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

                        {/* Handle different case types */}
                        {highlight.dialogId && highlight.buttonText && (
                          <div>
                            <Button
                              variant={highlight.buttonVariant as "default" | "outline"}
                              size="lg"
                              onClick={() => setOpenDialog(highlight.dialogId!)}
                              data-testid={`button-case-${index}`}
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
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
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
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
                  {/* Free sample guides */}
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

                  {/* Project: Vitlíki til arbeiði */}
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

                  {/* Order your own guide */}
                  <section className="space-y-4">
                    <h4 className="text-lg font-semibold mb-2">Bílegg eina vegleiðing.</h4>
                    <p className="text-muted-foreground leading-[1.7] mb-4">
                      Tú fært eina <strong>sergjørda vegleiðing</strong> til júst tínar arbeiðsuppgávur
                      fyri <strong>1600 DKK</strong>. So veit tú akkurát hvat tú skalt nýta vitlíki til.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        asChild
                        aria-label="Bílegg vegleiðing"
                      >
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
                  {/* What participants learn */}
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

                  {/* Workshop formats */}
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

                  {/* Book a workshop */}
                  <section className="space-y-4">
                    <h4 className="text-lg font-semibold mb-2">Bílegg eina verkstovu</h4>
                    <p className="text-muted-foreground leading-[1.7] mb-4">
                      Hevur tú áhuga í eini verkstovu til tína fyritøku? Set teg í samband við meg, so finna vit eina loysn, ið er lagað til júst tykkara tørv.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        asChild
                        aria-label="Bílegg eina verkstovu"
                      >
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
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}