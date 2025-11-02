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
        className="relative border-t border-slate-200 bg-gradient-to-b from-white via-slate-100 to-slate-200 py-20 text-slate-900 dark:border-white/10 dark:from-obsidian dark:via-graphite dark:to-graphite dark:text-mist"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(56,189,248,0.22),transparent_65%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.18),transparent_55%)] opacity-70" />
        <div className="relative mx-auto max-w-4xl space-y-7 px-6 text-center md:px-12">
          <p className="text-xs uppercase tracking-[0.6em] text-slate-500 dark:text-mist/60">
            About
          </p>
          <h2 className="text-3xl font-light tracking-tight text-slate-900 dark:text-mist md:text-4xl">
            Meet Aarav Agarwal — the student who never travels without a tripod.
          </h2>
          <p className="text-base leading-relaxed text-slate-600 dark:text-mist/70 md:text-lg">
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
