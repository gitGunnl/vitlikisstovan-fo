import { useEffect, useRef } from "react";

/**
 * Lightweight ambient blobs with subtle idle motion + gentle mouse repulsion.
 * No dependencies. Uses requestAnimationFrame, runs only on client.
 */
export default function AmbientBlobs({
  className = "",
  colors,
  sizes = [360, 400, 240], // px
  influence = 240,         // mouse influence radius (px)
  maxRepel = 22,           // max pixels to push away from cursor
}: {
  className?: string;
  colors?: [string, string, string]; // override CSS vars if desired
  sizes?: [number, number, number];
  influence?: number;
  maxRepel?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const b1 = useRef<HTMLDivElement | null>(null);
  const b2 = useRef<HTMLDivElement | null>(null);
  const b3 = useRef<HTMLDivElement | null>(null);

  // per-blob animated offsets
  const offsets = useRef([
    { x: 0, y: 0 }, // b1
    { x: 0, y: 0 }, // b2
    { x: 0, y: 0 }, // b3
  ]);
  const mouse = useRef<{ x: number; y: number } | null>(null);
  const raf = useRef<number>();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const start = performance.now();
    const loop = (t: number) => {
      const time = (t - start) / 1000;

      const blobs = [b1.current, b2.current, b3.current];
      const phases = [0, 1.3, 2.2]; // unique idle phases
      const idleAmp = [10, 12, 8];  // idle amplitude per blob

      for (let i = 0; i < blobs.length; i++) {
        const el = blobs[i];
        if (!el) continue;

        // Element center in viewport
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        // Idle gentle drift (sin/cos)
        const idleX = Math.sin(time * 0.35 + phases[i]) * idleAmp[i];
        const idleY = Math.cos(time * 0.28 + phases[i]) * idleAmp[i];

        // Mouse repulsion (small + clamped)
        let rx = 0, ry = 0;
        if (mouse.current) {
          const dx = cx - mouse.current.x;
          const dy = cy - mouse.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist < influence && dist > 0.0001) {
            const k = (1 - dist / influence) ** 2; // soft falloff
            const ux = dx / dist;
            const uy = dy / dist;
            rx = ux * maxRepel * k;
            ry = uy * maxRepel * k;
          }
        }

        // Target offsets
        const tx = idleX + rx;
        const ty = idleY + ry;

        // Lerp current offsets toward target
        offsets.current[i].x += (tx - offsets.current[i].x) * 0.08;
        offsets.current[i].y += (ty - offsets.current[i].y) * 0.08;

        el.style.transform = `translate3d(${offsets.current[i].x}px, ${offsets.current[i].y}px, 0)`;
      }

      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [influence, maxRepel]);

  const styleVars: React.CSSProperties =
    colors
      ? {
          // Override tokens per-instance if desired:
          // @ts-expect-error custom props
          "--vts-blob-1": colors[0],
          "--vts-blob-2": colors[1],
          "--vts-blob-3": colors[2],
        }
      : {};

  return (
    <div
      ref={containerRef}
      data-theme="vts"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      style={styleVars}
      aria-hidden
    >
      {/* Blob 1 — top right */}
      <div
        ref={b1}
        className="vts-blob"
        style={{
          width: sizes[0],
          height: sizes[0],
          background: "var(--vts-blob-1)",
          top: "-12%",
          right: "-6%",
        }}
      />
      {/* Blob 2 — bottom left */}
      <div
        ref={b2}
        className="vts-blob"
        style={{
          width: sizes[1],
          height: sizes[1],
          background: "var(--vts-blob-2)",
          bottom: "-14%",
          left: "-10%",
        }}
      />
      {/* Blob 3 — center subtle */}
      <div
        ref={b3}
        className="vts-blob"
        style={{
          width: sizes[2],
          height: sizes[2],
          background: "var(--vts-blob-3)",
          top: "42%",
          left: "50%",
          transform: "translate3d(-50%, -50%, 0)", // base centering; JS applies extra translate
          opacity: 0.6,
          filter: "blur(28px)",
        }}
      />
    </div>
  );
}