import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import CardFeature from "@/components/site/CardFeature";
import CTAButtons from "@/components/site/CTAButtons";
import ContactSection from "@/components/site/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
  Phone
} from "lucide-react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    // Set page metadata
    document.title = seoConfig.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoConfig.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = seoConfig.description;
      document.head.appendChild(meta);
    }

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
        className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 hero-background overflow-hidden"
      >
        {/* Background overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 hero-overlay"></div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 animate-pulse"></div>

        {/* Content container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-white hero-text leading-tight">
            {siteConfig.hero.title}
          </h1>
          <p className="text-xl sm:text-2xl mb-10 text-white/95 max-w-2xl mx-auto hero-text leading-relaxed">
            {siteConfig.hero.subtitle}
          </p>
          <CTAButtons
            primary={siteConfig.hero.primaryCTA}
            secondary={siteConfig.hero.secondaryCTA}
            className="mt-2 mb-16"
          />
          
          {/* Bottom of Hero CTA */}
          <div className="mt-16">
            <button
              onClick={() => {
                const element = document.querySelector('#consulting');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group flex items-center gap-3 mx-auto px-6 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 border border-white/20"
            >
              <span className="text-lg font-medium">
                Um tú ert her fyri ráðgeving ella annað, les meira longur nirrið
              </span>
              <svg 
                className="w-5 h-5 transition-transform group-hover:translate-y-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

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
          <div className="mb-24">
            <div className="mx-auto max-w-4xl text-center mb-12">
              <h3 className="text-2xl font-bold tracking-tight mb-4">
                Soleiðis byrja vit
              </h3>
            </div>

            <Card className="bg-background max-w-5xl mx-auto border shadow-sm">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1 text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary-foreground font-bold text-xl">1</span>
                    </div>
                    <h4 className="font-semibold mb-2">Samrøða (1 tími)</h4>
                    <p className="text-sm text-muted-foreground">Vit tosa um tykkara veruleika og seta rammuna fyri skeiðið.</p>
                  </div>

                  <div className="hidden md:block text-muted-foreground">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <path d="M13 7l5 5-5 5M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="flex-1 text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary-foreground font-bold text-xl">2</span>
                    </div>
                    <h4 className="font-semibold mb-2">Uppseting</h4>
                    <p className="text-sm text-muted-foreground">Vit gera leiðreglur, velja amboð og fyrireika verkstovur - tit skula bara læra.</p>
                  </div>

                  <div className="hidden md:block text-muted-foreground">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <path d="M13 7l5 5-5 5M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="flex-1 text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary-foreground font-bold text-xl">3</span>
                    </div>
                    <h4 className="font-semibold mb-2">Læra og brúka</h4>
                    <p className="text-sm text-muted-foreground">Verkstovur og stuðul á staðnum – og eftirfylging eftir 2–3 vikur.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Delivery Section */}
          {siteConfig.program.delivery && (
            <div className="mb-16">
              <div className="mx-auto max-w-4xl text-center mb-8">
                <h3 className="text-2xl font-bold tracking-tight mb-4">
                  {siteConfig.program.delivery.title}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {siteConfig.program.delivery.subtitle}
                </p>
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
        <Section id="cases" className="py-24">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {siteConfig.cases.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {siteConfig.cases.subtitle}
            </p>
          </div>

          <div className="space-y-12">
            {/* First Card - Vegleiðingar */}
            <Card className="bg-card border overflow-hidden case-card-1">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                      alt="Samstarv á eini skrivstovu"
                      className="w-full h-64 lg:h-full object-cover" 
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-6">Vegleiðingar og verkstovur</h3>
                    <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                      Eg havi gjørt nógvar vegleðingar og verkstovur til ymiskir bólkar, tildømis lærarar, námsfrøðingar, rithøvundar og eitt ótal av skrivstovufólki. Um tú vil læra meira um hvussu eg geri hesar vegleiðingar so kanst tú lesa meira her:
                    </p>
                    <div>
                      <Button 
                        variant="default"
                        size="lg"
                        onClick={() => setOpenDialog('vegleidingar')}
                        data-testid="button-case-0"
                      >
                        Les meira um hettar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Second Card - Vitlíki til týðing */}
            <Card className="bg-card border overflow-hidden case-card-2">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:grid-flow-dense">
                  <div className="lg:col-start-2">
                    <img 
                      src="/images/dansk til foroyskt.gif"
                      alt="Bøkur og tilfar um málslæru"
                      className="w-full h-64 lg:h-full object-cover" 
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center lg:col-start-1">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-6">Sergjørt amboð til týðing úr Donskum til Føroyskt</h3>
                    <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                      Onkumtíð so skal man bara hava hjálp frá vitlíki til eina ávísa uppgávu. Tildømis um tú skal týða Donsk skjal til Føroyskt. Hettar var ein uppgáva eg havi loyst fyri ein kunda. Les meira um hvussu tað gekk fyri seg her:
                    </p>
                    <div>
                      <Button 
                        variant="outline"
                        size="lg"
                        onClick={() => setOpenDialog('tydingar')}
                        data-testid="button-case-1"
                      >
                        Síggj dømið
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third Card - Kreativt vitlíki */}
            <Card className="bg-card border overflow-hidden case-card-3">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div>
                    <img 
                      src="/images/AI image example.jpeg"
                      alt="Filmframleiðsla og kreativt studio"
                      className="w-full h-64 lg:h-full object-cover" 
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-6">Kreativt vitlíki: myndir, filmar og annað</h3>
                    <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                      Vitlíki kann skapa alt millum himmal og jørð: myndir, filmar, tónleik og nógv annað. Eg deili regluliga tíðindir og ymiskar royndir eg geri við vitlíki, serliga í mun til at skapa tilfar við vitlíki, tú kann síggja nógv ting eg havi roynt á sosialum miðlum.
                    </p>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground italic">
                        Fylg okkum á sosialu miðlunum fyri at síggja dømi um tað vit hava skapað og fáa reglubundnar innsiktir um hvat er møguligt við vitlíki:
                      </p>
                      <div className="flex items-center gap-4">
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
              </CardContent>
            </Card>
          </div>

          {/* Dialog for Vegleiðingar */}
          <Dialog open={openDialog === 'vegleidingar'} onOpenChange={() => setOpenDialog(null)}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Vegleiðingar - Ókeypis Niðurtak</DialogTitle>
                <DialogDescription>
                  Her kanst tú taka niður ókeypis vegleiðingar til ChatGPT og vitlíki amboð.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p>Tøkar vegleiðingar fyri at byrja við vitlíki í tínum arbeiði.</p>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    Tak niður PDF
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Síggj Online
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Dialog for Týðingar */}
          <Dialog open={openDialog === 'tydingar'} onOpenChange={() => setOpenDialog(null)}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Vitlíki Týðing - Danskt til Føroyskt</DialogTitle>
                <DialogDescription>
                  Síggj hvussu vit byggdu eitt vitlíki amboð til týðing millum mál.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p>Hetta verkætlan vísir hvussu vitlíki kann hjálpa við málslæru og týðingum.</p>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    Síggj Case Study
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Royn Amboðið
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </Section>

        

        {/* Contact */}
        <div id="contact">
          <ContactSection />
        </div>
      </main>

      <Footer />
    </>
  );
}