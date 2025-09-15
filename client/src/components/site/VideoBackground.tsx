import { useState, useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  posterSrc: string;
  className?: string;
}

export default function VideoBackground({ videoSrc, posterSrc, className = '' }: VideoBackgroundProps) {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays on component mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // If autoplay fails, fall back to image
        setVideoError(true);
      });
    }
  }, []);

  const handleVideoError = () => {
    setVideoError(true);
  };

  if (videoError) {
    // Fallback to background image
    return (
      <div 
        className={`absolute inset-0 ${className}`}
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.7) 100%), url('${posterSrc}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
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