'use client';

import { Photo } from '@/types/photo';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { getBlurDataURL } from '@/lib/placeholder';
import { useGallery } from '@/components/providers/gallery-provider';

type PhotoCardProps = {
  photo: Photo;
  onSelect?: (photo: Photo) => void;
  priority?: boolean;
  index: number;
};

const fadeVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function PhotoCard({ photo, onSelect, priority, index }: PhotoCardProps) {
  const { setActivePhotoId } = useGallery();
  const [isLoaded, setLoaded] = useState(false);

  const handleClick = useCallback(() => {
    setActivePhotoId(photo.id);
    onSelect?.(photo);
  }, [photo, onSelect, setActivePhotoId]);

  const aspectRatio = photo.aspectRatio ?? 1.5;
  const blurDataURL = getBlurDataURL(photo.dominantColor ?? '#101113', aspectRatio);

  return (
    <motion.article
      layout
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.035, 0.25),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ translateY: -6 }}
      className="group relative flex cursor-pointer flex-col overflow-hidden border border-slate-200 bg-white shadow-[0_25px_60px_-40px_rgba(15,23,42,0.35)] transition duration-400 hover:border-accent-cyan/60 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_25px_60px_-40px_rgba(8,11,22,0.65)]"
      onClick={handleClick}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: '3 / 4' }}
      >
        <Image
          src={photo.url}
          alt={photo.title}
          width={1200}
          height={Math.round(1200 / aspectRatio)}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, (max-width: 1600px) 28vw, 22vw"
          priority={priority}
          placeholder="blur"
          blurDataURL={blurDataURL}
          className={`h-full w-full object-cover transition duration-[1600ms] ${
            isLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}
          onLoad={() => setLoaded(true)}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/35 to-transparent opacity-0 transition duration-400 group-hover:opacity-100" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition duration-400 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-accent-cyan/70">
            {photo.location}
          </p>
          <h3 className="mt-1 text-lg font-medium text-white drop-shadow-[0_4px_12px_rgba(17,10,4,0.35)]">
            {photo.title}
          </h3>
          <p className="mt-2 text-[0.68rem] uppercase tracking-[0.25em] text-accent-cyan/65">
            {photo.camera} · {new Date(photo.date).toLocaleDateString(undefined, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </motion.div>
      </div>
    </motion.article>
  );
}
