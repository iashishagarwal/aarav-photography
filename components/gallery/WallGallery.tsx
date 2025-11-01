'use client';

import { useEffect } from 'react';
import { useGallery } from '@/components/providers/gallery-provider';
import { MasonryGrid } from '@/components/MasonryGrid';
import { useInfinitePhotos } from '@/hooks/useInfinitePhotos';
import { Photo } from '@/types/photo';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';

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

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);

  const handleSelect = (photo: Photo) => {
    router.push(`/photo/${photo.id}?from=wall`);
  };

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-20 z-30 h-[3px] bg-black/10 dark:bg-white/5"
        style={{ opacity: heroOpacity }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-accent-blue via-[#56ffd9] to-accent-silver"
          style={{ width: progressWidth }}
        />
      </motion.div>
      <section
        className="relative overflow-hidden bg-[#07090d] text-white dark:bg-midnight"
        id="wall"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex min-h-[44vh] flex-col justify-center px-6 py-16 text-center sm:px-10 lg:px-20"
        >
          <div className="absolute inset-0 -z-20 bg-gradient-to-br from-black via-[#0b0f19] to-[#10131f] opacity-90" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(76,110,245,0.35),transparent_65%),radial-gradient(circle_at_80%_0%,rgba(188,205,220,0.25),transparent_55%),radial-gradient(circle_at_10%_90%,rgba(86,255,217,0.28),transparent_65%)]" />
          <h1 className="mt-4 text-3xl font-light tracking-tight md:text-5xl">
            Aarav Agarwal&apos;s wanderlust in motion.
          </h1>
          <div className="mx-auto mt-3 h-[3px] w-20 rounded-full bg-gradient-to-r from-[#56ffd9] via-[#4c6ef5] to-transparent opacity-80" />
          <p className="mt-3 text-sm text-white/70 md:text-base">
            Journey alongside a high school storyteller who chases alpine glow,
            neon skylines, and the hush of midnight skies. Each frame reveals the
            rhythm of nature and the pulse of cities after dusk.
          </p>
        </motion.div>
      </section>
      <section className="relative bg-[#05070d] pb-24 text-white dark:bg-midnight">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent dark:via-white/[0.04]" />
        <div className="flex w-full justify-end px-6 pb-8 text-[0.65rem] uppercase tracking-[0.4em] text-white/45 sm:px-10 lg:px-20">
          <span className="rounded-full border border-[#56ffd9]/50 px-3 py-1 text-white/80 shadow-[0_8px_18px_-12px_rgba(86,255,217,0.6)]">
            {visiblePhotos.length} frames
          </span>
        </div>
        <div className="px-1 sm:px-4 md:px-8">
          <MasonryGrid photos={visiblePhotos} onPhotoSelect={handleSelect} />
        </div>
        <div
          ref={sentinelRef}
          className="flex h-16 items-center justify-center text-[0.65rem] uppercase tracking-[0.4em] text-white/45"
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
