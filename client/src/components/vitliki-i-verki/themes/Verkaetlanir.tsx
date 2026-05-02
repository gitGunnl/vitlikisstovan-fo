/**
 * Theme: Verkætlanir — gallery-clean project showcase.
 *
 * Free-form canvas. Replace the placeholder cells with real project content.
 */
export default function Verkaetlanir() {
  const projects = [
    {
      n: "01",
      title: "Sergjørt týðingaramboð",
      kind: "Kunda-arbeiði",
      year: "2025",
      blurb:
        "Eitt amboð, ið týðir donsk skjøl beinleiðis til føroyskt — sniðgivið til ein ávísan kunda.",
      ratio: "aspect-[4/3]",
    },
    {
      n: "02",
      title: "Innanhýsis vitlíkis-assistentur",
      kind: "Egin royndir",
      year: "2025",
      blurb: "Spurnings-svar amboð, ið kennir innanhýsis skjøl og ferlir.",
      ratio: "aspect-[4/3]",
    },
    {
      n: "03",
      title: "Sjálvvirkin frágreiðingaramboð",
      kind: "Kunda-arbeiði",
      year: "2024",
      blurb:
        "Mánaðarligar frágreiðingar gjørdar sjálvvirkandi úr tølum og myndum.",
      ratio: "aspect-[4/3]",
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* Featured project — wide editorial layout */}
      <article className="grid md:grid-cols-12 gap-6 md:gap-10">
        <div className="md:col-span-8">
          <div className="aspect-[16/10] bg-foreground/[0.04] border border-foreground/10 flex items-center justify-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40">
              Útvald · mynd
            </span>
          </div>
        </div>
        <div className="md:col-span-4 flex flex-col">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
            Útvald verkætlan
          </span>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-3 leading-tight">
            Sergjørt týðingaramboð
          </h3>
          <p className="text-sm text-foreground/70 leading-relaxed mt-4">
            Eitt amboð, ið týðir donsk skjøl beinleiðis til føroyskt —
            sniðgivið til ein ávísan kunda. Spurði tíð frá fleiri tímum til
            fáar minuttir.
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-y-3 text-xs border-t border-foreground/10 pt-5">
            <dt className="font-mono uppercase tracking-widest text-foreground/50">Slag</dt>
            <dd className="text-foreground/80">Týðing · LLM</dd>
            <dt className="font-mono uppercase tracking-widest text-foreground/50">Kundi</dt>
            <dd className="text-foreground/80">Sergreinaður</dd>
            <dt className="font-mono uppercase tracking-widest text-foreground/50">Ár</dt>
            <dd className="text-foreground/80">2025</dd>
          </dl>
        </div>
      </article>

      {/* Index list */}
      <section>
        <header className="flex items-baseline justify-between border-b border-foreground/10 pb-3 mb-8">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
            Skrá yvir verkætlanir
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40">
            {String(projects.length).padStart(2, "0")} liðir
          </span>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {projects.map((p) => (
            <article key={p.n} className="group">
              <div className={`${p.ratio} bg-foreground/[0.04] border border-foreground/10 flex items-center justify-center mb-4`}>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                  {p.n}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="text-base font-semibold tracking-tight">{p.title}</h4>
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40 shrink-0">
                  {p.year}
                </span>
              </div>
              <p className="text-xs uppercase tracking-widest font-mono text-foreground/50 mt-1">
                {p.kind}
              </p>
              <p className="text-sm text-foreground/70 leading-relaxed mt-3">
                {p.blurb}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
