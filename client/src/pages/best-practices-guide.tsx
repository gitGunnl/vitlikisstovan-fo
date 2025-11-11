import { useEffect } from "react";
import { Link, useSearch } from "wouter";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Section from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { seoConfig } from "@/content/seo";

export default function BestPracticesGuide() {
  const search = useSearch();
  const isPrintMode = search === "?print=true";

  useEffect(() => {
    document.title = "Best Practices Guide - " + seoConfig.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    const content = "Learn industry best practices, optimization strategies, and proven techniques for success.";
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

  // Custom styles for this specific guide - green/nature theme
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
      .practice-box {
        border: 1px solid #666 !important;
        page-break-inside: avoid;
      }
    }

    /* Custom theme for this guide - green/nature theme */
    .guide-accent { color: #059669; }
    .guide-bg-accent { background-color: #f0fdf4; }
    .guide-border-accent { border-color: #059669; }
    .guide-header { 
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      border-bottom: 3px solid #059669;
    }

    /* Practice boxes styling */
    .practice-box {
      border-radius: 8px;
      border: 2px solid #10b981;
      padding: 1.5rem;
      margin: 1.5rem 0;
      background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
    }

    .warning-box {
      border-radius: 8px;
      border: 2px solid #f59e0b;
      padding: 1.5rem;
      margin: 1.5rem 0;
      background: linear-gradient(135deg, #fef3c7 0%, #ffffff 100%);
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {!isPrintMode && <Header />}

      {/* Print-only header - hidden on screen, shown in print */}
      <div className="print-header hidden">
        <div className="flex justify-between items-center">
          <span>Best Practices Guide</span>
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
            {/* Title Page with custom header */}
            <div className="guide-header p-8 -mx-4 mb-12 text-center">
              <h1 className="text-4xl font-bold mb-4">Best Practices Guide</h1>
              <p className="text-xl text-gray-700">Industry standards and proven strategies for excellence</p>
              <div className="mt-8 text-sm text-gray-600">
                <p>Version 2.0</p>
                <p>Last Updated: November 2024</p>
                <p className="mt-2 font-semibold guide-accent">Advanced Level</p>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="practice-box">
              <h2 className="text-2xl font-semibold mb-3 guide-accent">Executive Summary</h2>
              <p>
                This guide presents a curated collection of best practices developed through years of industry experience 
                and community feedback. These practices will help you build robust, scalable, and maintainable applications 
                while avoiding common pitfalls.
              </p>
              <p className="mt-3">
                <strong>Key Focus Areas:</strong> Security, Performance, Scalability, Maintainability, and Team Collaboration
              </p>
            </div>

            {/* Table of Contents */}
            <section className="guide-bg-accent p-6 rounded-lg my-8">
              <h2 className="text-2xl font-semibold mb-4 guide-accent">Table of Contents</h2>
              <nav>
                <ol className="space-y-2">
                  <li><a href="#security" className="hover:underline">1. Security Best Practices</a></li>
                  <li><a href="#performance" className="hover:underline">2. Performance Optimization</a></li>
                  <li><a href="#code-quality" className="hover:underline">3. Code Quality Standards</a></li>
                  <li><a href="#architecture" className="hover:underline">4. Architecture Patterns</a></li>
                  <li><a href="#testing" className="hover:underline">5. Testing Strategies</a></li>
                  <li><a href="#deployment" className="hover:underline">6. Deployment & DevOps</a></li>
                  <li><a href="#monitoring" className="hover:underline">7. Monitoring & Observability</a></li>
                  <li><a href="#team" className="hover:underline">8. Team Collaboration</a></li>
                </ol>
              </nav>
            </section>

            {/* Security Best Practices */}
            <section id="security" className="mb-12">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">1. Security Best Practices</h2>
              <p className="lead">
                Security should be embedded in every aspect of your application lifecycle, not treated as an afterthought.
              </p>

              <div className="practice-box">
                <h3 className="text-xl font-semibold mb-3">🔐 Authentication & Authorization</h3>
                <ul className="space-y-2">
                  <li><strong>Multi-factor Authentication:</strong> Always implement MFA for sensitive operations</li>
                  <li><strong>JWT Best Practices:</strong> Use short-lived tokens with refresh token rotation</li>
                  <li><strong>Role-Based Access Control:</strong> Implement granular permissions based on user roles</li>
                  <li><strong>Session Management:</strong> Implement secure session handling with proper timeout</li>
                </ul>

                <div className="bg-green-50 p-3 mt-4 rounded border-l-4 guide-border-accent">
                  <p className="text-sm">
                    <strong>Pro Tip:</strong> Never store sensitive data in JWT tokens. They are encoded, not encrypted.
                  </p>
                </div>
              </div>

              <div className="practice-box">
                <h3 className="text-xl font-semibold mb-3">🛡️ Data Protection</h3>
                <ul className="space-y-2">
                  <li><strong>Encryption at Rest:</strong> Encrypt all sensitive data in databases</li>
                  <li><strong>Encryption in Transit:</strong> Use TLS 1.3+ for all communications</li>
                  <li><strong>Input Validation:</strong> Validate and sanitize all user inputs</li>
                  <li><strong>SQL Injection Prevention:</strong> Use parameterized queries exclusively</li>
                </ul>

                <h4 className="font-semibold mt-4 mb-2">Example: Input Validation</h4>
                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  <code>{`// Good Practice
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
  return email.toLowerCase().trim();
};

// Bad Practice
const processEmail = (email) => {
  // No validation - vulnerable to injection
  return database.query(\`SELECT * FROM users WHERE email = '\${email}'\`);
};`}</code>
                </pre>
              </div>

              <div className="warning-box">
                <h4 className="font-semibold text-orange-700">⚠️ Common Security Mistakes to Avoid</h4>
                <ul className="mt-3 space-y-2 text-orange-900">
                  <li>• Storing passwords in plain text or using weak hashing algorithms</li>
                  <li>• Exposing sensitive data in error messages</li>
                  <li>• Using default or hardcoded credentials</li>
                  <li>• Neglecting to update dependencies with security patches</li>
                  <li>• Trusting client-side validation alone</li>
                </ul>
              </div>
            </section>

            {/* Performance Optimization */}
            <section id="performance" className="mb-12 page-break">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">2. Performance Optimization</h2>
              <p className="lead">
                Optimal performance is achieved through careful planning, continuous monitoring, and iterative improvements.
              </p>

              <div className="practice-box">
                <h3 className="text-xl font-semibold mb-3">⚡ Frontend Performance</h3>

                <h4 className="font-semibold mt-3 mb-2">Bundle Optimization</h4>
                <ul className="space-y-2">
                  <li><strong>Code Splitting:</strong> Split code by routes and lazy load components</li>
                  <li><strong>Tree Shaking:</strong> Remove unused code from bundles</li>
                  <li><strong>Compression:</strong> Use gzip or Brotli compression</li>
                  <li><strong>Asset Optimization:</strong> Optimize images, use WebP format</li>
                </ul>

                <h4 className="font-semibold mt-4 mb-2">Rendering Performance</h4>
                <ul className="space-y-2">
                  <li><strong>Virtual Scrolling:</strong> For long lists, implement virtual scrolling</li>
                  <li><strong>Debouncing:</strong> Debounce expensive operations</li>
                  <li><strong>Memoization:</strong> Use React.memo and useMemo appropriately</li>
                  <li><strong>CSS Optimization:</strong> Minimize reflows and repaints</li>
                </ul>
              </div>

              <div className="practice-box">
                <h3 className="text-xl font-semibold mb-3">🚀 Backend Performance</h3>

                <h4 className="font-semibold mt-3 mb-2">Database Optimization</h4>
                <ul className="space-y-2">
                  <li><strong>Indexing Strategy:</strong> Create appropriate indexes for frequent queries</li>
                  <li><strong>Query Optimization:</strong> Use EXPLAIN to analyze and optimize queries</li>
                  <li><strong>Connection Pooling:</strong> Implement efficient database connection pooling</li>
                  <li><strong>Caching:</strong> Implement multi-level caching (Redis, CDN, browser)</li>
                </ul>

                <h4 className="font-semibold mt-4 mb-2">API Performance</h4>
                <ul className="space-y-2">
                  <li><strong>Pagination:</strong> Always paginate large data sets</li>
                  <li><strong>Rate Limiting:</strong> Implement rate limiting to prevent abuse</li>
                  <li><strong>Async Processing:</strong> Use message queues for heavy operations</li>
                  <li><strong>Response Compression:</strong> Compress API responses</li>
                </ul>

                <div className="bg-green-50 p-3 mt-4 rounded border-l-4 guide-border-accent">
                  <p className="text-sm">
                    <strong>Benchmark:</strong> Aim for &lt; 200ms response time for 95% of API requests.
                  </p>
                </div>
              </div>
            </section>

            {/* Code Quality Standards */}
            <section id="code-quality" className="mb-12">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">3. Code Quality Standards</h2>
              <p className="lead">
                High-quality code is readable, maintainable, and follows consistent patterns across your team.
              </p>

              <div className="practice-box">
                <h3 className="text-xl font-semibold mb-3">📝 Coding Standards</h3>

                <h4 className="font-semibold mt-3 mb-2">Naming Conventions</h4>
                <ul className="space-y-2">
                  <li><strong>Variables:</strong> Use camelCase for variables and functions</li>
                  <li><strong>Constants:</strong> Use UPPER_SNAKE_CASE for constants</li>
                  <li><strong>Classes:</strong> Use PascalCase for classes and components</li>
                  <li><strong>Files:</strong> Use kebab-case for file names</li>
                </ul>

                <h4 className="font-semibold mt-4 mb-2">Code Organization</h4>
                <ul className="space-y-2">
                  <li><strong>Single Responsibility:</strong> Each function/class should do one thing well</li>
                  <li><strong>DRY Principle:</strong> Don't repeat yourself - extract common logic</li>
                  <li><strong>KISS Principle:</strong> Keep it simple - avoid over-engineering</li>
                  <li><strong>Documentation:</strong> Document complex logic and public APIs</li>
                </ul>

                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto mt-4">
                  <code>{`// Good: Clear naming and single responsibility
const calculateDiscountPrice = (originalPrice, discountPercentage) => {
  const discountAmount = originalPrice * (discountPercentage / 100);
  return originalPrice - discountAmount;
};

// Bad: Unclear naming and multiple responsibilities
const calc = (p, d, t) => {
  let r = p - (p * d / 100);
  // Also updates database and sends email
  db.update(r);
  email.send(r);
  return r;
};`}</code>
                </pre>
              </div>

              <div className="practice-box">
                <h3 className="text-xl font-semibold mb-3">🔍 Code Review Guidelines</h3>
                <ul className="space-y-2">
                  <li><strong>Review Checklist:</strong> Use a consistent checklist for all reviews</li>
                  <li><strong>Constructive Feedback:</strong> Focus on the code, not the person</li>
                  <li><strong>Automated Checks:</strong> Use linters and formatters before review</li>
                  <li><strong>Knowledge Sharing:</strong> Use reviews as learning opportunities</li>
                </ul>
              </div>
            </section>

            {/* Architecture Patterns */}
            <section id="architecture" className="mb-12 page-break">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">4. Architecture Patterns</h2>
              <p className="lead">
                Choose architecture patterns that align with your application's requirements and scale.
              </p>

              <div className="practice-box">
                <h3 className="text-xl font-semibold mb-3">🏗️ Application Architecture</h3>

                <h4 className="font-semibold mt-3 mb-2">Microservices vs Monolith</h4>
                <table className="w-full mt-3">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Aspect</th>
                      <th className="text-left p-2">Monolith</th>
                      <th className="text-left p-2">Microservices</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Complexity</td>
                      <td className="p-2">Lower initial complexity</td>
                      <td className="p-2">Higher operational complexity</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Deployment</td>
                      <td className="p-2">Simple, single deployment</td>
                      <td className="p-2">Complex, independent deployments</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Scaling</td>
                      <td className="p-2">Scale entire application</td>
                      <td className="p-2">Scale individual services</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Team Size</td>
                      <td className="p-2">Better for smaller teams</td>
                      <td className="p-2">Better for larger teams</td>
                    </tr>
                  </tbody>
                </table>

                <div className="bg-green-50 p-3 mt-4 rounded border-l-4 guide-border-accent">
                  <p className="text-sm">
                    <strong>Recommendation:</strong> Start with a modular monolith and evolve to microservices as needed.
                  </p>
                </div>
              </div>

              <div className="practice-box">
                <h3 className="text-xl font-semibold mb-3">📊 Data Architecture</h3>
                <ul className="space-y-2">
                  <li><strong>Event Sourcing:</strong> Store state changes as events for audit trails</li>
                  <li><strong>CQRS:</strong> Separate read and write models for complex domains</li>
                  <li><strong>Database per Service:</strong> Each service owns its data</li>
                  <li><strong>API Gateway:</strong> Single entry point for all client requests</li>
                </ul>
              </div>
            </section>

            {/* Testing Strategies */}
            <section id="testing" className="mb-12">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">5. Testing Strategies</h2>
              <p className="lead">
                Comprehensive testing ensures reliability, maintainability, and confidence in your code.
              </p>

              <div className="practice-box">
                <h3 className="text-xl font-semibold mb-3">🧪 Testing Pyramid</h3>
                <div className="text-center my-4">
                  <div className="inline-block text-left">
                    <div className="bg-red-100 p-3 rounded-t text-center">E2E Tests (10%)</div>
                    <div className="bg-yellow-100 p-4 text-center">Integration Tests (30%)</div>
                    <div className="bg-green-100 p-5 rounded-b text-center">Unit Tests (60%)</div>
                  </div>
                </div>

                <ul className="space-y-2 mt-4">
                  <li><strong>Unit Tests:</strong> Test individual functions and components</li>
                  <li><strong>Integration Tests:</strong> Test component interactions</li>
                  <li><strong>E2E Tests:</strong> Test complete user workflows</li>
                </ul>
              </div>

              <div className="practice-box">
                <h3 className="text-xl font-semibold mb-3">✅ Testing Best Practices</h3>
                <ul className="space-y-2">
                  <li><strong>Test Coverage:</strong> Aim for 80%+ code coverage</li>
                  <li><strong>Test Isolation:</strong> Tests should not depend on each other</li>
                  <li><strong>Descriptive Names:</strong> Test names should describe what they test</li>
                  <li><strong>Arrange-Act-Assert:</strong> Follow AAA pattern for test structure</li>
                  <li><strong>Continuous Testing:</strong> Run tests on every commit</li>
                </ul>

                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto mt-4">
                  <code>{`// Example: Well-structured test
describe('UserService', () => {
  describe('createUser', () => {
    it('should create a new user with valid data', async () => {
      // Arrange
      const userData = {
        email: 'test@example.com',
        name: 'Test User'
      };

      // Act
      const user = await userService.createUser(userData);

      // Assert
      expect(user).toHaveProperty('id');
      expect(user.email).toBe(userData.email);
      expect(user.name).toBe(userData.name);
    });
  });
});`}</code>
                </pre>
              </div>
            </section>

            {/* Deployment & DevOps */}
            <section id="deployment" className="mb-12 page-break">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">6. Deployment & DevOps</h2>
              <p className="lead">
                Automate your deployment pipeline for consistent, reliable releases.
              </p>

              <div className="practice-box">
                <h3 className="text-xl font-semibold mb-3">🔄 CI/CD Pipeline</h3>

                <h4 className="font-semibold mt-3 mb-2">Pipeline Stages</h4>
                <ol className="space-y-2">
                  <li><strong>1. Source Control:</strong> Git commit triggers pipeline</li>
                  <li><strong>2. Build:</strong> Compile code and dependencies</li>
                  <li><strong>3. Test:</strong> Run all automated tests</li>
                  <li><strong>4. Security Scan:</strong> Check for vulnerabilities</li>
                  <li><strong>5. Deploy to Staging:</strong> Automated staging deployment</li>
                  <li><strong>6. Smoke Tests:</strong> Verify critical functionality</li>
                  <li><strong>7. Deploy to Production:</strong> Manual approval + automated deployment</li>
                  <li><strong>8. Monitor:</strong> Track deployment metrics</li>
                </ol>
              </div>

              <div className="practice-box">
                <h3 className="text-xl font-semibold mb-3">🐳 Containerization</h3>
                <ul className="space-y-2">
                  <li><strong>Docker Best Practices:</strong> Use multi-stage builds</li>
                  <li><strong>Image Security:</strong> Scan images for vulnerabilities</li>
                  <li><strong>Image Size:</strong> Keep images small with Alpine Linux</li>
                  <li><strong>Environment Variables:</strong> Never hardcode secrets</li>
                </ul>

                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto mt-4">
                  <code>{`# Multi-stage Dockerfile example
# Build stage
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
USER node
EXPOSE 3000
CMD ["node", "server.js"]`}</code>
                </pre>
              </div>
            </section>

            {/* Monitoring & Observability */}
            <section id="monitoring" className="mb-12">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">7. Monitoring & Observability</h2>
              <p className="lead">
                Proactive monitoring helps identify and resolve issues before they impact users.
              </p>

              <div className="practice-box">
                <h3 className="text-xl font-semibold mb-3">📈 Key Metrics</h3>

                <h4 className="font-semibold mt-3 mb-2">The Four Golden Signals</h4>
                <ul className="space-y-2">
                  <li><strong>Latency:</strong> Time to service a request</li>
                  <li><strong>Traffic:</strong> Demand on your system</li>
                  <li><strong>Errors:</strong> Rate of failed requests</li>
                  <li><strong>Saturation:</strong> How "full" your service is</li>
                </ul>

                <h4 className="font-semibold mt-4 mb-2">Application Metrics</h4>
                <ul className="space-y-2">
                  <li><strong>Business Metrics:</strong> User signups, conversions, revenue</li>
                  <li><strong>Performance Metrics:</strong> Page load time, API response time</li>
                  <li><strong>Infrastructure Metrics:</strong> CPU, memory, disk usage</li>
                  <li><strong>Custom Metrics:</strong> Application-specific indicators</li>
                </ul>
              </div>

              <div className="practice-box">
                <h3 className="text-xl font-semibold mb-3">🔍 Logging & Tracing</h3>
                <ul className="space-y-2">
                  <li><strong>Structured Logging:</strong> Use JSON format for easy parsing</li>
                  <li><strong>Log Levels:</strong> Use appropriate levels (ERROR, WARN, INFO, DEBUG)</li>
                  <li><strong>Correlation IDs:</strong> Track requests across services</li>
                  <li><strong>Distributed Tracing:</strong> Use tools like OpenTelemetry</li>
                </ul>

                <div className="bg-green-50 p-3 mt-4 rounded border-l-4 guide-border-accent">
                  <p className="text-sm">
                    <strong>Alert Fatigue:</strong> Only alert on actionable issues that require immediate attention.
                  </p>
                </div>
              </div>
            </section>

            {/* Team Collaboration */}
            <section id="team" className="mb-12">
              <h2 className="text-3xl font-semibold mb-4 guide-accent">8. Team Collaboration</h2>
              <p className="lead">
                Effective collaboration multiplies team productivity and improves code quality.
              </p>

              <div className="practice-box">
                <h3 className="text-xl font-semibold mb-3">👥 Development Workflow</h3>

                <h4 className="font-semibold mt-3 mb-2">Git Workflow</h4>
                <ul className="space-y-2">
                  <li><strong>Branch Strategy:</strong> Use Git Flow or GitHub Flow</li>
                  <li><strong>Commit Messages:</strong> Write clear, descriptive commit messages</li>
                  <li><strong>Pull Requests:</strong> Keep PRs small and focused</li>
                  <li><strong>Code Reviews:</strong> Review within 24 hours</li>
                </ul>

                <h4 className="font-semibold mt-4 mb-2">Documentation</h4>
                <ul className="space-y-2">
                  <li><strong>README:</strong> Keep project README up-to-date</li>
                  <li><strong>API Documentation:</strong> Use tools like Swagger/OpenAPI</li>
                  <li><strong>Architecture Decisions:</strong> Document ADRs</li>
                  <li><strong>Runbooks:</strong> Create runbooks for common operations</li>
                </ul>
              </div>

              <div className="practice-box">
                <h3 className="text-xl font-semibold mb-3">📊 Knowledge Sharing</h3>
                <ul className="space-y-2">
                  <li><strong>Tech Talks:</strong> Regular knowledge sharing sessions</li>
                  <li><strong>Pair Programming:</strong> Share knowledge through pairing</li>
                  <li><strong>Documentation:</strong> Maintain a team knowledge base</li>
                  <li><strong>Mentoring:</strong> Establish mentorship programs</li>
                  <li><strong>Post-Mortems:</strong> Learn from incidents without blame</li>
                </ul>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12 page-break">
              <div className="guide-header p-8 -mx-4 rounded-lg">
                <h2 className="text-3xl font-semibold mb-4">Conclusion</h2>
                <p className="text-lg">
                  These best practices form the foundation of professional software development. 
                  Remember that best practices evolve with technology and team needs. 
                </p>
                <p className="text-lg mt-3">
                  The key is to adopt practices incrementally, measure their impact, 
                  and continuously refine your approach based on your specific context and requirements.
                </p>

                <div className="mt-8 p-4 bg-white rounded-lg">
                  <h3 className="font-semibold mb-3 guide-accent">🎯 Key Takeaways</h3>
                  <ul className="space-y-2">
                    <li>✓ Prioritize security from the start</li>
                    <li>✓ Optimize performance through measurement</li>
                    <li>✓ Maintain high code quality standards</li>
                    <li>✓ Choose appropriate architecture patterns</li>
                    <li>✓ Test comprehensively at all levels</li>
                    <li>✓ Automate deployment pipelines</li>
                    <li>✓ Monitor proactively</li>
                    <li>✓ Foster team collaboration</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Resources */}
            <section className="practice-box">
              <h2 className="text-2xl font-semibold mb-4 guide-accent">Additional Resources</h2>
              <ul className="space-y-2">
                <li>📚 <strong>Books:</strong> Clean Code, The Pragmatic Programmer, Site Reliability Engineering</li>
                <li>🌐 <strong>Websites:</strong> Martin Fowler's Blog, High Scalability, InfoQ</li>
                <li>🎓 <strong>Courses:</strong> System Design Interview, Cloud Architecture Patterns</li>
                <li>🛠️ <strong>Tools:</strong> SonarQube, Datadog, Sentry, GitHub Actions</li>
                <li>👥 <strong>Communities:</strong> Dev.to, Stack Overflow, Reddit r/programming</li>
              </ul>
            </section>

            {/* Footer */}
            <div className="border-t pt-8 mt-12 text-center text-gray-600">
              <p>Thank you for reading the Best Practices Guide!</p>
              <p className="mt-2">Stay updated with evolving best practices in our documentation center.</p>
              <p className="mt-4 text-sm guide-accent font-semibold">
                Remember: Best practices are guidelines, not rules. Always consider your specific context.
              </p>
            </div>
          </article>
        </Section>
      </main>

      {!isPrintMode && <Footer />}
    </>
  );
}