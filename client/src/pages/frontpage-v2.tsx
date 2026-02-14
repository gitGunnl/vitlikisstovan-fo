import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ContactSection from "@/components/site/ContactForm";
import VideoBackground from "@/components/site/VideoBackground";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import {
  CheckCircle,
  ArrowRight,
  Building2,
  Users,
  Palette,
  Globe,
  Lightbulb,
  MessageCircle,
  Zap,
  ChevronDown,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Intersection Observer hook for scroll-triggered animations         */
/* ------------------------------------------------------------------ */
function useInView(options?: IntersectionObserverInit) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref);
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return { ref: setRef, inView };
}

/* ------------------------------------------------------------------ */
/*  Reusable animated section wrapper                                  */
/* ------------------------------------------------------------------ */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */
export default function FrontpageV2() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    document.title = `${siteConfig.siteName} — ${siteConfig.tagline}`;
  }, []);

  if (!isMounted) return null;

  const { why, consulting, cases, program, contact } = siteConfig;

  return (
    <>
      <Header />

      <main>
        {/* =========================================================
            HERO — Single clear message, no carousel.
            Two CTAs: primary for "ready" visitors, secondary for "unsure".
        ========================================================= */}
        <section
          id="hero"
          className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        >
          {/* Video background — same asset, unchanged */}
          <VideoBackground
            videoSrc="/hero section video.webm"
            posterSrc="/images/hero-background.webp"
          />

          {/* Stronger gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center">
            <p className="text-sm sm:text-base uppercase tracking-[0.2em] text-white/70 font-medium mb-6">
              Praktisk vitlíkisráðgeving í Føroyum
            </p>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 hero-text">
              Gjer vitlíki til eitt{" "}
              <span className="text-primary">tryggt og nýtiligt</span>{" "}
              amboð fyri títt toym
            </h1>

            <p className="text-base sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed mb-10">
              {siteConfig.tagline}. Frá fyrstu verkstovu til fulla innleiðslu — eg taki
              mær av øllum, so títt toym kann fokusera á arbeiðið.
            </p>

            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 text-base font-semibold rounded-full shadow-xl hover:shadow-primary/30 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
              >
                <a href="/contact">
                  Bílegg eitt prát
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base font-semibold rounded-full border-2 border-white/40 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/60 transition-all duration-300"
              >
                <a href="#services">
                  Sí okkara tænastur
                  <ChevronDown className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
              <div className="w-1.5 h-2.5 rounded-full bg-white/60 animate-bounce" />
            </div>
          </div>
        </section>

        {/* =========================================================
            TRUST BAR — Quick credibility signals
        ========================================================= */}
        <section className="py-10 sm:py-14 bg-gradient-to-b from-muted/60 to-background border-b border-border/40">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              {[
                { value: "Fyrsta", label: "vitlíkisfyritøka í Føroyum" },
                { value: "200+", label: "fólk mennað" },
                { value: "100%", label: "føroyskt fokus" },
                { value: "10+ ár", label: "vitlíkisroyndir" },
              ].map((stat, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {stat.label}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SERVICES — What we do, scannable cards
        ========================================================= */}
        <section id="services" className="py-20 sm:py-28">
          <div className="container mx-auto px-6">
            <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
                {consulting.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {consulting.subtitle}
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {consulting.services?.map((service, i) => {
                const icons = [
                  <Building2 key={i} className="h-6 w-6" />,
                  <Users key={i} className="h-6 w-6" />,
                  <Palette key={i} className="h-6 w-6" />,
                ];
                return (
                  <AnimatedSection key={i} delay={i * 120}>
                    <div className="group h-full bg-card border border-border/60 rounded-2xl p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                        {icons[i]}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
                        {service.description}
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            PROGRAM — The flagship 12-week programme
        ========================================================= */}
        <section id="program" className="py-20 sm:py-28 bg-muted/30">
          <div className="container mx-auto px-6">
            <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-sm uppercase tracking-[0.15em] text-primary font-medium mb-4">
                Flaggskipsúrslitið
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
                {program.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {program.subtitle}
              </p>
            </AnimatedSection>

            {/* How it works — 3 steps */}
            {program.howItWorks && (
              <AnimatedSection className="max-w-4xl mx-auto mb-16">
                <h3 className="text-xl font-semibold text-center mb-10">
                  {program.howItWorks.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {program.howItWorks.steps?.map((step, i) => (
                    <div key={i} className="relative text-center">
                      {/* Connector line on desktop */}
                      {i < (program.howItWorks?.steps?.length ?? 0) - 1 && (
                        <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
                      )}
                      <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-5 text-xl font-bold shadow-md relative z-10">
                        {step.number}
                      </div>
                      <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            )}

            {/* What you get — delivery items */}
            {program.delivery && (
              <AnimatedSection className="max-w-4xl mx-auto mb-12">
                <h3 className="text-xl font-semibold text-center mb-10">
                  {program.delivery.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {program.delivery.items?.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 bg-card border border-border/50 rounded-xl p-5 hover:shadow-sm transition-shadow duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {program.delivery.note && (
                  <p className="text-sm text-center text-muted-foreground italic mt-8">
                    {program.delivery.note}
                  </p>
                )}
              </AnimatedSection>
            )}

            {/* CTA */}
            <AnimatedSection className="text-center">
              <Button
                asChild
                size="lg"
                className="h-13 px-8 text-base font-semibold rounded-full shadow-lg"
              >
                <a href="/contact">
                  {program.cta.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </AnimatedSection>
          </div>
        </section>

        {/* =========================================================
            WHY VITLÍKISSTOVAN — Trust & differentiation
        ========================================================= */}
        <section id="why" className="py-20 sm:py-28">
          <div className="container mx-auto px-6">
            <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
                {why.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {why.subtitle}
              </p>
            </AnimatedSection>

            {/* Feature cards */}
            {why.features && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
                {why.features.map((feature, i) => {
                  const icons = [
                    <Globe key={i} className="h-6 w-6" />,
                    <Lightbulb key={i} className="h-6 w-6" />,
                    <MessageCircle key={i} className="h-6 w-6" />,
                    <Zap key={i} className="h-6 w-6" />,
                  ];
                  return (
                    <AnimatedSection key={i} delay={i * 100}>
                      <div className="h-full bg-card border border-border/60 rounded-2xl p-7 hover:shadow-md hover:border-primary/20 transition-all duration-300">
                        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                          {icons[i]}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground text-[0.9rem] leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
            )}

            {/* Founder */}
            {why.founder && (
              <AnimatedSection className="max-w-4xl mx-auto">
                <div className="bg-card border border-border/60 rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    {/* Photo side */}
                    <div className="lg:col-span-1 bg-muted/40 flex flex-col items-center justify-center p-10">
                      <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg mb-5">
                        <img
                          src="/me.jpg"
                          alt={why.founder.headshotAlt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold">{why.founder.name}</h3>
                      <p className="text-sm text-primary font-medium mt-1">
                        {why.founder.role}
                      </p>
                    </div>

                    {/* Bio side */}
                    <div className="lg:col-span-2 p-8 sm:p-10">
                      <h4 className="text-lg font-semibold mb-4">
                        {why.founder.heading}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {why.founder.summary}
                      </p>

                      {why.founder.bullets && (
                        <ul className="space-y-3 mb-6">
                          {why.founder.bullets.map((bullet, j) => (
                            <li key={j} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm leading-relaxed">
                                {bullet}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {why.founder.quote && (
                        <blockquote className="border-l-4 border-primary pl-5 py-3 text-muted-foreground italic bg-muted/20 rounded-r-lg">
                          &ldquo;{why.founder.quote}&rdquo;
                        </blockquote>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>
        </section>

        {/* =========================================================
            CASES — Social proof, streamlined
        ========================================================= */}
        <section id="cases" className="py-20 sm:py-28 bg-muted/20">
          <div className="container mx-auto px-6">
            <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
                {cases.title}
              </h2>
            </AnimatedSection>

            <div className="max-w-5xl mx-auto space-y-8">
              {cases.highlights?.map((c, i) => {
                const isEven = i % 2 === 0;
                return (
                  <AnimatedSection key={i} delay={i * 80}>
                    <div className="bg-card border border-border/60 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div
                        className={`grid grid-cols-1 lg:grid-cols-2 ${
                          !isEven ? "lg:grid-flow-dense" : ""
                        }`}
                      >
                        {/* Image */}
                        <div className={!isEven ? "lg:col-start-2" : ""}>
                          <img
                            src={c.image}
                            alt={c.imageAlt}
                            className="w-full h-56 lg:h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        {/* Text */}
                        <div
                          className={`p-8 sm:p-10 flex flex-col justify-center ${
                            !isEven ? "lg:col-start-1" : ""
                          }`}
                        >
                          <h3 className="text-2xl font-bold mb-4">{c.title}</h3>
                          <p className="text-muted-foreground leading-relaxed mb-6">
                            {c.description}
                          </p>

                          {c.showSocialLinks && (
                            <div className="flex items-center gap-3">
                              {siteConfig.social.facebook && (
                                <a
                                  href={siteConfig.social.facebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium transition-colors"
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
                                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                  </svg>
                                  LinkedIn
                                </a>
                              )}
                            </div>
                          )}

                          {!c.showSocialLinks && (
                            <Button
                              asChild
                              variant="outline"
                              className="self-start"
                            >
                              <a href="/contact">
                                Vita meira
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            FINAL CTA — For visitors who scrolled all the way down
        ========================================================= */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-6">
            <AnimatedSection className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
                {contact.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                {contact.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 text-base font-semibold rounded-full shadow-lg"
                >
                  <a href="/contact">
                    Bílegg eitt prát
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-base font-semibold rounded-full"
                >
                  <a href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact form section — reused from existing component */}
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
