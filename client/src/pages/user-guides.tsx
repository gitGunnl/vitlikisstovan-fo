import { Link } from "wouter";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, ArrowRight } from "lucide-react";
import {
  interactiveGuides,
  legacyPdfGuides,
  interactiveGuidePdfPath,
} from "@/content/guides";

// Unified shape for the listing cards: interactive guides (read in-app + a
// real, build-time generated PDF download) and legacy PDF-only guides.
type GuideCard =
  | {
      kind: "interactive";
      id: string;
      title: string;
      description: string;
      href: string;
      pdfPath: string;
      pdfFilename: string;
      image?: string;
    }
  | {
      kind: "pdf";
      id: string;
      title: string;
      description: string;
      pdfPath: string;
      pdfFilename: string;
      image?: string;
    };

export default function UserGuides() {
  // Title and meta description are owned by the prerender step
  // (scripts/prerender-seo.ts via client/src/content/seo/registry.seo.ts).

  // All guide data is sourced from client/src/content/guides.ts so the listing,
  // the in-app pages and the build-time PDF generator stay in sync.
  const guides: GuideCard[] = [
    ...interactiveGuides
      .filter((g) => g.listed)
      .map((g) => ({
        kind: "interactive" as const,
        id: g.id,
        title: g.title,
        description: g.description,
        href: g.route,
        pdfPath: interactiveGuidePdfPath(g),
        pdfFilename: g.pdfFilename,
        image: g.image,
      })),
    ...legacyPdfGuides.map((g) => ({
      kind: "pdf" as const,
      id: g.id,
      title: g.title,
      description: g.description,
      pdfPath: g.pdfPath,
      pdfFilename: g.pdfFilename,
    })),
  ];

  const handleDownloadPDF = (pdfPath: string, filename: string) => {
    // Download the PDF file
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenPDF = (pdfPath: string) => {
    // Open PDF in new tab
    window.open(pdfPath, '_blank');
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
                Brúkaravegleiðingar
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Umfatandi vegleiðingar til at hjálpa tær at fáa mest burtur úr okkara skipan.
              </p>
            </div>

            {/* Guide Cards */}
            <div className="grid gap-6">
              {guides.map((guide) => (
                <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition-shadow sm:flex sm:items-stretch">
                  {guide.image && (
                    <div className="sm:w-48 sm:flex-shrink-0">
                      <img
                        src={guide.image}
                        alt={guide.title}
                        loading="lazy"
                        className="h-40 w-full object-cover sm:h-full"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl mb-2">{guide.title}</CardTitle>
                    <CardDescription className="text-base">
                      {guide.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="flex gap-3">
                      {guide.kind === "pdf" ? (
                        <Button
                          className="w-full"
                          variant="default"
                          onClick={() => handleOpenPDF(guide.pdfPath)}
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Les vegleiðing
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      ) : (
                        <>
                          <Link href={guide.href} className="flex-1">
                            <Button className="w-full" variant="default">
                              <BookOpen className="h-4 w-4 mr-2" />
                              Les vegleiðing
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            onClick={() => handleDownloadPDF(guide.pdfPath, guide.pdfFilename)}
                            title="Tak PDF niður"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}