/**
 * Theme: Eksperiment — lab notes / contact-sheet style.
 * Free-form canvas. Mix tile sizes; replace placeholders with real work.
 */
export default function Eksperiment() {
  const cells = [
    { n: "01", label: "Stór royn",   span: "col-span-2 row-span-2", aspect: "aspect-square" },
    { n: "02", label: "Smá royn",    span: "",                       aspect: "aspect-square" },
    { n: "03", label: "Hugskot",     span: "",                       aspect: "aspect-square" },
    { n: "04", label: "Filmsroynd",  span: "col-span-2",             aspect: "aspect-video" },
    { n: "05", label: "Próva",       span: "",                       aspect: "aspect-square" },
    { n: "06", label: "Skiss",       span: "",                       aspect: "aspect-square" },
  ];

  const notes = [
    { n: "A", text: "Hetta er staður fyri stutt sniðir um royndirnar." },
    { n: "B", text: "Hvat virkaði? Hvat virkaði ikki?" },
    { n: "C", text: "Tilvísingar til amboð, prompt, ella kelduskjøl." },
  ];

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Contact-sheet grid */}
      <section>
        <header className="flex items-baseline justify-between border-b border-foreground/10 pb-3 mb-8">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
            Royndar-blað · 01
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40">
            {String(cells.length).padStart(2, "0")} liðir
          </span>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
          {cells.map((c) => (
            <figure key={c.n} className={`${c.span} bg-background p-3 sm:p-4`}>
              <div className={`${c.aspect} bg-foreground/[0.04] flex items-center justify-center relative`}>
                <span className="absolute top-2 left-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                  {c.n}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">
                  {c.label}
                </span>
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* Notes */}
      <section className="grid md:grid-cols-12 gap-6 md:gap-10 border-t border-foreground/10 pt-10">
        <div className="md:col-span-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
            Sniðir
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40 mt-1">
            Viðmerkingar
          </p>
        </div>
        <ul className="md:col-span-9 divide-y divide-foreground/10 border-t border-b border-foreground/10">
          {notes.map((note) => (
            <li key={note.n} className="grid grid-cols-12 gap-4 py-4 items-baseline">
              <span className="col-span-2 sm:col-span-1 font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                {note.n}
              </span>
              <p className="col-span-10 sm:col-span-11 text-sm text-foreground/75 leading-relaxed">
                {note.text}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
