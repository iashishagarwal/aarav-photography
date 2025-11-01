'use client';

import { Photo } from '@/types/photo';
import { PhotoCard } from '@/components/PhotoCard';
import { motion } from 'framer-motion';
import { useCallback } from 'react';

type MasonryGridProps = {
  photos: Photo[];
  onPhotoSelect: (photo: Photo) => void;
};

export function MasonryGrid({ photos, onPhotoSelect }: MasonryGridProps) {
  const handleSelect = useCallback(
    (photo: Photo) => {
      onPhotoSelect(photo);
    },
    [onPhotoSelect],
  );

  return (
    <motion.div
      layout
      className="columns-1 gap-6 sm:columns-2 md:gap-8 lg:columns-3 xl:columns-4 2xl:columns-5"
    >
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          onSelect={handleSelect}
          priority={index < 6}
          index={index}
        />
      ))}
    </motion.div>
  );
}
