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
  Eye
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

export default function FrontpageV4() {
  useEffect(() => {
    updateMetaTags({
      title: 'Vitlíkisstovan – Practical AI Workshops for Faroese Workplaces',
      description: 'Teach your staff how to use AI tools safely, usefully, and in their real day-to-day work. Practical 3-hour workshops for Faroese companies and organisations.',
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
                3-hour workshop · For companies & organisations · Faroese or English
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6 animate-slide-up" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                Practical AI workshops{" "}
                <span className="text-emerald-400">for Faroese workplaces</span>
              </h1>

              <p className="text-xl sm:text-2xl text-white/80 leading-relaxed max-w-2xl mb-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
                Teach your staff how to use AI tools safely, usefully, and in their real day-to-day work.
              </p>

              <p className="text-lg text-white/60 leading-relaxed max-w-2xl mb-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
                In one focused 3-hour session, your team gets concrete use cases, better prompt habits, and a clearer sense of where AI helps — and where it does not.
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
                  onClick={() => {
                    const el = document.querySelector('#what-you-get');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  See what's included
                </Button>
              </div>
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
                  Some employees are experimenting on their own. Others are unsure where to begin. That often leads to missed opportunities, uneven quality, and uncertainty about what is safe to share. This workshop helps your team build a practical, shared foundation.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ── WHAT YOUR TEAM GETS ── */}
        <section id="what-you-get" className="py-20 sm:py-28 bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                What your team gets
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Concrete outcomes your team walks away with after one focused session.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {[
                {
                  icon: Target,
                  title: "Practical examples for real work",
                  description: "Relevant ways to use AI in writing, planning, summarising, brainstorming, analysis, and routine office work.",
                  color: "bg-emerald-100 text-emerald-700"
                },
                {
                  icon: MessageCircle,
                  title: "Better prompt habits",
                  description: "Simple ways to ask better, guide the tool, and get more useful output — without memorising complicated frameworks.",
                  color: "bg-blue-100 text-blue-700"
                },
                {
                  icon: Shield,
                  title: "Safer usage",
                  description: "Clear understanding of what should not be shared and where staff need to be careful with AI tools.",
                  color: "bg-amber-100 text-amber-700"
                },
                {
                  icon: Eye,
                  title: "A realistic view",
                  description: "What AI is good at, where it still fails, and how to use human judgment well alongside these tools.",
                  color: "bg-violet-100 text-violet-700"
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="group bg-card rounded-2xl p-8 border border-border hover:border-emerald-300/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${item.color} mb-5 transition-transform duration-300 group-hover:scale-110`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ── BUILT FOR REAL WORK ── */}
        <section className="py-20 sm:py-28 bg-[#0a1a14] text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  Built for{" "}
                  <span className="text-emerald-400">real day-to-day work</span>
                </h2>
                <p className="text-lg text-white/70 leading-relaxed mb-8">
                  This is not a talk about futuristic AI. It is a practical workshop for people who write, plan, communicate, analyse, organise, and solve problems in everyday work.
                </p>
                <Button
                  size="lg"
                  className="text-lg font-semibold bg-emerald-500 hover:bg-emerald-400 text-[#0a1a14] h-14 px-8 rounded-xl"
                  onClick={scrollToContact}
                >
                  Book a workshop
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">A good fit for teams that…</p>
                {[
                  "Want practical AI use rather than abstract theory",
                  "Have staff doing writing, planning, communication, admin, or analysis",
                  "Need a shared baseline before deciding what to do next",
                  "Want more confidence and less random experimentation"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-white/80 leading-relaxed">{item}</span>
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


        {/* ── TESTIMONIAL ── */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Quote className="w-10 h-10 text-emerald-500/30 mx-auto mb-6" />
            <blockquote className="text-2xl sm:text-3xl font-medium text-foreground leading-relaxed mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              "This made AI much more concrete for our team. It stopped feeling abstract and started feeling useful."
            </blockquote>
            <p className="text-muted-foreground">— Workshop participant</p>
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


        {/* ── NEED HELP AFTER THE WORKSHOP? ── */}
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
                  We also help organisations identify useful next steps, shape simple internal guidance, and find practical ways to build on what the workshop starts.
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
              The easiest place to start is a workshop. It gives your team a practical foundation and makes the next steps much clearer.
            </p>
            <Button
              size="lg"
              className="text-lg font-semibold bg-emerald-500 hover:bg-emerald-400 text-[#0a1a14] shadow-lg shadow-emerald-500/20 h-14 px-10 rounded-xl transition-all duration-200 hover:shadow-emerald-500/30 hover:scale-[1.02]"
              onClick={scrollToContact}
            >
              Book a workshop
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-white/40 mt-6">
              3-hour workshop · For companies and organisations · Delivered in Faroese or English
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
