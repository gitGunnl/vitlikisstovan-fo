export const siteConfig = {
  siteName: "Vitlíkisstovan",
  tagline: "AI & Coding Education",
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
    title: "Transform Your Career with AI & Coding",
    subtitle: "Professional education and consulting with a Faroese-first approach. Learn practical skills that matter in today's digital landscape.",
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
    title: "The Flagship Program",
    subtitle: "A comprehensive 12-week journey to master AI and coding fundamentals with practical applications.",
    phases: [
      {
        period: "Weeks 1-4",
        title: "Foundation Building",
        description: "Master the core concepts and establish a solid understanding of programming fundamentals and AI principles.",
        highlights: [
          "Programming basics and syntax",
          "Introduction to AI concepts",
          "Development environment setup"
        ]
      },
      {
        period: "Weeks 5-8",
        title: "Practical Application",
        description: "Apply your knowledge through hands-on projects and real-world scenarios with guided mentorship.",
        highlights: [
          "Project-based learning",
          "AI tool integration",
          "Code review and optimization"
        ]
      },
      {
        period: "Weeks 9-12",
        title: "Professional Mastery",
        description: "Build portfolio projects and develop professional skills ready for the modern workplace.",
        highlights: [
          "Portfolio development",
          "Advanced AI applications",
          "Career preparation"
        ]
      }
    ],
    outcomes: [
      "Build production-ready applications",
      "Master modern AI tools and workflows",
      "Develop problem-solving mindset",
      "Gain industry-relevant experience"
    ]
  },

  consulting: {
    title: "Consulting & Projects",
    subtitle: "Specialized services tailored to your organization's needs and digital transformation goals.",
    services: [
      {
        title: "Public Sector & Enterprises",
        description: "Strategic AI implementation and digital transformation initiatives for large organizations and government entities."
      },
      {
        title: "SMEs",
        description: "Practical automation solutions and AI integration for small and medium enterprises looking to optimize operations."
      },
      {
        title: "Creative AI",
        description: "Innovative applications of AI for creative projects, content generation, and multimedia production."
      }
    ]
  },

  why: {
    title: "Why Vitlíkisstovan?",
    subtitle: "Our unique approach combines cultural understanding with cutting-edge technology education.",
    features: [
      {
        title: "Faroese-first",
        description: "Education that respects and integrates local culture while embracing global technology standards."
      },
      {
        title: "Serious + Practical",
        description: "Rigorous curriculum focused on real-world applications and immediate practical value."
      },
      {
        title: "Clear Communication",
        description: "Complex concepts explained simply, with transparent progress tracking and regular feedback."
      },
      {
        title: "Lean & Responsive",
        description: "Agile methodology with quick adaptation to student needs and industry changes."
      }
    ]
  },

  cases: {
    title: "Case Highlights",
    subtitle: "Real projects and outcomes that demonstrate our impact across different sectors.",
    highlights: [
      {
        title: "\"Vitlíki til arbeiðis\" Guides",
        description: "Comprehensive workplace readiness materials helping individuals transition into tech careers effectively.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        imageAlt: "Collaborative office workspace",
        buttonText: "Free Downloads",
        buttonVariant: "default",
        buttonHref: "#"
      },
      {
        title: "Best path: Danish → English translation",
        description: "AI-powered translation workflow optimization for Nordic language pairs with cultural context preservation.",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        imageAlt: "Language learning books and materials",
        buttonText: "View Case Study",
        buttonVariant: "outline",
        buttonHref: "#"
      },
      {
        title: "Creative AI: films & posters",
        description: "Innovative multimedia projects combining traditional creativity with AI-assisted production workflows.",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        imageAlt: "Film production and creative studio setup",
        buttonText: "Explore Projects",
        buttonVariant: "outline",
        buttonHref: "#"
      }
    ]
  },

  resources: {
    title: "Resources",
    subtitle: "Essential materials to help you understand our approach and get started on your journey.",
    items: [
      {
        title: "3-Month Program One-Pager",
        description: "Complete overview of curriculum, outcomes, and enrollment details in a concise format.",
        icon: "FileText",
        iconBg: "bg-destructive/10",
        iconColor: "text-destructive",
        buttonText: "Download PDF",
        buttonStyle: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        href: "#"
      },
      {
        title: "Intro Video (1 min)",
        description: "Quick introduction to our philosophy, methodology, and what makes our approach unique.",
        icon: "Video",
        iconBg: "bg-chart-1/10",
        iconColor: "text-chart-1",
        buttonText: "Watch Now",
        buttonStyle: "bg-chart-1 text-white hover:bg-chart-1/90",
        href: "#"
      },
      {
        title: "Contact Deck",
        description: "Detailed presentation for organizations considering partnership or consulting services.",
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
    title: "Ready to Get Started?",
    subtitle: "Connect with us to discuss your learning goals or project requirements.",
    sectionTitle: "Let's Talk",
    description: "Whether you're interested in our flagship program, consulting services, or just want to learn more about our approach, we're here to help.",
    email: "hello@vitlikisstovan.fo",
    phone: "+298 123 456",
    bookingUrl: ""  // Optional - if empty, booking button won't show
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
