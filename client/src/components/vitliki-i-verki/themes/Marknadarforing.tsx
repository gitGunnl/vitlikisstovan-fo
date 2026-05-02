/**
 * Theme: Marknaðarføring — campaigns / video / before-after.
 * Free-form canvas. Replace placeholders with real embeds and stills.
 */
export default function Marknadarforing() {
  const films = [
    { n: "01", title: "Kampanja — Heystur 2025", client: "Kundi A", length: "0:30" },
    { n: "02", title: "Brand-filmur",            client: "Kundi B", length: "1:15" },
  ];

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* Films */}
      <section>
        <header className="flex items-baseline justify-between border-b border-foreground/10 pb-3 mb-8">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
            Filmar · útvalt
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40">
            {String(films.length).padStart(2, "0")} liðir
          </span>
        </header>

        <div className="grid md:grid-cols-2 gap-x-6 gap-y-12">
          {films.map((f) => (
            <figure key={f.n}>
              <div className="aspect-video bg-foreground border border-foreground/10 flex items-center justify-center relative">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-background/50 absolute top-3 left-3">
                  {f.n}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-background/50 absolute top-3 right-3">
                  {f.length}
                </span>
                {/* Play glyph */}
                <span className="block w-0 h-0 border-l-[14px] border-l-background border-y-[10px] border-y-transparent ml-1" />
              </div>
              <figcaption className="border-t border-foreground/10 mt-4 pt-3 flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium tracking-tight">{f.title}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 shrink-0">
                  {f.client}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Before / After diptych */}
      <section>
        <header className="flex items-baseline justify-between border-b border-foreground/10 pb-3 mb-8">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
            Áður / Nú · diptychur
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40">
            01
          </span>
        </header>

        <div className="grid sm:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
          <figure className="bg-background p-4 sm:p-6">
            <div className="aspect-[4/3] bg-foreground/[0.04] flex items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">
                Áður
              </span>
            </div>
            <figcaption className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mt-3 border-t border-foreground/10 pt-3">
              Upprunaligi tekstur / mynd
            </figcaption>
          </figure>
          <figure className="bg-background p-4 sm:p-6">
            <div className="aspect-[4/3] bg-foreground/[0.04] flex items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">
                Nú
              </span>
            </div>
            <figcaption className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mt-3 border-t border-foreground/10 pt-3">
              Eftir vitlíkis-arbeiði
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}
