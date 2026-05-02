/**
 * Theme: Føroysk søga — narrative gallery layout.
 * Free-form canvas. Mix audio, text and stills.
 */
export default function ForoyskSoga() {
  return (
    <div className="space-y-20 sm:space-y-28">
      {/* Featured podcast — clean horizontal split */}
      <article className="grid md:grid-cols-12 gap-6 md:gap-10 border-t border-b border-foreground/10 py-10 sm:py-14">
        <div className="md:col-span-5">
          <div className="aspect-square bg-foreground/[0.04] border border-foreground/10 flex items-center justify-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40">
              Poddvarp · cover
            </span>
          </div>
        </div>
        <div className="md:col-span-7 flex flex-col">
          <div className="flex items-baseline justify-between border-b border-foreground/10 pb-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
              Poddvarp · Episodi 01
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40">
              28 min
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-5 leading-tight">
            Søgur úr Føroyum
          </h3>
          <p className="text-sm text-foreground/70 leading-relaxed mt-4 max-w-prose">
            Ein løta úr søgu Føroya, frásøgd av vitlíkis-rødd. Sniðgivið út
            frá sögumiðum, gomlum tekningum og tekstum.
          </p>

          {/* Minimal player placeholder */}
          <div className="mt-auto pt-8">
            <div className="flex items-center gap-4 border-t border-foreground/10 pt-4">
              <button
                type="button"
                aria-label="Spæl"
                className="w-10 h-10 border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              >
                <span className="block w-0 h-0 border-l-[6px] border-l-current border-y-[5px] border-y-transparent ml-0.5" />
              </button>
              <div className="flex-1">
                <div className="h-px bg-foreground/15 relative">
                  <div className="absolute left-0 top-0 h-px w-1/3 bg-foreground" />
                </div>
                <div className="flex justify-between mt-2 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                  <span>00:00</span>
                  <span>28:14</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Story block — image left, long text right */}
      <article className="grid md:grid-cols-12 gap-6 md:gap-10">
        <div className="md:col-span-5">
          <div className="aspect-[4/5] bg-foreground/[0.04] border border-foreground/10 flex items-center justify-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
              Søgu-mynd · 02
            </span>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mt-3">
            Tórshavn · ca. 1820
          </p>
        </div>
        <div className="md:col-span-7">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
            Frásøgn · 02
          </span>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-3 leading-tight">
            Tórshavn í 1800-talinum
          </h3>
          <div className="mt-6 space-y-4 text-sm sm:text-base text-foreground/75 leading-relaxed max-w-prose">
            <p>
              Eitt vitlíkis-rekonstrueraði sjónarmið av Tórshavn, sum hon
              helst sá út fyri tvey hundrað árum síðani.
            </p>
            <p>
              Myndirnar eru gjørdar út frá sögumiðum, gomlum tekningum og
              tekstum, og tær eru saman settar til eina heildarmynd.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
