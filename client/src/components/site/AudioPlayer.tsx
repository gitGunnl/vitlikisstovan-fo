
import React, { useState, useEffect, useRef } from 'react';

interface AudioPlayerProps {
  audioSrc: string;
  title?: string;
}

export default function AudioPlayer({ audioSrc, title = "Audio Player" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const audio = audioRef.current;
      if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        setProgress(progressPercent);
        setCurrentTime(audio.currentTime);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="p-3 bg-muted/30 rounded-lg border border-border/30">
      <div className="flex items-center gap-3">
        <button 
          className="w-8 h-8 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-primary-foreground transition-colors"
          onClick={togglePlayback}
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
        <div className="flex-1">
          <div className="text-sm font-medium mb-1">{title}</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {formatTime(currentTime)}
            </span>
          </div>
        </div>
        {/* Speaking Animation */}
        {isPlaying && (
          <div className="flex items-center gap-1">
            <div className="w-1 h-3 bg-primary rounded-full animate-pulse"></div>
            <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            <div className="w-1 h-5 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
          </div>
        )}
      </div>
      <audio 
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      >
        <source src={audioSrc} type="audio/wav" />
        Tín browser støðir ikki audio.
      </audio>
    </div>
  );
}
