
import { useEffect } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ContactSection from "@/components/site/ContactForm";
import { seoConfig } from "@/content/seo";

export default function Contact() {
  // Title and meta description are owned by the prerender step
  // (scripts/prerender-seo.ts via client/src/content/seo/registry.seo.ts).

  return (
    <>
      <Header />
      <main className="pt-16">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
