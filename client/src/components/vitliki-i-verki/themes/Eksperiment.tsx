/**
 * Theme: Eksperiment
 *
 * Free-form canvas. Experiments are by nature messy, so this placeholder
 * uses a deliberately mixed-media layout (notes + small previews + quick
 * captions). Replace freely.
 */
export default function Eksperiment() {
  return (
    <div className="space-y-10">
      <div className="max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Eksperiment</h2>
        <p className="text-muted-foreground leading-relaxed">
          Smá royndir og hugskot — ting, ið byrjaðu sum forvitni og bóru
          okkurt í lag. Ikki alt er fullført; tað er meiningin.
        </p>
      </div>

      {/* Lab notes — mixed sizes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { span: "col-span-2 row-span-2", label: "Stór royn", aspect: "aspect-square" },
          { span: "", label: "Smá royn", aspect: "aspect-square" },
          { span: "", label: "Hugskot", aspect: "aspect-square" },
          { span: "col-span-2", label: "Filmsroynd", aspect: "aspect-video" },
          { span: "", label: "Próva", aspect: "aspect-square" },
          { span: "", label: "Skiss", aspect: "aspect-square" },
        ].map((item, i) => (
          <div key={i} className={item.span}>
            <div
              className={`${item.aspect} rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-xs text-muted-foreground`}
            >
              [ {item.label} ]
            </div>
          </div>
        ))}
      </div>

      {/* Quick notes block */}
      <div className="rounded-2xl border border-dashed bg-muted/20 p-6">
        <h3 className="font-semibold mb-3">Sniðir / viðmerkingar</h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>• Hetta er staður fyri stutt sniðir um royndirnar.</li>
          <li>• Hvat virkaði? Hvat virkaði ikki?</li>
          <li>• Tilvísingar til amboð, prompt, ella kelduskjøl.</li>
        </ul>
      </div>
    </div>
  );
}
