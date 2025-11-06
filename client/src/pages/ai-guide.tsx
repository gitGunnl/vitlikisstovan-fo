import { useEffect } from "react";
import styles from "./ai-guide.module.css";
import { updateMetaTags } from "@/lib/meta";
import { seoConfig } from "@/content/seo";
import { ChevronRight, FileText, Code, Lightbulb, Target } from "lucide-react";

export default function AIGuide() {
  useEffect(() => {
    // Add Google Fonts link when component mounts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Kalam:wght@300;400;700&family=Space+Mono:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    link.id = 'ai-guide-fonts';
    document.head.appendChild(link);

    const fullTitle = `AI User Guide - ${seoConfig.title}`;
    const description = "Learn how to effectively use AI tools and prompts for your projects";

    updateMetaTags({
      title: fullTitle,
      description: description,
      image: seoConfig.ogImage,
      url: `${window.location.origin}/ai-guide`,
      type: 'article',
      siteName: seoConfig.siteName
    });

    // Cleanup: Remove font link when component unmounts
    return () => {
      const fontLink = document.getElementById('ai-guide-fonts');
      if (fontLink) {
        fontLink.remove();
      }
    };
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.graphPaperBg}>
        <div className={styles.container}>
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.paperSheet}>
              <h1 className={styles.mainTitle} data-testid="text-main-title">
                AI USER GUIDE
              </h1>
              <p className={styles.subtitle} data-testid="text-subtitle">
                A Practical Handbook for Working with Artificial Intelligence
              </p>
            </div>
          </header>

          {/* Main Content */}
          <main className={styles.content}>
            {/* Introduction Section */}
            <section className={styles.paperSheet}>
              <h2 className={styles.sectionTitle} data-testid="text-section-intro">
                GETTING STARTED
              </h2>
              <p className={styles.bodyText}>
                Welcome to your AI assistant handbook. This guide will help you understand how to effectively 
                communicate with AI systems to get the best results. Think of this as your personal notebook 
                for mastering AI interactions.
              </p>
              <p className={styles.bodyText}>
                The key to success lies in clear communication, structured thinking, and understanding 
                the capabilities and limitations of AI tools.
              </p>
            </section>

            {/* Core Principles */}
            <section className={styles.paperSheet}>
              <h2 className={styles.sectionTitle} data-testid="text-section-principles">
                CORE PRINCIPLES
              </h2>
              <ul className={styles.principlesList}>
                <li className={styles.listItem}>
                  <ChevronRight className={styles.bulletIcon} />
                  <span>Be specific and detailed in your requests</span>
                </li>
                <li className={styles.listItem}>
                  <ChevronRight className={styles.bulletIcon} />
                  <span>Provide context and background information</span>
                </li>
                <li className={styles.listItem}>
                  <ChevronRight className={styles.bulletIcon} />
                  <span>Break complex tasks into smaller steps</span>
                </li>
                <li className={styles.listItem}>
                  <ChevronRight className={styles.bulletIcon} />
                  <span>Review and refine AI outputs iteratively</span>
                </li>
              </ul>
            </section>

            {/* Prompt Examples */}
            <section className={styles.paperSheet}>
              <h2 className={styles.sectionTitle} data-testid="text-section-prompts">
                EFFECTIVE PROMPTS
              </h2>

              <div className={styles.promptBlock}>
                <h3 className={styles.promptTitle}>
                  <Code className={styles.promptIcon} />
                  Example: Code Generation
                </h3>
                <div className={styles.codeBlock}>
                  <pre className={styles.codeContent}>
{`"Create a React component that displays a 
sortable table with the following features:
- Column headers that can be clicked to sort
- Alternating row colors
- Pagination with 10 items per page
- Search functionality"`}
                  </pre>
                </div>
              </div>

              <div className={styles.promptBlock}>
                <h3 className={styles.promptTitle}>
                  <FileText className={styles.promptIcon} />
                  Example: Content Writing
                </h3>
                <div className={styles.codeBlock}>
                  <pre className={styles.codeContent}>
{`"Write a professional email to a client 
explaining a project delay. Include:
- Acknowledgment of the original timeline
- Clear explanation of the cause
- New estimated completion date
- Steps being taken to prevent future delays"`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section className={styles.paperSheet}>
              <h2 className={styles.sectionTitle} data-testid="text-section-practices">
                BEST PRACTICES
              </h2>

              <div className={styles.tipCard}>
                <h3 className={styles.tipTitle}>
                  <Lightbulb className={styles.tipIcon} />
                  Structure Your Requests
                </h3>
                <p className={styles.bodyText}>
                  Use bullet points, numbered lists, and clear headings when providing complex instructions.
                  This helps the AI understand the hierarchy and relationships between different requirements.
                </p>
              </div>

              <div className={styles.tipCard}>
                <h3 className={styles.tipTitle}>
                  <Target className={styles.tipIcon} />
                  Define Success Criteria
                </h3>
                <p className={styles.bodyText}>
                  Always specify what a successful output looks like. Include examples when possible, 
                  and describe both what you want and what you don't want.
                </p>
              </div>
            </section>

            {/* Common Pitfalls */}
            <section className={styles.paperSheet}>
              <h2 className={styles.sectionTitle} data-testid="text-section-pitfalls">
                COMMON PITFALLS TO AVOID
              </h2>
              <ul className={styles.pitfallsList}>
                <li className={styles.listItem}>
                  <span className={styles.pitfallMarker}>✗</span>
                  <span>Being too vague or general in your requests</span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.pitfallMarker}>✗</span>
                  <span>Not providing enough context or background</span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.pitfallMarker}>✗</span>
                  <span>Expecting perfect results on the first try</span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.pitfallMarker}>✗</span>
                  <span>Not reviewing outputs for accuracy and relevance</span>
                </li>
              </ul>
            </section>

            {/* Advanced Techniques */}
            <section className={styles.paperSheet}>
              <h2 className={styles.sectionTitle} data-testid="text-section-advanced">
                ADVANCED TECHNIQUES
              </h2>

              <div className={styles.techniqueCard}>
                <h3 className={styles.techniqueTitle}>Chain of Thought Prompting</h3>
                <p className={styles.bodyText}>
                  Ask the AI to explain its reasoning step-by-step. This is particularly useful for 
                  complex problem-solving or analytical tasks.
                </p>
                <div className={styles.highlightBox}>
                  <p className={styles.highlightText}>
                    "Let's solve this step by step. First, identify the main components, 
                    then analyze their relationships, and finally propose a solution."
                  </p>
                </div>
              </div>

              <div className={styles.techniqueCard}>
                <h3 className={styles.techniqueTitle}>Role-Based Prompting</h3>
                <p className={styles.bodyText}>
                  Assign a specific role or expertise to the AI to get more targeted responses.
                </p>
                <div className={styles.highlightBox}>
                  <p className={styles.highlightText}>
                    "Act as a senior software architect and review this system design 
                    for scalability and maintainability."
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className={styles.paperSheet}>
              <h2 className={styles.sectionTitle} data-testid="text-section-conclusion">
                FINAL THOUGHTS
              </h2>
              <p className={styles.bodyText}>
                Working with AI is a skill that improves with practice. Start with simple requests, 
                experiment with different approaches, and gradually tackle more complex challenges.
              </p>
              <p className={styles.bodyText}>
                Remember: AI is a tool to augment your capabilities, not replace your judgment. 
                Always review, verify, and adapt AI outputs to your specific needs.
              </p>
              <div className={styles.signatureBox}>
                <p className={styles.signature}>Happy prompting!</p>
                <p className={styles.date}>— Your AI Guide</p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}