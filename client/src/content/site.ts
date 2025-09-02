export const siteConfig = {
  siteName: "Vitlíkisstovan",
  tagline: "AI training & consulting for Faroese offices",
  domain: "vitlikisstovan.fo",

  nav: {
    links: [
      { label: "Program", href: "#program" },
      { label: "Consulting", href: "#consulting" },
      { label: "Why Us", href: "#why" },
      { label: "Cases", href: "#cases" },
      { label: "Contact", href: "#contact" }
    ],
    cta: {
      text: "Book Intro Call",
      href: "#contact"
    }
  },

  hero: {
    title: "AI for every office in the Faroe Islands",
    subtitle:
      "Master AI—our 12-week, turnkey program that turns everyday staff into confident AI users. Fewer boring tasks, better writing, and sharper decisions across your team.",
    primaryCTA: {
      text: "Get Started Today",
      href: "#contact"
    },
    secondaryCTA: {
      text: "View Program",
      href: "#program"
    }
  },

  program: {
    title: "Master AI — 12-Week Office Program",
    subtitle:
      "A practical, team-ready journey from safe foundations to repeatable workflows. Built for real office work—not theory.",
    phases: [
      {
        period: "Weeks 1–4",
        title: "Foundations & Safe Use",
        description:
          "Give everyone the essentials: what AI can do today, where it helps most, and how to use it safely and well.",
        highlights: [
          "Prompt patterns for everyday tasks",
          "Writing & rewriting for clarity and tone",
          "Policy, privacy, and data posture",
          "Optional: light no-code/scripting where helpful"
        ]
      },
      {
        period: "Weeks 5–8",
        title: "Productivity Systems",
        description:
          "Turn daily work into faster, higher-quality output with simple, reusable patterns.",
        highlights: [
          "Documents, email, spreadsheets, and slides",
          "Customer service, meeting notes, and summaries",
          "Team templates and internal playbooks"
        ]
      },
      {
        period: "Weeks 9–12",
        title: "Advanced & Customization",
        description:
          "Make the change stick with department-specific workflows and quality gates.",
        highlights: [
          "Role-based workflows & review checklists",
          "Use-cases tailored to your teams",
          "Handover pack and next-steps plan"
        ]
      }
    ],
    outcomes: [
      "Hours saved every week on routine writing and admin",
      "Clearer, more consistent documents and emails",
      "Safe-use checklist and simple guardrails for staff",
      "Repeatable workflows your team can trust",
      "Confidence using leading AI tools at work"
    ]
  },

  consulting: {
    title: "Consulting & Projects",
    subtitle:
      "From national-level strategies to small automations and creative experiments—we make vitlíki useful.",
    services: [
      {
        title: "Public sector & enterprises",
        description:
          "AI vision/master plans, governance & ethics, adoption programs, and targeted workshops."
      },
      {
        title: "SMEs",
        description:
          "Practical automation, writing quality, customer-service assistants, and internal playbooks."
      },
      {
        title: "Creative AI",
        description:
          "Short films, posters, and art tools—showing the human side of technology in the Faroes."
      }
    ]
  },

  why: {
    title: "Why Vitlíkisstovan?",
    subtitle:
      "Local language and culture, paired with hands-on AI expertise and clear communication.",
    features: [
      {
        title: "Faroese-first",
        description:
          "Guidance that respects language and culture while matching global technology standards."
      },
      {
        title: "Serious + practical",
        description:
          "Two years focused 100% on AI. Experience working with large organisations (e.g., via Banedanmark)."
      },
      {
        title: "Clear communication",
        description:
          "Complex things explained simply. Templates and materials your team will actually use."
      },
      {
        title: "Lean & responsive",
        description:
          "Single-person company—no overhead. Fast decisions, faster delivery."
      }
    ]
  },

  cases: {
    title: "Case Highlights",
    subtitle:
      "Snapshots that show how we turn ideas into useful results—across offices, services, and culture.",
    highlights: [
      {
        title: "\"Vitlíki til arbeiðis\" Guides",
        description:
          "Practical AI guides for worker groups (e.g., teachers, elder-care). Includes two free documents: “AI for Teachers” and “AI for Politicians.”",
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        imageAlt: "Collaborative office workspace",
        buttonText: "Free Downloads",
        buttonVariant: "default",
        buttonHref: "#"
      },
      {
        title: "Best path: Danish → English translation",
        description:
          "We evaluated tools and designed a consistent DA→EN translation workflow for public documents—faithful, natural, and repeatable.",
        image:
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        imageAlt: "Language learning books and materials",
        buttonText: "View Case Study",
        buttonVariant: "outline",
        buttonHref: "#"
      },
      {
        title: "Creative AI: films & posters",
        description:
          "Short AI-generated films and posters that bring Faroese stories to life—showing the human side of technology.",
        image:
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        imageAlt: "Film production and creative studio setup",
        buttonText: "Explore Projects",
        buttonVariant: "outline",
        buttonHref: "#"
      }
    ]
  },

  resources: {
    title: "Resources",
    subtitle:
      "Simple materials leaders can share internally—no jargon, just what matters.",
    items: [
      {
        title: "3-Month Program One-Pager",
        description:
          "A crisp overview for decision-makers: scope, outcomes, timeline, and next steps.",
        icon: "FileText",
        iconBg: "bg-destructive/10",
        iconColor: "text-destructive",
        buttonText: "Download PDF",
        buttonStyle: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        href: "#"
      },
      {
        title: "Intro video (1 min)",
        description:
          "A quick hello and what to expect from Master AI and our consulting approach.",
        icon: "Video",
        iconBg: "bg-chart-1/10",
        iconColor: "text-chart-1",
        buttonText: "Watch Now",
        buttonStyle: "bg-chart-1 text-white hover:bg-chart-1/90",
        href: "#"
      },
      {
        title: "Contact deck",
        description:
          "2–3 slides you can circulate after a call—perfect for internal briefings.",
        icon: "MessageCircle",
        iconBg: "bg-chart-2/10",
        iconColor: "text-chart-2",
        buttonText: "Request Access",
        buttonStyle: "bg-chart-2 text-white hover:bg-chart-2/90",
        href: "#"
      }
    ]
  },

  contact: {
    title: "Ready to get started?",
    subtitle:
      "Tell us about your team and goals. We’ll suggest a simple plan—no jargon, no pressure.",
    sectionTitle: "Let’s Talk",
    description:
      "Whether you’re interested in the Master AI program, consulting, or a creative project, we’ll respond within one business day.",
    email: "hello@vitlikisstovan.fo",
    phone: "+298 123 456",
    bookingUrl: "" // Optional - if empty, booking button won't show
  },

  footer: {
    privacyUrl: "#",
    termsUrl: "#"
  },

  // Additional config for future use
  resourceLinks: {
    onePagerUrl: "#",
    introVideoUrl: "#",
    contactDeckUrl: "#"
  },

  freeDownloads: {
    teachersPdfUrl: "#",
    politiciansPdfUrl: "#"
  }
};
