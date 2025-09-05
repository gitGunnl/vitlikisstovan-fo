
import { useEffect } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ContactSection from "@/components/site/ContactForm";
import { seoConfig } from "@/content/seo";

export default function Contact() {
  useEffect(() => {
    // Set page metadata
    document.title = "Samband - " + seoConfig.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Hav samband við Vitlíkisstovan. Send okkum boð ella ring til okkara fyri at víðka tína vitlíki møguleikar.");
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = "Hav samband við Vitlíkisstovan. Send okkum boð ella ring til okkara fyri at víðka tína vitlíki møguleikar.";
      document.head.appendChild(meta);
    }
  }, []);

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
