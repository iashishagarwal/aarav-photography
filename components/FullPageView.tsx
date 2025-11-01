'use client';

import NextImage from 'next/image';
import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Camera,
  MapPin,
} from 'lucide-react';
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

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    [prevPhoto, nextPhoto].forEach((frame) => {
      if (!frame) return;
      const preload = new window.Image();
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
  const overlayOpacity = useTransform(x, [-320, 0, 320], [1, 0.95, 1]);

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

  const isBright = useMemo(() => {
    let hex = (photo.dominantColor ?? '#10131d').replace('#', '');
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }
    if (hex.length !== 6) return false;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.58;
  }, [photo.dominantColor]);

  const overlayGradient = isBright
    ? 'from-black/88 via-black/55 to-black/90'
    : 'from-black/68 via-black/28 to-black/74';
  const labelClass = isBright ? 'text-white/75' : 'text-white/65';
  const titleClass = isBright
    ? 'text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.55)]'
    : 'text-white/95 drop-shadow-[0_10px_35px_rgba(0,0,0,0.45)]';
  const metaClass = isBright ? 'text-white/85' : 'text-white/70';
  const navButtonTone = isBright
    ? 'border-white/35 bg-black/55 text-white/85'
    : 'border-white/20 bg-black/45 text-white/70';
  const backButtonTone = isBright
    ? 'border-white/35 bg-black/55 text-white/85'
    : 'border-white/25 bg-black/40 text-white/80';

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <NextImage
        src={photo.url}
        alt={photo.title}
        fill
        priority
        placeholder="blur"
        blurDataURL={blurDataURL}
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover"
      />
      <motion.div
        className={`absolute inset-0 z-10 bg-gradient-to-b ${overlayGradient}`}
        style={{ opacity: overlayOpacity }}
      />

      <motion.button
        type="button"
        onClick={() => router.push('/#wall')}
        className={`group absolute left-6 top-8 z-40 flex h-11 w-11 items-center justify-center rounded-full ${backButtonTone} backdrop-blur-md transition hover:border-white/60 hover:text-white md:left-10 md:top-10`}
        whileTap={{ scale: 0.94 }}
      >
        <ArrowLeft className="h-4.5 w-4.5" strokeWidth={1.6} />
      </motion.button>

      <motion.button
        type="button"
        onClick={() => navigateTo(prevPhoto)}
        disabled={!prevPhoto}
        className={`group absolute left-6 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full ${navButtonTone} backdrop-blur-md transition hover:border-white/60 hover:text-white disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/30 md:left-10`}
        whileTap={{ scale: 0.92 }}
      >
        <ArrowLeft className="h-5 w-5" strokeWidth={1.6} />
      </motion.button>

      <motion.button
        type="button"
        onClick={() => navigateTo(nextPhoto)}
        disabled={!nextPhoto}
        className={`group absolute right-6 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full ${navButtonTone} backdrop-blur-md transition hover:border-white/60 hover:text-white disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/30 md:right-10`}
        whileTap={{ scale: 0.92 }}
      >
        <ArrowRight className="h-5 w-5" strokeWidth={1.6} />
      </motion.button>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.08}
        onDragEnd={dragEnd}
        style={{ x }}
        className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 z-50 px-6 pb-12 md:px-16 md:pb-16"
      >
        <div className="max-w-4xl space-y-5">
          <p className={`flex items-center gap-3 text-xs uppercase tracking-[0.5em] ${labelClass}`}>
            <MapPin className="h-4 w-4" strokeWidth={1.4} />
            {photo.location}
          </p>
          <h1 className={`text-4xl font-light tracking-tight sm:text-5xl md:text-6xl ${titleClass}`}>
            {photo.title}
          </h1>
          <div className={`mt-6 flex flex-wrap items-center gap-6 text-sm ${metaClass}`}>
            <span className="flex items-center gap-2">
              <Camera className="h-4 w-4" strokeWidth={1.3} />
              {photo.camera}
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" strokeWidth={1.3} />
              {metadata.formattedDate}
            </span>
            <span className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4" strokeWidth={1.3} />
              #{String(photo.id).padStart(3, '0')}
            </span>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
