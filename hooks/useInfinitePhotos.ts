import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Photo } from '@/types/photo';

type UseInfinitePhotosOptions = {
  chunkSize?: number;
  initialChunks?: number;
};

export function useInfinitePhotos(
  photos: Photo[],
  { chunkSize = 10, initialChunks = 2 }: UseInfinitePhotosOptions = {},
) {
  const [visibleCount, setVisibleCount] = useState(
    Math.min(photos.length, chunkSize * initialChunks),
  );
  const [isExhausted, setExhausted] = useState(
    photos.length <= chunkSize * initialChunks,
  );
  const [isFetching, setFetching] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(Math.min(photos.length, chunkSize * initialChunks));
    setExhausted(photos.length <= chunkSize * initialChunks);
  }, [photos, chunkSize, initialChunks]);

  const visiblePhotos = useMemo(
    () => photos.slice(0, visibleCount),
    [photos, visibleCount],
  );

  const loadMore = useCallback(() => {
    setFetching(true);
    setVisibleCount((prev) => {
      const next = Math.min(prev + chunkSize, photos.length);
      if (next >= photos.length) {
        setExhausted(true);
      }
      return next;
    });
  }, [chunkSize, photos.length]);

  useEffect(() => {
    if (!isFetching) {
      return;
    }
    const timeout = setTimeout(() => setFetching(false), 320);
    return () => clearTimeout(timeout);
  }, [isFetching]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isExhausted) {
            loadMore();
          }
        });
      },
      { rootMargin: '200px', threshold: 0.1 },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [isExhausted, loadMore]);

  return {
    visiblePhotos,
    sentinelRef,
    isExhausted,
    isFetching,
    visibleCount,
    total: photos.length,
  };
}
