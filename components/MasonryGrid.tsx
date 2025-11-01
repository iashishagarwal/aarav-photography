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
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
