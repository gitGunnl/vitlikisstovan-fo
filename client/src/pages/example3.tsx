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
  ArrowDown,
  Sparkles,
  Target,
  Rocket,
  Star,
  Heart,
  Trophy,
  Brain,
  Home,
  MousePointer2
} from "lucide-react";

export default function Example3() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [particlesVisible, setParticlesVisible] = useState(true);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setIsMounted(true);
    document.title = seoConfig.title + " - Immersive Experience";

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const newActiveSection = Math.floor(scrollPosition / windowHeight);
      setActiveSection(newActiveSection);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleCardFlip = (index: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative">
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 space-y-4">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <button
            key={index}
            onClick={() => {
              const element = document.getElementById(`section-${index}`);
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index 
                ? 'bg-primary w-8' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <Home className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground">Immersive Experience</span>
            <Link href="/example1">
              <Button variant="ghost" size="sm">View Example 1</Button>
            </Link>
            <Link href="/example2">
              <Button variant="ghost" size="sm">View Example 2</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Section 1: Hero with Parallax and Particles */}
      <section 
        id="section-0"
        className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start"
        style={{ scrollSnapAlign: 'start' }}
      >
        {/* Animated Particles */}
        {particlesVisible && (
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${10 + Math.random() * 20}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Parallax Background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-primary mx-auto animate-pulse" />
          </div>
          <h1 
            className="text-6xl lg:text-8xl font-bold mb-6 opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {siteConfig.hero.title}
            </span>
          </h1>
          <p 
            className="text-2xl text-muted-foreground mb-12 opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            {siteConfig.hero.subtitle}
          </p>
          <div 
            className="flex flex-wrap gap-6 justify-center opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            <Button size="lg" className="group text-lg px-8 py-6">
              {siteConfig.hero.primaryCTA.text}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              {siteConfig.hero.secondaryCTA.text}
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <MousePointer2 className="w-6 h-6 text-muted-foreground" />
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Section 2: 3D Flip Cards for Program Phases */}
      <section 
        id="section-1"
        className="min-h-screen flex items-center justify-center px-4 py-24 snap-start bg-gradient-to-b from-background to-muted"
        style={{ scrollSnapAlign: 'start' }}
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">{siteConfig.program.title}</h2>
            <p className="text-xl text-muted-foreground">{siteConfig.program.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.program.phases.map((phase, index) => (
              <div
                key={index}
                className="relative h-96 preserve-3d cursor-pointer"
                onClick={() => toggleCardFlip(index)}
                style={{
                  transform: flippedCards.has(index) ? 'rotateY(180deg)' : 'rotateY(0)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s'
                }}
              >
                {/* Front of card */}
                <Card className="absolute inset-0 backface-hidden">
                  <CardContent className="p-8 h-full flex flex-col justify-center items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <span className="text-3xl font-bold text-primary">{index + 1}</span>
                    </div>
                    <div className="text-sm font-semibold text-primary mb-2">{phase.period}</div>
                    <h3 className="text-2xl font-bold mb-4">{phase.title}</h3>
                    <p className="text-muted-foreground">{phase.description}</p>
                    <div className="mt-auto pt-4">
                      <span className="text-sm text-muted-foreground">Click to flip →</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Back of card */}
                <Card 
                  className="absolute inset-0 backface-hidden"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <CardContent className="p-8 h-full flex flex-col">
                    <h3 className="text-xl font-bold mb-6">Highlights</h3>
                    <ul className="space-y-3 flex-1">
                      {phase.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-4">
                      <span className="text-sm text-muted-foreground">← Click to flip back</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Services with Hover Effects */}
      <section 
        id="section-2"
        className="min-h-screen flex items-center justify-center px-4 py-24 snap-start relative overflow-hidden"
        style={{ scrollSnapAlign: 'start' }}
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-gradient-shift"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">{siteConfig.consulting.title}</h2>
            <p className="text-xl text-muted-foreground">{siteConfig.consulting.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.consulting.services.map((service, index) => {
              const icons = [Building2, Users, Palette];
              const Icon = icons[index];
              const colors = ['from-blue-500/20 to-purple-500/20', 'from-green-500/20 to-teal-500/20', 'from-orange-500/20 to-red-500/20'];
              
              return (
                <div
                  key={index}
                  className="group relative"
                  style={{
                    animation: `slideInScale 0.8s ease-out ${index * 0.2}s both`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-xl"
                    style={{
                      background: `linear-gradient(to bottom right, ${colors[index].split(' ').join(', ')})`
                    }}
                  />
                  <Card className="relative h-full backdrop-blur-sm bg-background/90 border-primary/10 hover:border-primary/30 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                    <CardContent className="p-8 text-center">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br mx-auto mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500"
                        style={{
                          background: `linear-gradient(to bottom right, ${colors[index].split(' ').join(', ')})`
                        }}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: Animated Features Grid */}
      <section 
        id="section-3"
        className="min-h-screen flex items-center justify-center px-4 py-24 snap-start bg-gradient-to-b from-muted to-background"
        style={{ scrollSnapAlign: 'start' }}
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">{siteConfig.why.title}</h2>
            <p className="text-xl text-muted-foreground">{siteConfig.why.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {siteConfig.why.features.map((feature, index) => {
              const icons = [Globe, Lightbulb, MessageCircle, Zap];
              const Icon = icons[index];
              const animations = ['animate-float', 'animate-pulse', 'animate-spin-slow', 'animate-bounce'];
              
              return (
                <div
                  key={index}
                  className="group"
                  style={{
                    animation: `expandIn 0.8s ease-out ${index * 0.15}s both`
                  }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="p-8 relative z-10">
                      <div className="flex items-center gap-6 mb-4">
                        <div className={`w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center ${animations[index]}`}>
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold">{feature.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-lg">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5: Outcomes with Animation */}
      <section 
        id="section-4"
        className="min-h-screen flex items-center justify-center px-4 py-24 snap-start relative overflow-hidden"
        style={{ scrollSnapAlign: 'start' }}
      >
        {/* Animated Stars Background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <Star
              key={i}
              className="absolute text-primary/10 animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
          <Trophy className="w-20 h-20 text-primary mx-auto mb-8 animate-bounce" />
          <h2 className="text-5xl font-bold mb-12">Úrslit</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteConfig.program.outcomes.map((outcome, index) => (
              <div
                key={index}
                className="group"
                style={{
                  animation: `slideInFromBottom 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <Card className="backdrop-blur-sm bg-background/80 hover:bg-background transition-all duration-300 group-hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-left">{outcome}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Final CTA */}
      <section 
        id="section-5"
        className="min-h-screen flex items-center justify-center px-4 py-24 snap-start relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10"
        style={{ scrollSnapAlign: 'start' }}
      >
        {/* Animated Circles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary/10 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Heart className="w-16 h-16 text-primary mx-auto mb-8 animate-pulse" />
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">Klárir at byrja ferðina?</h2>
          <p className="text-2xl text-muted-foreground mb-12">Lat okkum hjálpa tykkum at koma í gongd við vitlíki</p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Button size="lg" className="group text-lg px-10 py-6">
              Bílegg eitt prát
              <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10 py-6">
              Les meira
              <Brain className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-30px) translateX(10px);
          }
          66% {
            transform: translateY(30px) translateX(-10px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(100px) translateY(-100px);
          }
        }

        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes expandIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }

        .animate-gradient-shift {
          animation: gradient-shift 10s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
        }

        html {
          scroll-snap-type: y proximity;
          scroll-behavior: smooth;
        }

        section {
          scroll-snap-align: start;
        }
      `}</style>
    </div>
  );
}