'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = (theme ?? resolvedTheme ?? 'dark') as 'light' | 'dark';

  const handleToggle = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-black/5 text-xs font-semibold uppercase tracking-[0.35em] text-charcoal/70 transition hover:border-black/30 hover:text-charcoal dark:border-white/10 dark:bg-white/5 dark:text-pewter/70 dark:hover:border-white/25 dark:hover:text-white"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle color theme"
    >
      {mounted ? (
        <motion.span
          key={currentTheme}
          initial={{ y: 6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="transition-colors"
        >
          {currentTheme === 'dark' ? 'Dark' : 'Light'}
        </motion.span>
      ) : null}
      <motion.span
        layoutId="theme-indicator"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/0 opacity-0 transition duration-500"
        animate={{ opacity: 0.4 }}
      />
    </motion.button>
  );
}
