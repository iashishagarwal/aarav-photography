import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { GalleryProvider } from '@/components/providers/gallery-provider';
import { Navbar } from '@/components/Navbar';
import { FloatingControlRail } from '@/components/FloatingControlRail';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Aarav Agarwal — Traveling Nightscape Photographer',
  description:
    'Portfolio of Aarav Agarwal, a high school storyteller capturing nature, travel, and night skies in cinematic detail.',
  openGraph: {
    title: 'Aarav Agarwal — Traveling Nightscape Photographer',
    description:
      'Explore the roaming nature and night photography of Aarav Agarwal, a high school traveler chasing light across the globe.',
    url: 'https://example.com',
    siteName: 'Aarav Agarwal Photography',
    images: [
      {
        url: '/og-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Aarav Agarwal Photography Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aarav Agarwal — Traveling Nightscape Photographer',
    description:
      'A cinematic, fluid photography portfolio capturing nature, travel, and the night sky.',
    images: ['/og-preview.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} bg-graphite font-sans text-mist transition-colors duration-700 antialiased dark:bg-graphite dark:text-mist`}
      >
        <ThemeProvider>
          <GalleryProvider>
            <div className="relative flex min-h-screen flex-col bg-graphite text-mist transition-colors duration-700">
              <Navbar />
              <main className="flex-1">{children}</main>
              <FloatingControlRail />
            </div>
          </GalleryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
