'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center bg-[#f5f6f8] text-charcoal dark:bg-midnight dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-xl space-y-6 px-6 text-center"
      >
        <p className="text-xs uppercase tracking-[0.7em] text-pewter/60">
          404
        </p>
        <h1 className="text-4xl font-light tracking-tight">
          The frame you are looking for is out of reach.
        </h1>
        <p className="text-base text-pewter/70">
          Explore Aarav&apos;s gallery to wander through nature vignettes and night
          skies captured on the move.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 text-sm uppercase tracking-[0.35em] text-charcoal transition hover:border-black/30 hover:text-black dark:border-white/10 dark:text-white dark:hover:border-white/30"
        >
          Return to Wall
        </Link>
      </motion.div>
    </main>
  );
}
