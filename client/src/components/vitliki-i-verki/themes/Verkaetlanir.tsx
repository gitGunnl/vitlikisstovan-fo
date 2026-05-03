import { useEffect, useState } from "react";

/**
 * Theme: Verkætlanir — DOSSIER / TERMINAL.
 *
 * A classified-case-file aesthetic. Black slab break-out, monospace heavy,
 * blinking status dots, hover-reveal of "redacted" abstracts, and a live
 * system clock that grounds the page in real-time.
 */

type Project = {
  id: string;
  title: string;
  kind: string;
  year: string;
  status: "ACTIVE" | "ARCHIVED" | "WIP";
  classification: string;
  abstract: string;
  tags: string[];
};

const projects: Project[] = [
  {
    id: "VV-001",
    title: "Sergjørt týðingaramboð",
    kind: "Kunda-arbeiði",
    year: "2025",
    status: "ACTIVE",
    classification: "INTERNT",
    abstract:
      "Eitt amboð, ið týðir donsk skjøl beinleiðis til føroyskt — sniðgivið til ein ávísan kunda. Spurði tíð frá fleiri tímum til fáar minuttir.",
    tags: ["LLM", "TÝÐING", "DA→FO"],
  },
  {
    id: "VV-002",
    title: "Innanhýsis vitlíkis-assistentur",
    kind: "Egin royndir",
    year: "2025",
    status: "WIP",
    classification: "OPIÐ",
    abstract:
      "Spurnings-svar amboð, ið kennir innanhýsis skjøl og ferlir. Bygt á retrieval og semantiska leiting.",
    tags: ["RAG", "ASSISTENTUR"],
  },
  {
    id: "VV-003",
    title: "Sjálvvirkin frágreiðingaramboð",
    kind: "Kunda-arbeiði",
    year: "2024",
    status: "ARCHIVED",
    classification: "INTERNT",
    abstract:
      "Mánaðarligar frágreiðingar gjørdar sjálvvirkandi úr tølum og myndum. Sparir 30+ tímar um mánaðin.",
    tags: ["AUTOMATION", "REPORTING"],
  },
];

function useClock() {
  // Defer to client-only to avoid hydration mismatch between SSR HTML and first
  // client paint. Render a stable placeholder until mounted.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!now) return "————-——-—— · ——:——:——";
  return now.toISOString().replace("T", " · ").slice(0, 19);
}

function StatusDot({ status }: { status: Project["status"] }) {
  const color =
    status === "ACTIVE"
      ? "bg-emerald-400"
      : status === "WIP"
      ? "bg-amber-400"
      : "bg-foreground/30";
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
      <span className={`relative w-1.5 h-1.5 ${color} rounded-full`}>
        {status !== "ARCHIVED" && (
          <span
            className={`absolute inset-0 ${color} rounded-full animate-ping opacity-75 motion-reduce:hidden`}
          />
        )}
      </span>
      {status}
    </span>
  );
}

export default function Verkaetlanir() {
  const clock = useClock();
  const [openId, setOpenId] = useState<string | null>(projects[0].id);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="space-y-16">
      {/* Terminal header — full-bleed black slab */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-mono text-[11px] uppercase tracking-widest flex flex-wrap items-center gap-x-8 gap-y-2">
          <span className="opacity-60">SYS</span>
          <span>vitliki.fo / dossier</span>
          <span className="opacity-60">CLOCK</span>
          <span>{clock} UTC</span>
          <span className="opacity-60">SCROLL</span>
          <span>{scrollPct.toFixed(0).padStart(3, "0")}%</span>
          <span className="opacity-60 ml-auto">CLR · INTERNT</span>
        </div>
        <div className="h-px bg-background/20" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 font-mono text-[10px] uppercase tracking-widest opacity-60 overflow-x-auto whitespace-nowrap">
          {`> opening case files / ${projects.length} entries / hover to reveal abstract / click row to expand ──────────────`}
        </div>
      </div>

      {/* Featured case file — number + title + redacted block */}
      <article className="grid md:grid-cols-12 gap-6 md:gap-10 items-start">
        <div className="md:col-span-3 font-mono text-[11px] uppercase tracking-widest space-y-2 text-foreground/60">
          <div>CASE</div>
          <div className="text-foreground text-2xl tabular-nums tracking-tight font-semibold">
            VV-001
          </div>
          <div>OPENED · 2025-03-14</div>
          <div>HANDLER · vitlíki.fo</div>
          <div className="pt-3 border-t border-foreground/10">
            <StatusDot status="ACTIVE" />
          </div>
        </div>

        <div className="md:col-span-9">
          <div className="aspect-[16/8] bg-foreground/[0.04] border border-foreground/10 relative overflow-hidden flex items-end p-6">
            <div className="absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(0deg,transparent_0_2px,currentColor_2px_3px)]" />
            <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              EXHIBIT A · MYND
            </div>
            <div className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              4096 × 2160
            </div>
            <h3 className="relative text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
              Sergjørt
              <br />
              týðingaramboð.
            </h3>
          </div>
          <div className="mt-5 grid sm:grid-cols-3 gap-4 font-mono text-[10px] uppercase tracking-widest">
            <div className="border-t border-foreground/10 pt-3">
              <div className="text-foreground/50">SLAG</div>
              <div className="text-foreground/90 mt-1 normal-case tracking-normal text-sm font-sans">
                Týðing · LLM
              </div>
            </div>
            <div className="border-t border-foreground/10 pt-3">
              <div className="text-foreground/50">KUNDI</div>
              <div className="text-foreground/90 mt-1 normal-case tracking-normal text-sm font-sans">
                Sergreinaður
              </div>
            </div>
            <div className="border-t border-foreground/10 pt-3">
              <div className="text-foreground/50">SPARING</div>
              <div className="text-foreground/90 mt-1 normal-case tracking-normal text-sm font-sans">
                ~85% av tíð
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Case-file index — expandable rows */}
      <section>
        <header className="flex items-baseline justify-between border-b border-foreground/10 pb-3 mb-2">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
            Skrá yvir verkætlanir · INDEX
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40">
            {String(projects.length).padStart(3, "0")} / {String(projects.length).padStart(3, "0")}
          </span>
        </header>

        <ul className="divide-y divide-foreground/10 border-b border-foreground/10">
          {projects.map((p) => {
            const open = openId === p.id;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : p.id)}
                  className="w-full grid grid-cols-12 gap-4 py-5 text-left items-center hover:bg-foreground/[0.03] transition-colors px-2 -mx-2"
                  data-testid={`case-${p.id}`}
                >
                  <span className="col-span-2 sm:col-span-1 font-mono text-[10px] uppercase tracking-widest text-foreground/50 tabular-nums">
                    {p.id}
                  </span>
                  <span className="col-span-7 sm:col-span-5 text-base sm:text-lg font-medium tracking-tight">
                    {p.title}
                  </span>
                  <span className="hidden sm:block sm:col-span-2 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                    {p.kind}
                  </span>
                  <span className="hidden sm:block sm:col-span-2">
                    <StatusDot status={p.status} />
                  </span>
                  <span className="col-span-3 sm:col-span-2 text-right font-mono text-[10px] uppercase tracking-widest text-foreground/50 tabular-nums">
                    {p.year} · {open ? "—" : "+"}
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid md:grid-cols-12 gap-6 md:gap-10 pb-8 pt-2">
                      <div className="md:col-span-7 md:col-start-2">
                        <p className="text-sm sm:text-base text-foreground/80 leading-relaxed max-w-prose">
                          {p.abstract}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[10px] uppercase tracking-widest border border-foreground/20 px-2 py-1"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-3 md:col-start-10 font-mono text-[10px] uppercase tracking-widest text-foreground/60 space-y-2">
                        <div>CLASS · {p.classification}</div>
                        <div>YEAR · {p.year}</div>
                        <div>ID · {p.id}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Footer ticker */}
      <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/40 overflow-hidden whitespace-nowrap border-t border-foreground/10 pt-3">
        <span className="inline-block animate-[marquee_40s_linear_infinite] motion-reduce:animate-none">
          {`END OF FILE · ${clock} · vitliki.fo · END OF FILE · ${clock} · vitliki.fo · END OF FILE · ${clock} · vitliki.fo · `}
        </span>
      </div>

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
