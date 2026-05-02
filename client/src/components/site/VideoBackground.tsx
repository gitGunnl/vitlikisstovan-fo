import { useState, useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  posterSrc: string;
  className?: string;
}

/**
 * Hero background video with poster fallback.
 *
 * Performance behaviour:
 *   - On mobile / data-saver / reduced-motion / when the browser blocks
 *     autoplay, we skip the video entirely and use the poster image. This
 *     avoids fetching a multi-MB video over cellular for a decorative loop.
 *   - On desktop the video element gets `preload="metadata"` (not "auto")
 *     so the browser doesn't pre-buffer the whole file before LCP.
 */
export default function VideoBackground({ videoSrc, posterSrc, className = '' }: VideoBackgroundProps) {
  const [videoError, setVideoError] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Decide whether to actually load the video at all.
    if (typeof window === 'undefined') return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // @ts-expect-error -- non-standard but supported in Chromium
    const saveData = navigator.connection?.saveData === true;
    // @ts-expect-error -- non-standard
    const slowConnection = ['slow-2g', '2g', '3g'].includes(navigator.connection?.effectiveType);

    if (isMobile || reduceMotion || saveData || slowConnection) {
      // Stay on the poster image — no video request at all.
      return;
    }

    setShouldLoadVideo(true);
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // If autoplay fails, fall back to image
        setVideoError(true);
      });
    }
  }, [shouldLoadVideo]);

  const handleVideoError = () => {
    setVideoError(true);
  };

  if (videoError || !shouldLoadVideo) {
    // Fallback to background image. Alignment must mirror the <video>
    // element below (object-cover + object-bottom) so swapping between
    // poster and video doesn't visibly shift the framing.
    return (
      <div
        className={`absolute inset-0 ${className}`}
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.7) 100%), url('${posterSrc}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
        }}
        data-testid="video-background-fallback"
      />
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} data-testid="video-background-container">
      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-bottom"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={posterSrc}
        onError={handleVideoError}
        data-testid="video-background"
      >
        <source src={videoSrc} type="video/webm" />
        {/* Browser doesn't support video, show image instead */}
        Your browser does not support the video tag.
      </video>

      {/* Gradient overlay to match the original design */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.7) 100%)'
        }}
      />
    </div>
  );
}
