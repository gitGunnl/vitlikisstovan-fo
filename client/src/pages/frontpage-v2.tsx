import { useEffect, useRef, useState, useCallback } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ContactSection from "@/components/site/ContactForm";
import VideoBackground from "@/components/site/VideoBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { siteConfig } from "@/content/site";
import {
  CheckCircle,
  Clock,
  CalendarCheck,
  Phone,
  BookOpen,
  FileBarChart,
  MessageCircle,
  ArrowDown,
  Sparkles,
  BrainCircuit,
  Languages,
  Presentation,
  Building2,
  Users,
  Palette,
  ChevronDown,
  FileText,
  GraduationCap,
  Mail,
  Globe,
  Lightbulb,
  Zap,
  ArrowRight,
} from "lucide-react";

function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fp2-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".fp2-reveal");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);
}

function scrollToContact() {
  document.querySelector("#contact-section")?.scrollIntoView({ behavior: "smooth" });
}

function scrollToWorkshops() {
  document.querySelector("#workshops")?.scrollIntoView({ behavior: "smooth" });
}

const SERIF = "'Instrument Serif', Georgia, serif";

export default function FrontpageV2() {
  const [isMounted, setIsMounted] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [programExpanded, setProgramExpanded] = useState(false);

  useScrollReveal();

  useEffect(() => {
    setIsMounted(true);
    document.title = `${siteConfig.siteName} — ${siteConfig.tagline}`;
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Header />

      <main>
        {/* ─────────────────────────────────────────────
            HERO
        ───────────────────────────────────────────── */}
        <section
          id="hero"
          className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
        >
          <VideoBackground
            videoSrc="/hero section video.webm"
            posterSrc="/images/hero-background.webp"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/80 pointer-events-none" />

          <div className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-8 text-center py-24 sm:py-32">
            <p
              className="fp2-hero-text fp2-hero-text-d1 uppercase tracking-[0.25em] text-white/50 text-xs sm:text-sm font-medium mb-6"
            >
              Vitlíkisstovan &middot; Føroyar
            </p>

            <h1
              className="fp2-hero-text fp2-hero-text-d2 text-white leading-[1.12] mb-6"
              style={{ fontFamily: SERIF, fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}
            >
              Gev tykkara starvsfólkum
              <br className="hidden sm:block" />
              <span className="italic" style={{ color: "hsl(165, 40%, 72%)" }}>
                vitlíkisfatan
              </span>{" "}
              á 3 tímar
            </h1>

            <p className="fp2-hero-text fp2-hero-text-d3 text-white/75 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Praktisk verkstova har tykkara toym lærir at brúka vitlíki trygt og
              munagott — inkl. fyribúgving, tilfar og eftirfylging.
            </p>

            <div className="fp2-hero-text fp2-hero-text-d4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToWorkshops}
                className="px-8 py-3.5 bg-white text-black font-semibold rounded-full text-sm sm:text-base hover:bg-white/90 transition-all duration-200 shadow-xl shadow-white/10"
              >
                Sí verkstovurnar
              </button>
              <button
                onClick={scrollToContact}
                className="px-8 py-3.5 border border-white/30 text-white font-medium rounded-full text-sm sm:text-base hover:bg-white/10 transition-all duration-200"
              >
                Bílegg eitt prát
              </button>
            </div>

            <button
              onClick={scrollToWorkshops}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors animate-bounce"
              aria-label="Scroll down"
            >
              <ArrowDown className="w-6 h-6" />
            </button>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            WORKSHOP PRICING
        ───────────────────────────────────────────── */}
        <section id="workshops" className="py-20 sm:py-28 bg-[hsl(40,18%,96%)]">
          <div className="container mx-auto px-5 sm:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="fp2-reveal text-center mb-14">
                <p className="uppercase tracking-[0.2em] text-xs font-medium text-muted-foreground mb-3">
                  Verkstovur
                </p>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight mb-4"
                  style={{ fontFamily: SERIF }}
                >
                  Vel tað, sum passar tykkum
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
                  Báðar verkstovurnar eru handalig og lagaðar til tykkara toymi. Tit fáa alt, sum til skal.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10">
                {/* 3-hour workshop */}
                <div className="fp2-reveal fp2-reveal-delay-1 relative group">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-[hsl(165,35%,42%)] text-white text-[11px] font-semibold px-4 py-1 rounded-full tracking-wide uppercase">
                      Mest vald
                    </span>
                  </div>
                  <div className="h-full bg-white border-2 border-[hsl(165,30%,60%)] rounded-2xl p-7 sm:p-9 flex flex-col transition-shadow duration-300 hover:shadow-xl hover:shadow-[hsl(165,30%,60%,0.12)]">
                    <div className="flex items-center gap-2.5 mb-1">
                      <Clock className="w-5 h-5 text-[hsl(165,35%,42%)]" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(165,35%,42%)]">
                        3 tímar
                      </span>
                    </div>
                    <h3
                      className="text-2xl sm:text-3xl mb-1"
                      style={{ fontFamily: SERIF }}
                    >
                      3-tíma verkstova
                    </h3>
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-3xl sm:text-4xl font-bold tracking-tight">25.000</span>
                      <span className="text-base text-muted-foreground">kr.</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">
                      Fyri toym upp til 15 fólk
                    </p>

                    <ul className="space-y-3 text-sm mb-8 flex-1">
                      {[
                        "30-min fyribúgvingarkall",
                        "Byrjanarapakki (frymlar og dømur)",
                        "1-síðu yvirlit til leiðslu + 30-daga áætlan",
                        "45-min eftirfylging eftir 2–3 vikur",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-[hsl(165,35%,42%)] mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={scrollToContact}
                      className="w-full py-3.5 bg-[hsl(165,35%,42%)] hover:bg-[hsl(165,35%,36%)] text-white font-semibold rounded-xl transition-colors duration-200"
                    >
                      Bílegg verkstovu
                    </button>
                  </div>
                </div>

                {/* Full-day workshop */}
                <div className="fp2-reveal fp2-reveal-delay-2 relative group">
                  <div className="h-full bg-white border border-border rounded-2xl p-7 sm:p-9 flex flex-col transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5">
                    <div className="flex items-center gap-2.5 mb-1">
                      <CalendarCheck className="w-5 h-5 text-muted-foreground" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Heildagur
                      </span>
                    </div>
                    <h3
                      className="text-2xl sm:text-3xl mb-1"
                      style={{ fontFamily: SERIF }}
                    >
                      Heildagsverkstova
                    </h3>
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-3xl sm:text-4xl font-bold tracking-tight">45.000</span>
                      <span className="text-base text-muted-foreground">kr.</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">
                      Fyri toym upp til 25 fólk
                    </p>

                    <ul className="space-y-3 text-sm mb-8 flex-1">
                      {[
                        "Alt í 3-tíma pakkanum, pluss:",
                        "Dýpri venjing við egnum arbeiðsuppgávum",
                        "90-daga áætlan + tvær eftirfylgingar",
                        "Ítøkiligt yvirlit til leiðslu",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-muted-foreground/60 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={scrollToContact}
                      className="w-full py-3.5 bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-xl transition-colors duration-200"
                    >
                      Bílegg heildagsverkstovu
                    </button>
                  </div>
                </div>
              </div>

              <div className="fp2-reveal fp2-reveal-delay-3 text-center">
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors underline underline-offset-4 decoration-border hover:decoration-foreground"
                >
                  <MessageCircle className="w-4 h-4" />
                  Ikki vís(ur)? Spyr meg fyrst
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            WHAT'S INCLUDED
        ───────────────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-background">
          <div className="container mx-auto px-5 sm:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="fp2-reveal text-center mb-14">
                <h2
                  className="text-3xl sm:text-4xl font-normal mb-3"
                  style={{ fontFamily: SERIF }}
                >
                  Hvat er við í verkstovuni?
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
                  Hetta er ikki "bara eitt skeið". Tit fáa alt tað, sum skal til.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {[
                  {
                    icon: <Phone className="w-5 h-5" />,
                    title: "Fyribúgvingarkall",
                    desc: "30-minuttir áðrenn verkstovuna, har vit greiða frá tykkara tørvi og arbeiðshætti, so verkstovan verður skikka.",
                  },
                  {
                    icon: <BookOpen className="w-5 h-5" />,
                    title: "Byrjanarapakki",
                    desc: "Endurnýtiligir frymlar, dømur og birt, sum tit kunnu nýta beinleiðis eftir verkstovuna.",
                  },
                  {
                    icon: <FileBarChart className="w-5 h-5" />,
                    title: "Yvirlit til leiðslu + áætlan",
                    desc: "Ein-síðu samandrátt, ið leiðslan kann nýta beinleiðis, pluss ein greið 30-daga áætlan fyri næstu stig.",
                  },
                  {
                    icon: <CalendarCheck className="w-5 h-5" />,
                    title: "Eftirfylging",
                    desc: "45-minuttir eftir 2–3 vikur, har vit kanna hvussu tað gongur og svara spurningum.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`fp2-reveal fp2-reveal-delay-${i + 1} flex items-start gap-4 p-6 rounded-xl bg-card border hover:shadow-md transition-shadow duration-300`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[hsl(165,26%,66%,0.15)] flex items-center justify-center flex-shrink-0 text-[hsl(165,35%,42%)]">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            AGENCY SHOWCASE — "We do much more with AI"
        ───────────────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-foreground text-background overflow-hidden">
          <div className="container mx-auto px-5 sm:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="fp2-reveal text-center mb-16">
                <p className="uppercase tracking-[0.2em] text-xs font-medium text-white/40 mb-3">
                  Meira enn verkstovur
                </p>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight mb-4 text-white"
                  style={{ fontFamily: SERIF }}
                >
                  Vit gera{" "}
                  <span className="italic" style={{ color: "hsl(165, 40%, 72%)" }}>
                    nógv meira
                  </span>{" "}
                  við vitlíki
                </h2>
                <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto">
                  {siteConfig.consulting.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {[
                  {
                    icon: <Presentation className="w-6 h-6" />,
                    title: siteConfig.consulting.services?.[0]?.title || "Tað almenna",
                    desc: siteConfig.consulting.services?.[0]?.description || "",
                  },
                  {
                    icon: <BrainCircuit className="w-6 h-6" />,
                    title: siteConfig.consulting.services?.[1]?.title || "Fyritøkur",
                    desc: siteConfig.consulting.services?.[1]?.description || "",
                  },
                  {
                    icon: <Sparkles className="w-6 h-6" />,
                    title: siteConfig.consulting.services?.[2]?.title || "Kreativt vitlíki",
                    desc: siteConfig.consulting.services?.[2]?.description || "",
                  },
                ].map((service, i) => (
                  <div
                    key={i}
                    className={`fp2-reveal fp2-reveal-delay-${i + 1} group bg-white/[0.05] border border-white/10 rounded-2xl p-7 hover:bg-white/[0.08] transition-all duration-300`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5 text-white/70 group-hover:text-white transition-colors">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{service.desc}</p>
                  </div>
                ))}
              </div>

              <div className="fp2-reveal space-y-6">
                <div className="h-px bg-white/10 mb-10" />
                <p className="uppercase tracking-[0.18em] text-xs font-medium text-white/35 mb-6">
                  Hvat vit hava gjørt
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {siteConfig.cases.highlights?.slice(0, 4).map((highlight, i) => (
                    <div
                      key={i}
                      className={`fp2-reveal fp2-reveal-delay-${i + 1} group bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300`}
                    >
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={highlight.image}
                          alt={highlight.imageAlt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h4 className="text-base font-semibold text-white mb-2">{highlight.title}</h4>
                        <p className="text-sm text-white/50 leading-relaxed line-clamp-3 mb-4">
                          {highlight.description}
                        </p>
                        {highlight.dialogId && highlight.buttonText && (
                          <button
                            onClick={() => setOpenDialog(highlight.dialogId!)}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
                          >
                            {highlight.buttonText}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {highlight.showSocialLinks && (
                          <div className="flex items-center gap-3">
                            {siteConfig.social.facebook && (
                              <a
                                href={siteConfig.social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-2"
                              >
                                Facebook
                              </a>
                            )}
                            {siteConfig.social.linkedin && (
                              <a
                                href={siteConfig.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-2"
                              >
                                LinkedIn
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            WHY VITLÍKISSTOVAN + FOUNDER
        ───────────────────────────────────────────── */}
        {siteConfig.why && (
          <section className="py-20 sm:py-28 bg-[hsl(40,18%,96%)]">
            <div className="container mx-auto px-5 sm:px-8">
              <div className="max-w-5xl mx-auto">
                <div className="fp2-reveal text-center mb-14">
                  <h2
                    className="text-3xl sm:text-4xl font-normal mb-4"
                    style={{ fontFamily: SERIF }}
                  >
                    {siteConfig.why.title}
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    {siteConfig.why.subtitle}
                  </p>
                </div>

                {siteConfig.why.features && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-16">
                    {siteConfig.why.features.map((feature, i) => {
                      const icons = [
                        <Globe key={i} className="w-5 h-5" />,
                        <Lightbulb key={i} className="w-5 h-5" />,
                        <MessageCircle key={i} className="w-5 h-5" />,
                        <Zap key={i} className="w-5 h-5" />,
                      ];
                      return (
                        <div
                          key={i}
                          className={`fp2-reveal fp2-reveal-delay-${i + 1} flex items-start gap-4 p-6 rounded-xl bg-white border hover:shadow-md transition-shadow duration-300`}
                        >
                          <div className="w-10 h-10 rounded-lg bg-[hsl(165,26%,66%,0.15)] flex items-center justify-center flex-shrink-0 text-[hsl(165,35%,42%)]">
                            {icons[i]}
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {siteConfig.why.founder && (
                  <div className="fp2-reveal">
                    <div className="bg-white border rounded-2xl p-8 sm:p-10">
                      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 items-start">
                        <div className="text-center lg:text-left">
                          <div className="w-28 h-28 mx-auto lg:mx-0 mb-4 overflow-hidden rounded-full border-[3px] border-[hsl(165,26%,66%,0.3)]">
                            <img
                              src="/me.jpg"
                              alt="Portrait of Gunnleygur Clementsen"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h4
                            className="text-xl mb-0.5"
                            style={{ fontFamily: SERIF }}
                          >
                            {siteConfig.why.founder.name}
                          </h4>
                          <p className="text-sm text-[hsl(165,35%,42%)] font-medium">
                            {siteConfig.why.founder.role}
                          </p>
                        </div>

                        <div>
                          <p className="text-muted-foreground mb-5 leading-relaxed">
                            {siteConfig.why.founder.summary}
                          </p>

                          {siteConfig.why.founder.bullets && (
                            <ul className="space-y-2.5 mb-6">
                              {siteConfig.why.founder.bullets.map((bullet, j) => (
                                <li key={j} className="flex items-start gap-2.5">
                                  <CheckCircle className="h-4 w-4 text-[hsl(165,35%,42%)] mt-1 flex-shrink-0" />
                                  <span className="text-sm leading-relaxed">{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {siteConfig.why.founder.quote && (
                            <blockquote className="border-l-[3px] border-[hsl(165,30%,60%)] pl-5 py-3 italic text-muted-foreground text-sm leading-relaxed bg-[hsl(165,20%,96%)] rounded-r-lg">
                              "{siteConfig.why.founder.quote}"
                            </blockquote>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ─────────────────────────────────────────────
            12-WEEK PROGRAMME (collapsible)
        ───────────────────────────────────────────── */}
        <section className="py-14 sm:py-20 bg-background">
          <div className="container mx-auto px-5 sm:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="fp2-reveal">
                <button
                  onClick={() => setProgramExpanded(!programExpanded)}
                  className="w-full flex items-center justify-between p-6 sm:p-7 rounded-2xl bg-card border hover:shadow-md transition-shadow duration-200 text-left"
                >
                  <div>
                    <p className="text-xs sm:text-sm text-[hsl(165,35%,42%)] font-medium uppercase tracking-wide mb-1">
                      Fyri toym, sum vilja meira
                    </p>
                    <h3
                      className="text-xl sm:text-2xl"
                      style={{ fontFamily: SERIF }}
                    >
                      12-viku innleiðingarskeið
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Fullstendig vitlíkisinnleiðing fyri tykkara skrivstovu — frá strategi til daglig brúk.
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-300 ${
                      programExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  programExpanded ? "max-h-[3000px] opacity-100 mt-6" : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-8">
                  <div className="text-center">
                    <h3
                      className="text-2xl tracking-tight mb-3"
                      style={{ fontFamily: SERIF }}
                    >
                      {siteConfig.program.title}
                    </h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                      {siteConfig.program.subtitle}
                    </p>
                  </div>

                  {siteConfig.program.whatWeDeliver && (
                    <div>
                      <h4 className="text-lg font-semibold text-center mb-4">
                        {siteConfig.program.whatWeDeliver.title}
                      </h4>
                      <Card className="bg-white border">
                        <CardContent className="p-6 sm:p-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {siteConfig.program.whatWeDeliver.items?.map((item, index) => {
                              const icons = [
                                <FileText key={index} className="w-5 h-5 text-[hsl(165,35%,42%)]" />,
                                <Building2 key={index} className="w-5 h-5 text-[hsl(165,35%,42%)]" />,
                                <GraduationCap key={index} className="w-5 h-5 text-[hsl(165,35%,42%)]" />,
                                <CheckCircle key={index} className="w-5 h-5 text-[hsl(165,35%,42%)]" />,
                              ];
                              return (
                                <div key={index} className="flex items-start gap-3">
                                  <div className="flex-shrink-0 mt-1">{icons[index]}</div>
                                  <div>
                                    <h5 className="font-semibold mb-1">{item.title}</h5>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {siteConfig.program.howItWorks && (
                    <div>
                      <h4 className="text-lg font-semibold text-center mb-4">
                        {siteConfig.program.howItWorks.title}
                      </h4>
                      <Card className="bg-white border">
                        <CardContent className="p-6 sm:p-8">
                          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            {siteConfig.program.howItWorks.steps?.map((step, index) => (
                              <div key={index} className="flex-1 text-center flex flex-col items-center">
                                <div className="w-12 h-12 bg-[hsl(165,35%,42%)] rounded-full flex items-center justify-center mx-auto mb-3">
                                  <span className="text-white font-bold text-lg">{step.number}</span>
                                </div>
                                <h5 className="font-semibold mb-1">{step.title}</h5>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                                {index < siteConfig.program.howItWorks.steps.length - 1 && (
                                  <div className="hidden md:block absolute">
                                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {siteConfig.program.delivery && (
                    <div>
                      <h4 className="text-lg font-semibold text-center mb-2">
                        {siteConfig.program.delivery.title}
                      </h4>
                      <p className="text-muted-foreground text-center text-sm mb-4">
                        {siteConfig.program.delivery.subtitle}
                      </p>
                      <Card className="bg-white border">
                        <CardContent className="p-6 sm:p-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {siteConfig.program.delivery.items?.map((item, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-[hsl(165,26%,66%,0.15)] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <CheckCircle className="w-4 h-4 text-[hsl(165,35%,42%)]" />
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

                  <div className="text-center">
                    <button
                      onClick={scrollToContact}
                      className="inline-flex items-center gap-2 px-7 py-3 bg-[hsl(165,35%,42%)] text-white font-semibold rounded-xl hover:bg-[hsl(165,35%,36%)] transition-colors duration-200"
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

        {/* ─────────────────────────────────────────────
            CONTACT
        ───────────────────────────────────────────── */}
        <div id="contact-section">
          <ContactSection />
        </div>
      </main>

      <Footer />

      {/* ─────────────────────────────────────────────
          DIALOGS (unchanged functionality)
      ───────────────────────────────────────────── */}
      <Dialog open={openDialog === "vegleidingar"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh]">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold mb-2">Vegleiðingar & Verkstovur</DialogTitle>
            <DialogDescription className="text-base leading-relaxed" />
          </DialogHeader>
          <ScrollArea className="h-[500px] px-4">
            <div className="space-y-8 pr-6">
              <section className="space-y-4">
                <h4 className="text-lg font-semibold mb-2">Ókeypis dømi (2 vegleiðingar)</h4>
                <p className="text-muted-foreground leading-[1.7] mb-4">
                  Vit bjóða tvey ókeypis royndarskjøl: eitt ætlað <strong>lærarum</strong> og eitt ætlað
                  <strong> politikarum</strong>. Bæði innihalda listar við gagnligum nýtslum fyri hesi
                  starvsøki — og <em>eina neyva stig-fyrir-stig leiðbeining</em> um, hvussu tú gert hesar
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
                  <strong>Granskingargrunnurin</strong> hevur stuðlað mær í at menna <strong>"Vitlíki til arbeiðis"</strong> —
                  ein verkætlan har eg geri vegleiðingar, sum skulu hjálpa ávísum bólkum at koma gott ígongd við vitlíki.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Button
                    onClick={() => {
                      setOpenDialog(null);
                      window.location.href = "/tilarbeidis";
                    }}
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
                  fyri <strong>1600 DKK</strong>.
                </p>
                <Button asChild>
                  <a href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Bílegg vegleiðing (1600 DKK)
                  </a>
                </Button>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "verkstovur"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh]">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold mb-2">Verkstovur og skeið</DialogTitle>
            <DialogDescription className="text-base leading-relaxed">
              Eg havi hildið hópin av verkstovum um hvussu tú brúkar ChatGPT og onnur vitlíki-amboð
              í veruligum arbeiðsuppgávum.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] px-4">
            <div className="space-y-8 pr-6">
              <section className="space-y-4">
                <h4 className="text-lg font-semibold mb-2">Hvat luttakararnir læra</h4>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    "At skilja møguleikar og avmarkingar við vitlíki.",
                    "At brúka KjattGPT og onnur viðkomandi amboð í verki.",
                    "At skapa munagóð birt, ið eru lagað til teirra egnu arbeiðsuppgávur.",
                    "Høvuðsdentur verður lagdur á felags venjingar við dømum úr gerandisdegnum.",
                    "Vit gjøgnumganga góðar mannagongdir fyri trygd og etikki innan vitlíki.",
                  ].map((text, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[hsl(165,35%,42%)] mt-0.5 flex-shrink-0" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="space-y-4">
                <h4 className="text-lg font-semibold mb-2">Dømi um verkstovur</h4>
                <div className="space-y-3">
                  {[
                    { t: "Hálvdagsinnleiðsluskeið", d: "Hetta sniðið hevur riggað serliga væl til starvsfólk, eitt nú á skrivstovum, ið skulu koma skjótt í gongd." },
                    { t: "Heildagsdýpdarskeið", d: "Vit hava brúkt hetta til størri bólkar, eitt nú tá vit undirvístu umleið 200 lærarum." },
                    { t: "Skeiðsgongdir yvir fleiri dagar", d: "Til fyritøkur, sum ynskja at gera øll síni skrivstovufólk klár til at kunna arbeiða munagott og trygt við vitlíki." },
                  ].map((ex, j) => (
                    <div key={j} className="p-4 border rounded-lg">
                      <h5 className="font-semibold mb-1">{ex.t}</h5>
                      <p className="text-sm text-muted-foreground">{ex.d}</p>
                    </div>
                  ))}
                </div>
              </section>
              <section className="space-y-4">
                <h4 className="text-lg font-semibold mb-2">Bílegg eina verkstovu</h4>
                <p className="text-muted-foreground leading-[1.7] mb-4">
                  Hevur tú áhuga í eini verkstovu til tína fyritøku? Set teg í samband við meg.
                </p>
                <Button asChild>
                  <a href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Bílegg verkstovu
                  </a>
                </Button>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "tydingar"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader className="pb-8">
            <DialogTitle className="text-2xl font-bold mb-3">Vitlíkistýðing — danskt til føroyskt</DialogTitle>
            <DialogDescription className="text-lg leading-relaxed pt-2">
              Ein væl eydnað vitlíki-verkætlan: Frá undankanning og frágreiðing til eitt hent amboð.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-10">
            <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-8 rounded-xl border">
              <p className="text-foreground leading-[1.8] text-base">
                Ein kundi skuldi týða ein hóp av skjalum úr <strong>donskum til føroyskt</strong> og spurdi,
                um vitlíki kundi hjálpa. Vit gjørdu eitt sera gott birt <em>(prompt)</em>,
                og síðani <strong>royndu vit hetta birt á øllum teimum bestu altjóða modellunum.</strong>
              </p>
            </div>
            <div className="rounded-xl border-2 border-[hsl(165,30%,60%,0.3)] bg-gradient-to-br from-background to-muted/20 p-8">
              <h4 className="font-bold text-xl mb-4">Frá undankanning til amboð</h4>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Kundin var væl nøgdur við hvussu vitlíki umsetti tekstin, og vit bygdu síðani eitt einfalt — men sterkt — amboð:
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[
                  { icon: <FileText className="w-5 h-5" />, t: "Innlesing av skjølum", d: "Tekur inn donsk Word-skjøl." },
                  { icon: <Globe className="w-5 h-5" />, t: "Vitlíki-týðing", d: "Brúkar birtið at týða tekstin til føroyskt." },
                  { icon: <MessageCircle className="w-5 h-5" />, t: "Yvirlit yvir allar setningar", d: "Amboðið vísir allar teir umsettu setningarnar." },
                  { icon: <CheckCircle className="w-5 h-5" />, t: "Góðkenning", d: "\"Human in the loop\" — setningar kunnu merkjast sum góðkendir." },
                  { icon: <FileText className="w-5 h-5" />, t: "Útflutningur til Word", d: "Endaligi teksturin fluttur út sum Word-fílu á føroyskum." },
                ].map((step, j) => (
                  <div
                    key={j}
                    className={`flex items-start gap-4 p-4 rounded-lg bg-background/60 border border-border/50 ${j === 4 ? "lg:col-span-2" : ""}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[hsl(165,26%,66%,0.15)] flex items-center justify-center flex-shrink-0 text-[hsl(165,35%,42%)]">
                      {step.icon}
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm mb-1">{step.t}</h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[hsl(165,20%,96%)] p-8 rounded-xl border-l-4 border-[hsl(165,30%,60%)]">
              <blockquote className="text-lg italic text-foreground leading-[1.7] font-medium">
                Stutt sagt: ein sera væl eydnað vitlíkisverkætlan, sum riggaði væl — og gav skjót, dygdargóð úrslit.
              </blockquote>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
