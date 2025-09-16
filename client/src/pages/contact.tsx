
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
      metaDescription.setAttribute('content', "Set teg í samband við Vitlíkisstovuna. Sig mær hvat tú hugsar, so sigi eg tær, hvussu vitlíki kann hjálpa. Antin tú hevur áhugað í 12-vikursskeiðnum til títt toymið, ráðgeving, íkast til eina kreativa verkætlan ella eitt fjórða - so svari eg tær áðrenn næsti gerandisdagur er lokin.");
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = "Set teg í samband við Vitlíkisstovuna. Sig mær hvat tú hugsar, so sigi eg tær, hvussu vitlíki kann hjálpa.";
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
