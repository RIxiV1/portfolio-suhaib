'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Work', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Journey', href: '#experience' },
  { name: 'Writing', href: '#writing' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500',
        scrolled
          ? 'py-3 bg-[#050505]/80 backdrop-blur-md border-b border-white/10'
          : 'py-6'
      )}
    >
      <nav className="container-narrow py-0 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 overflow-hidden rounded-lg border border-white/10 group-hover:border-white/30 transition-colors">
            <Image
              src="/logo.png"
              alt="Suhaib Logo"
              fill
              className="object-contain p-1 scale-150 rotate-[-15deg] group-hover:rotate-0 transition-transform duration-500 bg-black"
            />
          </div>
          <span className="hidden sm:block font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
            suhaib.dev
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 px-6 py-2.5 rounded-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="mailto:shaiksuhaib360@gmail.com"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-white text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Hire me
          </a>

          <button
            className="p-2.5 bg-white/5 border border-white/10 rounded-xl md:hidden text-white hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#0a0a0a] border-y border-white/10 mt-4"
          >
            <div className="container-narrow py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-bold tracking-tight text-neutral-300 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="mailto:shaiksuhaib360@gmail.com"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                shaiksuhaib360@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
