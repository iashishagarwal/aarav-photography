'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
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
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40"
    >
      <div className="relative mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-6 text-mist">
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-[20px] bg-gradient-to-r from-transparent via-[#1F2937]/40 to-transparent backdrop-blur-xl" />
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl">
            <Image
              src="/aarav-icon.svg"
              alt="Aarav Agarwal mark"
              width={40}
              height={40}
              className="transition group-hover:scale-105"
              priority
            />
          </div>
          <div className="leading-tight">
            <span className="block text-[0.62rem] uppercase tracking-[0.5em] text-mist/70">
              Aarav
            </span>
            <span className="block text-base font-semibold tracking-[0.1em] text-mist">
              Agarwal
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-9 text-[0.7rem] uppercase tracking-[0.42em]">
          {navLinks.map((item) => {
            const isAnchor = item.href.includes('#');
            const isActive = isAnchor
              ? pathname === '/' && typeof window !== 'undefined' && window.location.hash === `#${item.href.split('#')[1]}`
              : item.href.startsWith('/photo')
                  ? pathname.startsWith('/photo')
                  : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative pb-1 transition ${
                  isActive ? 'text-mist' : 'text-mist/55 hover:text-mist'
                }`}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-underline-floating"
                    className="absolute -bottom-[2px] left-0 h-[2px] w-full bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-silver"
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-[4.25rem] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </motion.nav>
  );
}
