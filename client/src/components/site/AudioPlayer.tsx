
import { useState, useEffect, useRef, useCallback } from 'react';

interface AudioPlayerProps {
  audioSrc: string;
  title?: string;
}

export default function AudioPlayer({ audioSrc, title = "Audio Player" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioLevels, setAudioLevels] = useState([0, 0, 0, 0]);
  const [isAudioContextReady, setIsAudioContextReady] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const previousLevelsRef = useRef([0, 0, 0, 0]);
  const lastUpdateTimeRef = useRef(0);

  // Check browser support for Web Audio API
  const isWebAudioSupported = useCallback(() => {
    return !!(window.AudioContext || (window as any).webkitAudioContext);
  }, []);

  // Detect mobile devices for special handling
  const isMobile = useCallback(() => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }, []);

  const initializeAudioContext = useCallback(async () => {
    if (!audioRef.current || audioContextRef.current) {
      return false;
    }

    if (!isWebAudioSupported()) {
      console.warn('Web Audio API not supported in this browser');
      return false;
    }

    try {
      // Use the appropriate AudioContext constructor
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      
      // Handle Safari/iOS auto-play policy
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      const analyser = audioContext.createAnalyser();
      
      // Optimized settings for voice/speech detection
      analyser.fftSize = 512; // Higher for better frequency resolution
      analyser.smoothingTimeConstant = 0.4; // Balanced smoothing
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      
      // Create source node (handle potential errors)
      try {
        const source = audioContext.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        sourceRef.current = source;
      } catch (error) {
        // Source may already be created
        console.warn('Audio source connection warning:', error);
      }
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      setIsAudioContextReady(true);
      
      return true;
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
      return false;
    }
  }, [isWebAudioSupported]);

  // Calculate RMS for accurate volume level
  const calculateRMS = (dataArray: Uint8Array): number => {
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const amplitude = (dataArray[i] - 128) / 128;
      sum += amplitude * amplitude;
    }
    return Math.sqrt(sum / dataArray.length);
  };

  // Find max value in Uint8Array (compatible with all browsers)
  const findMaxValue = (array: Uint8Array): number => {
    let max = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] > max) max = array[i];
    }
    return max;
  };

  const updateAudioLevels = useCallback(() => {
    // Throttle updates for performance (30-60 FPS)
    const now = Date.now();
    if (now - lastUpdateTimeRef.current < 16) { // ~60fps
      if (isPlaying) {
        animationFrameRef.current = requestAnimationFrame(updateAudioLevels);
      }
      return;
    }
    lastUpdateTimeRef.current = now;

    if (!analyserRef.current || !isAudioContextReady) {
      // Fallback animation when Web Audio isn't available
      if (isPlaying) {
        const time = Date.now() / 1000;
        const fallbackLevels = [
          Math.abs(Math.sin(time * 2)) * 0.6 + 0.2,
          Math.abs(Math.sin(time * 2.5 + 0.5)) * 0.8 + 0.1,
          Math.abs(Math.sin(time * 3 + 1)) * 0.5 + 0.3,
          Math.abs(Math.sin(time * 2.2 + 1.5)) * 0.7 + 0.2,
        ];
        setAudioLevels(fallbackLevels);
        animationFrameRef.current = requestAnimationFrame(updateAudioLevels);
      }
      return;
    }

    try {
      // Get time domain data for voice detection
      const bufferLength = analyserRef.current.fftSize;
      const timeDataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteTimeDomainData(timeDataArray);

      // Calculate RMS (Root Mean Square) for accurate volume
      const rms = calculateRMS(timeDataArray);
      
      // Get frequency data for additional detail
      const freqDataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(freqDataArray);
      
      // Find max frequency value (browser-compatible way)
      const maxFreq = findMaxValue(freqDataArray) / 255;
      
      // Combine RMS and frequency for better response
      const volumeLevel = Math.min(1, Math.pow(rms * 2.5, 0.6));
      const freqInfluence = maxFreq * 0.3;
      const combinedLevel = Math.min(1, volumeLevel + freqInfluence);
      
      // Apply exponential smoothing for natural movement
      const smoothingFactor = 0.3;
      const previousLevels = previousLevelsRef.current;
      
      // Generate 4 bars with smooth transitions
      const newLevels = [
        previousLevels[0] * (1 - smoothingFactor) + (combinedLevel * 0.9) * smoothingFactor,
        previousLevels[1] * (1 - smoothingFactor) + (combinedLevel * 1.1) * smoothingFactor,
        previousLevels[2] * (1 - smoothingFactor) + (combinedLevel * 0.7) * smoothingFactor,
        previousLevels[3] * (1 - smoothingFactor) + (combinedLevel * 1.0) * smoothingFactor,
      ];
      
      // Add subtle variation for liveliness
      const levels = newLevels.map(level => 
        Math.min(1, Math.max(0, level + (Math.random() - 0.5) * 0.05))
      );
      
      previousLevelsRef.current = levels;
      setAudioLevels(levels);
    } catch (error) {
      console.warn('Error updating audio levels:', error);
      // Fall back to simple animation
      setAudioLevels([0.3, 0.4, 0.2, 0.3]);
    }

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateAudioLevels);
    }
  }, [isPlaying, isAudioContextReady]);

  const togglePlayback = async () => {
    console.log('Toggle playback called, audioRef:', audioRef.current);
    console.log('Current isPlaying state:', isPlaying);
    
    if (!audioRef.current) {
      console.error('No audio element found!');
      return;
    }

    // Mark that user has interacted (needed for mobile)
    setHasUserInteracted(true);

    try {
      if (isPlaying) {
        console.log('Pausing audio...');
        // Pause playback
        audioRef.current.pause();
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        // Smoothly animate levels to zero
        setAudioLevels([0, 0, 0, 0]);
        previousLevelsRef.current = [0, 0, 0, 0];
      } else {
        console.log('Starting playback...');
        console.log('Audio src:', audioRef.current.src);
        console.log('Audio readyState:', audioRef.current.readyState);
        console.log('Audio duration:', audioRef.current.duration);
        
        // Initialize audio context on first play (required by browsers)
        if (!audioContextRef.current) {
          console.log('Initializing audio context...');
          const initialized = await initializeAudioContext();
          if (!initialized) {
            console.warn('Audio context initialization failed, using fallback animation');
          }
        }
        
        // Resume audio context if suspended (common on mobile)
        if (audioContextRef.current?.state === 'suspended') {
          console.log('Resuming suspended audio context...');
          try {
            await audioContextRef.current.resume();
            console.log('Audio context resumed successfully');
          } catch (error) {
            console.warn('Failed to resume audio context:', error);
          }
        }
        
        // Start playback
        try {
          console.log('Attempting to play audio...');
          await audioRef.current.play();
          console.log('Audio playback started successfully');
          updateAudioLevels();
        } catch (error) {
          console.error('Playback failed:', error);
          if (error instanceof Error) {
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            // Handle autoplay restrictions
            if (error instanceof DOMException && error.name === 'NotAllowedError') {
              alert('Please click play again to start audio playback.');
              return;
            }
          }
        }
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Toggle playback error:', error);
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
    previousLevelsRef.current = [0, 0, 0, 0];
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Initialize on mount and handle mobile touch events
  useEffect(() => {
    // Pre-check browser capabilities
    if (!isWebAudioSupported()) {
      console.info('Web Audio API not supported, using fallback animations');
    }

    // Handle visibility change (pause when hidden)
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(console.warn);
      }
    };
  }, [isPlaying, isWebAudioSupported]);

  // Handle audio context state changes
  useEffect(() => {
    if (!audioContextRef.current) return;

    const handleStateChange = () => {
      setIsAudioContextReady(audioContextRef.current?.state === 'running');
    };

    audioContextRef.current.addEventListener('statechange', handleStateChange);
    return () => {
      audioContextRef.current?.removeEventListener('statechange', handleStateChange);
    };
  }, [audioContextRef.current]);

  return (
    <div className="p-3 bg-muted/30 rounded-lg border border-border/30">
      <div className="flex items-center gap-3">
        <button 
          className="w-8 h-8 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-primary-foreground transition-colors"
          onClick={() => {
            console.log('Button clicked!');
            togglePlayback();
          }}
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
        {/* Real-time Audio Visualizer with Cross-Browser Support */}
        <div className="flex items-center gap-0.5" aria-label="Audio level indicator">
          {audioLevels.map((level, index) => {
            // Calculate height with smooth scaling
            const minHeight = 6;
            const maxHeight = 24;
            const height = minHeight + (maxHeight - minHeight) * level;
            
            // Dynamic opacity based on level
            const opacity = isPlaying ? 0.4 + level * 0.6 : 0.3;
            
            return (
              <div
                key={index}
                className="relative"
                style={{
                  width: '3px',
                  height: `${maxHeight}px`,
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                <div
                  className="w-full bg-primary rounded-full"
                  style={{
                    height: `${height}px`,
                    opacity,
                    transform: 'translateZ(0)', // Hardware acceleration
                    transition: 'height 100ms cubic-bezier(0.4, 0, 0.2, 1), opacity 150ms ease-out',
                    willChange: 'height, opacity',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <audio 
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={() => {
          console.log('Audio metadata loaded');
          console.log('Audio src:', audioRef.current?.src);
          console.log('Audio duration:', audioRef.current?.duration);
        }}
        onError={(e) => {
          console.error('Audio error:', e);
          console.error('Failed to load audio from:', audioSrc);
        }}
        onCanPlayThrough={() => console.log('Audio can play through')}
        playsInline // Important for iOS
      >
        Your browser does not support audio playback.
      </audio>
    </div>
  );
}
