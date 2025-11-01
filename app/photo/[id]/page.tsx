import { FullPageView } from '@/components/FullPageView';
import { getAllPhotos, getPhotoById } from '@/lib/photos';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type PhotoPageProps = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return getAllPhotos().map((photo) => ({ id: String(photo.id) }));
}

export function generateMetadata({ params }: PhotoPageProps): Metadata {
  const photo = getPhotoById(Number(params.id));
  if (!photo) {
    return {
      title: 'Photo not found — Aarav Agarwal',
    };
  }

  return {
    title: `${photo.title} — Aarav Agarwal`,
    description: `${photo.title}, captured on ${photo.camera} in ${photo.location}.`,
    openGraph: {
      title: photo.title,
      description: `${photo.camera} · ${photo.location}`,
      images: [
        {
          url: photo.url,
          width: 1600,
          height: Math.round(1600 / (photo.aspectRatio ?? 1.5)),
          alt: photo.title,
        },
      ],
    },
  };
}

export default function PhotoPage({ params }: PhotoPageProps) {
  const photoId = Number(params.id);
  const photo = getPhotoById(photoId);

  if (!photo) {
    notFound();
  }

  const photos = getAllPhotos();
  const index = photos.findIndex((frame) => frame.id === photoId);
  const prevPhoto = index > 0 ? photos[index - 1] : null;
  const nextPhoto = index < photos.length - 1 ? photos[index + 1] : null;

  return <FullPageView photo={photo} prevPhoto={prevPhoto} nextPhoto={nextPhoto} />;
}
