import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  ArrowRight,
  Sparkles,
  Rocket,
  Target,
  TrendingUp,
  Home
} from "lucide-react";

export default function Example1() {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    document.title = seoConfig.title + " - Bento Grid Layout";
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <Home className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground">Bento Grid Layout</span>
            <Link href="/example2">
              <Button variant="ghost" size="sm">View Example 2</Button>
            </Link>
            <Link href="/example3">
              <Button variant="ghost" size="sm">View Example 3</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Bento Grid Hero */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[200px]">
            {/* Main Title Card - Spans 4 columns */}
            <Card 
              className="md:col-span-4 lg:col-span-4 row-span-2 relative overflow-hidden backdrop-blur-sm bg-background/80 border-primary/20 hover:border-primary/40 transition-all duration-500 transform hover:scale-[1.02] cursor-pointer"
              onMouseEnter={() => setHoveredCard('hero')}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: hoveredCard === 'hero' ? 'rotateY(-5deg) rotateX(5deg)' : 'rotateY(0) rotateX(0)',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.5s ease'
              }}
            >
              <CardContent className="p-8 h-full flex flex-col justify-center">
                <Sparkles className="w-12 h-12 text-primary mb-6 animate-spin-slow" />
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {siteConfig.hero.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {siteConfig.hero.subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="group">
                    {siteConfig.hero.primaryCTA.text}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button size="lg" variant="outline">
                    {siteConfig.hero.secondaryCTA.text}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card 1 */}
            <Card className="md:col-span-2 lg:col-span-2 backdrop-blur-sm bg-primary/10 border-primary/20 hover:bg-primary/20 transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 h-full flex flex-col justify-center items-center text-center">
                <Rocket className="w-10 h-10 text-primary mb-4 group-hover:animate-bounce" />
                <div className="text-3xl font-bold text-primary mb-2">12 Vikur</div>
                <p className="text-sm text-muted-foreground">Fullkomin skeið</p>
              </CardContent>
            </Card>

            {/* Feature Card 1 */}
            <Card className="md:col-span-2 lg:col-span-2 backdrop-blur-sm bg-accent/10 border-accent/20 hover:bg-accent/20 transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 h-full flex flex-col justify-center">
                <Target className="w-8 h-8 text-accent mb-4 group-hover:rotate-180 transition-transform duration-500" />
                <h3 className="font-semibold mb-2">Praktiskt og greitt</h3>
                <p className="text-sm text-muted-foreground">Læring gjørd fyri veruligt arbeiði</p>
              </CardContent>
            </Card>

            {/* Feature Card 2 */}
            <Card className="md:col-span-2 lg:col-span-2 backdrop-blur-sm bg-muted/60 border hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 h-full flex flex-col justify-center">
                <TrendingUp className="w-8 h-8 text-foreground mb-4 group-hover:animate-pulse" />
                <h3 className="font-semibold mb-2">Úrslit</h3>
                <p className="text-sm text-muted-foreground">Síggjandi broytingar í produktiviteti</p>
              </CardContent>
            </Card>

            {/* Image/Visual Card */}
            <Card className="md:col-span-2 lg:col-span-2 row-span-2 relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
              <CardContent className="p-6 h-full flex items-center justify-center relative z-10">
                <div className="text-center">
                  <GraduationCap className="w-20 h-20 text-primary mx-auto mb-4 group-hover:rotate-12 transition-transform" />
                  <p className="text-lg font-semibold">Læring & Menning</p>
                  <p className="text-sm text-muted-foreground mt-2">Fyri øll í tykkara toymi</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Phases - Bento Style */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {siteConfig.program.title}
            </h2>
            <p className="text-xl text-muted-foreground">{siteConfig.program.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto">
            {siteConfig.program.phases.map((phase, index) => (
              <Card 
                key={index}
                className={`
                  ${index === 0 ? 'md:col-span-7' : index === 1 ? 'md:col-span-5' : 'md:col-span-12'}
                  relative overflow-hidden group hover:shadow-2xl transition-all duration-500
                  backdrop-blur-sm bg-background/90 border-primary/10 hover:border-primary/30
                `}
                style={{
                  transform: hoveredCard === `phase-${index}` ? 'translateY(-10px)' : 'translateY(0)',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={() => setHoveredCard(`phase-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="hidden lg:block">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <span className="text-2xl font-bold text-primary">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-primary mb-2">{phase.period}</div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{phase.title}</h3>
                      <p className="text-muted-foreground mb-6">{phase.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {phase.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{siteConfig.consulting.title}</h2>
            <p className="text-xl text-muted-foreground">{siteConfig.consulting.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteConfig.consulting.services.map((service, index) => {
              const icons = [Building2, Users, Palette];
              const Icon = icons[index];
              return (
                <Card 
                  key={index}
                  className="group relative overflow-hidden backdrop-blur-sm bg-background/80 border-primary/10 hover:border-primary/30 transition-all duration-500 cursor-pointer"
                  style={{
                    transform: hoveredCard === `service-${index}` ? 'scale(1.05) rotateY(-5deg)' : 'scale(1) rotateY(0)',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={() => setHoveredCard(`service-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Section - Masonry Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{siteConfig.why.title}</h2>
            <p className="text-xl text-muted-foreground">{siteConfig.why.subtitle}</p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {siteConfig.why.features.map((feature, index) => {
              const icons = [Globe, Lightbulb, MessageCircle, Zap];
              const Icon = icons[index];
              const heights = ['h-64', 'h-72', 'h-80', 'h-68'];
              return (
                <Card 
                  key={index}
                  className={`${heights[index]} break-inside-avoid backdrop-blur-sm bg-background/80 border-primary/10 hover:border-primary/30 transition-all duration-300 group cursor-pointer`}
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    <Icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground flex-1">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 animate-pulse"></div>
            <CardContent className="p-12 text-center relative z-10">
              <h2 className="text-3xl font-bold mb-4">Klárir at byrja?</h2>
              <p className="text-xl text-muted-foreground mb-8">Lat okkum hjálpa tykkum at koma í gongd við vitlíki</p>
              <Button size="lg" className="group">
                Bílegg eitt prát
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}