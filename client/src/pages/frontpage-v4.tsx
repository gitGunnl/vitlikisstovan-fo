import { useEffect } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ContactSection from "@/components/site/ContactForm";
import { Button } from "@/components/ui/button";
import { seoConfig } from "@/content/seo";
import {
  ArrowRight,
  CheckCircle,
  Users,
  Shield,
  Lightbulb,
  Target,
  MessageCircle,
  Sparkles,
  BookOpen,
  Building2,
  ChevronRight,
  Quote,
  Zap,
  Eye,
  GraduationCap,
  Mic,
  Compass,
  Wrench,
  Palette,
  HelpCircle
} from "lucide-react";

function updateMetaTags({ title, description, image, url, type, siteName }: any) {
  const updateTag = (name: string, content: string) => {
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
  updateTag('twitter:card', 'summary_large_image');
  updateTag('twitter:title', title);
  updateTag('twitter:description', description);
  updateTag('twitter:image', image);
}

function scrollToContact() {
  const element = document.querySelector('#contact');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToSection(id: string) {
  const element = document.querySelector(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function FrontpageV4() {
  useEffect(() => {
    updateMetaTags({
      title: 'Vitlíkisstovan – Practical AI Help for Faroese Organisations',
      description: 'Workshops, talks, advice, prototypes, and creative AI production — built around real needs, real workflows, and clear next steps for Faroese organisations.',
      image: seoConfig.ogImage,
      url: window.location.origin + '/frontpage-v4',
      type: 'website',
      siteName: 'Vitlíkisstovan'
    });

    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <Header />

      <main className="overflow-hidden">

        {/* ── HERO ── */}
        <section className="relative min-h-[85vh] flex items-center bg-[#0a1a14] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-[#0a1a14] to-[#0d1f18]" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px]" />
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }} />
          </div>

          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-sm font-medium mb-8 animate-fade-in">
                <Sparkles className="w-4 h-4" />
                Workshops · Talks · Advice · Prototypes · Creative AI
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6 animate-slide-up" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                Practical AI help{" "}
                <span className="text-emerald-400">for Faroese organisations</span>
              </h1>

              <p className="text-xl sm:text-2xl text-white/80 leading-relaxed max-w-2xl mb-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
                Workshops, talks, advice, prototypes, and creative AI production — built around real needs, real workflows, and clear next steps.
              </p>

              <p className="text-base text-white/50 leading-relaxed max-w-2xl mb-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
                Need a presentation, app idea, AI-generated visuals, or guidance on what to do next? You're in the right place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
                <Button
                  size="lg"
                  className="text-lg font-semibold bg-emerald-500 hover:bg-emerald-400 text-[#0a1a14] shadow-lg shadow-emerald-500/20 h-14 px-8 rounded-xl transition-all duration-200 hover:shadow-emerald-500/30 hover:scale-[1.02]"
                  onClick={scrollToContact}
                >
                  Book a workshop
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg font-medium border-white/20 text-white hover:bg-white/10 h-14 px-8 rounded-xl"
                  onClick={() => scrollToSection('#how-we-help')}
                >
                  See how we help
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* ── HOW WE HELP (Service Cards) ── */}
        <section id="how-we-help" className="py-20 sm:py-28 bg-background border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                How we help
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We help Faroese organisations make practical use of AI. Here are the main ways we do it.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: GraduationCap,
                  title: "Workshops",
                  description: "Practical AI training for teams and organisations. Hands-on, concrete, and built for real work.",
                  color: "bg-emerald-100 text-emerald-700",
                  border: "hover:border-emerald-300/60"
                },
                {
                  icon: Mic,
                  title: "Presentations",
                  description: "Clear and engaging talks for leaders, staff, and events. No hype — just what people need to know.",
                  color: "bg-blue-100 text-blue-700",
                  border: "hover:border-blue-300/60"
                },
                {
                  icon: Compass,
                  title: "Advice",
                  description: "Help choosing tools, identifying use cases, and deciding on practical next steps.",
                  color: "bg-amber-100 text-amber-700",
                  border: "hover:border-amber-300/60"
                },
                {
                  icon: Wrench,
                  title: "Prototypes",
                  description: "Quick first versions of AI tools, apps, or internal helpers. From idea to something you can test.",
                  color: "bg-violet-100 text-violet-700",
                  border: "hover:border-violet-300/60"
                },
                {
                  icon: Palette,
                  title: "Creative production",
                  description: "AI-generated images, video concepts, and campaign material. Made for your specific needs.",
                  color: "bg-rose-100 text-rose-700",
                  border: "hover:border-rose-300/60"
                }
              ].map((service, i) => (
                <div
                  key={i}
                  className={`group bg-card rounded-2xl p-7 border border-border ${service.border} transition-all duration-300 hover:shadow-lg`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${service.color} mb-5 transition-transform duration-300 group-hover:scale-110`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ── SOCIAL PROOF ── */}
        <section className="py-16 sm:py-20 bg-muted/20 border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Client logos / names */}
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-8">Trusted by Faroese organisations</p>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
                {[
                  "Betri Banki",
                  "Tórshavn Kommune",
                  "Føroya Arbeiðsgevarafelag",
                  "Atlantic Airways",
                  "Løgmansskrivstovan"
                ].map((name, i) => (
                  <span key={i} className="text-lg sm:text-xl font-semibold text-foreground/30 tracking-tight select-none" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14">
              {[
                { value: "20+", label: "Workshops delivered" },
                { value: "350+", label: "Participants trained" },
                { value: "12", label: "Organisations served" },
                { value: "4.9/5", label: "Average rating" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-foreground mb-1" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  quote: "This made AI much more concrete for our team. It stopped feeling abstract and started feeling useful.",
                  name: "Jóhanna Patursson",
                  role: "Team Lead, Betri Banki"
                },
                {
                  quote: "We went from confused to confident in three hours. Our staff actually use the tools now.",
                  name: "Bjarni Thomsen",
                  role: "Director, Tórshavn Kommune"
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border p-7 sm:p-8">
                  <Quote className="w-8 h-8 text-emerald-500/20 mb-4" />
                  <blockquote className="text-foreground leading-relaxed mb-5 text-[1.05rem]" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ── NOT SURE WHAT YOU NEED? ── */}
        <section className="py-14 sm:py-16 bg-muted/30 border-b border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-5">
              <div className="hidden sm:flex shrink-0 w-12 h-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  Not sure whether you need a workshop, a talk, a prototype, or advice?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  That is normal. Many clients start with a rough idea. We help clarify the right first step based on your situation.
                </p>
                <Button
                  variant="outline"
                  className="font-medium"
                  onClick={scrollToContact}
                >
                  Tell us what you have in mind
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* ── WE CAN HELP IF YOU NEED TO… ── */}
        <section className="py-20 sm:py-28 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              We can help if you need to…
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Get your team started with AI",
                "Explain AI clearly to a group",
                "Turn an idea into a first prototype",
                "Create AI-generated visuals or concepts",
                "Decide which tools and use cases make sense",
                "Build internal guidelines for safe AI use"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-foreground leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ── THE WORKSHOP (Primary Offer Spotlight) ── */}
        <section className="py-20 sm:py-28 bg-[#0a1a14] text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">Most popular starting point</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                The workshop is often the{" "}
                <span className="text-emerald-400">best place to start</span>
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                A practical 3-hour session for teams that want to build a shared foundation. Your staff walk away with concrete use cases, better habits, and a clearer sense of what to do next.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
              {[
                {
                  icon: Target,
                  title: "Practical examples for real work",
                  description: "Relevant ways to use AI in writing, planning, summarising, brainstorming, analysis, and routine office work."
                },
                {
                  icon: MessageCircle,
                  title: "Better prompt habits",
                  description: "Simple ways to ask better, guide the tool, and get more useful output — without memorising complicated frameworks."
                },
                {
                  icon: Shield,
                  title: "Safer usage",
                  description: "Clear understanding of what should not be shared and where staff need to be careful with AI tools."
                },
                {
                  icon: Eye,
                  title: "A realistic view",
                  description: "What AI is good at, where it still fails, and how to use human judgment well alongside these tools."
                }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 mb-4">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="text-lg font-semibold bg-emerald-500 hover:bg-emerald-400 text-[#0a1a14] shadow-lg shadow-emerald-500/20 h-14 px-10 rounded-xl transition-all duration-200 hover:shadow-emerald-500/30 hover:scale-[1.02]"
                onClick={scrollToContact}
              >
                Book a workshop
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-sm text-white/40 mt-5">
                3-hour session · For companies and organisations · Delivered in Faroese or English
              </p>
            </div>
          </div>
        </section>


        {/* ── WHAT HAPPENS IN THE WORKSHOP ── */}
        <section className="py-20 sm:py-28 bg-background border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  What happens in the workshop
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  The workshop typically runs for 3 hours and can be tailored to your team. We cover the basics clearly, show useful examples, discuss common mistakes, and make AI feel concrete and usable.
                </p>
                <p className="text-sm text-muted-foreground bg-muted/50 rounded-xl px-5 py-3 border border-border inline-block">
                  Can be adapted to managers, office staff, specific departments, or mixed teams.
                </p>
              </div>

              <div className="space-y-5">
                {[
                  {
                    icon: BookOpen,
                    title: "Key ideas introduced simply",
                    description: "No jargon. We start with what matters and skip what does not."
                  },
                  {
                    icon: Zap,
                    title: "Concrete examples",
                    description: "Real tasks your team actually does, shown with AI tools."
                  },
                  {
                    icon: MessageCircle,
                    title: "Hands-on practice",
                    description: "Your team works through practical exercises together."
                  },
                  {
                    icon: Shield,
                    title: "Common mistakes & safe use",
                    description: "What to watch for, what not to share, and how to think sensibly."
                  }
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ── A GOOD FIT FOR TEAMS THAT… ── */}
        <section className="py-20 sm:py-28 bg-muted/30 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  A good fit for{" "}
                  <span className="text-emerald-700">teams that…</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  This is not a talk about futuristic AI. It is practical help for people who write, plan, communicate, analyse, organise, and solve problems in everyday work.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Want practical AI use rather than abstract theory",
                  "Have staff doing writing, planning, communication, admin, or analysis",
                  "Need a shared baseline before deciding what to do next",
                  "Want more confidence and less random experimentation"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-foreground leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ── WHY VITLÍKISSTOVAN ── */}
        <section className="py-20 sm:py-28 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                Why Vitlíkisstovan
              </h2>
            </div>

            <div className="bg-card rounded-2xl border border-border p-8 sm:p-12">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We do not start with big promises about "AI transformation." We start with what people can actually use in their work. Our focus is practical adoption in a Faroese context: real staff, real workflows, real constraints, and clear language people understand.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                That means examples that fit daily office life, discussion of privacy and good judgment, and a teaching style built for people who are curious but not technical.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              {[
                {
                  icon: Building2,
                  text: "Workshops delivered for Faroese companies and organisations"
                },
                {
                  icon: Users,
                  text: "Used by teams in banking, administration, and knowledge work"
                },
                {
                  icon: Target,
                  text: "Focused on practical, day-to-day use"
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4">
                  <item.icon className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ── WHY NOW ── */}
        <section className="py-20 sm:py-28 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-6">
              <div className="hidden sm:flex shrink-0 w-14 h-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 mt-1">
                <Lightbulb className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  Many staff are already testing AI.{" "}
                  <span className="text-muted-foreground">Few have been shown how to use it well.</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  Some employees are experimenting on their own. Others are unsure where to begin. That often leads to missed opportunities, uneven quality, and uncertainty about what is safe to share. We help your team build a practical, shared foundation — whether that starts with a workshop, a presentation, or a conversation about what makes sense.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ── NEED HELP BEYOND THE WORKSHOP? ── */}
        <section className="py-16 sm:py-20 bg-muted/20 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-6">
              <div className="hidden sm:flex shrink-0 w-12 h-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <ChevronRight className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  Need help after the workshop?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We also help organisations identify useful next steps, shape simple internal guidance, build first prototypes, create AI-generated content, and find practical ways to build on what the workshop starts.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ── FINAL CTA ── */}
        <section className="py-20 sm:py-28 bg-[#0a1a14] text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              Want to explore whether this is{" "}
              <span className="text-emerald-400">a fit for your team?</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
              Start with a workshop, or tell us what you have in mind. We will help you figure out the right first step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg font-semibold bg-emerald-500 hover:bg-emerald-400 text-[#0a1a14] shadow-lg shadow-emerald-500/20 h-14 px-10 rounded-xl transition-all duration-200 hover:shadow-emerald-500/30 hover:scale-[1.02]"
                onClick={scrollToContact}
              >
                Book a workshop
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg font-medium border-white/20 text-white hover:bg-white/10 h-14 px-8 rounded-xl"
                onClick={scrollToContact}
              >
                Get in touch
              </Button>
            </div>
            <p className="text-sm text-white/40 mt-6">
              Workshops · Presentations · Advice · Prototypes · Creative AI production
            </p>
          </div>
        </section>


        {/* ── CONTACT FORM ── */}
        <section id="contact" className="py-20 sm:py-28 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactSection />
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
