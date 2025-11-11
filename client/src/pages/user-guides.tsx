import { useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, FileText, ArrowRight } from "lucide-react";
import { seoConfig } from "@/content/seo";

export default function UserGuides() {
  useEffect(() => {
    document.title = "User Guides - " + seoConfig.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const content = "Access comprehensive user guides and documentation. Download guides as PDFs for offline reference.";
    if (metaDescription) {
      metaDescription.setAttribute('content', content);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);

  const guides = [
    {
      id: "getting-started",
      title: "Getting Started Guide",
      description: "A comprehensive guide to help you get started with our platform. Learn the basics, set up your environment, and understand core concepts.",
      href: "/user-guides/getting-started"
    },
    {
      id: "best-practices",
      title: "Best Practices Guide",
      description: "Learn industry best practices and proven strategies for getting the most out of our platform. Includes tips, tricks, and advanced techniques.",
      href: "/user-guides/best-practices"
    }
  ];

  const handlePrintGuide = (guideHref: string) => {
    // Open guide in new window for printing
    window.open(guideHref + "?print=true", '_blank');
  };

  return (
    <>
      <Header />
      
      <main className="pt-16">
        <Section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                User Guides
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive guides to help you make the most of our platform.
              </p>
            </div>

            {/* Guide Cards */}
            <div className="grid gap-6">
              {guides.map((guide) => (
                <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl mb-2">{guide.title}</CardTitle>
                    <CardDescription className="text-base">
                      {guide.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3">
                      <Link href={guide.href} className="flex-1">
                        <Button className="w-full" variant="default">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Read Guide
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        onClick={() => handlePrintGuide(guide.href)}
                        title="Download as PDF"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* More Guides Coming Soon */}
            <Card className="mt-8 border-dashed">
              <CardContent className="py-12 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-muted rounded-full mb-4">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">More Guides Coming Soon</h3>
                <p className="text-muted-foreground">
                  We're continuously adding new guides and updating existing ones. 
                  Check back regularly for new content.
                </p>
              </CardContent>
            </Card>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}