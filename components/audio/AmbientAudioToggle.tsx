'use client';

import { motion } from 'framer-motion';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  startTransition,
} from 'react';

const ease = [0.22, 1, 0.36, 1];

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
      className={`relative flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-black/5 text-xs font-semibold uppercase tracking-[0.35em] transition hover:border-black/30 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/25 dark:hover:bg-white/10 ${
        isPlaying
          ? 'text-charcoal dark:text-white'
          : 'text-charcoal/70 hover:text-charcoal dark:text-pewter/70 dark:hover:text-pewter'
      } ${isError ? 'opacity-50' : ''}`}
      whileTap={{ scale: 0.95 }}
      disabled={!isReady || isError}
      aria-label={isPlaying ? 'Disable ambient audio' : 'Enable ambient audio'}
    >
      <motion.span
        key={isPlaying ? 'on' : 'off'}
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.18, ease }}
      >
        {isPlaying ? 'On' : 'Off'}
      </motion.span>
      <motion.span
        layoutId="audio-indicator"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-blue/18 to-accent-silver/10 opacity-20"
        animate={{ opacity: isPlaying ? 0.4 : 0.16 }}
        transition={{ duration: 0.24, ease }}
      />
    </motion.button>
  );
}
