
import { useEffect } from "react";
import { Link, useSearch } from "wouter";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { seoConfig } from "@/content/seo";

export default function AIForCaretakersGuide() {
  const search = useSearch();
  const isPrintMode = search === "?print=true";

  useEffect(() => {
    document.title = "AI for Caretakers Guide - " + seoConfig.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    const content = "A comprehensive guide on using AI tools to support caretaking responsibilities and improve care quality.";
    if (metaDescription) {
      metaDescription.setAttribute('content', content);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = content;
      document.head.appendChild(meta);
    }

    // Auto-print if print mode
    if (isPrintMode) {
      window.print();
    }
  }, [isPrintMode]);

  const handlePrint = () => {
    window.print();
  };

  // Custom styles for this specific guide - caring/healthcare theme
  const customStyles = `
    @media print {
      .no-print { display: none !important; }
      .guide-content { 
        max-width: 100% !important;
        padding: 0 !important;
        font-size: 12pt !important;
      }
      h1 { font-size: 24pt !important; page-break-after: avoid; }
      h2 { font-size: 18pt !important; page-break-after: avoid; margin-top: 24pt !important; }
      h3 { font-size: 14pt !important; page-break-after: avoid; margin-top: 18pt !important; }
      section { page-break-inside: avoid; }
      .page-break { page-break-before: always; }
      a { color: black !important; text-decoration: none !important; }
      code { 
        background-color: #f5f5f5 !important;
        border: 1px solid #ddd !important;
        padding: 2px 4px !important;
      }
      pre { 
        background-color: #f5f5f5 !important;
        border: 1px solid #ddd !important;
        page-break-inside: avoid;
      }
    }

    /* Custom theme for this guide - caring/healthcare theme */
    .guide-accent { color: #0891b2; }
    .guide-bg-accent { background-color: #f0f9ff; }
    .guide-border-accent { border-color: #0891b2; }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {!isPrintMode && <Header />}

      {/* Print-only header - hidden on screen, shown in print */}
      <div className="print-header hidden">
        <div className="flex justify-between items-center">
          <span>AI for Caretakers Guide</span>
          <span>Vitlíkisstovan</span>
        </div>
      </div>

      {/* Print-only footer - hidden on screen, shown in print */}
      <div className="print-footer hidden">
        <div className="flex justify-between items-center text-xs">
          <span>© 2024 Vitlíkisstovan</span>
          <span className="print-page-number"></span>
        </div>
      </div>

      <main className={`${!isPrintMode ? 'pt-16' : ''} bg-white`}>
        {/* Navigation - Hidden in print */}
        {!isPrintMode && (
          <div className="no-print border-b">
            <Section className="py-4">
              <div className="flex justify-between items-center max-w-4xl mx-auto">
                <Link href="/user-guides">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Guides
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print / Save as PDF
                </Button>
              </div>
            </Section>
          </div>
        )}

        {/* Guide Content */}
        <Section className="py-8 sm:py-12">
          <article className="guide-content mx-auto max-w-4xl prose prose-gray prose-lg">
            {/* Title Page */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 guide-accent">AI for Caretakers Guide</h1>
              <p className="text-xl text-gray-600">Leveraging artificial intelligence to enhance care quality and efficiency</p>
              <div className="mt-8 text-sm text-gray-500">
                <p>Version 1.0</p>
                <p>Last Updated: November 2024</p>
              </div>
            </div>

            {/* Table of Contents */}
            <section className="guide-bg-accent p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-4 guide-accent">Table of Contents</h2>
              <nav>
                <ol className="space-y-2">
                  <li><a href="#introduction" className="hover:underline">1. Introduction</a></li>
                  <li><a href="#getting-started" className="hover:underline">2. Getting Started with AI</a></li>
                  <li><a href="#daily-tasks" className="hover:underline">3. AI for Daily Care Tasks</a></li>
                  <li><a href="#communication" className="hover:underline">4. Communication and Documentation</a></li>
                  <li><a href="#safety-considerations" className="hover:underline">5. Safety and Privacy Considerations</a></li>
                  <li><a href="#practical-examples" className="hover:underline">6. Practical Examples</a></li>
                  <li><a href="#resources" className="hover:underline">7. Additional Resources</a></li>
                </ol>
              </nav>
            </section>

            {/* Introduction */}
            <section id="introduction" className="mb-12">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">1. Introduction</h2>
              <p>
                This guide provides practical insights for caretakers looking to integrate AI tools into their daily routines.
                Replace this section with your prepared content.
              </p>

              <div className="bg-blue-50 border-l-4 guide-border-accent p-4 my-6">
                <h3 className="font-semibold guide-accent">Key Benefits</h3>
                <ul className="mt-2 space-y-1">
                  <li>Improved care documentation</li>
                  <li>Enhanced communication with families</li>
                  <li>Streamlined administrative tasks</li>
                  <li>Better care planning and coordination</li>
                </ul>
              </div>
            </section>

            {/* Getting Started */}
            <section id="getting-started" className="mb-12 page-break">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">2. Getting Started with AI</h2>
              <p>
                Placeholder content for getting started section. Replace with your prepared text.
              </p>
            </section>

            {/* Daily Tasks */}
            <section id="daily-tasks" className="mb-12">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">3. AI for Daily Care Tasks</h2>
              <p>
                Placeholder content for daily tasks section. Replace with your prepared text.
              </p>
            </section>

            {/* Communication */}
            <section id="communication" className="mb-12 page-break">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">4. Communication and Documentation</h2>
              <p>
                Placeholder content for communication section. Replace with your prepared text.
              </p>
            </section>

            {/* Safety Considerations */}
            <section id="safety-considerations" className="mb-12">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">5. Safety and Privacy Considerations</h2>
              <p>
                Placeholder content for safety section. Replace with your prepared text.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                <h4 className="font-semibold text-yellow-800">⚠️ Important Privacy Note</h4>
                <p className="text-yellow-700">
                  Always ensure patient privacy and data protection when using AI tools.
                </p>
              </div>
            </section>

            {/* Practical Examples */}
            <section id="practical-examples" className="mb-12">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">6. Practical Examples</h2>
              <p>
                Placeholder content for examples section. Replace with your prepared text.
              </p>
            </section>

            {/* Resources */}
            <section id="resources" className="mb-12">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">7. Additional Resources</h2>
              <p>
                Placeholder content for resources section. Replace with your prepared text.
              </p>
            </section>

            {/* Footer */}
            <div className="border-t pt-8 mt-12 text-center text-gray-600">
              <p>Thank you for reading the AI for Caretakers Guide!</p>
              <p className="mt-2">For more guides and resources, visit our documentation center.</p>
            </div>
          </article>
        </Section>
      </main>

      {!isPrintMode && <Footer />}
    </>
  );
}
