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
        <Section id="hero" className="py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
              {siteConfig.hero.title}
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground mb-8">
              {siteConfig.hero.subtitle}
            </p>
            <CTAButtons 
              primary={{
                text: siteConfig.hero.primaryCTA.text,
                href: siteConfig.hero.primaryCTA.href,
                testId: "cta-primary-hero"
              }}
              secondary={{
                text: siteConfig.hero.secondaryCTA.text,
                href: siteConfig.hero.secondaryCTA.href,
                testId: "cta-secondary-hero"
              }}
            />
          </div>
        </Section>

        {/* The Flagship Program */}
        <Section id="program" className="py-24 bg-muted">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {siteConfig.program.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {siteConfig.program.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {siteConfig.program.phases.map((phase, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="p-8">
                  <div className="text-sm font-medium text-primary mb-2">{phase.period}</div>
                  <h3 className="text-2xl font-bold mb-4">{phase.title}</h3>
                  <p className="text-muted-foreground mb-6">{phase.description}</p>
                  <ul className="space-y-2 text-sm">
                    {phase.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-background">
            <CardContent className="p-8">
              <h4 className="text-xl font-bold mb-4">Program Outcomes</h4>
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
                    <div className="w-32 h-32 mx-auto lg:mx-0 mb-4 bg-muted rounded-full flex items-center justify-center">
                      <Users className="w-16 h-16 text-muted-foreground" />
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
