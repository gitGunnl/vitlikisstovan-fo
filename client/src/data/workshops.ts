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
      name: "Vitlíkisverkstova",
      company: "Bakkafrost",
      steps: [
        // s1 — leave as is
        {
          title: "Stig 1: Ein samrøða við vitlíki",
          description:
            "Avrita birti niðanfyri og kopiera tað inn í ChatGPT og send tað avstað. Svara síðani uppá spurningarnar sum vera settir.",
          prompt:
            "Describe three innovative approaches that could transform salmon farming in the next 5 years. Consider technology, sustainability, and market needs.",
          requiresConfirmation: false
        },

        // s2 — switch to thinking model, summarize interview, acknowledge
        {
          title: "Step 2: Switch to the ‘Thinking’ model → create your summary",
          description: `In your current ChatGPT chat (from Step 1):
  • Switch the model to the **Thinking/Reasoning** option.
  • Copy the **Summarize** prompt below, paste it **after** your full interview transcript, then **Send**.
  • Read the returned **Summary of You** carefully. Keep this tab open—we’ll reuse it later.`,
          prompt: "add prompt here",
          requiresConfirmation: true,
          confirmationText:
            "I have the full summary of my interview and I’ve read it—it accurately reflects my answers."
        },

        // s3 — open a fresh chat in a new tab (no prompt)
        {
          title: "Step 3: Open a new ChatGPT tab (fresh chat)",
          description: `Open a **new browser tab** and go to ChatGPT. 
  Keep the previous tab (with your summary) open—we’ll come back to it. 
  You should now be looking at a **blank chat** in this new tab.`,
          prompt: "(No prompt for this step.)",
          requiresConfirmation: false
        },

        // s4 — paste prompt into new chat, add summary, turn on web search
        {
          title: "Step 4: Opportunity scan (turn **Web Search/Deep Research** ON)",
          description: `In the **new blank chat**:
  • Turn on **Web browsing / Search the web / Deep Research** (whichever toggle you see).
  • Copy the prompt below into the message box.
  • Where it says **[PASTE SUMMARY HERE]**, paste the Step‑2 summary, then **Send**.
  • Skim the first result set to get the lay of the land.`,
          prompt: "add prompt here",
          requiresConfirmation: false
        },

        // s5 — open another fresh chat, run next prompt with summary + websearch list, acknowledge quality gate
        {
          title: "Step 5: Diversify ideas (new tab again) + quality check",
          description: `Open **another new tab** with ChatGPT (fresh chat):
  • Turn on **Web Search/Deep Research** again.
  • Copy the prompt below, paste it, and **insert your Step‑2 summary** where indicated.
  • If the prompt asks for a **websearch list**, add a few relevant sources (e.g., vendor docs, standards, news sites), then **Send**.
  • Review the options list for relevance and variety.`,
          prompt: "add prompt here",
          requiresConfirmation: true,
          confirmationText:
            "I reviewed the generated options; if the model went off‑lane, I re‑ran/clarified until I had good options."
        },

        // s6 — copy prompt, append and send (build/refine)
        {
          title: "Step 6: Build → first pass (copy, append, send)",
          description: `Continue in the **same chat** you used in Step 5:
  • Copy the prompt below, paste it, and **append your Step‑2 summary** where marked.
  • Keep **Web Search** on if the prompt suggests it.
  • **Send** and let it build the first pass.`,
          prompt: "add prompt here",
          requiresConfirmation: false
        },

        // s7 — refine/scoring pass
        {
          title: "Step 7: Refine → add scoring/constraints",
          description: `In the **same chat**:
  • Copy the prompt below, paste it, and **append your summary** where marked.
  • Ask for constraints (format, length) and basic scoring (e.g., impact, effort, risk).
  • **Send** to tighten quality and comparability.`,
          prompt: "add prompt here",
          requiresConfirmation: false
        },

        // s8 — finalize top picks / actionize
        {
          title: "Step 8: Finalize → top picks & next actions",
          description: `Still in the **same chat**:
  • Copy the prompt below, paste it, and **append your summary** where marked.
  • Aim for a **shortlist** (e.g., Top 10) with 1‑line descriptions and next step(s) for each.
  • **Send** and review the final list.`,
          prompt: "add prompt here",
          requiresConfirmation: false
        },

        // s9 — human feasibility screen (no prompt)
        {
          title: "Step 9: Human check → remove non‑feasible ideas",
          description: `Read your final list with **your judgment**:
  • Mark anything clearly **non‑feasible** (cost, policy, data sensitivity, time) and drop it.
  • Keep **2–3 quick‑wins** and **2–3 medium bets** you’d be excited to try.`,
          prompt: "(No prompt—review and decide.)",
          requiresConfirmation: false
        },

        // s10 — close out
        {
          title: "Step 10: You’re done — save/print your list",
          description: `That’s the workshop—nicely done!
  • Save/export/print your shortlist. (Optional: move it into a Project or Teams folder.)
  • Bonus: Put it on your desk—or nightstand—for one week and glance at it nightly.`,
          prompt: "(No prompt for this step.)",
          requiresConfirmation: false
        }
      ]
    },
  betri: {
    name: "Vitlíkisverkstova",
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