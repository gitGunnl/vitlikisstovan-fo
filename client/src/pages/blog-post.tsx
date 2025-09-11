
import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { seoConfig } from "@/content/seo";
import { CalendarDays, Clock } from "lucide-react";
import { Link } from "wouter";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This will eventually load the actual blog post content
    // For now, we'll use dummy data
    const loadPost = async () => {
      try {
        // Import the blog post content dynamically
        const postModule = await import(`@/content/blog/${params?.slug}.ts`);
        setPost(postModule.default);
        
        // Set page metadata
        document.title = postModule.default.title + " - " + seoConfig.title;
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute("content", postModule.default.excerpt);
        } else {
          const meta = document.createElement("meta");
          meta.name = "description";
          meta.content = postModule.default.excerpt;
          document.head.appendChild(meta);
        }
      } catch (error) {
        console.error("Failed to load blog post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (params?.slug) {
      loadPost();
    }
  }, [params?.slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-16">
          <Section className="py-16">
            <div className="mx-auto max-w-3xl text-center">
              <p>Lesar...</p>
            </div>
          </Section>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className="pt-16">
          <Section className="py-16">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-2xl font-bold mb-4">Grein ikki funnin</h1>
            </div>
          </Section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-16">
        <Section className="py-16">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {post.title}
              </h1>
              
              <p className="text-lg text-muted-foreground">
                {post.excerpt}
              </p>
            </div>

            <div 
              className="prose prose-gray max-w-none prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
