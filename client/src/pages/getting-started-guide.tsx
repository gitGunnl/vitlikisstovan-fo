import { useEffect } from "react";
import { Link, useSearch } from "wouter";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { seoConfig } from "@/content/seo";

export default function GettingStartedGuide() {
  const search = useSearch();
  const isPrintMode = search === "?print=true";

  useEffect(() => {
    document.title = "Getting Started Guide - " + seoConfig.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const content = "Complete guide to getting started with our platform. Learn setup, basic concepts, and essential features.";
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

  // Custom styles for this specific guide - can be overwritten per guide
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
    
    /* Custom theme for this guide - blue accent */
    .guide-accent { color: #2563eb; }
    .guide-bg-accent { background-color: #eff6ff; }
    .guide-border-accent { border-color: #2563eb; }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {!isPrintMode && <Header />}
      
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
              <h1 className="text-4xl font-bold mb-4 guide-accent">Getting Started Guide</h1>
              <p className="text-xl text-gray-600">Your complete introduction to the platform</p>
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
                  <li><a href="#prerequisites" className="hover:underline">2. Prerequisites</a></li>
                  <li><a href="#installation" className="hover:underline">3. Installation & Setup</a></li>
                  <li><a href="#first-steps" className="hover:underline">4. First Steps</a></li>
                  <li><a href="#core-concepts" className="hover:underline">5. Core Concepts</a></li>
                  <li><a href="#common-tasks" className="hover:underline">6. Common Tasks</a></li>
                  <li><a href="#troubleshooting" className="hover:underline">7. Troubleshooting</a></li>
                  <li><a href="#next-steps" className="hover:underline">8. Next Steps</a></li>
                </ol>
              </nav>
            </section>

            {/* Introduction */}
            <section id="introduction" className="mb-12">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">1. Introduction</h2>
              <p>
                Welcome to our platform! This guide will walk you through everything you need to know to get started successfully. 
                Whether you're a complete beginner or have some experience, this guide will help you understand the fundamentals 
                and set you up for success.
              </p>
              <p>
                By the end of this guide, you'll have a solid understanding of how to use the platform effectively, 
                including setting up your environment, understanding core concepts, and performing common tasks.
              </p>
              
              <div className="bg-blue-50 border-l-4 guide-border-accent p-4 my-6">
                <h3 className="font-semibold guide-accent">What You'll Learn</h3>
                <ul className="mt-2 space-y-1">
                  <li>How to set up your development environment</li>
                  <li>Understanding the platform's architecture</li>
                  <li>Basic operations and workflows</li>
                  <li>Best practices for common scenarios</li>
                </ul>
              </div>
            </section>

            {/* Prerequisites */}
            <section id="prerequisites" className="mb-12 page-break">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">2. Prerequisites</h2>
              <p>
                Before you begin, ensure you have the following prerequisites in place:
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">System Requirements</h3>
              <ul className="space-y-2">
                <li><strong>Operating System:</strong> Windows 10+, macOS 10.14+, or Ubuntu 18.04+</li>
                <li><strong>Memory:</strong> Minimum 8GB RAM (16GB recommended)</li>
                <li><strong>Storage:</strong> At least 10GB of free disk space</li>
                <li><strong>Internet:</strong> Stable broadband connection</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Required Software</h3>
              <ul className="space-y-2">
                <li>Modern web browser (Chrome, Firefox, Safari, or Edge)</li>
                <li>Text editor or IDE of your choice</li>
                <li>Git version control system</li>
                <li>Node.js version 16 or higher</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Knowledge Prerequisites</h3>
              <ul className="space-y-2">
                <li>Basic understanding of web technologies (HTML, CSS, JavaScript)</li>
                <li>Familiarity with command line interface</li>
                <li>Basic understanding of version control concepts</li>
              </ul>
            </section>

            {/* Installation & Setup */}
            <section id="installation" className="mb-12 page-break">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">3. Installation & Setup</h2>
              <p>
                Follow these step-by-step instructions to set up your development environment:
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Step 1: Create Your Account</h3>
              <ol className="space-y-2">
                <li>Navigate to the registration page</li>
                <li>Fill in your details and verify your email</li>
                <li>Complete your profile setup</li>
                <li>Select your subscription plan</li>
              </ol>

              <h3 className="text-xl font-semibold mt-6 mb-3">Step 2: Install Development Tools</h3>
              <p>Open your terminal and run the following commands:</p>
              
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <code>{`# Install the CLI tool
npm install -g @platform/cli

# Verify installation
platform --version

# Authenticate with your account
platform login`}</code>
              </pre>

              <h3 className="text-xl font-semibold mt-6 mb-3">Step 3: Initialize Your First Project</h3>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <code>{`# Create a new project
platform init my-first-project

# Navigate to project directory
cd my-first-project

# Install dependencies
npm install

# Start development server
npm run dev`}</code>
              </pre>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
                <h4 className="font-semibold text-green-800">Success!</h4>
                <p className="text-green-700">
                  Your development environment is now set up. You should see the development server running at 
                  <code className="bg-green-100 px-1">http://localhost:3000</code>
                </p>
              </div>
            </section>

            {/* First Steps */}
            <section id="first-steps" className="mb-12">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">4. First Steps</h2>
              <p>
                Now that your environment is set up, let's explore the basic features and create your first application.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Understanding the Dashboard</h3>
              <p>
                The dashboard is your central hub for managing projects, monitoring performance, and accessing resources. 
                Key sections include:
              </p>
              <ul className="space-y-2 mt-3">
                <li><strong>Projects:</strong> View and manage all your projects</li>
                <li><strong>Analytics:</strong> Monitor usage and performance metrics</li>
                <li><strong>Settings:</strong> Configure account and project settings</li>
                <li><strong>Documentation:</strong> Access guides and API references</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Creating Your First Application</h3>
              <ol className="space-y-3">
                <li>
                  <strong>Choose a Template:</strong> Start with a pre-configured template that matches your needs
                </li>
                <li>
                  <strong>Configure Settings:</strong> Set up your application name, description, and initial configuration
                </li>
                <li>
                  <strong>Deploy:</strong> Click the deploy button to make your application live
                </li>
                <li>
                  <strong>Test:</strong> Access your deployed application and verify everything works correctly
                </li>
              </ol>
            </section>

            {/* Core Concepts */}
            <section id="core-concepts" className="mb-12 page-break">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">5. Core Concepts</h2>
              <p>
                Understanding these core concepts will help you work more effectively with the platform:
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Projects</h3>
              <p>
                Projects are the fundamental organizational unit. Each project contains your code, configuration, 
                and associated resources. Projects can be shared with team members and have their own deployment settings.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Environments</h3>
              <p>
                Each project can have multiple environments (development, staging, production). This allows you to 
                test changes before deploying to production.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Deployments</h3>
              <p>
                Deployments are immutable snapshots of your application. Each deployment has a unique URL and can 
                be promoted between environments.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Resources</h3>
              <p>
                Resources include databases, storage buckets, and third-party integrations. Resources are managed 
                at the project level and can be shared across environments.
              </p>
            </section>

            {/* Common Tasks */}
            <section id="common-tasks" className="mb-12">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">6. Common Tasks</h2>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Updating Your Application</h3>
              <ol className="space-y-2">
                <li>Make changes to your code locally</li>
                <li>Test changes in development environment</li>
                <li>Commit changes to version control</li>
                <li>Deploy to staging for testing</li>
                <li>Promote to production when ready</li>
              </ol>

              <h3 className="text-xl font-semibold mt-6 mb-3">Managing Team Members</h3>
              <p>To add team members to your project:</p>
              <ol className="space-y-2 mt-3">
                <li>Navigate to Project Settings → Team</li>
                <li>Click "Invite Member"</li>
                <li>Enter their email address and select permissions</li>
                <li>Send the invitation</li>
              </ol>

              <h3 className="text-xl font-semibold mt-6 mb-3">Monitoring Performance</h3>
              <p>Keep track of your application's performance:</p>
              <ul className="space-y-2 mt-3">
                <li>View real-time metrics in the Analytics dashboard</li>
                <li>Set up alerts for critical metrics</li>
                <li>Review logs for debugging issues</li>
                <li>Use performance profiling tools</li>
              </ul>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting" className="mb-12 page-break">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">7. Troubleshooting</h2>
              <p>
                Here are solutions to common issues you might encounter:
              </p>

              <div className="space-y-6 mt-6">
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold">Build Failures</h4>
                  <p className="text-gray-600 mt-1">
                    Check your build logs for specific error messages. Common causes include missing dependencies, 
                    syntax errors, or incompatible versions.
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Solution:</strong> Review package.json, ensure all dependencies are installed, and check for syntax errors.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold">Deployment Issues</h4>
                  <p className="text-gray-600 mt-1">
                    Deployment might fail due to configuration errors or resource limits.
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Solution:</strong> Verify environment variables, check resource quotas, and ensure proper build configuration.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold">Performance Problems</h4>
                  <p className="text-gray-600 mt-1">
                    Slow response times or high resource usage can affect user experience.
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Solution:</strong> Use performance profiling tools, optimize database queries, and implement caching strategies.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                <h4 className="font-semibold text-yellow-800">Need More Help?</h4>
                <p className="text-yellow-700">
                  If you're still experiencing issues, check our community forums or contact support for assistance.
                </p>
              </div>
            </section>

            {/* Next Steps */}
            <section id="next-steps" className="mb-12">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">8. Next Steps</h2>
              <p>
                Congratulations on completing the Getting Started Guide! You now have the foundational knowledge 
                to work effectively with our platform. Here are some recommended next steps:
              </p>

              <div className="grid gap-4 mt-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">📚 Explore Advanced Features</h4>
                  <p className="text-gray-600">
                    Dive deeper into advanced features like custom domains, CI/CD pipelines, and advanced monitoring.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">🏆 Read Best Practices Guide</h4>
                  <p className="text-gray-600">
                    Learn industry best practices and optimization strategies to get the most out of the platform.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">👥 Join the Community</h4>
                  <p className="text-gray-600">
                    Connect with other users, share experiences, and get help from the community.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">🚀 Build Your First Real Project</h4>
                  <p className="text-gray-600">
                    Put your knowledge into practice by building a real application from scratch.
                  </p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="border-t pt-8 mt-12 text-center text-gray-600">
              <p>Thank you for choosing our platform!</p>
              <p className="mt-2">For more guides and resources, visit our documentation center.</p>
            </div>
          </article>
        </Section>
      </main>

      {!isPrintMode && <Footer />}
    </>
  );
}