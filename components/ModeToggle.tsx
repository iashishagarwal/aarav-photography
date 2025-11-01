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
      className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black/70 shadow-[0_8px_20px_-12px_rgba(8,9,10,0.45)] transition duration-200 hover:border-black/30 hover:text-black dark:border-white/15 dark:bg-white/[0.08] dark:text-white/70 dark:hover:border-white/35 dark:hover:text-white"
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
        className="pointer-events-none absolute inset-0 rounded-full border border-white/40 bg-white/20 backdrop-blur-[1px] dark:border-white/20 dark:bg-white/5"
        transition={{ type: 'spring', stiffness: 400, damping: 36 }}
      />
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100 dark:from-white/20" />
    </motion.button>
  );
}
