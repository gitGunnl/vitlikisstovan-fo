import React, { useEffect } from "react";
import { useParams } from "wouter";
import { createRoot } from "react-dom/client";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import AudioPlayer from "@/components/site/AudioPlayer";
import { Clock } from "lucide-react";
import { seoConfig } from "@/content/seo";
import { updateMetaTags } from "@/lib/meta";
import { getBlogPostBySlug } from "@/content/blog";

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug;
  const post = slug ? getBlogPostBySlug(slug) : null;

  useEffect(() => {
    if (!post) {
      return;
    }

    const fullTitle = `${post.title} - ${seoConfig.title}`;
    const postUrl = `${window.location.origin}/blog/${post.slug}`;
    const postImage = post.ogImage || `/images/blog/${slug}/og-image.jpg`;

    updateMetaTags({
      title: fullTitle,
      description: post.description || post.excerpt,
      image: postImage,
      url: postUrl,
      type: "article",
      publishedTime: post.date,
      author: post.author || seoConfig.author,
      siteName: seoConfig.siteName,
    });

    const existingScript = document.querySelector(
      'script[data-blog-posting-jsonld="true"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-blog-posting-jsonld", "true");
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description || post.excerpt,
      author: {
        "@type": "Person",
        name: post.author || seoConfig.author,
      },
      publisher: {
        "@type": "Organization",
        name: seoConfig.siteName,
      },
      mainEntityOfPage: postUrl,
      url: postUrl,
      datePublished: post.date,
      inLanguage: "fo",
    });
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [post, slug]);

  useEffect(() => {
    if (!post) {
      return;
    }

    setTimeout(() => {
      const placeholders = document.querySelectorAll("[data-audio-player]");
      placeholders.forEach((placeholder) => {
        const audioSrc = placeholder.getAttribute("data-audio-player");
        const title = placeholder.getAttribute("data-title");

        if (audioSrc && title) {
          placeholder.innerHTML = "";
          const root = createRoot(placeholder);
          root.render(<AudioPlayer audioSrc={audioSrc} title={title} />);
        }
      });
    }, 100);
  }, [post]);

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

              <p className="text-lg text-muted-foreground">{post.excerpt}</p>
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
