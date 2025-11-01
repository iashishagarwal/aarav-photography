'use client';

import { motion } from 'framer-motion';
import { VolumeX, Waveform } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  startTransition,
} from 'react';

type FadeDirection = 'in' | 'out';

export function AmbientAudioToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [isReady, setReady] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const audio = new Audio('/audio/ambient.mp3');
    audio.loop = true;
    audio.volume = 0;
    audio.crossOrigin = 'anonymous';
    audioRef.current = audio;

    const handleCanPlay = () => setReady(true);
    const handleError = () => {
      setError(true);
      setReady(false);
    };

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
      if (fadeRef.current) {
        cancelAnimationFrame(fadeRef.current);
      }
    };
  }, []);

  const fadeAudio = useCallback((direction: FadeDirection) => {
    const audio = audioRef.current;
    if (!audio) return;

    const duration = 1200;
    const start = performance.now();
    const initialVolume = audio.volume;
    const targetVolume = direction === 'in' ? 0.38 : 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased =
        direction === 'in'
          ? 1 - Math.pow(1 - progress, 4)
          : Math.pow(1 - progress, 4);

      audio.volume = initialVolume + (targetVolume - initialVolume) * eased;

      if (progress < 1) {
        fadeRef.current = requestAnimationFrame(tick);
      } else {
        if (direction === 'out') {
          audio.pause();
        }
        fadeRef.current = null;
      }
    };

    if (fadeRef.current) {
      cancelAnimationFrame(fadeRef.current);
    }

    fadeRef.current = requestAnimationFrame(tick);
  }, []);

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || isError) return;

    startTransition(async () => {
      if (!isPlaying) {
        try {
          if (audio.paused) {
            await audio.play();
          }
          fadeAudio('in');
          setPlaying(true);
        } catch (error) {
          setError(true);
        }
      } else {
        fadeAudio('out');
        setPlaying(false);
      }
    });
  }, [fadeAudio, isPlaying, isError]);

  return (
    <motion.button
      type="button"
      onClick={togglePlayback}
      className={`group relative flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black/70 shadow-[0_8px_20px_-12px_rgba(8,9,10,0.45)] transition duration-200 hover:border-black/30 hover:text-black dark:border-white/15 dark:bg-white/[0.08] dark:text-white/70 dark:hover:border-white/35 dark:hover:text-white ${isError ? 'opacity-40' : ''}`}
      whileTap={{ scale: 0.92 }}
      disabled={!isReady || isError}
      aria-label={isPlaying ? 'Disable ambient audio' : 'Enable ambient audio'}
    >
      <motion.span
        key={isPlaying ? 'on' : 'off'}
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="relative z-20"
      >
        {isPlaying ? (
          <Waveform className="h-[18px] w-[18px]" strokeWidth={1.6} />
        ) : (
          <VolumeX className="h-[18px] w-[18px]" strokeWidth={1.5} />
        )}
      </motion.span>
      <motion.span
        layoutId="rail-control-indicator-audio"
        className="pointer-events-none absolute inset-0 rounded-full border border-white/40 bg-white/20 backdrop-blur-[1px] dark:border-white/20 dark:bg-white/5"
        transition={{ type: 'spring', stiffness: 400, damping: 36 }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-accent-blue/40 via-transparent to-transparent opacity-0 transition duration-300 dark:from-accent-blue/20"
        animate={{ opacity: isPlaying ? 0.55 : 0.15 }}
      />
    </motion.button>
  );
}
