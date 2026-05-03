import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Theme: Eksperiment — GENERATIVE / GLITCH.
 *
 * The lab. Tiles get random tilts on mount, the cursor leaves a noisy trail,
 * a fake terminal logs experiments, and clicking the GLITCH button briefly
 * shatters the layout. Reroll randomizes everything.
 */

type Cell = {
  n: string;
  label: string;
  rot: number;
  hueShift: number;
  size: "lg" | "md" | "sm" | "wide";
};

const baseCells: Omit<Cell, "rot" | "hueShift">[] = [
  { n: "01", label: "Stór royn",    size: "lg"   },
  { n: "02", label: "Smá royn",     size: "sm"   },
  { n: "03", label: "Hugskot",      size: "sm"   },
  { n: "04", label: "Filmsroynd",   size: "wide" },
  { n: "05", label: "Próva",        size: "md"   },
  { n: "06", label: "Skiss",        size: "sm"   },
  { n: "07", label: "Stutt sniðing", size: "sm"  },
  { n: "08", label: "Týðing",       size: "md"  },
];

const sizeClass: Record<Cell["size"], string> = {
  lg:   "col-span-2 row-span-2 aspect-square",
  md:   "col-span-1 row-span-1 aspect-square",
  sm:   "col-span-1 row-span-1 aspect-square",
  wide: "col-span-2 row-span-1 aspect-[2/1]",
};

function rand(seed: number) {
  // Lightweight deterministic PRNG so SSR / hydration matches first paint
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function buildCells(seed: number): Cell[] {
  return baseCells.map((c, i) => ({
    ...c,
    rot: (rand(seed + i) - 0.5) * 4, // -2 .. 2 deg
    hueShift: Math.floor(rand(seed * 3 + i) * 360),
  }));
}

export default function Eksperiment() {
  const [seed, setSeed] = useState(42);
  const cells = useMemo(() => buildCells(seed), [seed]);

  // Cursor noise trail
  const trailRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState({ x: -100, y: -100, on: false });

  // Glitch flash
  const [glitch, setGlitch] = useState(false);
  const triggerGlitch = () => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 700);
  };

  // Fake terminal log
  const [log, setLog] = useState<string[]>([
    "$ vitliki run experiments --batch 8",
    "init: seeding noise field…",
    "ok: 8 candidates generated",
    "warn: cell 04 deviated +18σ",
    "info: ready",
  ]);
  useEffect(() => {
    const lines = [
      "tick: re-rolling tiles",
      "ok: hue field rotated",
      "diff: layout entropy +0.31",
      "info: cursor noise enabled",
      "warn: experimental — may cause vertigo",
    ];
    const t = setInterval(() => {
      setLog((l) => [...l.slice(-7), lines[Math.floor(Math.random() * lines.length)]]);
    }, 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-12">
      {/* Lab toolbar */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-foreground/10 pb-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
            LAB · sandbox / volatile
          </div>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-2">
            Royndar-blað <span className="font-mono text-foreground/40">#{seed.toString(16).toUpperCase()}</span>
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSeed((s) => Math.floor(Math.random() * 1e6))}
            data-testid="reroll"
            className="font-mono text-[10px] uppercase tracking-widest border border-foreground/20 px-3 py-2 hover:bg-foreground hover:text-background transition-colors"
          >
            ↻ Reroll
          </button>
          <button
            type="button"
            onClick={triggerGlitch}
            data-testid="glitch"
            className="font-mono text-[10px] uppercase tracking-widest border border-foreground px-3 py-2 bg-foreground text-background hover:opacity-80 transition-opacity"
          >
            ⚡ Glitch
          </button>
        </div>
      </div>

      {/* Generative grid */}
      <div
        ref={trailRef}
        onMouseMove={(e) => {
          const r = trailRef.current!.getBoundingClientRect();
          setHover({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
        }}
        onMouseLeave={() => setHover((h) => ({ ...h, on: false }))}
        className={`relative grid grid-cols-4 auto-rows-[minmax(0,1fr)] gap-px bg-foreground/10 border border-foreground/10 transition-transform duration-200 motion-reduce:!animate-none ${
          glitch ? "animate-[shake_0.35s_steps(6,end)_infinite]" : ""
        }`}
      >
        {cells.map((c) => (
          <figure
            key={c.n + seed}
            className={`relative bg-background p-3 sm:p-4 transition-transform duration-300 ${sizeClass[c.size]}`}
            style={{ transform: `rotate(${c.rot}deg)` }}
            data-testid={`cell-${c.n}`}
          >
            <div
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              style={{
                background: `conic-gradient(from ${c.hueShift}deg at 50% 50%, hsl(${c.hueShift}, 70%, 60%) 0%, hsl(${(c.hueShift + 90) % 360}, 70%, 50%) 25%, hsl(${(c.hueShift + 180) % 360}, 70%, 55%) 50%, hsl(${(c.hueShift + 270) % 360}, 70%, 50%) 75%, hsl(${c.hueShift}, 70%, 60%) 100%)`,
                filter: glitch ? "hue-rotate(90deg) contrast(1.4)" : undefined,
              }}
            >
              <div className="absolute inset-0 mix-blend-overlay opacity-40 [background-image:repeating-linear-gradient(90deg,transparent_0_3px,rgba(0,0,0,0.4)_3px_4px)]" />
              <div className="absolute inset-0 [background-image:repeating-linear-gradient(0deg,transparent_0_2px,rgba(255,255,255,0.06)_2px_3px)]" />
              <span className="absolute top-2 left-2 font-mono text-[10px] uppercase tracking-widest text-white/90 mix-blend-difference">
                {c.n}
              </span>
              <span className="absolute bottom-2 right-2 font-mono text-[10px] uppercase tracking-widest text-white/90 mix-blend-difference tabular-nums">
                h{c.hueShift}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white mix-blend-difference text-center px-2">
                {c.label}
              </span>
            </div>
          </figure>
        ))}

        {/* Cursor noise */}
        {hover.on && (
          <div
            className="pointer-events-none absolute w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference"
            style={{
              left: hover.x,
              top: hover.y,
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.6), transparent 70%)",
            }}
          />
        )}
      </div>

      {/* ASCII + terminal log */}
      <section className="grid md:grid-cols-12 gap-6 md:gap-10">
        <div className="md:col-span-5">
          <pre className="font-mono text-[10px] leading-[1.05] text-foreground/80 select-none whitespace-pre overflow-hidden">
{`  ▄▄▄▄▄  
 ░██████ 
 ░██  ██   v i t l í k i
 ░██████   - - - - - - -
 ░██░░██   l a b  /  no.${String(seed).slice(-3)}
 ░██████   
  ▀▀▀▀   `}
          </pre>
          <p className="text-sm text-foreground/70 leading-relaxed mt-6 max-w-prose">
            Henda síða er ein royndarstovan. Allar form, litir og legur
            broytast við hvørjum reroll. Kannast — ikki kanna.
          </p>
        </div>

        <div className="md:col-span-7">
          <div className="bg-foreground text-background font-mono text-[11px] leading-relaxed p-4 sm:p-5 h-full min-h-[16rem]">
            <div className="flex items-center justify-between border-b border-background/20 pb-2 mb-3 uppercase tracking-widest text-[10px] opacity-70">
              <span>vitliki@lab — bash</span>
              <span>● ● ●</span>
            </div>
            {log.map((line, i) => (
              <div
                key={i}
                className={
                  line.startsWith("warn")
                    ? "text-amber-300"
                    : line.startsWith("ok")
                    ? "text-emerald-300"
                    : line.startsWith("$")
                    ? "text-background"
                    : "opacity-80"
                }
              >
                {line}
              </div>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <span className="opacity-70">$</span>
              <span className="w-2 h-3 bg-background animate-[blink_1s_steps(2,end)_infinite] motion-reduce:animate-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto note */}
      <section className="border-t border-foreground/10 pt-10">
        <p className="font-serif italic text-2xl sm:text-3xl leading-snug max-w-3xl">
          “Hetta er eitt opið rúm. Her vinna vit ikki — vit royna. Tað, sum
          ikki riggar, er júst tað, sum lærir okkum mest.”
        </p>
        <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mt-4">
          — vitlíki.fo · lab notes
        </div>
      </section>

      <style>{`
        @keyframes shake {
          0%   { transform: translate(0, 0) skewX(0); }
          20%  { transform: translate(-3px, 1px) skewX(-1deg); }
          40%  { transform: translate(2px, -2px) skewX(0.5deg); }
          60%  { transform: translate(-1px, 2px) skewX(-0.5deg); }
          80%  { transform: translate(2px, 1px) skewX(1deg); }
          100% { transform: translate(0, 0) skewX(0); }
        }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}
