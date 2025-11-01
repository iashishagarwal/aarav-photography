import data from '@/data/photos.json';
import { Photo } from '@/types/photo';

const photos = (data as Photo[]).sort((a, b) => a.id - b.id);

export function getAllPhotos(): Photo[] {
  return photos;
}

export function getPhotoChunks(chunkSize: number) {
  const result: Photo[][] = [];
  for (let i = 0; i < photos.length; i += chunkSize) {
    result.push(photos.slice(i, i + chunkSize));
  }
  return result;
}

export function getPhotoById(id: number) {
  return photos.find((photo) => photo.id === Number(id));
}
