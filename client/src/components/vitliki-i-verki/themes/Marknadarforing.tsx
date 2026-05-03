import { useEffect, useRef, useState } from "react";

/**
 * Theme: Marknaðarføring — POSTER / SWISS-BOLD.
 *
 * Loud color blocks, oversized display type, scrolling marquee with stats,
 * a draggable interactive before/after slider, and an auto-rotating campaign
 * showcase that lives at the top of the section.
 */

type Film = {
  n: string;
  title: string;
  client: string;
  length: string;
  tag: string;
};

const films: Film[] = [
  { n: "01", title: "Heystur 2025", client: "Kundi A", length: "0:30", tag: "TVC" },
  { n: "02", title: "Brand-filmur", client: "Kundi B", length: "1:15", tag: "BRAND" },
  { n: "03", title: "Sosialur",     client: "Kundi C", length: "0:15", tag: "SOCIAL" },
];

const stats = [
  { k: "+312%", v: "Engagement" },
  { k: "9 dgr", v: "Frá idé til film" },
  { k: "27", v: "Útgivnar kampanjur" },
  { k: "1.4M", v: "Sjónir á sosialum" },
];

export default function Marknadarforing() {
  // Auto-rotate hero campaign
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % films.length), 3500);
    return () => clearInterval(t);
  }, []);

  // Before/After slider
  const [split, setSplit] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef(false);

  useEffect(() => {
    const onMove = (clientX: number) => {
      const el = sliderRef.current;
      if (!el || !dragRef.current) return;
      const r = el.getBoundingClientRect();
      const pct = ((clientX - r.left) / r.width) * 100;
      setSplit(Math.max(0, Math.min(100, pct)));
    };
    const onMouseMove = (e: MouseEvent) => onMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => onMove(e.touches[0].clientX);
    const stop = () => (dragRef.current = false);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stop);
    };
  }, []);

  const onSliderKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setSplit((s) => Math.max(0, s - step));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setSplit((s) => Math.min(100, s + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSplit(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSplit(100);
    }
  };

  return (
    <div className="space-y-16">
      {/* HERO — color block poster */}
      <section className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="relative bg-[#FF4A1C] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20 mix-blend-overlay [background-image:radial-gradient(circle_at_20%_30%,white_0,transparent_50%),radial-gradient(circle_at_80%_70%,white_0,transparent_60%)]" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-80">
                Útvald kampanja · {String(active + 1).padStart(2, "0")} / {String(films.length).padStart(2, "0")}
              </div>
              <h3 className="mt-6 text-[14vw] md:text-[9rem] font-bold tracking-[-0.04em] leading-[0.85]">
                {films[active].title.toUpperCase().split(" ").map((w, i) => (
                  <span key={i} className="block">
                    {w}
                  </span>
                ))}
              </h3>
              <div className="mt-8 flex flex-wrap gap-3">
                {films.map((f, i) => (
                  <button
                    key={f.n}
                    onClick={() => setActive(i)}
                    data-testid={`hero-${f.n}`}
                    className={`font-mono text-[10px] uppercase tracking-widest border px-3 py-1.5 transition-colors ${
                      i === active
                        ? "bg-white text-[#FF4A1C] border-white"
                        : "border-white/40 hover:border-white"
                    }`}
                  >
                    {f.n} · {f.tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col justify-end gap-4">
              <div className="aspect-video bg-black border border-white/30 relative flex items-center justify-center">
                <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest opacity-70">
                  {films[active].n}
                </span>
                <span className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest opacity-70">
                  {films[active].length}
                </span>
                <span className="block w-0 h-0 border-l-[20px] border-l-white border-y-[14px] border-y-transparent ml-1" />
              </div>
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest opacity-80">
                <span>KUNDI · {films[active].client}</span>
                <span>{films[active].tag}</span>
              </div>
            </div>
          </div>

          {/* Marquee */}
          <div className="relative border-t border-white/30 py-4 overflow-hidden whitespace-nowrap font-mono text-xs uppercase tracking-[0.25em]">
            <div className="inline-block animate-[mkmarquee_30s_linear_infinite] motion-reduce:animate-none">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i}>
                  {"  ★  "}MARKNAÐARFØRING{"  ★  "}KAMPANJUR{"  ★  "}FILMAR{"  ★  "}BRAND{"  ★  "}SOCIAL{"  ★  "}vitlíki.fo
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats grid — bold blocks */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
        {stats.map((s, i) => (
          <div
            key={s.k}
            className={`p-6 sm:p-8 ${
              i % 2 === 0 ? "bg-foreground text-background" : "bg-background"
            }`}
          >
            <div className="text-3xl sm:text-5xl font-bold tracking-tight leading-none">
              {s.k}
            </div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-widest opacity-70">
              {s.v}
            </div>
          </div>
        ))}
      </section>

      {/* Before / After draggable slider */}
      <section>
        <header className="flex items-baseline justify-between border-b border-foreground/10 pb-3 mb-6">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
            Áður / Nú · drag handil
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40 tabular-nums">
            {Math.round(split)} / 100
          </span>
        </header>

        <div
          ref={sliderRef}
          className="relative aspect-[16/9] border border-foreground/20 overflow-hidden select-none touch-none"
          data-testid="ba-slider"
        >
          {/* AFTER (full layer) */}
          <div className="absolute inset-0 bg-[#FF4A1C] text-white flex items-center justify-center">
            <div className="text-center">
              <div className="font-mono text-[10px] uppercase tracking-widest opacity-80">NÚ</div>
              <div className="text-5xl sm:text-7xl font-bold tracking-tight mt-2">
                EFTIR.
              </div>
            </div>
          </div>
          {/* BEFORE (clipped) */}
          <div
            className="absolute inset-0 bg-foreground/[0.06] text-foreground flex items-center justify-center overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
          >
            <div className="text-center">
              <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">ÁÐUR</div>
              <div className="text-5xl sm:text-7xl font-bold tracking-tight mt-2 text-foreground/60">
                ÁÐUR.
              </div>
            </div>
          </div>
          {/* Handle */}
          <div
            className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.4)] pointer-events-none"
            style={{ left: `${split}%` }}
          />
          <div
            role="slider"
            tabIndex={0}
            aria-label="Áður / Nú handil"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(split)}
            aria-valuetext={`${Math.round(split)} prosent eftir`}
            onKeyDown={onSliderKey}
            onMouseDown={() => (dragRef.current = true)}
            onTouchStart={() => (dragRef.current = true)}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg cursor-ew-resize focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
            style={{ left: `${split}%` }}
            data-testid="ba-handle"
          >
            <span className="font-mono text-xs">⇆</span>
          </div>
        </div>
      </section>

      {/* Films index */}
      <section>
        <header className="flex items-baseline justify-between border-b border-foreground/10 pb-3 mb-6">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
            Allir filmar
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40">
            {String(films.length).padStart(2, "0")} liðir
          </span>
        </header>
        <ul className="divide-y divide-foreground/10 border-b border-foreground/10">
          {films.map((f) => (
            <li
              key={f.n}
              className="grid grid-cols-12 gap-4 py-5 items-baseline hover:bg-foreground/[0.03] -mx-2 px-2 transition-colors"
            >
              <span className="col-span-2 sm:col-span-1 font-mono text-[10px] uppercase tracking-widest text-foreground/50 tabular-nums">
                {f.n}
              </span>
              <span className="col-span-6 sm:col-span-6 text-xl sm:text-2xl font-bold tracking-tight">
                {f.title}
              </span>
              <span className="hidden sm:block sm:col-span-2 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                {f.tag}
              </span>
              <span className="col-span-2 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                {f.client}
              </span>
              <span className="col-span-2 sm:col-span-1 text-right font-mono text-[10px] uppercase tracking-widest text-foreground/50 tabular-nums">
                {f.length}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <style>{`
        @keyframes mkmarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
