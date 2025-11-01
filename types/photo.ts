export type Photo = {
  id: number;
  url: string;
  title: string;
  camera: string;
  location: string;
  date: string;
  orientation?: 'landscape' | 'portrait' | 'square';
  aspectRatio?: number;
  dominantColor?: string;
};
