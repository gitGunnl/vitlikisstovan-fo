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
      id: "getting-started",
      title: "Komin í gongd Vegleiðing",
      description: "Ein umfatandi vegleiðing til at hjálpa tær at koma í gongd við okkara skipan. Lær grundleggandi, set tín arbeiðsbúnað upp og skilja kjarnuspurningar.",
      href: "/user-guides/getting-started"
    },
    {
      id: "best-practices",
      title: "Bestu Practices Vegleiðing",
      description: "Lær seinastu praksis og prógvaðar strategiir fyri at fáa mest burtur úr okkara skipan. Inkluderar ráð, knøpp og framkomnar teknikkir.",
      href: "/user-guides/best-practices"
    },
    {
      id: "ai-for-caretakers",
      title: "AI fyri Umsorgarfólk",
      description: "Ein praktisk vegleiðing um hvussu vitlíki kann hjálpa við dagligu umsorgararbeiði, dokumentering og samskifti við familju.",
      href: "/user-guides/ai-for-caretakers"
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
                      <Link href={guide.href} className="flex-1">
                        <Button className="w-full" variant="default">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Les vegleiðing
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        onClick={() => handlePrintGuide(guide.href)}
                        title="Sæk niður sum PDF"
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
                <h3 className="text-lg font-semibold mb-2">Fleiri vegleiðingar koma skjótt</h3>
                <p className="text-muted-foreground">
                  Vit leggja støðugt afturat nýggjum vegleiðingum og dagføra tær, ið eru.
                  Vitja okkum aftur at síggja nýtt innihald.
                </p>
              </CardContent>
            </Card>

            {/* Teacher Guide Card */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <GraduationCap className="h-6 w-6" />
                  Fyri lærarar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Lær hvussu tú integrerar vitlíkisamboð í títt klassarúm og undirvísingararbeiði.
                </p>
                <Button className="w-full">Sí vegleiðing</Button>
              </CardContent>
            </Card>

            {/* Business Professional Guide Card */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Briefcase className="h-6 w-6" />
                  Fyri handilsfólk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Uppdag hvussu tú nýtir vitlíki til framleiðni, samskifti og avgerðartakan.
                </p>
                <Button className="w-full">Sí vegleiðing</Button>
              </CardContent>
            </Card>

            {/* Developer Guide Card */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Code className="h-6 w-6" />
                  Fyri forritarar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Kanna vitlíkisstýrd menningaramboð og koduviðgerðarteknikkar.
                </p>
                <Button className="w-full">Sí vegleiðing</Button>
              </CardContent>
            </Card>

            {/* Creative Professional Guide Card */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Palette className="h-6 w-6" />
                  Fyri skapandi yrkisfólk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Lær um vitlíkisamboð til design, innihaldsskaping og listaligar arbeiðsgongdir.
                </p>
                <Button className="w-full">Sí vegleiðing</Button>
              </CardContent>
            </Card>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}