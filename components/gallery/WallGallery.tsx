'use client';

import { useEffect } from 'react';
import { useGallery } from '@/components/providers/gallery-provider';
import { MasonryGrid } from '@/components/MasonryGrid';
import { useInfinitePhotos } from '@/hooks/useInfinitePhotos';
import { Photo } from '@/types/photo';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

type WallGalleryProps = {
  photos: Photo[];
};

export function WallGallery({ photos }: WallGalleryProps) {
  const router = useRouter();
  const { setMode, setActivePhotoId } = useGallery();
  const { visiblePhotos, sentinelRef, isFetching, isExhausted, total } =
    useInfinitePhotos(photos, { chunkSize: 12, initialChunks: 2 });

  useEffect(() => {
    setMode('wall');
    setActivePhotoId(null);
  }, [setMode, setActivePhotoId]);

  const handleSelect = (photo: Photo) => {
    router.push(`/photo/${photo.id}?from=wall`);
  };

  return (
    <div className="relative overflow-hidden">
      <section
        className="relative overflow-hidden bg-slate-100 text-slate-900 dark:bg-graphite dark:text-mist"
        id="wall"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex min-h-[44vh] flex-col justify-center px-6 py-16 text-center sm:px-10 lg:px-20"
        >
          <div className="absolute inset-0 -z-20 bg-gradient-to-br from-white via-slate-100 to-slate-200/70 dark:from-obsidian dark:via-graphite dark:to-black/60" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.22),transparent_60%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.2),transparent_55%)]" />
          <h1 className="mt-4 text-3xl font-light tracking-tight text-slate-900 dark:text-mist md:text-5xl">
            Aarav Agarwal&apos;s wanderlust in motion.
          </h1>
          <div className="mx-auto mt-3 h-[3px] w-24 rounded-full bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-silver" />
          <p className="mt-3 text-sm text-slate-600 dark:text-mist/70 md:text-base">
            Journey alongside a high school storyteller who chases alpine glow,
            neon skylines, and the hush of midnight skies. Each frame reveals the
            rhythm of nature and the pulse of cities after dusk.
          </p>
        </motion.div>
      </section>
      <section className="relative bg-slate-100 pb-24 text-slate-900 dark:bg-graphite dark:text-mist">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-200/60 to-transparent dark:via-accent-slate/40" />
        <div className="flex w-full justify-end px-6 pb-8 text-[0.65rem] uppercase tracking-[0.4em] text-slate-500 dark:text-mist/50 sm:px-10 lg:px-20">
          <span className="rounded-full border border-accent-cyan/60 px-3 py-1 text-slate-700 shadow-[0_8px_18px_-12px_rgba(56,189,248,0.25)] dark:border-accent-cyan/40 dark:text-mist/80 dark:shadow-[0_8px_18px_-12px_rgba(56,189,248,0.35)]">
            {visiblePhotos.length} frames
          </span>
        </div>
        <div className="px-1 sm:px-4 md:px-8">
          <MasonryGrid photos={visiblePhotos} onPhotoSelect={handleSelect} />
        </div>
        <div
          ref={sentinelRef}
          className="flex h-16 items-center justify-center text-[0.65rem] uppercase tracking-[0.4em] text-slate-500 dark:text-mist/40"
        >
          {isFetching && !isExhausted ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' }}
            >
              Loading
            </motion.span>
          ) : null}
          {isExhausted ? (
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              You have reached the edge.
            </motion.span>
          ) : null}
        </div>
      </section>
    </div>
  );
}
