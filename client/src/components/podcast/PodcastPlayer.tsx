import { useEffect, useMemo, useRef, useState } from "react";
import type { Episode } from "@/types/podcast";

type Props = {
  episodes: Episode[];
  initialIndex?: number;
  autoAdvance?: boolean;  // default true: go to next episode on end
  seekStepSeconds?: number; // default 15
};

function formatTime(totalSeconds: number | undefined): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds == null) return "0:00";
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export default function PodcastPlayer({
  episodes,
  initialIndex = 0,
  autoAdvance = true,
  seekStepSeconds = 15,
}: Props) {
  const [index, setIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hoverTime, setHoverTime] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldAutoplayRef = useRef(false);

  const current = episodes[index];
  const hasPrev = index > 0;
  const hasNext = index < episodes.length - 1;

  // Create the audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      if (autoAdvance && hasNext) {
        setIndex((i) => i + 1);
        shouldAutoplayRef.current = true;
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [autoAdvance, hasNext]);

  // Load current episode when index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !current) return;

    setCurrentTime(0);
    setDuration(0);

    audio.src = current.audioUrl;
    audio.load();

    const playIfWanted = async () => {
      // Autoplay if user was playing or clicked an episode
      if (shouldAutoplayRef.current || isPlaying) {
        try {
          await audio.play();
        } catch {
          // Autoplay can be blocked by browser; ignore.
        }
      }
      shouldAutoplayRef.current = false;
    };

    playIfWanted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, current?.audioUrl]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        /* ignore */
      }
    } else {
      audio.pause();
    }
  };

  const seekBy = (delta: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = Math.min(Math.max(audio.currentTime + delta, 0), duration || audio.duration || 0);
    audio.currentTime = next;
  };

  const seekTo = (nextTime: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const clamped = Math.min(Math.max(nextTime, 0), duration || audio.duration || 0);
    audio.currentTime = clamped;
  };

  const playEpisode = (i: number) => {
    if (i < 0 || i >= episodes.length) return;
    setIndex(i);
    shouldAutoplayRef.current = true;
  };

  const prevEpisode = () => hasPrev && playEpisode(index - 1);
  const nextEpisode = () => hasNext && playEpisode(index + 1);

  // Keyboard support (space to play/pause, arrow left/right to seek)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        seekBy(seekStepSeconds);
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        seekBy(-seekStepSeconds);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [seekStepSeconds]);

  const progressPercent = useMemo(() => {
    if (!duration) return 0;
    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  }, [currentTime, duration]);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-4 sm:px-0">
      {/* Now playing header - vertical on mobile, horizontal on desktop */}
      <div className="bg-white/60 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        
        {/* Mobile Layout (vertical card) */}
        <div className="sm:hidden">
          {/* Large Album Art for Mobile */}
          <div className="w-full aspect-square rounded-t-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            {current?.imageUrl ? (
              <img src={current.imageUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full grid place-items-center text-slate-400 text-xs">
                no image
              </div>
            )}
          </div>
          
          {/* Episode Info */}
          <div className="px-4 pt-4 pb-2">
            <h2 className="font-semibold text-lg leading-tight text-center" title={current?.title}>
              {current?.title || "—"}
            </h2>
            <div className="text-sm text-slate-500 dark:text-slate-400 text-center mt-1">
              {current?.publishedAt || "Episode"}
            </div>
          </div>

          {/* Progress Bar for Mobile */}
          <div className="px-4 pb-2">
            <div className="relative">
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={(e) => seekTo(Number(e.target.value))}
                className="w-full appearance-none h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 accent-slate-900 dark:accent-white cursor-pointer"
                aria-label="Seek"
              />
              <div
                className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-slate-900/20 dark:bg-white/20"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-slate-600 dark:text-slate-400 tabular-nums">
                {formatTime(currentTime)}
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 tabular-nums">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Compact Controls for Mobile (icons only) */}
          <div className="flex items-center justify-center gap-4 px-4 pb-4">
            <button
              className="p-2 text-slate-600 dark:text-slate-400 disabled:opacity-30"
              onClick={prevEpisode}
              disabled={!hasPrev}
              aria-label="Previous episode"
              title="Previous"
            >
              <span className="text-2xl">⏮</span>
            </button>

            <button
              className="p-2 text-slate-600 dark:text-slate-400"
              onClick={() => seekBy(-seekStepSeconds)}
              aria-label={`Back ${seekStepSeconds} seconds`}
              title={`-${seekStepSeconds}s`}
            >
              <span className="text-2xl">⏪</span>
            </button>

            <button
              className="p-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              title={isPlaying ? "Pause" : "Play"}
            >
              <span className="text-3xl">{isPlaying ? "⏸" : "▶️"}</span>
            </button>

            <button
              className="p-2 text-slate-600 dark:text-slate-400"
              onClick={() => seekBy(seekStepSeconds)}
              aria-label={`Forward ${seekStepSeconds} seconds`}
              title={`+${seekStepSeconds}s`}
            >
              <span className="text-2xl">⏩</span>
            </button>

            <button
              className="p-2 text-slate-600 dark:text-slate-400 disabled:opacity-30"
              onClick={nextEpisode}
              disabled={!hasNext}
              aria-label="Next episode"
              title="Next"
            >
              <span className="text-2xl">⏭</span>
            </button>
          </div>
        </div>

        {/* Desktop Layout (horizontal) */}
        <div className="hidden sm:flex items-center gap-4 p-4">
          <div className="w-20 h-20 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
            {current?.imageUrl ? (
              <img src={current.imageUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full grid place-items-center text-slate-400 text-xs">
                no image
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm text-slate-500 dark:text-slate-400 truncate">
              {current?.publishedAt || "Episode"}
            </div>
            <h2 className="font-semibold text-lg leading-tight truncate" title={current?.title}>
              {current?.title || "—"}
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <button
                className="px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-sm"
                onClick={prevEpisode}
                disabled={!hasPrev}
                aria-label="Previous episode"
                title="Previous episode"
              >
                ⏮ Prev
              </button>

              <button
                className="px-4 py-1.5 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-medium"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? "⏸ Pause" : "▶ Play"}
              </button>

              <button
                className="px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-sm"
                onClick={() => seekBy(-seekStepSeconds)}
                aria-label={`Back ${seekStepSeconds} seconds`}
                title={`Back ${seekStepSeconds}s`}
              >
                −{seekStepSeconds}s
              </button>

              <button
                className="px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-sm"
                onClick={() => seekBy(seekStepSeconds)}
                aria-label={`Forward ${seekStepSeconds} seconds`}
                title={`Forward ${seekStepSeconds}s`}
              >
                +{seekStepSeconds}s
              </button>

              <button
                className="px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-sm"
                onClick={nextEpisode}
                disabled={!hasNext}
                aria-label="Next episode"
                title="Next episode"
              >
                Next ⏭
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Progress bar */}
        <div className="hidden sm:block px-4 pb-3">
          <div className="flex items-center gap-3">
            <span className="tabular-nums text-xs text-slate-600 dark:text-slate-400 w-14 text-right">
              {formatTime(hoverTime ?? currentTime)}
            </span>

            <div className="relative flex-1 group">
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={(e) => seekTo(Number(e.target.value))}
                onMouseMove={(e) => {
                  const el = e.currentTarget;
                  const rect = el.getBoundingClientRect();
                  const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
                  setHoverTime((duration || 0) * ratio);
                }}
                onMouseLeave={() => setHoverTime(null)}
                className="w-full appearance-none h-2 rounded-md bg-slate-200 dark:bg-slate-700 accent-slate-900 dark:accent-white cursor-pointer"
                aria-label="Seek"
              />
              <div
                className="pointer-events-none absolute inset-y-0 left-0 rounded-md bg-slate-900/10 dark:bg-white/15"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <span className="tabular-nums text-xs text-slate-600 dark:text-slate-400 w-14">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>

      {/* Episode list - responsive */}
      <div className="mt-6 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
        {episodes.map((ep, i) => {
          const active = i === index;
          return (
            <button
              key={ep.id}
              onClick={() => playEpisode(i)}
              className={[
                "w-full text-left flex items-center gap-3 px-3 py-2 hover:bg-slate-50/80 dark:hover:bg-slate-800/60",
                active ? "bg-slate-50 dark:bg-slate-800/60" : "",
              ].join(" ")}
              aria-current={active ? "true" : undefined}
            >
              {/* Smaller thumbnail on mobile */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                {ep.imageUrl ? (
                  <img src={ep.imageUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full grid place-items-center text-slate-400 text-xs">
                    —
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">
                  {active ? "▸ " : ""}{ep.title}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {ep.publishedAt || ""}
                </div>
              </div>

              {/* Hide duration on mobile, show on desktop */}
              <div className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                {i === index ? formatTime(currentTime) + " / " + formatTime(duration) : ""}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}