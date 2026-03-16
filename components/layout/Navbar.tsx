'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Command } from 'lucide-react';
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
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500",
      scrolled ? "py-3" : "py-6"
    )}>
      <nav className="container-narrow flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center font-bold text-white text-sm">S</div>
          <span className="hidden sm:block font-semibold tracking-tight">suhaib.dev</span>
        </motion.a>

        {/* Desktop nav */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="hidden md:flex items-center glass px-6 py-2.5 rounded-full gap-8"
        >
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[var(--muted)] hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--primary)] transition-all group-hover:w-full" />
              </a>
            ))}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <a
            href="mailto:shaiksuhaib360@gmail.com"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{ background: 'var(--primary)', color: '#fff' }}
          >
            Hire me
          </a>

          <button
            className="p-2.5 glass rounded-xl md:hidden"
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden glass border-x-0 border-b mt-4"
          >
            <div className="container-narrow py-8 flex flex-col gap-6">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-bold tracking-tight hover:text-[var(--primary)] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="mailto:shaiksuhaib360@gmail.com"
                className="text-[var(--muted)] hover:text-white transition-colors"
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
