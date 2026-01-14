
import { useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Briefcase, Headphones, Wrench, ArrowRight } from "lucide-react";
import { seoConfig } from "@/content/seo";

export default function AnnadFraVitlikisstovuni() {
  useEffect(() => {
    document.title = "Annað frá Vitlíkisstovuni - " + seoConfig.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    const content = "Yvirlit yvir alt tilfar og tilfeingi frá Vitlíkisstovuni - vegleiðingar, verkætlanir, poddvarp og verkstovur.";
    if (metaDescription) {
      metaDescription.setAttribute('content', content);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);

  const items = [
    {
      id: "vegleidingar",
      icon: <BookOpen className="w-6 h-6" />,
      title: "Vegleiðingar",
      description: "Umfatandi brúkaravegleiðingar og praktiskar vegleiðingar fyri ymisk yrkisøki og uppgávur.",
      href: "/user-guides",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "vitliki-til-arbeidis",
      icon: <Briefcase className="w-6 h-6" />,
      title: "Vitlíki til arbeiðis",
      description: "Fylg okkara verkætlan, ið mennir vitlíkivegleiðingar til føroyska vinnulívið.",
      href: "/tilarbeidis",
      color: "from-green-500 to-green-600"
    },
    {
      id: "poddvarp",
      icon: <Headphones className="w-6 h-6" />,
      title: "Vitlíki poddvarp um Føroyar",
      description: "Hoyr spennandi sagnir úr Føroyum, frásagdar av vitlíki. Frá forntíð til nútíð.",
      href: "/podcast",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "verkstova",
      icon: <Wrench className="w-6 h-6" />,
      title: "Verkstovur",
      description: "Luttakarar atgongd til okkara verkstovur.",
      href: "/verkstova",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <>
      <Header />

      <main className="pt-16">
        <Section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Annað frá Vitlíkisstovuni
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Yvirlit yvir allt okkara tilfar og tilfeingi - vegleiðingar, verkætlanir, poddvarp og verkstovur.
              </p>
            </div>

            {/* Items Grid */}
            <div className="grid gap-6">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Icon section */}
                      <div className={`md:w-24 flex items-center justify-center p-6 bg-gradient-to-br ${item.color} text-white`}>
                        <div className="w-12 h-12 flex items-center justify-center">
                          {item.icon}
                        </div>
                      </div>
                      
                      {/* Content section */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-4 md:mb-0">
                              {item.description}
                            </p>
                          </div>
                          
                          {/* Button */}
                          <div className="md:ml-6">
                            <Link href={item.href}>
                              <Button className="w-full md:w-auto group-hover:scale-105 transition-transform">
                                Far til síðu
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bottom section */}
            <div className="mt-12 text-center">
              <div className="bg-muted/30 rounded-xl p-8">
                <h2 className="text-xl font-semibold mb-4">
                  Hevur tú spurningar?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Um tú hevur spurningar ella ynskir at vita meira - skriva enduliga.
                </p>
                <Link href="/contact">
                  <Button size="lg">
                    Set teg í samband við okkum
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
