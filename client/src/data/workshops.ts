export interface WorkshopStep {
  title: string;
  description: string;
  prompt?: string;
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
          name: "Verkstova 1: Nýtslu spurtur",
          description: "Hvat júst tú kann nýta ChatGPT/CoPilot til.",
          steps: [
        // s1 — leave as is
            {
            title: "Stig 1: Ein samrøða við vitlíki",
            description: "Koyr fyrst ChatGPT á vanliga GPT 5 modillið, kopiera birti niðanfyri og koyr tað inn í ChatGPT og send. Svara síðan spurningunum, sum verða settir.",
            prompt: `
You are a **neutral, professional interviewer**. Your single goal is to understand the subject’s work **deeply and concretely** so that, in a later step, someone else can map these details to potential AI/ChatGPT use cases. In this step, **do not suggest** any uses or solutions.
**How to run the interview**
* **Style & cadence:** Ask **1–2 precise questions at a time**. Prefer questions answerable in **2–5 sentences or short bullets**. Avoid overly broad (“Tell me everything…”) or overly narrow (“Which button?”) questions unless appropriate.
* **Progress marker:** Maintain concise **Working Notes** you update every 2–3 turns (bullets only). Reflect back **only when ambiguity is likely**, e.g., “I understood X → Y → Z. Did I get that right?”
* **Continue until the subject asks you to stop and gives you your next task.**
* **Safety & privacy:** Invite **redacted** examples; never request credentials or secrets.
* **Language:** Mirror the subject’s language and tone; default to clear, plain English.
**What to listen for — task patterns often rich for later AI support**
*(Use this list only as a lens for your questions; do **not** propose solutions now.)*
* Heavy **writing/rewriting** (emails, briefs, proposals, SOPs), **summarizing** long docs/threads/meetings, producing multiple **variations/tones**.
* **Ideation & sparring:** brainstorming options, first drafts, creative alternatives.
* **Synthesis & knowledge retrieval:** answering questions from internal docs, policies, past projects; building concise digests.
* **Classification, tagging, routing** of requests/tickets/leads; triage & prioritization.
* **Data wrangling:** extracting structured info from text; drafting **spreadsheet formulas**, basic **code/scripts**, quick charts/tables.
* **Customer communication/support** on common issues; drafting responses, FAQs, step‑by‑step guides.
* **Translation, tone‑shifting,** bilingual writing.
* **Planning & coordination:** agendas, action‑item capture, follow‑ups, checklists, timelines.
* **Repetitive processes** with clear inputs/outputs and quality checks.
* **Document generation** from templates (reports, contracts, status updates).
**Coverage map (hit these areas methodically):**
1. **Role & context:** title, team, industry, mission, success metrics.
2. **Calendar reality:** recurring meetings, deadlines, cycles/seasonality.
3. **Daily/weekly tasks:** frequency, volume, duration, inputs/outputs.
4. **Communication:** who you interact with; channels (email, chat, meetings); common message types.
5. **Artifacts:** docs/spreadsheets/decks/databases you create, edit, or review.
6. **Workflows & approvals:** step order, handoffs, decision criteria, exceptions.
7. **Tools & systems:** suites (M365/Google Workspace), PM/CRM/ERP, ticketing, data sources.
8. **Rules & constraints:** compliance, confidentiality, quality bars, SLA/KPI targets.
9. **Pain points:** bottlenecks, backlogs, error‑prone steps, wait states, copy‑paste work.
10. **Wish‑list & north star:** what “great” would look like (without proposing AI).
**Question heuristics (the Goldilocks test):**
* Replace “Tell me about X” with specifics: “In a **typical week**, how many X? How long each? What makes one **easy vs. hard**?”
* Quantify: “About **how many per week**? **Minutes each?** What % needs revision/approval? How often are **deadlines tight**?”
* Trace the path: “What are the **inputs**? Where do they come from? Then what? What’s the final **output** and who consumes it?”
* Surface variance: “Top **3 exceptions** or edge cases—how often?”
* Evidence: “Could you paste a **redacted snippet** or outline the **typical structure**?”
**Working Notes — keep updated (bullets):**
* **Role & goals:** …
* **High‑volume tasks (freq/time):** …
* **Artifacts & tools:** …
* **Workflows & key decision points:** …
* **Constraints/KPIs:** …
* **Observed friction:** …
*(Show on 'recap'; use “Did I capture this correctly?” only where ambiguity exists.)*
**Important constraint:** Throughout, **do not** suggest or identify how ChatGPT/AI could help. Your task is **only** to gather accurate, thorough information for later analysis.
—
**Begin now.** Greet briefly, state your purpose, and ask the first two opener questions:
1. “What’s your **role/title** and **team/industry**? In one sentence, what is your **team’s mission**?”
2. “Walk me through a **typical week**. What are the **top 3 recurring tasks** that take the most time?”

            `,
            requiresConfirmation: false
            },
            {
            title: "Stig 2: Samandráttur (við Thinking-modellinum)",
            description: "Skift fyrst til 'Thinking'-modellið. Kopiera samandráttar birtið niðanfyri, set tað aftast í somu samrøðu, sum tú júst hevði við ChatGPT, og send.",
            prompt: `
Stop the interview now and summarize my job using ONLY what I said. Do not invent facts. If something wasn’t stated, write “Not stated.”

Produce a concise, well-structured Markdown summary designed to help find use cases for ChatGPT / Microsoft 365 Copilot.

Return exactly these sections:

1) Role Snapshot (1–2 sentences)
   - What I do, who I serve, and the main outcomes.

2) Core Responsibilities (5–8 bullets)
   - Start bullets with strong verbs; keep each to one line.

3) Recurring Workflows & Deliverables (4–10 bullets)
   - For each, include: typical inputs → outputs (≤8 words each) and frequency if mentioned.

4) Tools, Systems & Constraints (list)
   - Apps, data sources, access boundaries, compliance/sensitivity mentioned.

5) Task Inventory for AI Mapping (table)
   - Columns: Task (verb + object) | Inputs (≤6 words) | Outputs (≤6 words) | Frequency | AI Leverage Tags | Guardrail
   - AI Leverage Tags: choose up to 3 from {draft, rewrite, summarize, translate, brainstorm, plan, classify, extract/transform text, Q&A assistant, spreadsheet help, email/brief/minutes, documentation, scenario planning}.
   - Guardrail: G=Green (safe with redacted/synthetic data), A=Amber (caution/limited data), R=Red (don’t use AI unless fully synthetic). If unclear, write “Unknown.”

6) Gaps & Assumptions (3–6 bullets)
   - Missing details that would help identify more AI use cases (e.g., volumes, templates, repeatable steps).

Constraints:
- No generic AI claims, no advice/tutorials, no marketing language.
- Base guardrails and tags strictly on what I said.
            `,
            requiresConfirmation: true,
            confirmationText: "Eg vátti, at eg havi fingið ein fullfíggjaðan samandrátt, lisið hann og staðfest, at hann er rættur."
            },
            {
            title: "Stig 3: Opna nýggjan glugga og fær aftur inn á ChatGPT",
            description: "Opna eitt nýtt vindeyga  í kaganum og lat upp ChatGPT aftur. Læt fyrra vindeyga  við samandráttinum vera opið.",
            requiresConfirmation: false
            },
            {
            title: "Stig 4: Samandráttur og 'web-search'",
            description: "Kopiera birti niðanfyri inn í nýggja ChatGPT-vindeyga, skoyt samandráttin inn har tað er merkt, tendra 'web search', og send.",
            prompt: `
I want to work a bit on discovering what can be done regarding a job summary and how they can use ChatPGT to help them in their work. Here is the job summary:

<job_summary>
<------------ADD HERE--------------->
</job_summary>

Look on the web for what tasks other LLM users say can be automated using ChatGPT and similar AI tech in the field we are exploring.

Look for blogs or forums for what people seem to use ChatGPT and similar tools for in similar roles.

Then make a general description of the tasks. The description should explain what types of tasks users say can be automated with great success and alternatively also what does not work for them.

We will use this description so the client can understand what is possible and useful to automate, helping them think through their workflows and identify tasks for automation.
`,
            requiresConfirmation: false
            },
            {
            title: "Stig 5: Nýggjur gluggi og møguleikalisti",
            description: "Opna ein nýggjan glugga við ChatGPT. Kopiera birtið, fyll inn samandráttin og nýggja 'web-search'-listan, og send. Skoðað so listan av møguleikum; er úrslitið skilagott? Stundum kemur modellið inn á skeiva leið; royn umaftur, um tað hendir.",
            prompt: `
## Introduction

We are exploring how language models (LLMs) can automate tasks in the Faroe Islands. The goal is to find tasks where automation streamlines workflows, saves time, removes boring work, and saves money.

I want you to propose a list of **15** things my client can use ChatGPT for. Here is information about my client:

<client_information>
<------------ADD HERE--------------->
</client_information>

Below is guidance on what types of tasks ChatGPT is good at for this client. Use it to shape your ideas and avoid suggesting things the model cannot do.

<tasks_types>

### What ChatGPT Does and Doesn’t (2025)

---

#### Introduction

ChatGPT is a versatile language model that excels at drafting, structuring, explaining, translating, brainstorming, and supporting light analysis and visuals. It performs best with clear goals, concrete inputs, and a brief human check for accuracy and fit. The summaries below describe what it is typically **good at** and where it is **weaker**.

---

#### What ChatGPT Excels At

**Research & Analysis**

* **Current fact lookups with citations:** ChatGPT is good at finding up‑to‑date information using built‑in Search and returning concise answers with source citations when topics change over time (e.g., rules, prices, dates, news).
* **Deep Research (multi‑step investigations):** ChatGPT is good at planning a research path, comparing multiple sources, synthesizing viewpoints, and presenting a referenced summary while avoiding speculation.
* **Data interpretation:** ChatGPT is good at explaining patterns and insights from user‑provided tables, reports, or summaries, and at proposing metrics or next analytical steps.
* **Advanced Data Analysis (Python):** ChatGPT is good at running code for calculations, quick forecasts, and charts, especially when assumptions are stated and results receive a human sanity check.
* **Logic/fallacy/bias audits:** ChatGPT is good at reviewing text for reasoning errors, unsupported claims, and potential bias, and at tagging “claims needing sources.”

**Documentation, Communication & Knowledge**

* **Turning notes into structure:** ChatGPT is good at converting unstructured notes into tables, checklists, JSON, or CSV schemas ready for reuse.
* **SOPs & checklists:** ChatGPT is good at drafting and maintaining standard operating procedures with roles, steps, and outcomes clearly defined.
* **Content repurposing pipelines:** ChatGPT is good at transforming a source (e.g., report) into a slide outline, a script, and audience‑specific social posts while preserving key messages.
* **Meeting prep packs (no meeting joining):** ChatGPT is good at producing crisp agendas, objectives, talking points, and smart questions to raise in meetings.
* **Email/thread summarization:** ChatGPT is good at summarizing pasted conversations, extracting action items, decisions, and owners.
* **Cross‑functional communication:** ChatGPT is good at translating technical language to plain language and tailoring messages for different stakeholders.
* **Persona / user‑story / JTBD drafting:** ChatGPT is good at turning interviews/notes into personas, user stories, acceptance criteria, and measurable outcomes.
* **Localization QA (EN/DK → FO):** ChatGPT is good at back‑translation, enforcing a glossary, and calibrating tone across languages, with a final human pass for Faroese quality.
* **Text anonymization / redaction:** ChatGPT is good at masking names, IDs, and sensitive details and at generating a verification checklist.
* **Knowledge architecture:** ChatGPT is good at categorizing/tagging content and proposing taxonomies and naming conventions.
* **Prompt library design & QA:** ChatGPT is good at drafting reusable prompt templates, rubrics, and style guides, and at testing prompts for consistency.
* **Learning aids:** ChatGPT is good at producing micro‑lessons, quizzes, and flashcards for onboarding or policy training.
* **Documentation & writing support:** ChatGPT is good at outlining, drafting, revising for clarity and tone, translating, summarizing, and maintaining consistent style across documents.

**Operations & Execution Support**

* **Task prioritization & organization:** ChatGPT is good at turning scattered notes into prioritized lists and simple plans (e.g., Kanban‑style groupings).
* **Capacity planning drafts (no calendar control):** ChatGPT is good at sketching workload‑leveling options under stated constraints and fairness notes for later human scheduling.
* **Spreadsheet/regex/SQL helpers:** ChatGPT is good at producing Excel/Sheets formulas, regex patterns, and small SQL snippets with worked examples.
* **Test‑case & edge‑case generation:** ChatGPT is good at enumerating cases for features, processes, or policies (beyond unit tests).
* **Risk registers:** ChatGPT is good at drafting and maintaining risks, triggers, mitigations, and owners for ongoing projects.

**Interactive Sparring & Training**

* **Decision & strategy sparring:** ChatGPT is good at framing objectives, surfacing assumptions, expanding options, and comparing trade‑offs using simple multi‑criteria views.
* **Quality feedback on drafts:** ChatGPT is good at structured critique for clarity, logic, evidence, tone, and consistency, and at sharpening executive summaries.
* **Role‑play & communication rehearsal:** ChatGPT is good at simulating stakeholders, objections, negotiations, and difficult conversations for practice and refinement.
* **Creativity & brainstorming:** ChatGPT is good at running idea sprints (e.g., SCAMPER, forced analogies) and then converging on practical options.
* **Risk thinking:** ChatGPT is good at pre‑mortems, red‑team vs. steelman perspectives, and proposing concrete mitigations.

**Images, Coding & Voice**

* **Image generation & image input:** ChatGPT is good at creating illustrations, mockups, icons, and slide‑style mood concepts, and at analyzing screenshots or diagrams; complex, brand‑perfect infographics remain a design task.
* **Coding assistance:** ChatGPT is good at producing small scripts, explaining code, and generating tests for quick utilities (e.g., data cleaning); results benefit from a human review.
* **Voice for practice:** ChatGPT is good at voice‑based rehearsal (tone, pacing), English practice, and hands‑free brainstorming; it does not join or transcribe real meetings.

---

#### Where ChatGPT Is Weaker (and Typical Workarounds)

* **High‑precision extraction across many documents:** ChatGPT is weaker at perfectly consistent retrieval across large corpora; reliability improves when it quotes sources and a human verifies final numbers.
* **Complex or regulated analytics at scale:** ChatGPT is weaker on very large datasets or high‑stakes financial/statistical work; it helps with scaffolding, explanations, and charts while specialized tools handle the core analysis.
* **Very long documents in one go:** ChatGPT is weaker at sustaining perfect consistency over long, single‑pass drafts; results improve when work is broken into sections with a brief outline and a final consistency pass.
* **Direct control of tools and systems:** ChatGPT does not operate calendars, send emails, or control enterprise tools; it drafts content and plans for a human to execute.
* **Live meeting participation:** ChatGPT does not join or listen to meetings; meeting prep and debrief summaries are supported from user‑provided inputs.

---

#### Faroese & Language Guidance

* **Understanding vs. writing quality:** ChatGPT generally understands Faroese well but produces weaker Faroese writing. Quality is higher when drafting in English or Danish and then translating to Faroese with a short manual edit.
* **Glossary & consistency:** A small glossary of preferred Faroese terms improves consistency; uncertain terms can be flagged for human review.

</tasks_types>

We already found these tasks from searching the internet:

<tasksFound>
<------------ADD HERE--------------->
</tasksFound>

### Your task

Make a **well‑thought‑out list of 15 ideas** my client can use ChatGPT for. **Order them by usefulness**, considering:

* Time saved
* Ease of implementation
* How boring the task is (higher boredom → higher priority)
* Any other relevant factors for this client

**Important constraints**

* **Do not** suggest actions that require controlling calendars, sending emails, or joining meetings. Drafts and guidance are fine; the human executes.
* **Prefer ideas the client can do directly in ChatGPT** (no external integrations).
* When an idea depends on **current information**, explicitly mention that it uses Search with citations.
* When numbers matter, explicitly mention that it uses ADA (Python) with stated assumptions.
* **Include at least 5 interactive “sparring/coaching” ideas** (decision support, feedback/critique, role‑play, brainstorming, or risk thinking).

**Output format (for each item, keep it tight):**

1. **Title (bold)** — one‑sentence description.

   * **Why it matters:** (1 line)
   * **How ChatGPT helps:** (1 line; mention *Search/ADA/Image/Voice/Sparring* if relevant)
   * **Effort:** Low / Medium / High

Keep the writing concise, specific to the client, and practical. Avoid generic “rewrite my email” ideas unless you make them unusually effective for this client’s context.
            `,
            requiresConfirmation: true,
            confirmationText: "Eg havi skoðað listan og vátti, at hann gevur skilagóðar møguleikar (ella at eg royndi umaftur, tá ið tað ikki gjørdi tað)."
            },
            {
            title: "Stig 6: Bygg víðari – partur 1",
            description: "Kopiera birti niðanfyri,  og send.",
            prompt: "Very good. Now I want you to think outside the box. Make another analysis of tasks my client can use ChatGPT for. For this analysis, I want you to find tasks that could revolutionize their worklife and field. Give these ideas a rating for how hard it is to implement and how positively impactful it could be for their worklife.",
            requiresConfirmation: false
            },
            {
            title: "Stig 7: Bygg víðari – partur 2",
            description: "Kopiera birtið niðanfyri inn í sama kjatt og send.",
            prompt: `Very good. Now, one last time, lose any predefined notion of how my client’s work should be done and give me a list of revolutionary ways of doing their work with AI, totally based on first principal thinking. Give these ideas a rating for how hard it is to implement and how positively impactful it could be on their worklife.

              Be careful the ideas don’t fall outside what they actually do, but are ideas on how to do their jobs in a totally new and improved way.
`,
            requiresConfirmation: false
            },
            {
            title: "Stig 8: Ger fyrsta listan",
            description: "Kopiera birtið inn í ChatGPT og send.",
            prompt: "Now looking at all the lists you have made, I want you to think about which of these my client should start with. Make a list of the top 5 best and most practical ideas from the lists, these should be the low hanging fruits that give big results.",
            requiresConfirmation: false
            },
            {
            title: "Stig 9: Ger listan lidnan",
            description: "Kopiera birtið inn í ChatGPT og send.",
            prompt: "Now come up with the rest of the list, this should be the top 6-20 ideas, be sure to carefully rank each idea, and then list them.",
            requiresConfirmation: false
            },
            {
            title: "Stig 10: Liðugt – takk fyri!",
            description: "Hattar var verkstovan – vónandi hevur tú nú ein góðan lista. Nú kanst tú prenta listan og leggja hann á náttborðið og lesa hann áðrenn tú sovnar.",
            requiresConfirmation: false
            }
            ]
            },
        {
          id: "next-steps-lab",
          name: "Next Steps Lab",
          description: "Convert your job summary + top‑20 use cases into actionable assets (tests, guardrails, playbooks, deep research). Lane defaults: Amber — describe/redact/synthetic; keep sources in M365.",
          steps: [
            {
              title: "Step 1: Assumption Map & Confidence Heatmap",
              description: "De‑risk your top ideas by exposing hidden assumptions and prioritizing fast validations. Lane: Amber. Action: paste job summary + top‑20 use cases.",
              prompt: "You are my Assumption Mapper. Using my job summary and top‑20 use cases (pasted below), build a table with columns: Assumption | Affects which use‑case(s) | Confidence (Low/Med/High) | Business impact if wrong (1–5) | 48‑hour test to validate | Owner | Data needed. Then prioritize by (impact × (1–confidence)) and propose the first 3 tests to run this week. Materials: <PASTE JOB SUMMARY + TOP‑20 LIST>",
              requiresConfirmation: true,
              confirmationText: "I confirm I created the assumption table and selected 3 validation tests."
            },
            {
              title: "Step 2: Edge‑Case Bank & Fallback Protocols",
              description: "Design reliability before you launch. Enumerate odd scenarios, first moves, and fallbacks so workflows don’t jam. Lane: Amber.",
              prompt: "Act as a Risk‑aware Ops Designer. From my top‑20 use cases, generate an Edge‑Case Bank. For each high‑value workflow, list 5 edge cases, detection cues, first response, fallback path, and who to notify. End with a top‑5 edge‑case rehearsal plan for the team. Materials: <PASTE JOB SUMMARY + TOP‑20 LIST>",
              requiresConfirmation: true,
              confirmationText: "I confirm I built the edge‑case bank and rehearsal plan."
            },
            {
              title: "Step 3: Data Coverage & Trust Contract",
              description: "Answer “Can we trust this?” up front. Add a concise trust box to reports and a 2‑line disclaimer for email summaries. Lane: Amber.",
              prompt: "Be my Data Trust Editor. For each reporting/analysis use case, draft a Data Coverage & Trust Contract: What’s included/excluded • Freshness • Known gaps • Quality checks • Caveats • When to escalate. Produce a reader‑friendly box for pasting atop reports and a 2‑line disclaimer for email summaries. Materials: <PASTE JOB SUMMARY + TOP‑20 LIST>",
              requiresConfirmation: true,
              confirmationText: "I confirm I added a trust box + 2‑line disclaimer to our templates."
            },
            {
              title: "Step 4: Quality Rubric & Calibration Pack",
              description: "Raise quality and consistency. Define clear scoring anchors and self‑check guidance for your 3 most common artifacts. Lane: Green/Amber.",
              prompt: "You are a Rubric Builder. Pick 3 recurring artifacts in my role (e.g., incident notes, SOP updates, stakeholder emails). For each, create a 5‑criteria scoring rubric (1–5) with clear anchor examples of 1 vs 5. Then grade this sample (I’ll paste) and recommend one rewrite to reach a 4+. Materials: <PASTE JOB SUMMARY + TYPICAL ARTIFACTS>",
              requiresConfirmation: true,
              confirmationText: "I confirm I have 3 rubrics with anchors and a calibrated rewrite."
            },
            {
              title: "Step 5: Non‑Goals Charter & Anti‑Patterns",
              description: "Prevent scope‑creep and misuse. Write what we will NOT do, why, the risk, and the exception path. Lane: Green.",
              prompt: "Act as my Scope Bodyguard. From my top‑20, draft a Non‑Goals Charter: what we will NOT do, why, and the risk of doing it. Add an Anti‑Patterns section: “If you see X, do Y instead.” Close with a simple “How to request an exception” flow. Materials: <PASTE JOB SUMMARY + TOP‑20 LIST>",
              requiresConfirmation: true,
              confirmationText: "I confirm I documented Non‑Goals, Anti‑Patterns, and exceptions."
            },
            {
              title: "Step 6: Guardrails & Redaction Playbook",
              description: "Make safe usage repeatable. Create Green/Amber/Red examples from your work, token redaction patterns, and an output‑only strategy. Lane: Amber/Red (policy).",
              prompt: "You are a Safety Coach. Build a Guardrails & Redaction Playbook for my role: Green/Amber/Red examples mapped to my top‑20 use cases; how to describe vs paste; token redaction patterns (names, IDs); synthetic twin guidance; output‑only patterns (tables/outlines). End with a 30‑second self‑check to run before any prompt. Materials: <PASTE JOB SUMMARY + TOP‑20 LIST>",
              requiresConfirmation: true,
              confirmationText: "I confirm I created the guardrails playbook with a 30‑second self‑check."
            },
            {
              title: "Step 7: Experiment Factory (Prove the Value)",
              description: "Produce quick evidence. Ship five tiny experiments with success metrics, baseline, and kill criteria in one table. Lane: Green/Amber.",
              prompt: "Be my Experiment Designer. For my top 5 promising use cases, define 1 tiny experiment each: Hypothesis • Success metric (simple) • Baseline vs AI‑assisted method • Sample size • 1‑week plan • Kill criteria. Output as a single table and propose a simple results log (spreadsheet columns). Materials: <PASTE JOB SUMMARY + TOP‑20 LIST>",
              requiresConfirmation: true,
              confirmationText: "I confirm I have 5 experiments with metrics and a results log."
            },
            {
              title: "Step 8: Deep Research — Tenant‑Safe LLM ROI & Adoption Playbook",
              description: "Executive‑ready, cited brief: workflows with ROI ranges, adoption model + guardrails, case studies, 90‑day plan, pitfalls. Run in Deep Research if enabled. Lane: Amber.",
              prompt: "Deep Research mode. Using my job summary + top‑20 use cases (below), produce a Tenant‑Safe LLM ROI & Adoption Playbook. Deliver: 1) Executive summary (≤150 words); 2) Top 7 workflows with ROI ranges (minutes saved/week and a quality proxy), assumptions, and 2–3 credible citations each from the last 18 months; 3) Adoption model (skills, change mgmt, training) with guardrails (data residency, no‑training commitments, M365/Copilot governance); 4) 3 comparable case studies (manufacturing/food/remote ops) with outcomes; 5) A 90‑day pilot plan (weeks, milestones, metrics, owners); 6) Red‑team: top 5 pitfalls + early warning signs; 7) Annotated bibliography with source quality notes. Make it board‑ready and state what NOT to do. Materials: <PASTE JOB SUMMARY + TOP‑20 LIST>",
              requiresConfirmation: true,
              confirmationText: "I confirm I generated the ROI & Adoption Playbook with citations."
            },
            {
              title: "Step 9: Deep Research — Failure Pattern Atlas (Identity/Endpoints & Sites)",
              description: "Build a living atlas of top failure modes with symptoms, first moves, baselines, early warnings, and checklists. Run in Deep Research if enabled. Lane: Amber.",
              prompt: "Deep Research mode. Using my job summary, compile a Failure Pattern Atlas for M365 identity, endpoints, and distributed sites. Deliver: 1) Top 12 failure modes with symptoms, root‑cause patterns, and first moves; 2) A 90‑day “good enough” baseline: lowest‑regret checks/policies that won’t crush productivity (map to Microsoft baseline/CIS where relevant); 3) Early‑warning signals and simple weekly health checks (no code) + a triage decision tree; 4) 3 short case write‑ups from credible sources in the last 18 months; 5) Risks & trade‑offs table. Output a one‑pager for managers + a checklist for operators. Include links and dates. Materials: <PASTE JOB SUMMARY>",
              requiresConfirmation: true,
              confirmationText: "I confirm I produced the Failure Pattern Atlas with sources and checklists."
            },
            {
              title: "Step 10: Escalation Ladder & Comms Tree",
              description: "Decide faster under pressure. Define who decides, how fast, fallbacks, and who to inform with ready‑to‑send templates. Lane: Green.",
              prompt: "Be my Ops Playbook Writer. For the top 5 workflows most likely to jam, produce an Escalation Ladder (trigger → decider → target response time → fallback if unavailable) and a Comms Tree (who to notify, in what order, with a 50‑word template). Keep it to one page. Materials: <PASTE JOB SUMMARY + TOP‑20 LIST>",
              requiresConfirmation: true,
              confirmationText: "I confirm I have a 1‑page escalation ladder and comms tree."
            },
            // Append these to next-steps-lab.steps
            {
              title: "Step 11.1: Describe Your Problem in Detail",
              description:
                "Clearly articulate the problem before asking for solutions. Include who is affected, where it shows up, what you’ve tried, constraints, stakes/impact, and the ideal outcome. Treat it like briefing a brilliant colleague. Lane: Amber — describe/redact names, IDs, order #s.",
              prompt:
                "Copy and paste the template and fill in the bracketed sections with your problem.\n\nMy problem is: [describe the issue in detail]\nWho is affected: [roles/teams/customers]\nWhere it shows up: [systems/processes/channels]\nImpact today: [time, risk, cost, CSAT, compliance]\nWhat I’ve tried: [attempts + outcomes]\nConstraints: [tools, policy, budget, people, time]\nIdeal outcome: [what 'good' looks like]\nSuccess signals: [how we’ll know it worked]",
              requiresConfirmation: true,
              confirmationText: "I confirm I wrote a detailed problem brief (with constraints, impact, and ideal outcome)."
            },
            {
              title: "Step 11.2: Ask the AI to Become Your Coach (Clarify, No Solutions)",
              description:
                "Before brainstorming, switch the AI to a coaching mode to challenge assumptions and refine the problem. This yields a deeper, better-defined brief and prevents premature solutions.",
              prompt:
                "Act as a critical thinking coach. Based on the problem I just described, your only goal is to help me understand my problem better. Do NOT suggest any solutions. Ask me at least five clarifying questions that challenge assumptions, explore constraints, and help me define the problem more precisely. After I answer, ask follow-up questions until the problem statement is sharp.",
              requiresConfirmation: true,
              confirmationText: "I confirm I answered the coach’s questions and sharpened the problem statement."
            },
            {
              title: "Step 11.3: Brainstorm a Universe of Solutions (Expert Panel)",
              description:
                "Now generate a broad, non-obvious solution set. Use multiple expert lenses to avoid sameness, and force categorization to balance quick wins vs strategic bets.",
              prompt:
                "Act as a panel of experts consisting of an innovator, a pragmatist, and a systems thinker. Using our entire conversation so far (my detailed problem and my answers to your questions), brainstorm 15 distinct and creative solutions. For each solution, provide a 1–2 sentence description and categorize it as one of: Quick Win (simple/easy), Strategic Project (more effort/high impact), or Unconventional Idea (out-of-the-box/status-quo challenge). Ensure diversity of approaches and call out any dependencies or prerequisites.",
              requiresConfirmation: true,
              confirmationText: "I confirm I generated 15 categorized solutions (quick wins, strategic projects, unconventional ideas)."
            }
          ]
        }
      ]
    },
    betri: {
      name: "Betri Verkstova",
      company: "Betri",
      labs: [
        {
          id: "innovation-lab",
          name: "Venjing 1: Nýtslu spurtur",
          description: "Hvat kann TÚ nýta ChatGPT til?",
          steps: [
        // s1 — leave as is
            {
            title: "Stig 1: Ein samrøða við vitlíki",
            description: "Koyr fyrst ChatGPT á vanliga GPT 5.1 myndilin. Um tú hevur nakra fílu sum lýsur teg, so kann tú skoyta hettar uppí nú. Kopiera so byrtið niðanfyri og koyr tað inn í ChatGPT og send. Svara síðan spurningunum, sum verða settir.",
            prompt: `
Developer: Du er en **neutral, professionel interviewer** med det formål at forstå personens arbejde **dybt og konkret**. Denne indsigt skal gøre det muligt for en kollega at kortlægge detaljerne til potentielle AI/ChatGPT-anvendelser i næste trin. På dette stadie må du **aldrig** foreslå løsninger eller bringe AI-brug op – din eneste opgave er at stille spørgsmål og indsamle information.

---

### Rolle og adfærd (prioriteret)
1. **Neutral interviewer:** Stil kun spørgsmål; ingen rådgivning eller forslag.
2. **Struktureret og effektiv:** Gennemgå de vigtigste områder systematisk: rolle, kalender, opgaver, kommunikation, artefakter, workflows, værktøjer, regler, smertepunkter, ønskeliste.
3. **Kort og klart:** Spørgsmålene skal være præcise, lette at svare på og uden fagjargon.

---

### Plan for interviewforløb
Begin with a concise checklist (3-7 bullets) of de primære delopgaver i interviewet:
- Etablere grundlæggende rolle/kontekst
- Udforske centrale arbejdsområder og processer
- Indsamle eksempler og detaljer om opgaver
- Optegne eksisterende værktøjer, artefakter og workflows
- Identificere smertepunkter og ønskeliste
- Opsummere relevante arbejdsmønstre
- Validere forståelse løbende
Følg denne konceptuelle struktur, men tilpas rækkefølge og fokus ud fra samtalens indhold.

### Sådan gennemfører du interviewet
- **Stil & tempo:**
  - Stil **1-2 præcise spørgsmål ad gangen**.
  - Formuler dem, så de besvares i **2-5 sætninger eller korte bullets**.
  - Undgå både alt for brede ("Fortæl alt om…") og snævre ("Hvilken knap?") spørgsmål.

- **Arbejdsnoter (Working Notes):**
  - Hold korte **Arbejdsnoter**, opdateret ca. hver **2-3 interaktioner** (kun bullets).
  - Brug dem til at holde styr på det væsentlige; vis dem kun ved korte recaps.
  - Ved risiko for misforståelse, brug eksempelvis:
    - "Jeg har forstået X → Y → Z. Har jeg fanget det rigtigt?"

- **Post-action Validering:**
  - Efter hver større afklaring eller opdatering af Arbejdsnoter, valider forståelsen kort i 1-2 linjer og tilbyd at afklare evt. uklarheder, før du fortsætter til næste emne.

- **Varighed:**
  - Fortsæt interviewet, indtil personen beder dig stoppe **og** giver dig din næste opgave.

- **Sikkerhed & privatliv:**
  - Anmod om **anonymiserede/redigerede** eksempler, hvis det gavner forståelsen.
  - Bed **aldrig** om adgangskoder, login, personnumre eller andre fortrolige oplysninger.

- **Sprog:**
  - Tilpas sprog og tone som brugeren (dansk, engelsk mv.).
  - Brug **klar og enkel dansk** ved tvivl.

---

### Hvad du især skal lytte efter
*(Brug kun som linse for dine spørgsmål – du må stadig ikke foreslå løsninger)*
- Tunge skrive- og omskrivningsopgaver
- Opsummering af dokumenter, e-mails, møder
- Idégenerering & sparring
- Syntese & videnhentning
- Klassifikation, tagging, routing af henvendelser
- Datahåndtering (udtræk af info fra tekst/tal/diagram)
- Kundekommunikation/support
- Oversættelse & tone-skift
- Planlægning & koordinering
- Repetitive processer med klare input/output
- Dokumentoprettelse fra skabeloner

---

### Dækningsområder (metodisk gennemgang)
1. **Rolle & kontekst:** titel, team, forretningsområde, mission, succeskriterier
2. **Kalender-realitet:** faste møder, deadlines, sæson/årshjul
3. **Daglige/ugentlige opgaver:** frekvens, volumen, varighed, input/output
4. **Kommunikation:** samarbejdspartnere, kanaler, typiske beskeder
5. **Artefakter:** dokumenter, regneark, præsentationer, systemer
6. **Workflows & godkendelser:** rækkefølge, overleveringer, beslutningspunkter
7. **Værktøjer & systemer:** M365/Google, CRM/ERP, fagsystemer, tickets, datakilder
8. **Regler & begrænsninger:** compliance, fortrolighed, kvalitetskrav, SLA/KPI’er
9. **Smertepunkter:** flaskehalse, fejl, ventetid, copy-paste-arbejde
10. **Ønskeliste & idealbillede:** hvad "rigtig godt" ville være (uden at nævne AI)

---

### Spørgsmål-heuristikker (Guldhårs-testen)
- Omformulér "Fortæl om X" til fx:
  - "I en typisk uge, hvor mange X? Hvor lang tid varer de? Hvad adskiller en nem fra en svær?"
- Kvantificér hvor muligt:
  - "Circa hvor mange om ugen? Minutter pr. opgave? Hvor stor andel skal rettes/godkendes?"
- Følg processen:
  - "Hvad er inputtene? Hvor kommer de fra? Hvad sker derefter? Hvem bruger output?"
- Stil spørgsmål om variation:
  - "Hvad er de 3 mest almindelige undtagelser? Hvor tit sker de?"

---

### Arbejdsnoter (struktur)
Opdater løbende bullets som:
- **Rolle & mål:** …
- **Højvolumen-opgaver (frekvens/tid):** …
- **Artefakter & værktøjer:** …
- **Workflows & beslutningspunkter:** …
- **Begrænsninger/KPI’er:** …
- **Observeret friktion:** …
Vis kun Arbejdsnoter ved recaps, og brug "Har jeg fanget det rigtigt?" kun hvor reel misforståelsesfare er til stede.

---

### Vigtig begrænsning
Du må **aldrig** i interviewet foreslå eller beskrive, hvordan ChatGPT/AI kan hjælpe. Din opgave er udelukkende at indsamle **præcis og grundig kontekst** til senere analyse.

---

### Startlogik
**Hvis brugeren har vedhæftet en fil med baggrundsinformation (rolle, team, ansvar eller arbejdskontekst):**
1. **Læs filen grundigt før interviewet.**
2. **Integrér filens indhold** i din indledende forståelse.
3. **Tilpas dine første spørgsmål,** så du undgår at spørge om ting, filen allerede forklarer.
4. Brug filen til et første udkast til **Arbejdsnoter**.

**Hvis der ikke er vedhæftet en fil:**
- Hilse kort, forklar din rolle, og stil disse åbningsspørgsmål:

1. "Hvad er din **rolle/titel**, og hvilket **team/område** arbejder du i? Kan du i én sætning beskrive jeres **overordnede mission**?"
2. "Gennemgå en **typisk uge**. Hvad er de **3 vigtigste tilbagevendende opgaver**, som tager mest af din tid?"

**Start nu.**


            `,
            requiresConfirmation: false
            },
            {
            title: "Stig 2: Samandráttur (við Thinking-modellinum)",
            description: "Skift fyrst til 'Thinking'-modellið. Kopiera samandráttar birtið niðanfyri, set tað aftast í somu samrøðu, sum tú júst hevði við ChatGPT, og send.",
            prompt: `
Stop interviewet nu og opsummér mit arbejde udelukkende ud fra den information jeg har givet dig. 

Din opgave er at producere et detaljeret, velstruktureret resumé, der kan bruges som grundlag for at finde ChatGPT-anvendelser senere.

Brug kun information, der kommer direkte fra mine input. 
- Ingen gæt, ingen udfyldning af huller.
- Hvis noget ikke er nævnt, så lad det være usagt.

Returnér præcis disse sektioner og overskrifter:

1) Rolle-overblik
   - Kort beskrivelse af hvad jeg gør, hvem jeg betjener, og hvilke hovedresultater jeg bliver målt på.

2) Kerneansvar
   - Punktliste med stærke udsagnsord i starten (fx “Udarbejder…”, “Koordinerer…”, “Godkender…”).
   - Én linje pr. punkt.

3) Tilbagevendende workflows & leverancer
   - For hvert workflow: beskriv typiske input → output (hver del maks. 8 ord).
   - Angiv frekvens, hvis jeg har nævnt den (fx “ugentligt”, “dagligt”, “månedligt”).

4) Værktøjer, systemer & begrænsninger
   - Punktliste over apps, systemer, datakilder, adgangsgrænser, compliance-/fortrolighedsforhold, jeg har nævnt.

Generelle begrænsninger:
- Ingen generelle påstande om AI.
- Ingen råd, vejledning eller tutorials.
- Ingen marketing-sprog eller “flotte” formuleringer – skriv nøgternt og konkret.
- Ingen information, der ikke kan spores tilbage til noget, jeg faktisk har sagt.

            `,
            requiresConfirmation: true,
            confirmationText: "Eg vátti, at eg havi fingið ein fullfíggjaðan samandrátt, lisið hann og staðfest, at hann er rættur."
            },
            {
            title: "Stig 3: Opna nýggjan glugga og fær aftur inn á ChatGPT",
            description: "Opna eitt nýtt vindeyga í kaganum og lat upp ChatGPT aftur. Læt fyrra vindeyga við samandráttinum vera opið.",
            requiresConfirmation: false
            },
            {
            title: "Stig 4: Deep Research",
            description: "Kopiera birti niðanfyri inn í nýggja ChatGPT-vindeyga, skoyt samandráttin inn har tað er merkt, tendra ",
            prompt: `
# Formål
Brug **Deep Research** til at udarbejde en samlet rapport til ledere om, hvordan personer i en given rolle faktisk benytter ChatGPT og lignende LLM-værktøjer i deres daglige arbejde.

Begynd med en kort tjekliste (3–7 punkter) over, hvordan du vil gribe opgaven an; hold tjeklisten konceptuel og undgå implementeringsdetaljer.

## Rollebeskrivelse
Angiv rollen her:
<arbejds_beskrivelse> 
<------------ADD HERE--------------->
</arbejds_beskrivelse>



---

## Rapportmål
Rapporten skal hjælpe en leder med at forstå:
- Hvilke typer opgaver og arbejdssituationer folk i **lignende roller** bruger ChatGPT til.
- De forskellige **"arbejdsmåder"/roller**, som ChatGPT typisk indtager i deres hverdag (find de bedste betegnelser fra kilderne).
- Forskellen mellem:
  - **Overfladisk brug** (primært skrivning, omskrivning, opsummering)
  - **Dybere brug** af ChatGPT som sparringspartner, tænkende medspiller og beslutningsstøtte.
- Hvilke **begrænsninger og faldgruber** brugere typisk oplever.

Fokus: Rapporten skal være **forklarende og narrativ**, ikke blot en punktliste over “top use cases”.

---

## Researchfokus (Deep Research)
1. **Identificer kilder**: Find blogs, cases, community-tråde, artikler, interviews eller officielle eksempler, hvor personer i lignende roller beskriver brugen af ChatGPT/LLM’er i praksis.
2. **Udled mønstre**:
   - Hvilke opgavetyper og situationer går igen?
   - Hvordan beskrives interaktionen med ChatGPT (dialog, iterativ sparring, “rolle-spil” osv.)?
   - Hvor opleves størst værdi? Hvor nævnes skuffelser eller begrænsninger?
3. **Vægt kilder med fokus på ChatGPT som** sparringspartner, problemløsningsmakker, beslutnings- og refleksionsstøtte, hvor værktøjet hjælper til at tænke, strukturere og udvikle løsninger – ikke kun til tekstskrivning eller oversættelse.

Ved uenighed eller divergerende erfaringer blandt kilder, skal dette **tydeligt fremgå**. 

Hvis de fleste kilder kun forefindes på engelsk, skal rapporten alligevel skrives på dansk, og centrale citater oversættes.

---

## Inspirationskilder (vejledende)
Orientér dig gerne mod:
- Rollebaserede playbooks fra OpenAI, Google Gemini, Microsoft Copilot, Anthropic Claude m.fl.
- Kataloger og rapporter fra McKinsey, Deloitte, PwC, Accenture, BCG, EY, KPMG, samt World Economic Forum m.fl.

Du skal ikke liste eller referere samtlige kilder eksplicit, men brug dem som base for forståelse af de mest udbredte og modne mønstre.

---

## Rapportstruktur
Skriv en sammenhængende rapport på klart, enkelt dansk – rettet mod en leder. Brug nedenstående struktur med tydelige overskrifter:

### 1. Executive summary (ca. 1–1½ side)
- Kort beskrivelse af rollen (baseret på <arbejds_beskrivelse>)
- Hovedindsigter om, hvad folk i lignende roller bruger ChatGPT til
- Klart skel mellem overfladisk og dybere brug
- 3–5 centrale pointer til lederen

### 2. Rolle og arbejdskontekst
- Syntese af arbejdets karakter, opgaver, og hvor arbejde er mest viden-/beslutningstungt
- Hvor kompleksitet og behov for sparring typisk opstår

### 3. Typiske brugsmønstre for ChatGPT i lignende roller
- Beskriv mest almindelige måder at bruge ChatGPT på, organiseret som “arbejdsmåder/roller”

**3.1 Overfladiske brugsscenarier (første lag af værdi)**
- Skrivning, omskrivning, forkortelse, oversættelse, opsummering
- Forklar hvorfor det giver værdi, og hvorfor det kun er “første lag”

**3.2 Dybere brugsscenarier (sparring, tænkning, beslutningsstøtte)**
- Strukturering af komplekse problemstillinger, scenarieudforskning, mødeforberedelse, argumenttest, workflow-design m.m.
- For hver arbejdsmåde: Navngiv, forklar, giv eksempler og begrund værdi

### 4. Begrænsninger og typiske faldgruber
- Hvad bruges ChatGPT **ikke** optimalt til alene?
- Hvor opleves risiko, behov for menneskelig kontrol/ansvar?
- Gennemgå typiske faldgruber og misforståelser

### 5. Implikationer og refleksionsspørgsmål for kunden
- Hvad betyder indsigterne for ledere, der overvejer at udbrede ChatGPT?
- Betydningen af dyb brug som sparring og tænkende makker
- Afslut med 5–8 refleksionsspørgsmål til egne workflows, fx:
  - Hvor i vores arbejde giver disse arbejdsmåder mening?
  - Hvor kan sparring/scenarietænkning konkret aflaste?
  - Hvordan eksperimenterer vi sikkert uden at gå på kompromis med compliance?
  - Hvor skal vi **ikke** læne os for tungt op ad AI?

---

## Kvalitetskrav
- Skriv i nøgternt, roligt og letforståeligt sprog
- Gør rapporten **let at læse for en chef**
- Undgå punktlister over “use cases” – fokuser på samarbejdsformer og arbejdsmåder
- Inddrag konkrete eksempler og korte kildehenvisninger (URL, DOI, eller klar tekst)
- Fremhæv usikkerheder og uenigheder i kilderne klart

Rapporten skal være selvstændig, målrettet ledere, der ikke har erfaring med ChatGPT, men solid rolle- og organisationsforståelse.

---

## Outputformat
- Output skal være et Markdown-dokument med ovenstående struktur og overskrifter – **på dansk**
- Hvis <arbejds_beskrivelse> mangler, returnér fejlmeddelelse
- Hvis ingen relevante kilder er identificeret, returnér tilsvarende fejlmeddelelse
- Kildehenvisninger kan angives som URL, DOI eller klar tekst
- Eksempler i afsnit 3.2 ordnes i rapporten ud fra relevans/hyppighed
- Hvis hovedparten af researchkilderne er på engelsk, oversæt centrale citater til dansk

Efter udarbejdelse af rapporten, valider output kort og angiv, om alle påkrævede punkter er dækket, eller om der mangler væsentlige elementer. Hvis der mangler vigtige punkter, foretag en selvstændig korrektion.

`,
            requiresConfirmation: false
            },
            {
            title: "Stig 5: Nýggjur gluggi og møguleikalisti",
            description: "Opna ein nýggjan glugga við ChatGPT. Kopiera birtið, fyll inn samandráttin og nýggja 'web-search'-listan, og send. Skoðað so listan av møguleikum; er úrslitið skilagott? Stundum kemur modellið inn á skeiva leið; royn umaftur, um tað hendir.",
            prompt: `
## Introduction

We are exploring how language models (LLMs) can automate tasks in an office setting in the Faroe Islands. The goal is to find tasks where automation streamlines workflows, saves time, removes boring work, and saves money.

I want you to propose a list of the **15** best things my client can use ChatGPT for. Here is information about my client:

<client_information>
<------------ADD HERE--------------->
</client_information>

Below is guidance on what types of tasks ChatGPT is good at. Use it to shape your ideas and avoid suggesting things the model cannot do.

<tasks_types>

### What ChatGPT Does and Doesn't (2025)

---

#### Introduction

ChatGPT is a versatile language model that excels at drafting, structuring, explaining, translating, brainstorming, role-playing, visuals, research and supporting analysis. It performs best with clear goals, concrete inputs, and a human validation for accuracy and fit. The summaries below describe what it is typically **good at** and where it is **weaker**.

---

#### What ChatGPT Excels At

**Research & Analysis**

* **Current fact lookups with citations:** ChatGPT is good at finding up‑to‑date information using built‑in Search and returning concise answers with source citations when topics change over time (e.g., rules, prices, dates, news).
* **Deep Research (multi‑step investigations):** ChatGPT is good at planning a research path, comparing multiple sources, synthesizing viewpoints, and presenting a referenced summary while avoiding speculation.
* **Data interpretation:** ChatGPT is good at explaining patterns and insights from user‑provided tables, reports, or summaries, and at proposing metrics or next analytical steps.
* **Advanced Data Analysis (Python):** ChatGPT is good at running code for calculations, quick forecasts, and charts, especially when assumptions are stated and results receive a human sanity check.
* **Logic/fallacy/bias audits:** ChatGPT is good at reviewing text for reasoning errors, unsupported claims, and potential bias, and at tagging "claims needing sources."

**Documentation, Communication & Knowledge**

* **Turning notes into structure:** ChatGPT is good at converting unstructured notes into tables, checklists, JSON, or CSV schemas ready for reuse.
* **SOPs & checklists:** ChatGPT is good at drafting and maintaining standard operating procedures with roles, steps, and outcomes clearly defined.
* **Content repurposing pipelines:** ChatGPT is good at transforming a source (e.g., report) into a slide outline, a script, and audience‑specific social posts while preserving key messages.
* **Meeting prep packs (no meeting joining):** ChatGPT is good at producing crisp agendas, objectives, talking points, and smart questions to raise in meetings.
* **Email/thread summarization:** ChatGPT is good at summarizing pasted conversations, extracting action items, decisions, and owners.
* **Cross‑functional communication:** ChatGPT is good at translating technical language to plain language and tailoring messages for different stakeholders.
* **Persona / user‑story / JTBD drafting:** ChatGPT is good at turning interviews/notes into personas, user stories, acceptance criteria, and measurable outcomes.
* **Localization QA (EN/DK → FO):** ChatGPT is good at back‑translation, enforcing a glossary, and calibrating tone across languages, with a final human pass for Faroese quality.
* **Knowledge architecture:** ChatGPT is good at categorizing/tagging content and proposing taxonomies and naming conventions.
* **Prompt library design & QA:** ChatGPT is good at drafting reusable prompt templates, rubrics, and style guides, and at testing prompts for consistency.
* **Learning aids:** ChatGPT is good at producing micro‑lessons, quizzes, and flashcards for onboarding or policy training.
* **Documentation & writing support:** ChatGPT is good at outlining, drafting, revising for clarity and tone, translating, summarizing, and maintaining consistent style across documents.

**Operations & Execution Support**

* **Task prioritization & organization:** ChatGPT is good at turning scattered notes into prioritized lists and simple plans (e.g., Kanban‑style groupings).
* **Capacity planning drafts (no calendar control):** ChatGPT is good at sketching workload‑leveling options under stated constraints and fairness notes for later human scheduling.
* **Spreadsheet/regex/SQL helpers:** ChatGPT is good at producing Excel/Sheets formulas, regex patterns, and small SQL snippets with worked examples.
* **Test‑case & edge‑case generation:** ChatGPT is good at enumerating cases for features, processes, or policies (beyond unit tests).
* **Risk registers:** ChatGPT is good at drafting and maintaining risks, triggers, mitigations, and owners for ongoing projects.

**Interactive Sparring & Training**

* **Decision & strategy sparring:** ChatGPT is good at framing objectives, surfacing assumptions, expanding options, and comparing trade‑offs using simple multi‑criteria views.
* **Quality feedback on drafts:** ChatGPT is good at structured critique for clarity, logic, evidence, tone, and consistency, and at sharpening executive summaries.
* **Role‑play & communication rehearsal:** ChatGPT is good at simulating stakeholders, objections, negotiations, and difficult conversations for practice and refinement.
* **Creativity & brainstorming:** ChatGPT is very good at running idea sprints, using lateral thinking to come up with many ideas.
* **Risk thinking:** ChatGPT is good at pre‑mortems, red‑team vs. steelman perspectives, and proposing concrete mitigations.

**Images, Coding & Voice**

* **Image generation:** ChatGPT is good at creating illustrations, mockups, icons, and slide‑style mood concepts.
* **Image input:** ChatGPT is good at analyzing screenshots or diagrams; writing style sheets in Json format from an image or OCR for smaller images with text.
* **Coding assistance:** ChatGPT is very good at producing well defined scripts and code, explaining code, and generating tests for quick utilities (e.g., data cleaning); results benefit from a human review.
* **Voice for practice:** ChatGPT is good at voice‑based rehearsal (tone, pacing), English practice, and hands‑free brainstorming; it does not join or transcribe real meetings.

---

#### Where ChatGPT Is Weaker (and Typical Workarounds)

* **High‑precision extraction across many documents:** ChatGPT is weaker at perfectly consistent retrieval across large corpora; reliability improves when it quotes sources and a human verifies final numbers. *Note: While it is possible to extract over many files through integrations with GitHub, Google Drive and many more, this is usually not advisable for companies yet.*
* **Complex or regulated analytics at scale:** ChatGPT is weaker on very large datasets or high‑stakes financial/statistical work; it helps with scaffolding, explanations, and charts while specialized tools handle the core analysis.
* **Very long documents in one go:** ChatGPT is weaker at sustaining perfect consistency over long, single‑pass drafts; results improve when work is broken into sections with a brief outline and a final consistency pass.
* **Direct control of tools and systems:** ChatGPT does not operate calendars, send emails, or control enterprise tools; it drafts content and plans for a human to execute.
* **Live meeting participation:** ChatGPT does not join or listen to meetings in Faroese; meeting prep and debrief summaries are supported from user‑provided inputs.
* **Understanding real world context:** ChatGPT does not understand real world context for final decisions, so it will often only be used for creating the ideas and the drafst (the first 80%), and the human will pick the best options and validate that everything makes sense.

---

#### Faroese & Language Guidance

* **Understanding vs. writing quality:** ChatGPT understands Faroese perfectly but produces weak Faroese writing. Quality is higher when drafting in English or Danish and then translating to Faroese with a short manual edit.
* **Glossary & consistency:** A small glossary of preferred Faroese terms improves consistency; uncertain terms can be flagged for human review.

</tasks_types>

We already found these tasks from searching the internet:

<tasksFound>
<------------ADD HERE--------------->
</tasksFound>

### Your task

Make a **well‑thought‑out list of 15 ideas** my client can use ChatGPT for. **Order them by usefulness**, considering:

* Time saved
* Ease of implementation
* How boring the task is (higher boredom → higher priority)
* Any other relevant factors for this client

**Important constraints**

* **Do not** suggest actions that require controlling calendars, sending emails, or joining meetings or any other things where the model would have to take action.
* **Prefer ideas the client can do directly in ChatGPT** (no external integrations).
* **Include at least 5 interactive "sparring/coaching/role-play" ideas** (decision support, feedback/critique, role‑play, brainstorming, or risk thinking).

**Output format (for each item, keep it tight):**

1. **Title (bold)** — one‑sentence description.

   * **Why it matters:** (1 line)
   * **How ChatGPT helps:** (1 line; mention *Search/ADA/Image/Voice/Sparring* if relevant)
   * **Effort:** Low / Medium / High

Keep the writing concise, specific to the client, and practical. Avoid generic "rewrite my email" ideas unless they are unusually valuable for this client's context.
            `,
            requiresConfirmation: true,
            confirmationText: "Eg havi skoðað listan og vátti, at hann gevur skilagóðar møguleikar (ella at eg royndi umaftur, tá ið tað ikki gjørdi tað)."
            },
            {
            title: "Stig 6: Bygg víðari – partur 1",
            description: "Kopiera birti niðanfyri og send.",
            prompt: "Very good. Now I want you to think outside the box. Make another analysis of tasks my client can use ChatGPT for. For this analysis, I want you to find tasks that could revolutionize their worklife and field. Give these ideas a rating for how hard it is to implement and how positively impactful it could be for their worklife.",
            requiresConfirmation: false
            },
            {
            title: "Stig 7: Bygg víðari – partur 2",
            description: "Kopiera birtið niðanfyri inn í sama kjatt og send.",
            prompt: `Very good. Now, one last time, lose any predefined notion of how my client's tasks should be done and give me a list of revolutionary ways of doing their work with AI, based on first principal thinking. Give these ideas a rating for how hard it is to implement and how positively impactful it could be on their worklife.

              Be careful the ideas don't fall outside what they actually do, but are ideas on how to do their jobs in a totally new and improved way.
`,
            requiresConfirmation: false
            },
            {
            title: "Stig 8: Ger fyrsta listan",
            description: "Kopiera birtið inn í ChatGPT og send.",
            prompt: `Now looking at all the lists you have made, I want you to think about which of these my client should start with. Make a list of the top 5 best and most practical ideas from the lists, these should be the low hanging fruits that give big results.

            For each ideas write a good mini-guide on how they actually do it in ChatGPT.
            `,
            requiresConfirmation: false
            },
            {
            title: "Stig 9: Ger listan lidnan",
            description: "Kopiera birtið inn í ChatGPT og send.",
            prompt: "Now write out the rest of the list, this should be the top 6-15 ideas, be sure to carefully rank each idea, and then list them.",
            requiresConfirmation: false
            },
            {
            title: "Stig 10: Send listan til Hannu.",
            description: "Tað er ætlanin at Vitlíkisstovan hyggur ígjøgnum tykkara listar og ger teir til virðismikklar vegleiðingar tit altíð kunna hava hjá, tí skula tit senda listan 1-15 til Hannu, um tit ynskja ein tílíkan lista. ",
            requiresConfirmation: false
            },
            {
            title: "Stig 11: Liðugt – takk fyri!",
            description: "Hattar var venjingin – vónandi hevur tú nú ein góðan lista. Nú kanst tú prenta listan og leggja hann á náttborðið og lesa hann áðrenn tú sovnar.",
            requiresConfirmation: false
            }
            ]
            },
        
        {
          id: "deep-research-lab",
          name: "Venjing 2: Lumma-ráðgevin",
          description:
            "Endamálið er at gera trýggjar Deep Research-frágreiðingar, sum passa júst til tín tørv.",
          steps: [
            {
              title: "Stig 1: Bið ChatGPT finna uppá evnir",
              description:
                "Koyr birti niðanfyri inn í ChatGPT og skoyt uppí tína arbeiðis lýsing frá venjing 1.",
              prompt: `
**Role:** You are my **Research Triage Consultant**. Your job is to scan my context and propose **specific, high‑value topics** that are **well‑suited for ChatGPT Deep Research** (the tool that conducts multi‑step web investigations and synthesizes findings with citations) and are most valuable to me. Deep Research is most useful when:

* The question requires **aggregating and comparing many independent sources** (especially recent, evolving, or niche info).
* The answer must be **defensible and link‑backed** (citations, verifiability).
* The task involves **multi-criteria comparisons**, **trend analysis**, **policy/standards tracking**, **competitive or market scans**, or **literature reviews**.
  Deep Research is **not** ideal for: quick facts from a single source, pure ideation or editing, static backgrounders, or tasks solvable by reasoning over text I already have. (Use regular chat or Search for those.)

**My job summary:**

<job_summary>
<---------------YOUR JOB SUMMARY--------------->
</job_summary>

### Your objectives

1. **Triage my context** and identify where Deep Research would provide outsized value versus regular chat, look for both very valuable to my work and very intersting to me.
2. **Propose 8–12 concrete Deep Research candidates** (investigations I could run as full reports).
3. For each candidate, explain *why* it meets Deep Research criteria and how it would be a valuable report to have.

### What to include for each suggested Deep Research topic

* **Title** (clear, decision‑oriented).
* **Primary decision(s) it will inform** (e.g., go/no‑go, prioritization, vendor selection, policy design).
* **Key questions & comparisons** the report should answer (3–6 bullets).

### Output format

A list of 8 to 12 ideas for valuable and interesting reports I could generate, for each idea discribe what the report will be about clearly and tell me why it is either intersting or valuable.


### Guardrails

* Use **plain, verifiable language**; no marketing fluff.

### Decision rule (apply this as you triage)

* If a question could be answered by **one reputable source** or **by reasoning over text I’ve provided**, it belongs to regular chat—**exclude it**.
* If it likely requires **surveying multiple sources**, **weighing evidence**, and producing a **citation‑rich brief**, **include it** as a Deep Research candidate.

### Examples Where Deep Research shines most (evidence-backed)

In addition to (a) scouring what users & thought leaders are saying and (b) surfacing authoritative sources, Deep Research is particularly valuable for:

1. **Systematic evidence syntheses (systematic reviews / meta-analyses).** When we need a comprehensive, transparent, citation-rich answer across many studies and to show our method (PRISMA-style).

2. **Scoping & mapping reviews.** When the goal is to chart the breadth of a topic, clarify definitions, and organize the literature before going deep.

3. **Horizon scanning & foresight briefs.** Early-warning scans of emerging tech, risks, and weak signals, updated from multiple sources.

4. **Environmental / landscape scans.** Side-by-side picture of internal/external factors, players, and trends to inform strategy.

5. **Standards & regulatory change tracking.** Comparing frameworks (e.g., **NIST AI RMF**, **ISO/IEC 42001**) and monitoring updates across jurisdictions.

6. **Multi-criteria comparisons & decision matrices (MCDA).** Turning messy, multi-factor choices into defensible rankings with explicit weights & trade-offs.

7. **Vendor due diligence & procurement scoring (incl. TCO).** Building weighted scorecards, risk checks, and **total cost of ownership** comparisons from many documents.

8. **Technology scouting & market/patent sweeps.** Systematically spotting relevant tech, players, and IP; mapping options to needs.

9. **Evidence & gap maps.** Visual maps that show where evidence is strong/weak to guide priorities and next research.

10. **Benchmarking & competitive landscape analyses.** Collecting comparable metrics/practices across peers and plotting where we lead or lag.
              `,
              requiresConfirmation: true,
              confirmationText:
                "Eg vátti, at eg havi fingið ein lista við evnum, sum passa til mín leiklut."
            },
            {
              title: "Stig 2: Vel tíni 3 yndisbirt",
              description:
                "Les listan og vel 3 evni tú vilt arbeiða víðari við. Um tú ikki sært nakað spennandi, sig so bara ChatGPT frá hesum og lýs so fyri tí hvat tú heldur manglar ella hví tær ikki dámar hugskotini. Og royn so aftur.",
              requiresConfirmation: true,
              confirmationText:
                "Eg vátti, at eg havi valt 3 evni."
            },
            {
              title: "Stig 3: Bygg klár Deep Research‑birt til tey valdu evnini",
              description:
                "Í sama kjatt, avrita birti niðanfyri og fyll inn tíni 3 valdu evnir.",
              prompt: `
**New Role**
Now you are a *Senior Research Prompt Architect* for Deep Research. Your job is to turn my chosen topics into interesting, high-value, high‑leverage Deep Research prompts.

**Reader**
Keep *my work description already shared in this chat* top‑of‑mind. Optimize for immediate business value to me.

**Inputs**
**Topics:** ⬇️

<------------Paste Topics Here------------>

**Report‑Type Menu (pick the best fit per topic; one per topic)**

1. **Executive Brief** (board‑ready options & trade‑offs)
2. **Vendor/Landscape Scan** (comparison matrix, must‑haves/stoppers)
3. **Regulatory Watch** (what changed, who’s affected, by when)
4. **Scenario & Risk Note** (base/optimistic/conservative + risk register)
5. **Analytics QA Note** (definition pitfalls, edge cases, 5 spike tests)
6. **RFP Rubric** (weights, must‑haves, stoppers, evidence prompts)
7. **Customer/Ops Comms** (email/FAQ/SMS variants; if‑X‑then‑Y)
8. **Implementation Playbook** (phased plan, RACI, day‑0/30/90 checks)
9. **Opportunity Sizing (BOTE)** (assumptions, ranges, sensitivities)
10. **Explainer / Myth‑Buster** (misconceptions vs facts with cites)

**Rules for writing each short prompt (enforce all, keep it tight)**

* **Objective & scope:** one crisp question; include time horizon & geography; state one exclusion.
* **Sources:** prefer official/regulators, primary docs, peer‑reviewed, top institutes; *every non‑obvious claim must have inline citation with link + date*.
* **Deliverable:** match the chosen report type; always include assumptions & limits; note disagreements.
* **QA & failure modes:** require verification steps (e.g., quote key lines; cross‑check 2 sources).
* **Constraints:** no PII; sanitized examples; output‑only; use **absolute dates**.
* **Style:** plain language, active voice, decision‑oriented.
* **Length:** each prompt ≤ **55 words**. Add a **≤12‑word** “Why it fits” line.
* **Do not run research now**—only output prompts.

**Report‑Type Defaults (use these deliverable shorthands inside prompts)**

* *Executive Brief:* exec summary; options/criteria table; 3 scenarios; risk register; audit footer.
* *Vendor/Landscape Scan:* comparison matrix (weights/scores); must‑haves/stoppers; red flags; evidence log.
* *Regulatory Watch:* timeline + delta table; affected roles/processes; compliance checklist; watchlist.
* *Scenario & Risk Note:* drivers; base/opt/con scenarios; triggers; mitigations; limits.
* *Analytics QA Note:* definition pitfalls; edge cases; 5 spike tests; data hygiene caveats.
* *RFP Rubric:* criteria + weights; stoppers; standardized vendor Qs; evidence prompts.
* *Customer/Ops Comms:* 3 variants (email/FAQ/SMS); if‑X‑then‑Y flows; tone checks.
* *Implementation Playbook:* phased plan; RACI; dependencies; day‑0/30/90 checklist.
* *Opportunity Sizing (BOTE):* ranges with assumptions; sensitivity to 2–3 drivers; decision triggers.
* *Explainer/Myth‑Buster:* concise explainer; misconceptions vs facts; quote bank.

**Now generate**
For each topic, select the best report type and produce one short prompt (≤200 words) that **explicitly** states: role+goal, scope (time/geo, one exclusion), source policy (prioritize/require citations), deliverable (per type), QA step, constraints. After each prompt, add a ≤12‑word *Why it fits* line.
              `,
              requiresConfirmation: true,
              confirmationText:
                "Eg vátti, at eg havi fingið 3 birt."
            },
            {
              title: "Stig 4: Tendra Deep Research",
              description:
                "Nú skalt tú tendra tíni trý Deep Research, men bara eitt í senn. Opna eitt nýtt kjatt og koyr tað fyrsta birti inn. Trýst so á tað stóra + við kjatti og tendra fyri Deep Research. Send nú birti. Ger hettar fyri hvørt birt.",
              requiresConfirmation: true,
              confirmationText:
                "Eg vátti, at eg havi sett 3 Deep Research‑uppgávur í gongd."
            },
            {
              title: "Stig 6: Liðugt",
              description:
                "Nú arbeiður ChatGPT allarhelst uppá tínar frásagnir. Tá ið tær eru lidnar kunna tær takast niður sum PDF.",
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