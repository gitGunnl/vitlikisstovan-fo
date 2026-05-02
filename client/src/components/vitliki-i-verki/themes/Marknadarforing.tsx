/**
 * Theme: Marknaðarføring
 *
 * Free-form canvas. This placeholder uses a video-embed + before/after layout
 * since marketing work tends to live in those formats. Replace with whatever
 * fits the campaigns / ads / brand work being shown.
 */
export default function Marknadarforing() {
  return (
    <div className="space-y-12">
      <div className="max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Marknaðarføring</h2>
        <p className="text-muted-foreground leading-relaxed">
          Vitlíki nýtt til marknaðarføring — myndir, filmar, tekstir og kampanjur.
        </p>
      </div>

      {/* Video embed strip */}
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i}>
            <div className="aspect-video rounded-xl bg-black flex items-center justify-center text-sm text-white/60">
              [ Filmur {i} — embed kemur her ]
            </div>
            <p className="text-sm font-medium mt-3">Kampanja {i}</p>
            <p className="text-xs text-muted-foreground">
              Stutt lýsing av filmunum og endamáli.
            </p>
          </div>
        ))}
      </div>

      {/* Before / after example */}
      <div>
        <h3 className="text-xl font-bold mb-4">Áður / Nú</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="aspect-[4/3] rounded-xl bg-slate-200 flex items-center justify-center text-sm text-slate-600">
              [ Áður ]
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Upprunaligi tekstur / mynd
            </p>
          </div>
          <div>
            <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-emerald-200 to-teal-300 flex items-center justify-center text-sm text-emerald-900">
              [ Nú — við vitlíki ]
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Eftir vitlíkis-arbeiði
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
