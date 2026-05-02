// client/src/pages/tilarbeidis.tsx
import { useEffect, useState, ReactNode } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { seoConfig } from "@/content/seo";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  summary: string | ReactNode;
  mediaType?: "image" | "video" | "buttons";
  mediaSrc?: string;
  accordions?: Array<{
    title: string;
    content: string;
  }>;
};

const timelineData: TimelineEvent[] = [
  {
    id: "evt-022",
    date: "2026-03-24",
    title: "Skriving av frágreiðingum 5 og 6",
    summary:
      "Við støði í kanningararbeiðinum er farið undir at skriva málrættaðar vegleiðingar til lærarar og fólk í tænastuvinnuni.",
  },
  {
    id: "evt-021",
    date: "2026-03-01",
    title: "Kanning og greining av vitlíkisnýtslu til frágreiðing 5 og 6",
    summary:
      "Kanning er gjørd av, hvussu man best kann nýta vitlíki í sum venjari og sum hondverkari.",
  },
  {
    id: "evt-020",
    date: "2026-02-23",
    title: "Rættlestur av frágreiðingum 3 og 4",
    summary:
      "Vegleiðingarnar til lærarar og tænastuvinnufólk eru liðugt skrivaðar og hava verið til rættlestrar fyri at tryggja eitt høgt fakligt støði.",
  },
  {
    id: "evt-019",
    date: "2026-01-26",
    title: "Skriving av frágreiðingum 3 og 4",
    summary:
      "Við støði í kanningararbeiðinum er farið undir at skriva málrættaðar vegleiðingar til lærarar og fólk í tænastuvinnuni.",
  },
  {
    id: "evt-018",
    date: "2026-01-07",
    title: "Kanning og greining av vitlíkisnýtslu",
    summary:
      "Kanning er gjørd av, hvussu man best kann nýta vitlíki í tænastu vinnuni og sum lærari.",
  },
  {
    id: "evt-017",
    date: "2025-12-31",
    title: "Fyrstu vegleiðingar útkomnar",
    summary:
      "Fyrstu vegleiðingar eru komnar út í einari royndar versión, snið og myndir mangla. Arbeiði við næstu vegleiðingunum er eisini býrja, her verur hugt uppá hvussu fólkaskúlalærarar og tænastustarvsfólk kunnu nýta vitlíki í sínum starvi.",
  },
  {
    id: "evt-016",
    date: "2024-12-01",
    title: "Vegleiðingar eru farnar til rættlestur",
    summary: (
      <>
        Nú eru vegleiðingar skrivaðar. Um tú hevur áhuga í at rættlesa og royna tær, so kanst tú lesa tær her:{" "}
        <Link href="/user-guides/ai-for-kindergarten-guide" className="text-primary hover:text-primary/80 underline underline-offset-2 font-medium transition-colors" data-testid="link-kindergarten-guide">
          Vegleiðing fyri dagstovnar
        </Link>
        {" "}og{" "}
        <Link href="/user-guides/ai-for-caretakers-guide" className="text-primary hover:text-primary/80 underline underline-offset-2 font-medium transition-colors" data-testid="link-caretakers-guide">
          Vegleiðing fyri røktarstarvsfólk
        </Link>
        .
      </>
    ),
  },
  {
    id: "evt-015",
    date: "2025-11-20",
    title: "Vegleiðingar deilt upp eftir bólkum",
    summary:
      "Eftir meiting í mun til hvussu man best rakar tann rætt bólkin, so havi eg valgt at ístaðin fyri at deil tær tvær fyrstu vegleiðingarnar upp millum námsfrøðingar og hjálparafólk, so er tað ístaðin deilt upp eftir \"Dagstovnar\" og so \"Røktarstarvsfólk\". Hettar var neyåugt fyri at vegleiðingarnar vóru so nýttuligar sum møguligt.",
  },
  {
    id: "evt-014",
    date: "2025-10-07",
    title: "Samrøður við námsfrøðingar og hjálparafólk eru komnar inn",
    summary:
      "Samrøður við námsfrøðingar og hjálparafólk eru komnar inn. Royndin við at nýta vitlíki til hettar eydnaðist betur enn vænta. Takk til øll sum svarðu.",
  },
  {
    id: "evt-013",
    date: "2025-09-26",
    title: "Framløga til Vísindavøka",
    summary:
      "Sum partur av at miðla verkætlanina havi eg givið eina framløgu á vísindavøku. Sí framløguna og tilhoyrandi birt niðanfyri. 👇️",
    mediaType: "video",
    mediaSrc: "https://www.youtube.com/embed/I8oRK07dF2E",
    accordions: [
      {
        title: "1. Finn títt næsta granskingar evni:",
        content: `I am a researcher in the field of:
[A detailed description of what you research]

I want you to research what is the most exciting things to study close in my field.

Write a report that describes the newest findings in my field that are ripe for some more research to be done.`
      },
      {
        title: "2. Talgildar royndardukkur til spurnakanningar",
        content: `Task: Pre-test a survey with a simulated person.

[PERSONA_BIO]

[SURVEY_ITEMS]

Instructions:
1) Stay in character. Start with a one-line persona recap.
2) For EACH item, output a table row:
   # | Answer | Think-aloud (1–2 sentences) | Friction (OK/Confusing/Leading/Loaded/Double-barrel/Jargon) | Micro-fix (≤12 words, if not OK)
3) After the table, add bullets:
   - Top 3 problems (item # + one-line why)
   - Persona notes (tone, reading level, culture/translation traps)
   - Go/No-Go for THIS persona (yes/no + one-line why)

Create the table now.`
      },
      {
        title: "3. Betri er at vera fyrivarin enn eftirsnarur",
        content: `Role: Hostile reviewer + safety coach.
Input is a procedure/flow. Goal: prevent avoidable failure.

Produce:
1) Top 10 failure modes (ordered by likelihood × impact) with short causes.
2) Preventive checks (before/during/after) mapped to each failure.
3) Quick contingencies if failure occurs (who/what/when).
4) Minimal checklists (setup, run, teardown) and a 2‑minute "go/no‑go" gate.
5) Data quality traps (bias, missingness, instrument drift) + fixes.

Procedure:

[PASTE SOP / FIELD / TEST FLOW]

Assume no PII; note GDPR risks if any.
Return bullets and small tables. Keep it terse.`
      },
      {
        title: "4. Ætl kapping (Hypotesu kapping)",
        content: `You are running a 30‑minute hypothesis tournament.
Context & constraints:

[PASTE BRIEF: problem, setting, N limit, season/logistics, equipment, ethics/GDPR notes].

Do the following:
A) Generate 10 distinct, testable hypotheses. For each: why plausible (1‑2 lines) + a fast falsification plan (≤8 weeks) within constraints.

B) Create a scoring rubric (1‑5): Novelty, Testability (≤8 weeks), Feasibility (Faroe/logistics/N), Impact if true, Ethical risk (low=5). Score all 10; show a ranked table.

C) Red‑team the top 3: list confounds, measurement errors, GDPR/ethics snags; propose "fix‑first" edits (controls, instruments, sampling).

D) Recommend 1 winner + 1 runner‑up. Give a one‑pager for the winner: micro‑pilot steps, required data, and a stop/continue rule.
Return: tables + bullets only. No fluff.`
      },
      {
        title: "5. Kaldakrígsdómarin: Ein steinhørð afturmelding",
        content: `Critique this outline, resume, plan, or project like a Cold War Russian Olympic judge.

Be brutally honest. Score out of 100. Deduct points for every flaw in structure, clarity, originality, and feasibility.

End with a few fixes to reach ninety-plus.`
      }
    ]
  },
  {
    id: "evt-012",
    date: "2025-09-15",
    title: "Samrøður við námsfrøðingar og hjálparafólk eru byrjaðar!",
    summary:
      "Um tú ert hjálparafólk ella námsfrøðingur og gjarna vil hjálpa við hesari verkætlan, so kanst tú trýsta á tín knøtt niðanfyri, fyri at tosa við eitt vitlíkismodell um títt starv. Tað tekur áleið 15 min. og hjálpir hesari verkætlan sera nógv.",
    mediaType: "buttons" as const,
  },
  {
    id: "evt-011",
    date: "2025-09-13",
    title: "Royndir við samrøðutólið eydnaðist sera væl.",
    summary:
      "Royndir við samrøðutólið eydnaðist sera væl, so tí verur nú fari ígongd við nógv fleiri samrøður.",
  },
  {
    id: "evt-010",
    date: "2025-09-13",
    title: "Greinin um verkætlanina er komin út í Sosialinum.",
    summary:
      "Í Sosialinum hesa vikuna ber til at lesa blaðið Vísindavøka, har millum annað ber til at lesa eina grein um hesa verkætlan og um vitlíki sum heild.",
    mediaType: "image",
    mediaSrc: "/images/sosialurin.png",
  },
  {
    id: "evt-009",
    date: "2025-09-06",
    title: "Fyrstu royndarsamrøður við námsfrøðingar eru byrjaðar",
    summary:
      "Fyrstu rpyndar samrøðurnar við nakrar fáar námsfrøðingar eru farnar ígongd, fyri at vita um tað nýggja amboðið riggar væl.",
  },
  {
    id: "evt-008",
    date: "2025-08-20",
    title: "Menning av samrøðuamboði",
    summary:
      "Vit menna eitt samrøðuamboð, sum nýtir vitlíki til at læra nógv meira um valdu bólkarnar, fyri at royna at fáa eitt breitt og munagott innlit í teirra dagligu arbeiðsrútinur og avbjóðingar.",
  },
  {
    id: "evt-007",
    date: "2025-08-14",
    title: "Bólkarnir eru valdir",
    summary:
      "Eftir at hava mett teir tjúgu bólkarnar eftir okkara styrkistølum, eru endaligu bólkarnir valdir til royndarverkætlanina: Hjálparfólk, Heilsurøktarar og heimarøktarfólk, Námsfrøðingar, Fólkaskúlalærarar, Listafólk (ikki-talgild), Tænastustarvsfólk (handil, gistingarhús, móttøka), Ítróttarvenjarar, og Sjúkrarøktarfrøðingar (sjúkrahús & klinikkir).",
  },
  {
    id: "evt-006",
    date: "2025-08-01",
    title: "Kanningarstig",
    summary:
      "Næsta stigið: seta okkum í samband við valdar bólkar og at skipa fyri samrøðum fyri at avdúka dagligar avbjóðingar.",
  },
  {
    id: "evt-005",
    date: "2025-07-15",
    title: "Samrøða við miðlar",
    summary:
      "Hava gjørt fyrstu samrøðu við tíðarritið hjá Vísindavøku um verkætlanina og um leiklutin hjá vitlíki í føroyskum arbeiðslívi. Greinin er ikki komin út enn.",
  },
  {
    id: "evt-004",
    date: "2025-07-09",
    title: "Raðfesting í gongd",
    summary:
      'Vit meta nú um teir tjúgu bólkarnar eftir hesum styrkistølum: "Fáir skíggjar, stórt starvsfólkatal og vitlíkis-nýtslumøguleikar."',
  },
  {
    id: "evt-003",
    date: "2025-07-07",
    title: "Verkstova um bólkaval",
    summary:
      'Verkstovan um at geva íblástur til hvørjir bólkar kunnu hava størsta gagn av hesum átakinum og til at meta styrkistøl fyri yrkisbólkar til royndarverkætlanir.',
    mediaType: "image",
    mediaSrc: "/images/verkstova.jpeg",
  },
  {
    id: "evt-002",
    date: "2025-07-01",
    title: "Verkætlanin byrjar",
    summary: "Fyrsta arbeiðsætlanin kunngjørd.",
  },
  {
    id: "evt-001",
    date: "2025-05-01",
    title: "Verkætlanin fíggjað",
    summary:
      'Átakið tryggjaði sær játtan, ið gevur okkum tilfeingi at kanna vitlíkis-nýtslumøguleikar hjá starvsfólki í úrvaldu bólkunum.',
  },
];

const Tilarbeidis = () => {
  const [activeSection, setActiveSection] = useState<string>("evt-001");
  const [visibleEvents, setVisibleEvents] = useState<Set<string>>(new Set());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    // Keep DA locale to match previous rendering; adjust to 'fo-FO' if you prefer Faroese month names.
    return date.toLocaleDateString("da-DK", options);
  };

  const scrollToEvent = (eventId: string) => {
    const element = document.getElementById(eventId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Title and meta description are owned by the prerender step
  // (scripts/prerender-seo.ts via client/src/content/seo/registry.seo.ts).

  useEffect(() => {
    const handleScroll = () => {
      const sections = timelineData.map((evt) =>
        document.getElementById(evt.id)
      );
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(timelineData[i].id);
          break;
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id;
            setVisibleEvents((prev) => new Set([...Array.from(prev), id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-50px 0px",
      }
    );

    // Observe all timeline items
    timelineData.forEach((evt) => {
      const el = document.getElementById(evt.id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
        <Header />

        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Verkætlanardagføringar – Vitlíki til arbeiðis
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Fylg við okkara arbeiðsætlan, meðan vit menna vitlíkivegleiðingar
              til føroyska vinnulívið.
            </p>
          </div>
        </section>

        {/* Status Boxes */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Current Focus */}
            <div className="bg-primary/15 border-2 border-primary/50 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔍</span>
                <div>
                  <h3 className="font-bold text-lg">
                    Núverandi uppgáva:
                  </h3>
                  <p className="text-foreground/90">
                    Skriva vegleiðingar til handverkarir
                  </p>
                </div>
              </div>
            </div>

            {/* Next Up */}
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">📅</span>
                <div>
                  <h4 className="font-semibold text-accent">Næst:</h4>
                  <p className="text-foreground/80 text-sm">
                    Rættlestur
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Description Dropdown */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-6 bg-background/60 border border-border/50 rounded-xl hover:border-primary/30 hover:bg-background/70 transition-all duration-300 group">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  Verkætlanarlýsing
                </h3>
                <ChevronDown className="w-5 h-5 text-foreground/60 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden">
                <div className="p-6 bg-background/40 border-x border-b border-border/50 rounded-b-xl">
                  <div className="space-y-8">
                  <p className="text-foreground/85 leading-loose text-lg">
          Vitlíki-amboð (AI-amboð) gerast skjótt alsamt meira tøk, men nógv arbeiðsfólk í Føroyum eru í iva um, hvussu tey skulu fara í gongd við at brúka tey.
                  </p>

                  <p className="text-foreground/80 leading-loose text-lg">
                    Henda verkætlanin er serliga sett í verk fyri at røkka teimum arbeiðisfólkum, sum helst fara at hava trupult við at taka vitlíki til sín – tað eru fólk í vinnugreinum, har starvsfólk ofta hava færri royndir við teldur í gerandisdegnum í mun til skrivstovufólk, har lítil fígging er til tøkniútbygging, og greinar har starvsfólk ofta ikki hava tøkniliga bakgrund.
                  </p>

                  <p className="text-foreground/80 leading-loose text-lg">
                    Vit fara at gera 6–8 stuttar, lættskiljandi frágreiðingar, sum verða tillagaðar ávísum vinnugreinum. Frágreiðingarnar fara greiðiliga at vísa, hvussu verandi vitlíki-amboð, serliga málmenni sum ChatGPT, kunnu loysa veruligar og ítøkiligar trupulleikar, sum hesi starvsfólk hava.
                  </p>

                  <p className="text-foreground/80 leading-loose text-lg">
                    Við at veita sera handaliga vegleiðing, vilja vit minka um tær forðingar, sum halda fólki aftur frá at royna vitlíki til arbeiðis, og hjálpa teimum, ið hava mest brúk fyri tí, so tey fáa eina kærkomna hjálpandi hond í einari tíð, tá ið arbeiðslandslagi broytist skjótt.
                  </p>
                  <p className="text-foreground/80 leading-relaxed mt-4">
                    Átakið hjálpir ikki bara fólk at brúka tøknina sum hon er í dag, men hjálpir teimum eisini at skilja hvussu tey kunnu brúka tøknina so við og við sum tøknin mennist.
                  </p>
                </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Navigation (Desktop Only) */}
            <aside className="hidden lg:block lg:w-1/4">
              <div className="sticky top-24">
                <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-6">
                  VARÐAR
                </h3>
                <nav className="space-y-1" aria-label="Timeline navigation">
                  {timelineData.map((evt) => {
                    const isActive = activeSection === evt.id;
                    return (
                      <button
                        key={evt.id}
                        onClick={() => scrollToEvent(evt.id)}
                        aria-current={isActive ? "true" : undefined}
                        className={[
                          "block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 border-l-[3px]",
                          isActive
                            ? "bg-primary/15 text-primary border-primary"
                            : "text-foreground/70 hover:text-foreground hover:bg-foreground/5 border-transparent",
                        ].join(" ")}
                      >
                        <div className="text-xs text-foreground/50 mb-1 font-medium">
                          {formatDate(evt.date)}
                        </div>
                        <div className="text-sm font-medium">{evt.title}</div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Right Column - Timeline */}
            <main className="lg:w-3/4">
              <div className="space-y-8">
                {timelineData.map((evt) => (
                  <section
                    key={evt.id}
                    id={evt.id}
                    className={[
                      "transition-all duration-700 transform",
                      visibleEvents.has(evt.id)
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8",
                    ].join(" ")}
                  >
                    <div className="bg-background/60 border border-border/50 rounded-xl p-8 hover:border-primary/30 hover:bg-background/70 transition-all duration-300 group">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-5 h-5 text-primary/80" />
                        <span className="text-sm text-primary/80 font-bold uppercase tracking-wide">
                          {formatDate(evt.date)}
                        </span>
                      </div>

                      <h3 className="text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">
                        {evt.title}
                      </h3>

                      <p className="text-foreground/80 mb-6 leading-relaxed text-lg">
                        {evt.summary}
                      </p>

                      {evt.mediaSrc && (
                        <div className="w-full rounded-lg overflow-hidden border border-border/40 mb-6">
                          {evt.mediaType === "video" ? (
                            <div className="aspect-video">
                              {evt.mediaSrc ? (
                                <iframe
                                  src={evt.mediaSrc}
                                  className="w-full h-full"
                                  allowFullScreen
                                  title={evt.title}
                                />
                              ) : (
                                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                                  Video verður lagt til seinni
                                </div>
                              )}
                            </div>
                          ) : (
                            <img
                              src={evt.mediaSrc}
                              alt={evt.title}
                              className="w-full h-auto"
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                      )}

                      {evt.mediaType === "video" && !evt.mediaSrc && (
                        <div className="w-full rounded-lg overflow-hidden border border-border/40 mb-6">
                          <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground">
                            Video verður lagt til seinni
                          </div>
                        </div>
                      )}

                      {evt.accordions && (
                        <div className="mt-6">
                          <Accordion type="single" collapsible className="w-full">
                            {evt.accordions.map((accordion, index) => (
                              <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left">
                                  {accordion.title}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <pre className="bg-muted/30 border border-border rounded-lg p-4 text-sm font-mono text-foreground whitespace-pre-wrap overflow-x-auto leading-relaxed">
                                    {accordion.content}
                                  </pre>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>
                      )}

                      {evt.mediaType === "buttons" && (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                          <a
                            href="https://interview-tool.replit.app/i/eb859a69-2e6c-4e36-be1a-68e39226f53e/a8f7218d6a0643b3aa8d0b17efcb6db4"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
                          >
                            <span className="text-xl">🎓</span>
                            Far til námsfrøðingar samrøðu
                          </a>
                          <a
                            href="https://interview-tool.replit.app/i/fdf4c068-eed5-492f-abd5-31cd168f9ead/ebe41d395e3546369d5528c185f7ab93"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
                          >
                            <span className="text-xl">🤝</span>
                            Far til hjálparafólk samrøðu
                          </a>
                        </div>
                      )}
                    </div>
                  </section>
                ))}
              </div>
            </main>
          </div>
        </div>

        {/* Roadmap Table */}
        <section className="mt-24 py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Arbeiðsætlan
            </h2>

            <div className="overflow-x-auto bg-background/60 border border-border/50 rounded-xl p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className="text-left py-3 px-2 font-semibold">Stig</th>
                    <th className="text-left py-3 px-2 font-semibold">
                      Tíðarskeið
                    </th>
                    <th className="text-left py-3 px-2 font-semibold">
                      Høvuðsuppgávur
                    </th>
                    <th className="text-left py-3 px-2 font-semibold">
                      Úrslit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  <tr>
                    <td className="py-4 px-2 font-medium">
                      Fyrireiking & Kanning
                    </td>
                    <td className="py-4 px-2">jul. – aug. 2025</td>
                    <td className="py-4 px-2">
                      Verkætlanarbyrjan, val av vinnugreinum og
                      kanningarsamrøður.
                    </td>
                    <td className="py-4 px-2">Endaligt vinnugreinaval</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-2 font-medium">Menning (Stig 1)</td>
                    <td className="py-4 px-2">sep. – nov. 2025</td>
                    <td className="py-4 px-2">
                      Greina samrøður og skriva fyrstu vegleiðingarnar.
                    </td>
                    <td className="py-4 px-2 font-bold text-primary/90">
                      📦 Vegleiðingar 1 & 2
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-2 font-medium">Menning (Stig 2)</td>
                    <td className="py-4 px-2">nov. 2025 – jan. 2026</td>
                    <td className="py-4 px-2">
                      Halda fram við samrøðum og skriva næstu
                      vegleiðingarnar.
                    </td>
                    <td className="py-4 px-2 font-bold text-primary/90">
                      📦 Vegleiðingar 3 & 4
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-2 font-medium">Menning (Stig 3)</td>
                    <td className="py-4 px-2">feb. – apr. 2026</td>
                    <td className="py-4 px-2">
                      Menna og skriva seinastu vegleiðingarnar.
                    </td>
                    <td className="py-4 px-2 font-bold text-primary/90">
                      📦 Vegleiðingar 5 & 6
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-2 font-medium">Frágreiðing</td>
                    <td className="py-4 px-2">apr. – mai 2026</td>
                    <td className="py-4 px-2">
                      Skriva endaliga samandráttarfrágreiðing við úrslitum og
                      tilmælum.
                    </td>
                    <td className="py-4 px-2 font-bold text-primary/90">
                      📦 Endalig verkætlanarfrágreiðing
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Contact Banner */}
        <section className="mt-16 py-16 px-4 sm:px-6 lg:px-8 bg-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Vilt tú vera partur av okkara ferð?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Fylg okkum á LinkedIn og Facebook, har vit deila nógv meira um
              vitlíki í Føroyum. Ver millum tey fyrstu at læra um nýggjar møguleikar innan vitlíki!
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="https://linkedin.com/company/tøkni-tænastan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                {/* LinkedIn icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM10 16H8v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zM17 16h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0V16h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548V16z" />
                </svg>
                Fylg á LinkedIn
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61557593776267"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                {/* Facebook icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.991 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.413c0-3.017 1.792-4.683 4.533-4.683 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.493 0-1.957.927-1.957 1.878v2.255h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.991 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Fylg á Facebook
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
  );
};

export default Tilarbeidis;