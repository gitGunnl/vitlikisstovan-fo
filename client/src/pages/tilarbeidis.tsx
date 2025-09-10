
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";

export default function Tilarbeidis() {
  return (
    <>
      <Header />
      
      <main className="pt-16">
        <Section className="py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              Til arbeiðis
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {/* Add your content here */}
            </p>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
