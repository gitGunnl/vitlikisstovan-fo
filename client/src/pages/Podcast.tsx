import { useEffect } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { siteConfig } from "@/content/site";

export default function Podcast() {
  useEffect(() => {
    // Set document title and meta description
    document.title = `Podcast – ${siteConfig.siteName}`;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Listen to our podcast episodes and discover insights from industry experts.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Listen to our podcast episodes and discover insights from industry experts.';
      document.head.appendChild(meta);
    }

    // Add podcast-page class to body
    document.body.classList.add('podcast-page');

    // TODO: parallax scroll handler
    // TODO: mousemove tilt handler
    // TODO: scroll-into-view reveal

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('podcast-page');
    };
  }, []);

  return (
    <>
      <Header />
      <main className="pt-16">
        Podcast page placeholder
      </main>
      <Footer />
    </>
  );
}