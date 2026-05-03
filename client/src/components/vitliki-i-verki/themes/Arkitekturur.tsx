import { useEffect, useRef, useState } from "react";

/**
 * Theme: Arkitekturur — BLUEPRINT.
 *
 * Architectural-drafting aesthetic: graph-paper background, dimension lines
 * with ticks, north-arrow compass, scale bar, mouse-tracked parallax on the
 * featured render, and a Plan / Elevation toggle.
 */

type Render = {
  n: string;
  title: string;
  place: string;
  ratio: string;
  meters: string;
};

const items: Render[] = [
  { n: "01", title: "Føroyskt grasturhús", place: "Eysturoy", ratio: "aspect-[4/5]", meters: "12 × 18 m" },
  { n: "02", title: "Konsept-bygningur",    place: "Tórshavn", ratio: "aspect-square", meters: "20 × 20 m" },
  { n: "03", title: "Innanhús — stova",     place: "Klaksvík", ratio: "aspect-[3/4]", meters: "6 × 9 m"   },
  { n: "04", title: "Bygdarmynd",           place: "Mykines",  ratio: "aspect-[4/5]", meters: "—"        },
  { n: "05", title: "Tórshavn 2050",        place: "Konsept",  ratio: "aspect-square", meters: "—"        },
  { n: "06", title: "Skiss — havnarlag",    place: "Studio",   ratio: "aspect-[3/4]", meters: "—"        },
];

function DimLine({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
      <span className="w-2 h-px bg-foreground/40" />
      <span className="flex-1 h-px bg-foreground/20 relative">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-2 bg-foreground/40" />
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-2 bg-foreground/40" />
      </span>
      <span>{label}</span>
      <span className="flex-1 h-px bg-foreground/20 relative">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-2 bg-foreground/40" />
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-2 bg-foreground/40" />
      </span>
      <span className="w-2 h-px bg-foreground/40" />
    </div>
  );
}

export default function Arkitekturur() {
  const featRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [view, setView] = useState<"plan" | "elev">("plan");

  useEffect(() => {
    const el = featRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      setTilt({ x: cx, y: cy });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Background grid pattern as inline data URL (subtle graph paper)
  const grid =
    "[background-image:linear-gradient(to_right,rgba(127,127,127,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(127,127,127,0.18)_1px,transparent_1px),linear-gradient(to_right,rgba(127,127,127,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(127,127,127,0.08)_1px,transparent_1px)] [background-size:80px_80px,80px_80px,16px_16px,16px_16px]";

  return (
    <div className="space-y-16">
      {/* Drafting toolbar */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-foreground/15 pb-4">
        <div className="space-y-1">
          <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
            DRAWING SHEET · A1 / 1:200
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
            STUDIO · vitlíki.fo · 2026
          </div>
        </div>
        <div className="flex items-center gap-6">
          {/* Scale bar */}
          <div className="flex items-end gap-2">
            <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">SCALE</div>
            <div className="flex h-2 border border-foreground/40">
              <span className="w-6 bg-foreground" />
              <span className="w-6" />
              <span className="w-6 bg-foreground" />
              <span className="w-6" />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">0 · 5 · 10 m</div>
          </div>
          {/* North compass */}
          <div className="relative w-10 h-10 border border-foreground/40 rounded-full">
            <span className="absolute left-1/2 -translate-x-1/2 -top-1.5 font-mono text-[9px] uppercase tracking-widest text-foreground/70">N</span>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full w-px h-4 bg-foreground" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 w-px h-3 bg-foreground/30" />
          </div>
          {/* View toggle — segmented control */}
          <div
            role="group"
            aria-label="Drawing view"
            className="flex border border-foreground/30 font-mono text-[10px] uppercase tracking-widest"
          >
            <button
              type="button"
              aria-pressed={view === "plan"}
              onClick={() => setView("plan")}
              className={`px-3 py-1.5 transition-colors ${view === "plan" ? "bg-foreground text-background" : "hover:bg-foreground/5"}`}
              data-testid="view-plan"
            >
              PLAN
            </button>
            <button
              type="button"
              aria-pressed={view === "elev"}
              onClick={() => setView("elev")}
              className={`px-3 py-1.5 border-l border-foreground/30 transition-colors ${view === "elev" ? "bg-foreground text-background" : "hover:bg-foreground/5"}`}
              data-testid="view-elev"
            >
              ELEVATION
            </button>
          </div>
        </div>
      </div>

      {/* Featured render — parallax over graph paper */}
      <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-end">
        <div className="md:col-span-3 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">SHEET 01 / 06</div>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
            Føroyskt
            <br />
            grasturhús.
          </h3>
          <p className="text-sm text-foreground/70 leading-relaxed mt-3">
            Vitlíkis-genererað arkitektur. Tekstaskeið → 3D → endurgerð.
          </p>
        </div>

        <div className="md:col-span-9 space-y-3">
          <DimLine label="12 000 mm" />
          <div
            ref={featRef}
            className={`relative aspect-[16/9] border border-foreground/30 ${grid} overflow-hidden cursor-crosshair`}
            style={{ perspective: "1200px" }}
            data-testid="featured-render"
          >
            <div
              className="absolute inset-0 transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${tilt.y * -6}deg) rotateY(${tilt.x * 6}deg) scale(1.02)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Faux floor plan / elevation lines */}
              {view === "plan" ? (
                <svg viewBox="0 0 400 225" className="w-full h-full" preserveAspectRatio="none">
                  <g stroke="currentColor" strokeWidth="0.6" fill="none" className="text-foreground/70">
                    <rect x="40" y="40" width="320" height="145" />
                    <rect x="60" y="60" width="120" height="105" />
                    <rect x="200" y="60" width="140" height="50" />
                    <rect x="200" y="125" width="140" height="40" />
                    <line x1="40" y1="100" x2="60" y2="100" />
                    <line x1="340" y1="100" x2="360" y2="100" />
                    <circle cx="120" cy="112" r="14" strokeDasharray="2 2" />
                  </g>
                  <g stroke="currentColor" strokeWidth="0.4" className="text-foreground/40">
                    <line x1="40" y1="20" x2="360" y2="20" />
                    <line x1="40" y1="16" x2="40" y2="24" />
                    <line x1="360" y1="16" x2="360" y2="24" />
                  </g>
                </svg>
              ) : (
                <svg viewBox="0 0 400 225" className="w-full h-full" preserveAspectRatio="none">
                  <g stroke="currentColor" strokeWidth="0.6" fill="none" className="text-foreground/70">
                    <polygon points="40,170 200,70 360,170" />
                    <line x1="40" y1="170" x2="360" y2="170" />
                    <rect x="80" y="120" width="40" height="50" />
                    <rect x="160" y="110" width="80" height="60" />
                    <rect x="280" y="120" width="40" height="50" />
                    <line x1="180" y1="170" x2="180" y2="200" strokeDasharray="2 2" />
                  </g>
                </svg>
              )}
            </div>
            <div className="absolute top-2 left-2 font-mono text-[10px] uppercase tracking-widest text-foreground/60 pointer-events-none">
              {view === "plan" ? "PLAN · 1:200" : "ELEVATION · S"}
            </div>
            <div className="absolute bottom-2 right-2 font-mono text-[10px] uppercase tracking-widest text-foreground/60 pointer-events-none tabular-nums">
              X {(tilt.x * 100).toFixed(0)} / Y {(tilt.y * 100).toFixed(0)}
            </div>
          </div>
          <DimLine label="18 000 mm" />
        </div>
      </div>

      {/* Sheet index — drafting cards */}
      <section className="space-y-6">
        <header className="flex items-baseline justify-between border-b border-foreground/15 pb-3">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
            Sheet index · {String(items.length).padStart(2, "0")} drawings
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
            REV · A
          </span>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-foreground/15 border border-foreground/15">
          {items.map((it) => (
            <figure
              key={it.n}
              className={`bg-background p-4 sm:p-5 flex flex-col group`}
            >
              <div className={`relative ${it.ratio} border border-foreground/30 ${grid} overflow-hidden`}>
                <span className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-widest text-foreground/60">
                  SH · {it.n}
                </span>
                <span className="absolute bottom-2 right-2 font-mono text-[9px] uppercase tracking-widest text-foreground/60">
                  {it.meters}
                </span>
                {/* corner ticks */}
                <span className="absolute top-0 left-0 w-3 h-px bg-foreground" />
                <span className="absolute top-0 left-0 w-px h-3 bg-foreground" />
                <span className="absolute top-0 right-0 w-3 h-px bg-foreground" />
                <span className="absolute top-0 right-0 w-px h-3 bg-foreground" />
                <span className="absolute bottom-0 left-0 w-3 h-px bg-foreground" />
                <span className="absolute bottom-0 left-0 w-px h-3 bg-foreground" />
                <span className="absolute bottom-0 right-0 w-3 h-px bg-foreground" />
                <span className="absolute bottom-0 right-0 w-px h-3 bg-foreground" />
              </div>
              <figcaption className="mt-4 border-t border-foreground/15 pt-3 flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium tracking-tight">{it.title}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 shrink-0">
                  {it.place}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Title block — like a real drawing */}
      <div className="grid grid-cols-12 border border-foreground/30 font-mono text-[10px] uppercase tracking-widest">
        <div className="col-span-3 p-3 border-r border-foreground/30">
          <div className="text-foreground/50">PROJECT</div>
          <div className="text-foreground mt-1">Vitlíki í verki — Arkitekturur</div>
        </div>
        <div className="col-span-3 p-3 border-r border-foreground/30">
          <div className="text-foreground/50">DRAWN</div>
          <div className="text-foreground mt-1">vitlíki.fo</div>
        </div>
        <div className="col-span-2 p-3 border-r border-foreground/30">
          <div className="text-foreground/50">SCALE</div>
          <div className="text-foreground mt-1">1:200</div>
        </div>
        <div className="col-span-2 p-3 border-r border-foreground/30">
          <div className="text-foreground/50">SHEET</div>
          <div className="text-foreground mt-1">02 / 05</div>
        </div>
        <div className="col-span-2 p-3">
          <div className="text-foreground/50">REV</div>
          <div className="text-foreground mt-1">A · 2026</div>
        </div>
      </div>
    </div>
  );
}
