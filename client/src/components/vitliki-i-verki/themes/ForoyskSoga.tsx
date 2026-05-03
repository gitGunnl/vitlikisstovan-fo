import { useEffect, useState } from "react";

/**
 * Theme: Føroysk søga — ARCHIVE / MANUSCRIPT.
 *
 * Sepia-toned archive vibe: faux scan-grain, draggable timeline scrubber that
 * highlights story cards by year, an animated SVG audio waveform tied to a
 * play/pause state, and marginalia annotations down the side.
 */

type Story = {
  n: string;
  year: number;
  title: string;
  place: string;
  body: string;
  marginalia: string;
};

const stories: Story[] = [
  {
    n: "01",
    year: 1820,
    title: "Tórshavn í 1800-talinum",
    place: "Tórshavn",
    body:
      "Eitt vitlíkis-rekonstrueraði sjónarmið av Tórshavn, sum hon helst sá út fyri tvey hundrað árum síðani. Myndirnar eru gjørdar út frá sögumiðum, gomlum tekningum og tekstum.",
    marginalia: "Vísir til vatnlitamynd hjá Born, ca. 1819.",
  },
  {
    n: "02",
    year: 1900,
    title: "Skipasigling og handil",
    place: "Klaksvík",
    body:
      "Vitlíki sermerkir handilsskip í Klaksvíkar havn um aldarskifti — bygt á gomlum ljósmyndum og toll-skjølum.",
    marginalia: "Sí: Føroya Landsskjalasavn, kassi 14.",
  },
  {
    n: "03",
    year: 1946,
    title: "Eftir kríggið",
    place: "Føroyar",
    body:
      "Sniðir um lívið rætt eftir tað seinna heimskríggið, frásøgd av vitlíkis-rødd út frá samtíðar rithøvundum.",
    marginalia: "Hoyrljóð: blanda av notum úr fimm bløðum.",
  },
];

function Waveform({ playing }: { playing: boolean }) {
  const bars = 56;
  return (
    <svg viewBox={`0 0 ${bars * 4} 40`} className="w-full h-12" preserveAspectRatio="none">
      {Array.from({ length: bars }).map((_, i) => {
        const seed = (Math.sin(i * 1.7) + 1) / 2;
        const base = 6 + seed * 28;
        return (
          <rect
            key={i}
            x={i * 4}
            y={20 - base / 2}
            width={2}
            height={base}
            className={`${playing ? "fill-current motion-reduce:opacity-70" : "fill-current opacity-40"} motion-reduce:!animate-none`}
            style={
              playing
                ? {
                    animation: `waveBar 1.${(i % 9)}s ease-in-out ${i * 0.03}s infinite alternate`,
                    transformOrigin: "center",
                  }
                : undefined
            }
          />
        );
      })}
      <style>{`@keyframes waveBar { from { transform: scaleY(0.4); } to { transform: scaleY(1.4); } }`}</style>
    </svg>
  );
}

export default function ForoyskSoga() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1 audio
  const [year, setYear] = useState(1900);

  // Fake audio progress when playing
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setProgress((p) => (p >= 1 ? 0 : p + 0.005));
    }, 100);
    return () => clearInterval(t);
  }, [playing]);

  const yearMin = 1500;
  const yearMax = 2025;
  const closest = stories.reduce((acc, s) =>
    Math.abs(s.year - year) < Math.abs(acc.year - year) ? s : acc
  );

  // Sepia warm overlay class
  const sepiaBg =
    "bg-[#f4ecd8] text-[#3a2f1f] dark:bg-[#231b10] dark:text-[#e9dcc0]";

  return (
    <div className="space-y-16">
      {/* Sepia archive slab */}
      <div className={`relative -mx-4 sm:-mx-6 lg:-mx-8 ${sepiaBg} overflow-hidden`}>
        {/* faux paper grain */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none [background-image:repeating-radial-gradient(circle_at_30%_20%,currentColor_0,currentColor_0.5px,transparent_1.5px,transparent_3px)]" />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none [background-image:repeating-linear-gradient(0deg,transparent_0_3px,currentColor_3px_4px)]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-baseline justify-between border-b border-current/20 pb-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">
              Skjalasavn · Episodi 01
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-50">
              28 min · MP3
            </span>
          </div>

          <div className="grid md:grid-cols-12 gap-8 mt-8 items-end">
            <div className="md:col-span-7">
              <h3 className="font-serif text-4xl sm:text-6xl leading-[1.05] tracking-tight italic">
                Søgur úr
                <br />
                Føroyum.
              </h3>
              <p className="text-sm sm:text-base opacity-80 leading-relaxed mt-6 max-w-prose">
                Ein løta úr søgu Føroya, frásøgd av vitlíkis-rødd. Sniðgivið út
                frá sögumiðum, gomlum tekningum og tekstum. Hoyr eitt 28-min
                episodi um fólkalív í 1800-talinum.
              </p>
            </div>
            <div className="md:col-span-5">
              {/* "Stamp" cover */}
              <div className="relative aspect-square border-2 border-current/40 p-6 flex flex-col justify-between">
                <div className="absolute inset-2 border border-current/20" />
                <div className="relative font-mono text-[10px] uppercase tracking-widest opacity-70">
                  ARCHIVE · 01 · 2026
                </div>
                <div className="relative">
                  <div className="font-serif italic text-2xl">Søgur</div>
                  <div className="font-serif italic text-2xl">úr Føroyum</div>
                </div>
                <div className="relative font-mono text-[10px] uppercase tracking-widest opacity-70 flex justify-between">
                  <span>VITLÍKI.FO</span>
                  <span>EP · 01</span>
                </div>
                {/* faux postmark */}
                <div className="absolute -right-2 -top-2 w-20 h-20 rounded-full border border-current/40 rotate-12 flex items-center justify-center font-mono text-[9px] uppercase tracking-widest opacity-60 text-center leading-tight">
                  TÓRSHAVN<br />2026
                </div>
              </div>
            </div>
          </div>

          {/* Player */}
          <div className="mt-10 border-t border-current/20 pt-6">
            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label={playing ? "Steðga" : "Spæl"}
                onClick={() => setPlaying((p) => !p)}
                data-testid="play-podcast"
                className="w-12 h-12 border border-current flex items-center justify-center hover:bg-current hover:text-[#f4ecd8] transition-colors"
              >
                {playing ? (
                  <span className="flex gap-1">
                    <span className="w-1 h-3.5 bg-current" />
                    <span className="w-1 h-3.5 bg-current" />
                  </span>
                ) : (
                  <span className="block w-0 h-0 border-l-[8px] border-l-current border-y-[6px] border-y-transparent ml-0.5" />
                )}
              </button>
              <div className="flex-1">
                <Waveform playing={playing} />
                <div className="flex justify-between mt-1 font-mono text-[10px] uppercase tracking-widest opacity-70 tabular-nums">
                  <span>
                    {String(Math.floor(progress * 28)).padStart(2, "0")}:
                    {String(Math.floor((progress * 28 * 60) % 60)).padStart(2, "0")}
                  </span>
                  <span>28:14</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline scrubber */}
      <section>
        <header className="flex items-baseline justify-between border-b border-foreground/10 pb-3 mb-6">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
            Tíðarlinja · drag for at flyta
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40 tabular-nums">
            ÁR · {year}
          </span>
        </header>

        <div className="relative pt-6 pb-2">
          <input
            type="range"
            min={yearMin}
            max={yearMax}
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            data-testid="year-scrubber"
            className="w-full appearance-none bg-transparent cursor-grab active:cursor-grabbing
              [&::-webkit-slider-runnable-track]:h-px [&::-webkit-slider-runnable-track]:bg-foreground/30
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-px [&::-webkit-slider-thumb]:h-8
              [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:-mt-4
              [&::-moz-range-track]:h-px [&::-moz-range-track]:bg-foreground/30
              [&::-moz-range-thumb]:w-px [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:border-0"
          />
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-foreground/50 mt-3 tabular-nums">
            <span>{yearMin}</span>
            <span>1700</span>
            <span>1800</span>
            <span>1900</span>
            <span>2000</span>
            <span>{yearMax}</span>
          </div>

          {/* Story markers */}
          <div className="absolute inset-x-0 top-0 pointer-events-none">
            {stories.map((s) => {
              const left = ((s.year - yearMin) / (yearMax - yearMin)) * 100;
              return (
                <div
                  key={s.n}
                  className="absolute -translate-x-1/2 flex flex-col items-center"
                  style={{ left: `${left}%` }}
                >
                  <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/50 tabular-nums">
                    {s.year}
                  </span>
                  <span className="w-px h-3 bg-foreground/40 mt-1" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stories — manuscript with marginalia */}
      <section className="space-y-16">
        {stories.map((s, idx) => {
          const isClosest = closest.n === s.n;
          return (
            <article
              key={s.n}
              className={`grid md:grid-cols-12 gap-6 md:gap-10 border-t border-foreground/10 pt-10 transition-opacity ${
                isClosest ? "opacity-100" : "opacity-50"
              }`}
              data-testid={`story-${s.n}`}
            >
              {/* Image side, alternating */}
              <div className={`md:col-span-5 ${idx % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="aspect-[4/5] bg-foreground/[0.04] border border-foreground/10 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.10] [background-image:repeating-linear-gradient(0deg,transparent_0_4px,currentColor_4px_5px)]" />
                  <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                    Søgu-mynd · {s.n}
                  </div>
                  <div className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-widest text-foreground/50 tabular-nums">
                    {s.year}
                  </div>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 mt-3">
                  {s.place} · ca. {s.year}
                </p>
              </div>

              <div className="md:col-span-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
                  Frásøgn · {s.n}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl tracking-tight leading-tight mt-3 italic">
                  {s.title}
                </h3>
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mt-6 max-w-prose first-letter:font-serif first-letter:text-5xl first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:italic">
                  {s.body}
                </p>
              </div>

              <aside className="hidden md:block md:col-span-1 border-l border-foreground/15 pl-3">
                <p className="font-serif italic text-xs text-foreground/60 leading-snug">
                  {s.marginalia}
                </p>
              </aside>
            </article>
          );
        })}
      </section>
    </div>
  );
}
