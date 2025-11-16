import { useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, FileText, ArrowRight, GraduationCap, Briefcase, Code, Palette } from "lucide-react";
import { seoConfig } from "@/content/seo";

export default function UserGuides() {
  useEffect(() => {
    document.title = "Brúkaravegleiðingar - " + seoConfig.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    const content = "Fá atgongd til umfatandi brúkaravegleiðingar og tilhoyrandi skjøl. Lær meira um okkara skipan.";
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
      id: "ai-for-politicians",
      title: "Vitlíki til politikarir",
      description: "Ein handalig vegleiðing fyri politikarar um hvussu vitlíki kann stuðla við politiskari virksemi og átaksgerð.",
      pdfPath: "/Ein_handalig_vegleiding_til_politikarir.pdf",
      pdfFilename: "Ein_handalig_vegleiding_til_politikarir.pdf",
      pdfOnly: true
    },
    {
      id: "ai-for-teachers",
      title: "Vitlíki til lærarir",
      description: "Vegleiðing fyri undirvísarar um hvussu vitlíki kann nýtast í skúlanum og í undirvísingararbeiðinum.",
      pdfPath: "/vegleiding_undirvisarir.pdf",
      pdfFilename: "vegleiding_undirvisarir.pdf",
      pdfOnly: true
    }
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
                <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl mb-2">{guide.title}</CardTitle>
                    <CardDescription className="text-base">
                      {guide.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3">
                      {guide.pdfOnly ? (
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
                            title="Sæk niður sum PDF"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
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