'use client';

import { useGallery } from '@/components/providers/gallery-provider';
import { Grid3X3, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

const toggleVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  tap: { scale: 0.94 },
};

export function ModeToggle() {
  const { mode, setMode, activePhotoId } = useGallery();
  const router = useRouter();

  const nextMode = useMemo(() => (mode === 'wall' ? 'focus' : 'wall'), [mode]);

  const handleToggle = useCallback(() => {
    if (mode === 'wall') {
      setMode('focus');
      router.push(`/photo/${activePhotoId ?? 1}`);
    } else {
      setMode('wall');
      router.push('/#wall');
    }
  }, [mode, setMode, router, activePhotoId]);

  const Icon = mode === 'wall' ? Grid3X3 : Maximize2;

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      variants={toggleVariants}
      initial="initial"
      animate="animate"
      whileTap="tap"
      aria-label={`Switch to ${nextMode} mode`}
      title={`Switch to ${nextMode === 'focus' ? 'full view' : 'wall'} mode`}
      className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-obsidian/80 text-mist/80 transition duration-200 hover:border-accent-cyan/60 hover:text-mist"
    >
      <motion.span
        key={mode}
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.75, opacity: 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="relative z-20"
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
      </motion.span>
      <motion.span
        layoutId="rail-control-indicator-mode"
        className="pointer-events-none absolute inset-0 rounded-full border border-accent-cyan/50 bg-white/20 backdrop-blur-[2px]"
        transition={{ type: 'spring', stiffness: 400, damping: 36 }}
      />
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-accent-cyan/35 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
    </motion.button>
  );
}
