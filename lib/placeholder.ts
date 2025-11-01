import { Buffer } from 'buffer';

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export function getBlurDataURL(color = '#111', ratio = 1) {
  const width = 16;
  const height = Math.max(1, Math.round(width / Math.max(ratio, 0.25)));
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' preserveAspectRatio='none'><rect width='100%' height='100%' fill='${color}' /></svg>`;
  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}
