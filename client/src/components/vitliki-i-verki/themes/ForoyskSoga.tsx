/**
 * Theme: Føroysk søga
 *
 * Free-form canvas. This placeholder mixes podcast/audio embeds with
 * text + images, since Faroese history work tends to be narrative.
 * Replace freely with whatever fits the story you want to tell.
 */
export default function ForoyskSoga() {
  return (
    <div className="space-y-12">
      <div className="max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Føroysk søga</h2>
        <p className="text-muted-foreground leading-relaxed">
          Sagnir úr Føroyum, frásagdar við hjálp av vitlíki — frá víkingatíð
          til nútíð. Tekstur, ljóð og myndir.
        </p>
      </div>

      {/* Featured podcast / audio block */}
      <div className="rounded-2xl border bg-gradient-to-br from-purple-50 to-indigo-50 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-full sm:w-48 aspect-square rounded-xl bg-gradient-to-br from-purple-300 to-indigo-400 flex items-center justify-center text-white text-sm shrink-0">
            [ Poddvarp mynd ]
          </div>
          <div className="flex-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-700">
              Poddvarp
            </span>
            <h3 className="text-xl font-bold mt-1 mb-2">
              Søgur úr Føroyum — episodi 1
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ein løta úr søgu Føroya, frásøgd av vitlíkis-rødd.
            </p>
            {/* Audio placeholder — replace with real <audio> or embed */}
            <div className="h-12 rounded-lg bg-white/60 border border-purple-200 flex items-center justify-center text-xs text-muted-foreground">
              [ ljóð-spælari kemur her ]
            </div>
          </div>
        </div>
      </div>

      {/* Text + image story block */}
      <article className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-start">
        <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center text-sm text-amber-900">
          [ Søgu-mynd ]
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">Tórshavn í 1800-talinum</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Eitt vitlíkis-rekonstrueraði sjónarmið av Tórshavn, sum hon helst
            sá út fyri tvey hundrað árum síðani.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Myndirnar eru gjørdar út frá sögumiðum, gomlum tekningum og
            tekstum, og tær eru saman settar til eina heildarmynd.
          </p>
        </div>
      </article>
    </div>
  );
}
