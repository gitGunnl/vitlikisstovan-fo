/**
 * Theme: Arkitekturur
 *
 * Free-form canvas. This placeholder uses an image gallery layout —
 * but feel free to swap it for whatever fits the architecture work
 * (before/after, concept boards, 3D renders, sketch comparisons, etc).
 */
export default function Arkitekturur() {
  return (
    <div className="space-y-10">
      <div className="max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Arkitekturur</h2>
        <p className="text-muted-foreground leading-relaxed">
          Vitlíkis-genererað arkitektur-myndir, hugskot og konsept. Frá
          føroyskum húsum til framtíðar borgir.
        </p>
      </div>

      {/* Masonry-style gallery */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {[
          { ratio: "aspect-[4/5]", label: "Føroyskt grasturhús" },
          { ratio: "aspect-square", label: "Konsept-bygningur" },
          { ratio: "aspect-[3/4]", label: "Innanhús" },
          { ratio: "aspect-video", label: "Bygdarmynd" },
          { ratio: "aspect-[4/5]", label: "Tórshavn 2050" },
          { ratio: "aspect-square", label: "Skiss" },
        ].map((item, i) => (
          <div key={i} className="break-inside-avoid">
            <div
              className={`${item.ratio} rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-xs text-slate-600`}
            >
              [ {item.label} ]
            </div>
            <p className="text-xs text-muted-foreground mt-2 px-1">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
