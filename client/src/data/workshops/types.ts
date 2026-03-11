export interface WorkshopStep {
  title: string;
  description: string;
  prompt?: string;
  requiresConfirmation?: boolean;
  confirmationText?: string;
  window?: string;
  model?: string;
  files?: {
    name: string;
    filename: string;
    description?: string;
  }[];
}

export interface Lab {
  id: string;
  name: string;
  description: string;
  steps: WorkshopStep[];
}

export interface PromptBlock {
  title: string;
  subtitle?: string;
  text: string;
  image?: string;
  video?: string;
}

export interface PageStep {
  id: string;
  label: string;
  title: string;
  description: string;
  prompts: PromptBlock[];
}

export interface SinglePageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroNote?: string;
  image: string;
  imageAlt: string;
  description: string;
  bullets: string[];
  agenda: { time: string; title: string; description: string }[];
  ctaText: string;
  ctaDescription: string;
  steps?: PageStep[];
  bottomTip?: {
    title: string;
    description: string;
    prompt: PromptBlock;
  };
}

export interface Workshop {
  name: string;
  company: string;
  labs: Lab[];
  singlePage?: boolean;
  pageContent?: SinglePageContent;
}
