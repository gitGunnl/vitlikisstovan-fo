export interface WorkshopStep {
  title: string;
  description: string;
  prompt: string;
  requiresConfirmation?: boolean;
  confirmationText?: string;
  files?: {
    name: string;        // Display name for the file
    filename: string;    // Actual filename in attached_assets
    description?: string; // Optional description of the file
  }[];
}

export interface Lab {
  id: string;
  name: string;
  description: string;
  steps: WorkshopStep[];
}

export interface Workshop {
  name: string;
  company: string;
  labs: Lab[];
}

  export const workshops: Record<string, Workshop> = {
    bakkafrost: {
      name: "Vitlíkisverkstova",
      company: "Bakkafrost",
      labs: [
        {
          id: "innovation-lab",
          name: "Innovation Lab",
          description: "Explore innovative approaches to transform salmon farming using AI and technology.",
          steps: [
        // s1 — leave as is
            {
            title: "Stig 1: Ein samrøða við vitlíki",
            description: "Kopiera tekstin niðanfyri, lím hann inn í ChatGPT og send. Svara síðan spurningunum, sum verða settir.",
            prompt: "add prompt here",
            requiresConfirmation: false
            },
            {
            title: "Stig 2: Samandráttur (við Thinking-modellinum)",
            description: "Skift fyrst til 'Thinking'-modellið. Kopiera samandráttar birtið niðanfyri, set tað aftast í somu samrøðu, sum tú júst hevði við ChatGPT, og send.",
            prompt: "d",
            requiresConfirmation: true,
            confirmationText: "Eg vátti, at eg havi fingið ein fullfíggjaðan samandrátt, lisið hann og staðfest, at hann er rættur."
            },
            {
            title: "Stig 3: Opna nýggjan flipa við ChatGPT",
            description: "Opna ein nýggjan flipa í kaganum og lat upp ChatGPT aftur. Vit fara at brúka henda flipa til framhaldið, meðan hin fyrri er opin við samandráttinum.",
            prompt: "add prompt here",
            requiresConfirmation: false
            },
            {
            title: "Stig 4: Samandráttur + vefsøk",
            description: "Kopiera fyriskipanina niðanfyri inn í nýggja ChatGPT-kjakið, lím samandráttin inn har tað er merkt, tendra vefsøk, og send.",
            prompt: "add prompt here",
            requiresConfirmation: false
            },
            {
            title: "Stig 5: Nýggjur gluggi og møguleikalisti",
            description: "Opna ein nýggjan kagaglugga við ChatGPT. Kopiera næstu fyriskipan, fyll inn samandráttin og vefsøklistan, og send. Skoðað so listan av møguleikum; er úrslitið skilagott? Stundum kemur modellið inn á skeiva leið; royn umaftur, um tað hendir.",
            prompt: "add prompt here",
            requiresConfirmation: true,
            confirmationText: "Eg havi skoðað listan og vátti, at hann gevur skilagóðar møguleikar (ella at eg royndi umaftur, tá ið tað ikki gjørdi tað)."
            },
            {
            title: "Stig 6: Bygg víðari – partur 1",
            description: "Kopiera fyriskipanina niðanfyri, legg við (sum merkt) tað, sum skal leggjast afturat, og send.",
            prompt: "add prompt here",
            requiresConfirmation: false
            },
            {
            title: "Stig 7: Bygg víðari – partur 2",
            description: "Kopiera fyriskipanina niðanfyri, legg við (sum merkt) tað, sum skal leggjast afturat, og send. Tak eisini niður tilfarið niðanfyri til tína verkætlan.",
            prompt: "add prompt here",
            requiresConfirmation: false,
            files: [
              {
                name: "Verkætlanar fyrimynd",
                filename: "project-template.md",
                description: "Ein fyrimynd til at strukturera tína verkætlan"
              },
              {
                name: "Data greiningar ark",
                filename: "data-analysis.csv",
                description: "Excel/CSV ark við dømi um laksafarm data til greining"
              },
              {
                name: "Koða dømi",
                filename: "example-code.js",
                description: "JavaScript koða dømi fyri data greining og sustainability útrokningar"
              }
            ]
            },
            {
            title: "Stig 8: Bygg víðari – partur 3",
            description: "Kopiera fyriskipanina niðanfyri, legg við (sum merkt) tað, sum skal leggjast afturat, og send.",
            prompt: "add prompt here",
            requiresConfirmation: false
            },
            {
            title: "Stig 9: Kanna gjøgnumførsluna",
            description: "Les listan og eyðmerk hugskot, sum ikki eru gjøgnumførilig (ella ikki lønandi) fyri tykkara veruleika. Merk tey sum 'ikki gjøgnumførilig' ella flyt tey longur út í tíð.",
            prompt: "add prompt here",
            requiresConfirmation: false
            },
            {
            title: "Stig 10: Liðugt – takk fyri",
            description: "Tað var verkstovan – vónandi dámdi tær. Tú kanst prenta listan og leggja hann á náttborðið og lesa hann áðrenn tú sovnar, um tú vilt halda dampin.",
            prompt: "add prompt here",
            requiresConfirmation: false
            }
            ]
            },
        {
          id: "sustainability-lab",
          name: "Sustainability Lab",
          description: "Focus on sustainable practices and environmental impact in aquaculture.",
          steps: [
            {
              title: "Sustainability Assessment",
              description: "Analyze current sustainability challenges in salmon farming.",
              prompt: "Identify 5 key sustainability challenges in salmon farming and propose innovative solutions for each.",
              requiresConfirmation: false
            },
            {
              title: "Environmental Impact Analysis",
              description: "Evaluate environmental impact and mitigation strategies.",
              prompt: "Describe methods to minimize environmental impact while maintaining productivity in salmon farming.",
              requiresConfirmation: true,
              confirmationText: "I have completed the environmental impact analysis."
            },
            {
              title: "Future Sustainability Roadmap",
              description: "Create a roadmap for sustainable aquaculture.",
              prompt: "Design a 5-year roadmap for implementing sustainable practices in salmon farming operations.",
              requiresConfirmation: false
            }
          ]
        }
      ]
    },
    betri: {
      name: "Digital Banking Verkstova",
      company: "Betri",
      labs: [
        {
          id: "customer-experience",
          name: "Customer Experience Lab",
          description: "Design the perfect digital banking journey and enhance customer satisfaction.",
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
        },
        {
      id: "innovation-banking",
      name: "Banking Innovation Lab",
      description: "Explore cutting-edge technologies and features for next-generation banking.",
      steps: [
        {
          title: "AI-Powered Banking",
          description: "Design AI features for personalized banking experiences.",
          prompt: "Propose 5 AI-powered features that could revolutionize personal banking. Consider chatbots, predictive analytics, and personalized financial advice.",
          requiresConfirmation: false
        },
        {
          title: "Open Banking Strategy",
          description: "Develop an open banking strategy.",
          prompt: "Create a comprehensive open banking strategy that leverages APIs and third-party integrations to enhance customer value.",
          requiresConfirmation: true,
          confirmationText: "I have completed the open banking strategy."
        },
        {
          title: "Digital Wallet Innovation",
          description: "Design next-generation digital wallet features.",
          prompt: "Design innovative digital wallet features that go beyond payments. Consider loyalty programs, budgeting tools, and social features.",
          requiresConfirmation: false
        }
      ]
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