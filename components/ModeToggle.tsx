'use client';

import { useGallery } from '@/components/providers/gallery-provider';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

const toggleVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  tap: { scale: 0.94 },
};

const iconClasses =
  'relative flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-black/5 transition hover:border-black/30 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/25 dark:hover:bg-white/10';

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
      className={`${iconClasses} group`}
    >
      <motion.span
        key={mode}
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -8, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="text-xs font-semibold uppercase tracking-[0.35em] text-charcoal/70 transition group-hover:text-charcoal dark:text-pewter/70 dark:group-hover:text-pewter"
      >
        {mode === 'wall' ? 'Wall' : 'Focus'}
      </motion.span>
      <span className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-white/10 to-white/0 opacity-0 blur transition duration-500 group-hover:opacity-100" />
      <motion.span
        layoutId="mode-toggle-indicator"
        className="pointer-events-none absolute -inset-[2px] rounded-2xl border border-white/10"
        transition={{ type: 'spring', stiffness: 220, damping: 28 }}
      />
    </motion.button>
  );
}
