
import { useEffect } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { seoConfig } from "@/content/seo";
import { Link } from "wouter";
import { CalendarDays } from "lucide-react";

export default function Blog() {
  useEffect(() => {
    document.title = "Blogg - " + seoConfig.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    const content = "Les okkara nýggjastu greinar um vitlíki, koding og tøkni í Føroyum.";
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);

  // This will eventually come from your content system
  const blogPosts = [
    {
      slug: "vitliki-i-foroyum",
      title: "Vitlíki í Føroyum",
      excerpt: "Ein innleiðing til hvussu vitlíki kann broyta okkara samfelag og vinnulív.",
      date: "2024-01-15",
      readTime: "5 min"
    }
  ];

  return (
    <>
      <Header />
      <main className="pt-16">
        <Section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Okkara Blogg
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nýggjastu greinar um vitlíki, koding og tøkni í Føroyum
              </p>
            </div>

            <div className="grid gap-6 md:gap-8">
              {blogPosts.map((post) => (
                <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('fo-FO')}
                      </div>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <CardTitle className="text-xl sm:text-2xl">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {post.excerpt}
                    </p>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary font-medium hover:underline"
                    >
                      Les meira →
                    </Link>
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
