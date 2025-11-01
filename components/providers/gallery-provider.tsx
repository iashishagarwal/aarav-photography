'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

export type GalleryMode = 'wall' | 'focus';

type GalleryContextValue = {
  mode: GalleryMode;
  setMode: Dispatch<SetStateAction<GalleryMode>>;
  activePhotoId: number | null;
  setActivePhotoId: Dispatch<SetStateAction<number | null>>;
};

const GalleryContext = createContext<GalleryContextValue | undefined>(
  undefined,
);

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<GalleryMode>('wall');
  const [activePhotoId, setActivePhotoId] = useState<number | null>(null);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      activePhotoId,
      setActivePhotoId,
    }),
    [mode, activePhotoId],
  );

  return (
    <GalleryContext.Provider value={value}>
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
}
