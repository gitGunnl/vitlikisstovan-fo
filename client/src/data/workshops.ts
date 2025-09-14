export interface WorkshopStep {
  title: string;
  description: string;
  prompt: string;
  requiresConfirmation?: boolean;
  confirmationText?: string;
}

export interface Workshop {
  name: string;
  company: string;
  steps: WorkshopStep[];
}

export const workshops: Record<string, Workshop> = {
  bakkafrost: {
    name: "Vitlíki verkstova",
    company: "Bakkafrost",
    steps: [
      {
        title: "Stig 1: Si",
        description: "Avrita birti niðanfyri og kopiera tað inn í ChatGPT og send tað avstað. Svara síðani uppá spurningarnir sum vera settir.",
        prompt: "Describe three innovative approaches that could transform salmon farming in the next 5 years. Consider technology, sustainability, and market needs.",
        requiresConfirmation: false
      },
      {
        title: "Step 2: Challenge Identification",
        description: "Identify the main challenges facing your operations.",
        prompt: "List the top 5 operational challenges in your current production cycle. For each challenge, describe its impact on efficiency and sustainability.",
        requiresConfirmation: true,
        confirmationText: "I confirm I have identified and documented the challenges"
      },
      {
        title: "Step 3: Solution Brainstorming",
        description: "Generate creative solutions for the identified challenges.",
        prompt: "For each challenge identified in Step 2, propose at least two innovative solutions. Consider both technological and process-based approaches.",
        requiresConfirmation: false
      },
      {
        title: "Step 4: Implementation Planning",
        description: "Create an action plan for your top solution.",
        prompt: "Select your most promising solution and create a 90-day implementation plan. Include key milestones, required resources, and success metrics.",
        requiresConfirmation: true,
        confirmationText: "I confirm I have the implementation plan ready"
      },
      {
        title: "Step 5: Stakeholder Communication",
        description: "Prepare to communicate your innovation strategy.",
        prompt: "Draft a 2-minute pitch for your innovation strategy. Include the problem, solution, expected impact, and required investment. Make it compelling for both internal and external stakeholders.",
        requiresConfirmation: true,
        confirmationText: "I confirm I have prepared the pitch presentation"
      }
    ]
  },
  betri: {
    name: "Vitlíki verkstova",
    company: "Betri",
    steps: [
      {
        title: "Stig 1: Vitlíki samrøða",
        description: "Koyr birti niðanfyri inn á ChatGPT/Copilot og send tað avstað.",
        prompt: "Describe the perfect digital banking journey from account opening to daily banking. Focus on reducing friction points and enhancing user delight.",
        requiresConfirmation: false
      },
      {
        title: "Step 2: Pain Point Analysis",
        description: "Analyze current customer pain points in digital banking.",
        prompt: "Identify 5 major pain points customers experience with current digital banking solutions. Rate each from 1-10 in terms of impact on customer satisfaction.",
        requiresConfirmation: true,
        confirmationText: "I confirm I have completed the pain point analysis"
      },
      {
        title: "Step 3: Feature Ideation",
        description: "Brainstorm innovative features for next-generation banking.",
        prompt: "Design 3 innovative features that could differentiate your digital banking platform. Consider AI, personalization, and financial wellness.",
        requiresConfirmation: false
      },
      {
        title: "Step 4: Security & Trust Building",
        description: "Design trust-building mechanisms for digital services.",
        prompt: "Propose a comprehensive strategy to build and maintain customer trust in digital banking. Address security concerns, transparency, and communication.",
        requiresConfirmation: true,
        confirmationText: "I confirm I have the security strategy documented"
      },
      {
        title: "Step 5: ROI Projection",
        description: "Calculate the potential return on investment.",
        prompt: "Estimate the ROI for your top 3 proposed features. Include implementation costs, timeline, expected user adoption rate, and revenue impact over 2 years.",
        requiresConfirmation: true,
        confirmationText: "I confirm I have prepared the ROI analysis"
      }
    ]
  }
};

// Helper function to normalize password input
export function normalizePassword(input: string): string {
  return input.toLowerCase().replace(/\s/g, '').trim();
}

// Get workshop by password
export function getWorkshopByPassword(password: string): Workshop | null {
  const normalized = normalizePassword(password);
  return workshops[normalized] || null;
}