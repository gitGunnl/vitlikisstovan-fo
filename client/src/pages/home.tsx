import React, { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import CardFeature from "@/components/site/CardFeature";
import CTAButtons from "@/components/site/CTAButtons";
import ContactSection from "@/components/site/ContactForm";
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
  Phone
} from "lucide-react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = siteConfig.hero.slides;

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

  // Auto-rotate carousel
  useEffect(() => {
    const intervals = [6000, 6000, 6000]; // Different timing for each slide
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, intervals[currentSlide]);

    return () => clearTimeout(timer);
  }, [currentSlide, slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

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

        {/* Special blog slide background effect */}
        {currentSlide === 1 && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        )}

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 text-white/40 hover:text-white/80 transition-all duration-300 hover:scale-110"
          data-testid="button-carousel-prev"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 text-white/40 hover:text-white/80 transition-all duration-300 hover:scale-110"
          data-testid="button-carousel-next"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Container */}
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div 
                  key={index}
                  className="w-full flex-shrink-0 text-center px-4"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 600ms ease-in-out',
                    pointerEvents: isActive ? 'auto' : 'none'
                  }}
                >
                  {/* Blog Badge for slide 2 */}
                  {index === 1 && (
                    <div 
                      className="inline-flex items-center gap-2 mb-8"
                      style={{
                        transform: isActive ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.8)',
                        opacity: isActive ? 1 : 0,
                        transition: 'all 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                        transitionDelay: isActive ? '100ms' : '0ms'
                      }}
                    >
                      <span className="relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm uppercase tracking-wider rounded-full shadow-2xl">
                        <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-md opacity-75 animate-pulse"></span>
                        <span className="relative flex items-center gap-2">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          Nýggjur bloggur
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </span>
                    </div>
                  )}
                  <h1 
                    className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 hero-text leading-tight ${
                      index === 1 
                        ? 'bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent' 
                        : 'text-white'
                    }`}
                    style={{
                      transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDelay: isActive ? '200ms' : '0ms',
                      filter: index === 1 ? 'drop-shadow(0 0 30px rgba(52, 211, 153, 0.5))' : 'none'
                    }}
                  >
                    {slide.title}
                  </h1>
                  <p 
                    className={`text-xl sm:text-2xl mb-10 hero-text leading-relaxed ${
                      index === 1 ? 'text-white' : 'text-white/95'
                    }`}
                    style={{
                      transform: isActive ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                      transition: 'transform 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      transitionDelay: isActive ? '350ms' : '0ms',
                      textShadow: index === 1 ? '0 2px 20px rgba(16, 185, 129, 0.3)' : 'inherit'
                    }}
                  >
                    {slide.subtitle}
                  </p>
                  <div
                    style={{
                      transform: isActive ? 'translateY(0)' : 'translateY(40px)',
                      opacity: isActive ? 1 : 0,
                      transition: 'all 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
                      transitionDelay: isActive ? '500ms' : '0ms'
                    }}
                  >
                    {index === 1 ? (
                      <div className="flex justify-center">
                        <a 
                          href={slide.primaryCTA.href}
                          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-lg rounded-full shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300"
                          data-testid="button-blog-cta"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          <span className="relative flex items-center gap-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            {slide.primaryCTA.text}
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </a>
                      </div>
                    ) : (
                      <CTAButtons
                        primary={slide.primaryCTA}
                        secondary={slide.secondaryCTA}
                        className="mt-2 mb-16"
                      />
                    )}
                  </div>

                  {/* Bottom of Hero CTA - only show on first slide */}
                  {index === 0 && (
                    <div 
                      className="mt-16"
                      style={{
                        transform: isActive ? 'translateY(0)' : 'translateY(50px)',
                        opacity: isActive ? 1 : 0,
                        transition: 'all 1100ms cubic-bezier(0.22, 1, 0.36, 1)',
                        transitionDelay: isActive ? '650ms' : '0ms'
                      }}
                    >
                      <button
                        onClick={() => {
                          const element = document.querySelector('#consulting');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="group flex items-center gap-3 mx-auto px-6 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 border border-white/20"
                        data-testid="button-scroll-consulting"
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
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all ${
                currentSlide === index 
                  ? 'w-8 h-2 bg-white' 
                  : 'w-2 h-2 bg-white/40 hover:bg-white/60'
              }`}
              style={{
                transition: 'all 400ms cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              data-testid={`button-slide-indicator-${index}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index ? 'true' : 'false'}
            />
          ))}
        </div>
      </section>

        {/* News Buttons - Below Hero Section */}
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* News Button - Option 1: Side Tab Style */}
            <div className="mb-8">
              <div className="flex justify-end">
                <a
                  href="/blog/vitliki-i-foroyum"
                  className="group flex items-center bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="text-sm font-medium">
                      <div className="text-xs opacity-80">NÝGGJUR BLOGGUR</div>
                      <div>Føroysk vitlíki model</div>
                    </div>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            {/* News Button - Option 2: Card Style (Hidden by default) */}
            <div className="hidden mb-8">
              <div className="max-w-md ml-auto">
                <a
                  href="/blog/vitliki-i-foroyum"
                  className="group block p-4 bg-primary text-primary-foreground rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold opacity-80">NÝGGJUR BLOGGUR</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="font-medium mb-1">Føroysk vitlíki model</h3>
                  <p className="text-xs opacity-75">Les meira um nýggju granskingarnar</p>
                </a>
              </div>
            </div>

            {/* News Button - Option 3: Banner Style (Hidden by default) */}
            <div className="hidden mb-8">
              <div className="bg-gradient-to-r from-primary/90 to-accent/90 py-3 px-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                      <span className="text-sm font-semibold text-white">NÝGGJUR BLOGGUR</span>
                    </div>
                    <p className="text-sm text-white/90">
                      Føroysk vitlíki model - les meira um nýggju granskingarnar
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="/blog/vitliki-i-foroyum"
                      className="text-sm font-medium text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      Les meira
                    </a>
                    <button className="text-white/70 hover:text-white p-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

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
                              <path d="M13 7l5 5-5 5M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                      <div className={`p-8 lg:p-12 flex flex-col justify-center ${!isEven ? 'lg:col-start-1' : ''}`}>
                        <h3 className="text-2xl lg:text-3xl font-bold mb-6">{highlight.title}</h3>
                        <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
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
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Vegleiðingar & Verkstovur</DialogTitle>
                <DialogDescription>
                  Eg havi hildið hópin av verkstovum, og vit hava gjørt enn fleiri – sera væl
                  umtóktar – vegleiðingar um, hvussu tú brúkar ChatGPT og onnur vitlíki‑amboð
                  í veruligum arbeiðsuppgávum.
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="h-[400px] px-2">
                <div className="space-y-6 pr-4">
                  {/* Free sample guides */}
                  <section className="space-y-2">
                    <h4 className="text-lg font-semibold">Ókeypis dømi (2 vegleiðingar)</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Vit bjóða tvey ókeypis royndarskjøl: eitt ætlað <strong>lærarum</strong> og eitt ætlað
                      <strong> politikarum</strong>. Bæði innihalda listar við gagnligum nýtslum fyri hesi
                      starvsøki – og <em>neyv stig‑fyrir‑stig</em> leiðbeining um, hvussu tú gert hesar
                      uppgávur við vitlíki.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Button asChild className="w-full">
                        <a href="/Vegleiding_Spar_tíd_og_betra_um_undirvisingina_vid_ChatGPT.pdf" target="_blank" rel="noopener noreferrer">
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

                  {/* Order your own guide */}
                  <section className="space-y-2">
                    <h4 className="text-lg font-semibold">Bílegg vegleiðing til títt arbeiðisøki</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Tú fær eina <strong>sergjørda vegleiðing</strong> til júst tínar arbeiðsuppgávur
                      fyri <strong>1600 DKK</strong>. So veit tú akkurát hvat tú skal nýta vitlíki til.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={() => {
                          setOpenDialog(null);
                          window.location.href = '/contact';
                        }}
                        aria-label="Bílegg vegleiðing"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Bílegg vegleiðing (1600 DKK)
                      </Button>
                    </div>
                  </section>

                  {/* Project: Vitlíki til arbeiði */}
                  <section className="space-y-2">
                    <h4 className="text-lg font-semibold">"Vitlíki til arbeiðis"</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      <strong>Granskingar grunnurin</strong> hevur stuðla mær í at menna <strong>"Vitlíki til arbeiðis"</strong> –
                    ein verkætlan har eg hjálpi ávísum bólkum at koma gott ígongd við vitlíki. Felags fyri hesar bólkar er at tað eru bólkar í ikki sita við teldu dagliga, hesir bólk eru í vanda fyri at koma ov seint ígong við vitlíki og tí hjálpi eg júst teimum.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Fyrstu vegleiðingar vera klárar í býrjani av Novembur 2025.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={() => {
                          setOpenDialog(null);
                          window.location.href = '/tilarbeidis';
                        }}
                        aria-label="Les meira um hesa verkætlan"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Les meira um hesa verkætlan
                      </Button>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          {/* Dialog for Týðing */}
          <Dialog open={openDialog === 'tydingar'} onOpenChange={() => setOpenDialog(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Týðing úr Donskum til Føroyskt</DialogTitle>
                <DialogDescription>
                  Sergjørt vitlíki‑amboð sum týðir beinleiðis úr Donskum til Føroyskt – spara tíð og fá betri úrslit.
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="h-[400px] px-2">
                <div className="space-y-6 pr-4">
                  <section className="space-y-2">
                    <h4 className="text-lg font-semibold">Hvat vit hava gjørt</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Vit hava ment eitt <strong>sergjørt vitlíki‑amboð</strong>, sum kann týða beinleiðis úr Donskum til
                      Føroyskt. Hetta amboðið hevur vit trænt við fleiri hundrað dømum av góðum týðingum, so tað veit, hvussu
                      man týðir nágreyniliga og natúrliga til Føroyskt.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-lg font-semibold">Hvussu tað virkar</h4>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Tú sendir okkum donskt skjal (Word, PDF ella annað)</li>
                      <li>Vit týða skjalið við okkara sergjørda vitlíki‑amboði</li>
                      <li>Vit eftirarbeiða úrslitið, so tað lýtur natúrligt</li>
                      <li>Tú fært eina góða týðing – skjótt og billigt</li>
                    </ol>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-lg font-semibold">Prísur</h4>
                    <div className="rounded-lg border p-4 bg-muted/30">
                      <p className="text-muted-foreground">
                        <strong>0,50 DKK fyri hvørt orð</strong> (umleið helvtin av vanligum týðingarprísi)
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        T.d. eitt skjal við 1000 orðum kostar 500 DKK at týða.
                      </p>
                    </div>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-lg font-semibold">Bílegg týðing</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Vil tú hava týtt eitt skjal? Send okkum skjalið og vit geva tær eitt tilboð sama dag.
                    </p>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <Button
                        onClick={() => {
                          setOpenDialog(null);
                          const el = document.querySelector('#contact');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        aria-label="Bílegg týðing"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Bílegg týðing
                      </Button>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </Section>

        {/* Resources Section */}
        <Section id="resources" className="py-24 bg-background">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {siteConfig.resources.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {siteConfig.resources.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.resources.items.map((resource, index) => {
              const iconComponents: { [key: string]: JSX.Element } = {
                FileText: <FileText className={`h-6 w-6 ${resource.iconColor}`} />,
                Video: <Video className={`h-6 w-6 ${resource.iconColor}`} />,
                MessageCircle: <MessageCircle className={`h-6 w-6 ${resource.iconColor}`} />
              };

              return (
                <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${resource.iconBg} flex-shrink-0`}>
                        {iconComponents[resource.icon] || <FileText className={`h-6 w-6 ${resource.iconColor}`} />}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                        <Button
                          className={resource.buttonStyle}
                          data-testid={`button-resource-${index}`}
                          asChild
                        >
                          <a href={resource.href} target="_blank" rel="noopener noreferrer">
                            {resource.buttonText}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            }) || []}</div>
        </Section>

        {/* Contact Section */}
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}