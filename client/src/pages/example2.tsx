import { useEffect, useState, useRef } from "react";
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
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  Briefcase,
  Home,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

export default function Example2() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    document.title = seoConfig.title + " - Horizontal Flow Layout";

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: "12", label: "Vikur skeið", icon: Calendar },
    { value: "100%", label: "Praktiskt", icon: Briefcase },
    { value: "∞", label: "Støða", icon: Award },
    { value: "24/7", label: "Atgongd", icon: Clock }
  ];

  const nextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % siteConfig.consulting.services.length);
  };

  const prevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + siteConfig.consulting.services.length) % siteConfig.consulting.services.length);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-muted">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-1 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <Home className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground">Horizontal Flow Layout</span>
            <Link href="/example1">
              <Button variant="ghost" size="sm">View Example 1</Button>
            </Link>
            <Link href="/example3">
              <Button variant="ghost" size="sm">View Example 3</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero with Animated Counter */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
        {/* Animated Background Lines */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"
              style={{
                top: `${i * 5}%`,
                left: '-100%',
                right: '-100%',
                animationDelay: `${i * 0.2}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            {siteConfig.hero.title}
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            {siteConfig.hero.subtitle}
          </p>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="relative group"
                  style={{
                    animation: `slideUp 0.8s ease-out ${index * 0.1}s both`
                  }}
                >
                  <Card className="backdrop-blur-sm bg-background/80 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      <Icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:animate-bounce" />
                      <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="group">
              {siteConfig.hero.primaryCTA.text}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              {siteConfig.hero.secondaryCTA.text}
            </Button>
          </div>
        </div>
      </section>

      {/* Horizontal Scrolling Timeline */}
      <section className="py-24 bg-muted/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <h2 className="text-4xl font-bold text-center mb-4">{siteConfig.program.title}</h2>
          <p className="text-xl text-muted-foreground text-center">{siteConfig.program.subtitle}</p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -translate-y-1/2"></div>

          {/* Scrollable Container */}
          <div 
            ref={horizontalRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide px-8 pb-8 snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {siteConfig.program.phases.map((phase, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-[400px] snap-center"
              >
                {/* Timeline Node */}
                <div className="flex flex-col items-center mb-8">
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                      currentPhase === index 
                        ? 'bg-primary text-primary-foreground scale-125' 
                        : 'bg-background border-2 border-primary'
                    }`}
                    onClick={() => setCurrentPhase(index)}
                  >
                    <span className="text-xl font-bold">{index + 1}</span>
                  </div>
                  <div className="h-8 w-px bg-primary/30"></div>
                </div>

                {/* Phase Card */}
                <Card 
                  className={`transition-all duration-500 cursor-pointer ${
                    currentPhase === index 
                      ? 'shadow-2xl scale-105 border-primary' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setCurrentPhase(index)}
                >
                  <CardContent className="p-6">
                    <div className="text-sm font-semibold text-primary mb-2">{phase.period}</div>
                    <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                    <p className="text-muted-foreground mb-4">{phase.description}</p>
                    <ul className="space-y-2">
                      {phase.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => {
              if (horizontalRef.current) {
                horizontalRef.current.scrollBy({ left: -420, behavior: 'smooth' });
              }
            }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => {
              if (horizontalRef.current) {
                horizontalRef.current.scrollBy({ left: 420, behavior: 'smooth' });
              }
            }}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Services Carousel */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">{siteConfig.consulting.title}</h2>
          <p className="text-xl text-muted-foreground text-center mb-16">{siteConfig.consulting.subtitle}</p>

          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
              >
                {siteConfig.consulting.services.map((service, index) => {
                  const icons = [Building2, Users, Palette];
                  const Icon = icons[index];
                  return (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <Card className="max-w-2xl mx-auto">
                        <CardContent className="p-12 text-center">
                          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <Icon className="w-12 h-12 text-primary" />
                          </div>
                          <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                          <p className="text-lg text-muted-foreground">{service.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevCarousel}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-background border shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextCarousel}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-background border shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {siteConfig.consulting.services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCarouselIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    carouselIndex === index 
                      ? 'w-8 bg-primary' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Section with Animated Cards */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">{siteConfig.why.title}</h2>
          <p className="text-xl text-muted-foreground text-center mb-16">{siteConfig.why.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {siteConfig.why.features.map((feature, index) => {
              const icons = [Globe, Lightbulb, MessageCircle, Zap];
              const Icon = icons[index];
              return (
                <div
                  key={index}
                  className="group"
                  style={{
                    animation: `slideInFromLeft 0.8s ease-out ${index * 0.1}s both`
                  }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Outcomes Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Úrslit</h2>

          <div className="relative">
            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {siteConfig.program.outcomes.slice(0, 6).map((outcome, index) => (
                <div
                  key={index}
                  className="group"
                  style={{
                    animation: `fadeIn 0.8s ease-out ${index * 0.1}s both`
                  }}
                >
                  <Card className="backdrop-blur-sm bg-background/90 hover:bg-background transition-all duration-300 group-hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <TrendingUp className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-sm">{outcome}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Klárir at byrja ferðina?</h2>
          <p className="text-xl text-muted-foreground mb-8">Lat okkum hjálpa tykkum at nýta vitlíki til fulnar</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="group">
              Bílegg eitt prát
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              Lær meira
            </Button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}