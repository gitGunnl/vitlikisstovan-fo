import React, { useEffect, useState } from "react";
import { useRoute, useParams } from "wouter";
import { createRoot } from "react-dom/client";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import AudioPlayer from "@/components/site/AudioPlayer";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, User } from "lucide-react";
import { seoConfig } from "@/content/seo";
import { updateMetaTags } from "@/lib/meta";
import { Link } from "wouter";


export default function BlogPost() {
  const params = useParams();
  const slug = params.slug;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This will eventually load the actual blog post content
    // For now, we'll use dummy data
    const loadPost = async () => {
      try {
        // Import the blog post content dynamically
        const postModule = await import(`@/content/blog/${slug}.ts`);
        setPost(postModule.default);

        // Set page metadata with Open Graph support
        const fullTitle = `${postModule.default.title} - ${seoConfig.title}`;
        const postUrl = `${window.location.origin}/blog/${slug}`;
        const postImage = postModule.default.ogImage || `/images/blog/${slug}/og-image.jpg`;
        
        updateMetaTags({
          title: fullTitle,
          description: postModule.default.excerpt,
          image: postImage,
          url: postUrl,
          type: 'article',
          publishedTime: postModule.default.date,
          author: postModule.default.author || seoConfig.author,
          siteName: seoConfig.siteName
        });
      } catch (error) {
        console.error("Failed to load blog post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  useEffect(() => {
    if (post) {
      // Wait a bit for the content to render to the DOM
      setTimeout(() => {
        // Find and replace audio player placeholders with React components
        const placeholders = document.querySelectorAll('[data-audio-player]');
        placeholders.forEach((placeholder) => {
          const audioSrc = placeholder.getAttribute('data-audio-player');
          const title = placeholder.getAttribute('data-title');

          if (audioSrc && title) {
            // Clear the placeholder content
            placeholder.innerHTML = '';

            // Create and render the React component
            const root = createRoot(placeholder);
            root.render(<AudioPlayer audioSrc={audioSrc} title={title} />);
          }
        });
      }, 100);
    }
  }, [post]);

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