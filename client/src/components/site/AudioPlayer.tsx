
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
    if (!audioRef.current || audioContextRef.current) {
      console.log('Audio context already exists or no audio element');
      return;
    }

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audioRef.current);
      
      // Better settings for speech/voice analysis
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.3;
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;
      
      console.log('Audio context initialized successfully');
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  };

  const updateAudioLevels = () => {
    if (!analyserRef.current) {
      console.log('No analyser available');
      return;
    }

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Use time domain data for better responsiveness to speech
    const timeDataArray = new Uint8Array(analyserRef.current.fftSize);
    analyserRef.current.getByteTimeDomainData(timeDataArray);

    // Calculate overall volume level
    let sum = 0;
    for (let i = 0; i < timeDataArray.length; i++) {
      sum += Math.abs(timeDataArray[i] - 128);
    }
    const averageLevel = sum / timeDataArray.length / 128;

    // Create 4 bars with some variation based on frequency data
    const frequencyLevel = Math.max(...dataArray) / 255;
    const combinedLevel = Math.max(averageLevel, frequencyLevel);
    
    // Generate 4 bars with slight variations for visual appeal
    const levels = [
      Math.min(1, combinedLevel * 0.8 + Math.random() * 0.2),
      Math.min(1, combinedLevel * 1.0 + Math.random() * 0.3),
      Math.min(1, combinedLevel * 0.6 + Math.random() * 0.4),
      Math.min(1, combinedLevel * 0.9 + Math.random() * 0.2),
    ];

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
          {audioLevels.map((level, index) => {
            // Fallback animation if Web Audio API isn't working
            const fallbackHeight = isPlaying && !audioContextRef.current ? 
              12 + Math.sin(Date.now() / 200 + index) * 6 : 8;
            const height = audioContextRef.current ? 
              Math.max(8, level * 20 + 8) : fallbackHeight;
            
            return (
              <div 
                key={index}
                className="w-1 bg-primary rounded-full transition-all duration-75 ease-out"
                style={{ 
                  height: `${height}px`,
                  opacity: isPlaying ? Math.max(0.3, level || 0.6) : 0.3
                }}
              />
            );
          })}
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
