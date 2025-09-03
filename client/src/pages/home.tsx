import { useEffect, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import CardFeature from "@/components/site/CardFeature";
import CTAButtons from "@/components/site/CTAButtons";
import ContactSection from "@/components/site/ContactForm";
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
  Mail,
  Phone
} from "lucide-react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

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
            className="mt-2"
          />
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
          <div className="mb-12">
            <div className="mx-auto max-w-4xl text-center mb-8">
              <h3 className="text-2xl font-bold tracking-tight mb-4">
                {siteConfig.program.whatWeDeliver.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {siteConfig.program.whatWeDeliver.items.map((item, index) => (
                <Card key={index} className="bg-background hover:bg-accent/5 group">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-12">
            <div className="mx-auto max-w-4xl text-center mb-8">
              <h3 className="text-2xl font-bold tracking-tight mb-4">
                {siteConfig.program.howItWorks.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {siteConfig.program.howItWorks.steps.map((step, index) => (
                <Card key={index} className="bg-background hover:bg-accent/5 group">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors duration-300">{step.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Delivery Section */}
          <div className="mb-12">
            <div className="mx-auto max-w-4xl text-center mb-8">
              <h3 className="text-2xl font-bold tracking-tight mb-4">
                {siteConfig.program.delivery.title}
              </h3>
              <p className="text-lg text-muted-foreground">
                {siteConfig.program.delivery.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {siteConfig.program.delivery.items.map((item, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold mb-3">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-muted">
              <CardContent className="p-6">
                <p className="text-sm text-center italic text-muted-foreground">
                  {siteConfig.program.delivery.note}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-background">
            <CardContent className="p-8">
              <h4 className="text-xl font-bold mb-4">Úrslit</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {siteConfig.program.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Section>

        {/* Consulting & Projects */}
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
            <CardFeature
              icon={<Building2 className="w-6 h-6" />}
              title={siteConfig.consulting.services[0].title}
              description={siteConfig.consulting.services[0].description}
            />
            <CardFeature
              icon={<Users className="w-6 h-6" />}
              title={siteConfig.consulting.services[1].title}
              description={siteConfig.consulting.services[1].description}
            />
            <CardFeature
              icon={<Palette className="w-6 h-6" />}
              title={siteConfig.consulting.services[2].title}
              description={siteConfig.consulting.services[2].description}
            />
          </div>
        </Section>

        {/* Why Vitlíkisstovan */}
        <Section id="why" className="py-24 bg-muted">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {siteConfig.why.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {siteConfig.why.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <CardFeature
              icon={<Globe className="w-6 h-6" />}
              title={siteConfig.why.features[0].title}
              description={siteConfig.why.features[0].description}
            />
            <CardFeature
              icon={<Lightbulb className="w-6 h-6" />}
              title={siteConfig.why.features[1].title}
              description={siteConfig.why.features[1].description}
            />
            <CardFeature
              icon={<MessageCircle className="w-6 h-6" />}
              title={siteConfig.why.features[2].title}
              description={siteConfig.why.features[2].description}
            />
            <CardFeature
              icon={<Zap className="w-6 h-6" />}
              title={siteConfig.why.features[3].title}
              description={siteConfig.why.features[3].description}
            />
          </div>

          {/* Founder Section */}
          <div className="mx-auto max-w-4xl">
            <h3 className="text-2xl font-bold tracking-tight mb-8 text-center">
              {siteConfig.why.founder.heading}
            </h3>
            <Card className="bg-background">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-1 text-center lg:text-left">
                    <div className="w-32 h-32 mx-auto lg:mx-0 mb-4 overflow-hidden rounded-full">
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
                    <p className="text-muted-foreground mb-6">{siteConfig.why.founder.summary}</p>

                    <ul className="space-y-3 mb-6">
                      {siteConfig.why.founder.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                      "{siteConfig.why.founder.quote}"
                    </blockquote>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.cases.highlights.map((highlight, index) => (
              <Card key={index} className="bg-card border">
                <CardContent className="p-8">
                  <img 
                    src={highlight.image} 
                    alt={highlight.imageAlt}
                    className="w-full h-48 object-cover rounded-lg mb-6" 
                  />
                  <h3 className="text-xl font-bold mb-4">{highlight.title}</h3>
                  <p className="text-muted-foreground mb-6">{highlight.description}</p>
                  <Button 
                    variant={highlight.buttonVariant as "default" | "outline"}
                    asChild
                    data-testid={`button-case-${index}`}
                  >
                    <a href={highlight.buttonHref}>
                      {highlight.buttonText}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* Resources */}
        <Section id="resources" className="py-24 bg-muted">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {siteConfig.resources.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {siteConfig.resources.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.resources.items.map((resource, index) => (
              <Card key={index} className="bg-background text-center">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${resource.iconBg} rounded-lg flex items-center justify-center mx-auto mb-6`}>
                    {resource.icon === 'FileText' && <FileText className={`w-8 h-8 ${resource.iconColor}`} />}
                    {resource.icon === 'Video' && <Video className={`w-8 h-8 ${resource.iconColor}`} />}
                    {resource.icon === 'MessageCircle' && <MessageCircle className={`w-8 h-8 ${resource.iconColor}`} />}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{resource.title}</h3>
                  <p className="text-muted-foreground mb-6">{resource.description}</p>
                  <Button 
                    className={resource.buttonStyle}
                    asChild
                    data-testid={`button-resource-${index}`}
                  >
                    <a href={resource.href}>
                      {resource.buttonText}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
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