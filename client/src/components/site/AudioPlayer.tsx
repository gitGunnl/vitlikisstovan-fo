
import React, { useState, useEffect, useRef } from 'react';

interface AudioPlayerProps {
  audioSrc: string;
  title?: string;
}

export default function AudioPlayer({ audioSrc, title = "Audio Player" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioLevels, setAudioLevels] = useState([0, 0, 0, 0]);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const initializeAudioContext = () => {
    if (!audioRef.current || audioContextRef.current) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audioRef.current);
      
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.8;
      
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  };

  const updateAudioLevels = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Sample 4 frequency ranges for visualization
    const ranges = [
      { start: 0, end: Math.floor(bufferLength * 0.1) },      // Low
      { start: Math.floor(bufferLength * 0.1), end: Math.floor(bufferLength * 0.3) }, // Mid-low
      { start: Math.floor(bufferLength * 0.3), end: Math.floor(bufferLength * 0.6) }, // Mid-high
      { start: Math.floor(bufferLength * 0.6), end: bufferLength } // High
    ];

    const levels = ranges.map(range => {
      let sum = 0;
      for (let i = range.start; i < range.end; i++) {
        sum += dataArray[i];
      }
      return (sum / (range.end - range.start)) / 255; // Normalize to 0-1
    });

    setAudioLevels(levels);

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateAudioLevels);
    }
  };

  const togglePlayback = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      } else {
        // Initialize audio context on first play (required by browsers)
        if (!audioContextRef.current) {
          initializeAudioContext();
        }
        
        // Resume audio context if suspended
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        
        audioRef.current.play();
        updateAudioLevels();
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
    setAudioLevels([0, 0, 0, 0]);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

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
        {/* Real-time Audio Visualizer */}
        <div className="flex items-center gap-1">
          {audioLevels.map((level, index) => (
            <div 
              key={index}
              className="w-1 bg-primary rounded-full transition-all duration-75 ease-out"
              style={{ 
                height: `${Math.max(8, level * 20 + 8)}px`,
                opacity: isPlaying ? Math.max(0.3, level) : 0.3
              }}
            />
          ))}
        </div>
      </div>
      <audio 
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        crossOrigin="anonymous"
      >
        <source src={audioSrc} type="audio/wav" />
        Tín browser støðir ikki audio.
      </audio>
    </div>
  );
}
