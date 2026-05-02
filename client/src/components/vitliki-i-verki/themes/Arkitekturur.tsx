/**
 * Theme: Arkitekturur — clean image-grid gallery.
 * Free-form canvas. Replace placeholder cells with real renders / photos.
 */
export default function Arkitekturur() {
  const items = [
    { n: "01", title: "Føroyskt grasturhús", place: "Eysturoy", ratio: "aspect-[4/5]" },
    { n: "02", title: "Konsept-bygningur",    place: "Tórshavn", ratio: "aspect-square" },
    { n: "03", title: "Innanhús — stova",     place: "Klaksvík", ratio: "aspect-[3/4]" },
    { n: "04", title: "Bygdarmynd",           place: "Mykines",  ratio: "aspect-[4/5]" },
    { n: "05", title: "Tórshavn 2050",        place: "Konsept",  ratio: "aspect-square" },
    { n: "06", title: "Skiss — havnarlag",    place: "Studio",   ratio: "aspect-[3/4]" },
  ];

  return (
    <div className="space-y-12">
      {/* Lead caption */}
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
            Samling
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40 mt-1">
            06 myndir
          </p>
        </div>
        <p className="md:col-span-7 text-base sm:text-lg text-foreground/75 leading-relaxed">
          Vitlíkis-genererað arkitektur — frá føroyskum húsum til framtíðar
          borgir. Allar myndirnar eru gjørdar út frá tekstaskeiðum og
          kelduskjølum.
        </p>
      </div>

      {/* Strict grid gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
        {items.map((item) => (
          <figure
            key={item.n}
            className="bg-background p-4 sm:p-6 flex flex-col"
          >
            <div className={`${item.ratio} bg-foreground/[0.04] flex items-center justify-center mb-4`}>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">
                {item.n}
              </span>
            </div>
            <figcaption className="mt-auto">
              <div className="flex items-baseline justify-between gap-3 border-t border-foreground/10 pt-3">
                <span className="text-sm font-medium tracking-tight">{item.title}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40 shrink-0">
                  {item.n}
                </span>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mt-1">
                {item.place}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
