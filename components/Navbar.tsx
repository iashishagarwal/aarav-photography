'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Gallery' },
  { href: '/photo/1', label: 'Full View' },
  { href: '/#about', label: 'About' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 flex h-[4.75rem] items-center justify-between border-b border-white/10 bg-[linear-gradient(135deg,rgba(15,18,38,0.95),rgba(32,38,79,0.9))] px-6 text-white shadow-[0_20px_60px_-25px_rgba(8,12,26,0.75)] backdrop-blur-3xl md:px-12"
    >
      <Link href="/" className="group flex items-center space-x-4">
        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/25 bg-white/10 transition group-hover:border-white/80">
          <motion.span
            layoutId="logo-orbit"
            className="absolute inset-0 scale-110 bg-radial-glow opacity-60 blur-sm group-hover:opacity-90"
            transition={{ type: 'spring', stiffness: 120, damping: 24 }}
          />
          <Image
            src="/aarav-mark.svg"
            alt="Aarav Agarwal monogram"
            width={44}
            height={44}
            className="relative z-10"
            priority
          />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.6em] text-white/50">
            Aarav
          </p>
          <p className="text-lg font-medium text-white">Agarwal</p>
        </div>
      </Link>
      <div className="hidden gap-10 text-sm uppercase tracking-[0.45em] text-white/60 lg:flex">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== '/' && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative transition ${
                isActive ? 'text-white' : 'hover:text-white/80'
              }`}
            >
              {link.label}
              {isActive ? (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-2 left-0 h-[2px] w-full bg-gradient-to-r from-accent-blue to-accent-silver"
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              ) : null}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
