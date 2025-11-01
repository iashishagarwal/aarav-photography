import { WallGallery } from '@/components/gallery/WallGallery';
import { getAllPhotos } from '@/lib/photos';
import { Suspense } from 'react';

export default function Home() {
  const photos = getAllPhotos();
  return (
    <>
      <Suspense fallback={null}>
        <WallGallery photos={photos} />
      </Suspense>
      <section
        id="about"
        className="relative border-t border-black/10 bg-gradient-to-b from-white via-[#f5f6f8] to-white/80 py-24 text-charcoal dark:border-white/10 dark:from-black/70 dark:via-midnight dark:to-black/95 dark:text-white"
      >
        <div className="absolute inset-0 bg-radial-glow opacity-40" />
        <div className="relative mx-auto max-w-4xl space-y-8 px-6 text-center md:px-12">
          <p className="text-xs uppercase tracking-[0.7em] text-pewter/60">
            About
          </p>
          <h2 className="text-3xl font-light tracking-tight text-white md:text-4xl">
            Meet Aarav Agarwal — the student who never travels without a tripod.
          </h2>
          <p className="text-base leading-relaxed text-pewter/70 md:text-lg">
            As a high school explorer, Aarav documents the world between classes,
            from mist-soaked forests to the quiet electricity of city nights.
            Passion for nature and astrophotography fuels every journey, and this
            portfolio stitches those travels into an immersive, cinematic flow.
            Scroll to experience the night skies, rugged trails, and fleeting
            light that shape his story.
          </p>
        </div>
      </section>
    </>
  );
}
