'use client';

import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { useCallback, useEffect, useMemo } from 'react';
import { Photo } from '@/types/photo';
import { useGallery } from '@/components/providers/gallery-provider';
import { useRouter } from 'next/navigation';
import { getBlurDataURL } from '@/lib/placeholder';

type FullPageViewProps = {
  photo: Photo;
  prevPhoto?: Photo | null;
  nextPhoto?: Photo | null;
};

const clamp = (min: number, value: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function FullPageView({
  photo,
  prevPhoto = null,
  nextPhoto = null,
}: FullPageViewProps) {
  const { setMode, setActivePhotoId } = useGallery();
  const router = useRouter();

  useEffect(() => {
    setMode('focus');
    setActivePhotoId(photo.id);
  }, [photo.id, setMode, setActivePhotoId]);

  // Preload adjacent frames for smooth transitions.
  useEffect(() => {
    [prevPhoto, nextPhoto].forEach((frame) => {
      if (!frame) return;
      const preload = new Image();
      preload.src = frame.url;
    });
  }, [prevPhoto, nextPhoto]);

  const navigateTo = useCallback(
    (target: Photo | null | undefined) => {
      if (!target) return;
      router.push(`/photo/${target.id}?from=focus`);
    },
    [router],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigateTo(nextPhoto);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigateTo(prevPhoto);
      }
      if (event.key === 'Escape') {
        router.push('/#wall');
      }
    },
    [navigateTo, nextPhoto, prevPhoto, router],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const blurDataURL = getBlurDataURL(
    photo.dominantColor ?? '#08090a',
    photo.aspectRatio ?? 1.5,
  );

  const x = useMotionValue(0);
  const backgroundOpacity = useTransform(
    x,
    [-300, 0, 300],
    [0.2, 0.65, 0.2],
  );
  const overlayOpacity = useTransform(x, [-240, 0, 240], [0.75, 1, 0.75]);

  const dragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const threshold = clamp(120, Math.abs(offset) + Math.abs(velocity), 320);
    if (offset < -threshold) {
      navigateTo(nextPhoto);
    } else if (offset > threshold) {
      navigateTo(prevPhoto);
    }
  };

  const metadata = useMemo(
    () => ({
      formattedDate: new Date(photo.date).toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    }),
    [photo.date],
  );

  return (
    <div className="relative flex min-h-[calc(100vh-5rem)] flex-col overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0 z-0"
        style={{ opacity: backgroundOpacity }}
      >
        <Image
          src={photo.url}
          alt=""
          fill
          priority
          placeholder="blur"
          blurDataURL={blurDataURL}
          sizes="100vw"
          className="object-cover blur-3xl"
        />
      </motion.div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-10">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={dragEnd}
          style={{ x }}
          className="relative flex w-full max-w-5xl flex-col items-center"
        >
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="pointer-events-none absolute inset-0 rounded-[36px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[36px]"
          >
            <Image
              src={photo.url}
              alt={photo.title}
              width={1800}
              height={Math.round(1800 / (photo.aspectRatio ?? 1.5))}
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
              placeholder="blur"
              blurDataURL={blurDataURL}
              className="h-full max-h-[78vh] w-full object-contain"
            />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex w-full max-w-3xl flex-col items-center text-center text-white"
        >
          <p className="text-xs uppercase tracking-[0.6em] text-pewter/60">
            {photo.location}
          </p>
          <h1 className="mt-3 text-4xl font-light tracking-tight md:text-5xl">
            {photo.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm text-pewter/70">
            <span>{photo.camera}</span>
            <span>•</span>
            <span>{metadata.formattedDate}</span>
          </div>
        </motion.div>
      </div>
      <div className="relative z-30 flex flex-wrap items-center justify-between px-6 pb-10 text-xs uppercase tracking-[0.5em] text-pewter/60 md:px-12">
        <button
          type="button"
          onClick={() => router.push('/#wall')}
          className="rounded-full border border-white/10 px-6 py-3 text-white/80 transition hover:border-white/40 hover:text-white"
        >
          Back to Wall
        </button>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo(prevPhoto)}
            disabled={!prevPhoto}
            className="rounded-full border border-white/10 px-5 py-3 text-white/80 transition hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:border-white/5 disabled:text-white/30"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => navigateTo(nextPhoto)}
            disabled={!nextPhoto}
            className="rounded-full border border-white/10 px-5 py-3 text-white/80 transition hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:border-white/5 disabled:text-white/30"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
