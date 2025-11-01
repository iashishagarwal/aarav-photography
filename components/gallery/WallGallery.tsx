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
    <div className="relative">
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-20 z-30 h-1 bg-black/5 dark:bg-white/5"
        style={{ opacity: heroOpacity }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-accent-blue via-white/70 to-accent-silver"
          style={{ width: progressWidth }}
        />
      </motion.div>
      <section
        className="relative overflow-hidden bg-[#f5f6f8] text-charcoal dark:bg-midnight dark:text-white"
        id="wall"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex min-h-[40vh] max-w-6xl flex-col justify-center px-6 py-24 text-center lg:px-12"
        >
          <div className="absolute inset-0 -z-10 bg-radial-glow opacity-60" />
          <p className="text-xs uppercase tracking-[0.7em] text-pewter/60">
            Wall Mode
          </p>
          <h1 className="mt-6 text-4xl font-light tracking-tight text-white md:text-6xl">
            Aarav Agarwal&apos;s wanderlust in motion.
          </h1>
          <p className="mt-4 text-base text-pewter/70 md:text-lg">
            Journey alongside a high school storyteller who chases alpine glow,
            neon skylines, and the hush of midnight skies. Each frame reveals the
            rhythm of nature and the pulse of cities after dusk.
          </p>
        </motion.div>
      </section>
      <section className="relative mx-auto max-w-[1920px] px-4 pb-32 sm:px-6 md:px-10">
        <div className="mx-auto max-w-6xl pb-12 text-right text-xs uppercase tracking-[0.45em] text-pewter/60">
          {visiblePhotos.length} of {total} frames
        </div>
        <MasonryGrid photos={visiblePhotos} onPhotoSelect={handleSelect} />
        <div
          ref={sentinelRef}
          className="flex h-20 items-center justify-center text-xs uppercase tracking-[0.45em] text-pewter/50"
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
