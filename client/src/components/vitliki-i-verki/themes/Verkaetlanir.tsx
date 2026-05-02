/**
 * Theme: Verkætlanir
 *
 * This is a free-form canvas for showing project collections.
 * Replace everything inside the wrapper <div> with whatever layout you want
 * (project story layout, mixed media, case studies, timeline, etc).
 *
 * The only requirement is that the root element keeps the standard wrapper
 * spacing so it lines up with the page frame.
 */
export default function Verkaetlanir() {
  return (
    <div className="space-y-12">
      {/* Intro block */}
      <div className="max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Verkætlanir</h2>
        <p className="text-muted-foreground leading-relaxed">
          Útvaldar verkætlanir frá Vitlíkisstovuni — frá hugskoti til veruleika.
          Hetta er ein blanding av kunda-arbeiði og egnum royndum.
        </p>
      </div>

      {/* Featured project — long-form story layout */}
      <article className="grid md:grid-cols-2 gap-8 items-center bg-muted/30 rounded-2xl p-6 sm:p-10">
        <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-muted-foreground text-sm">
          [ Verkætlan mynd / mockup ]
        </div>
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary mb-3">
            Útvald verkætlan
          </span>
          <h3 className="text-2xl font-bold mb-3">Sergjørt týðingaramboð</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Eitt amboð, ið týðir donsk skjøl beinleiðis til føroyskt — sniðgivið
            til ein ávísan kunda. Spurði tíð frá fleiri tímum til fáar minuttir.
          </p>
          <ul className="text-sm space-y-1.5 text-muted-foreground">
            <li>• Sniðgivið prompt-arkitektur</li>
            <li>• Innbygd málfrøðislig kontroll</li>
            <li>• Brúkt dagliga av kundatoyminum</li>
          </ul>
        </div>
      </article>

      {/* Smaller project cards — varied layout */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border bg-background p-5">
            <div className="aspect-square rounded-lg bg-muted mb-4 flex items-center justify-center text-xs text-muted-foreground">
              [ Mynd {i} ]
            </div>
            <h4 className="font-semibold mb-1">Verkætlan {i}</h4>
            <p className="text-sm text-muted-foreground">
              Stutt lýsing av verkætlanini og hvat hon loysti.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
