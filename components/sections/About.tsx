'use client';

import { motion } from 'framer-motion';
import { User, Globe, Code2, Zap, Coffee } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      className={`glass glass-hover rounded-3xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding container-narrow">
      {/* Section header */}
      <motion.div {...fadeUp()} className="flex flex-col mb-14">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-3">Perspective</span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient">A bit about me.</h2>
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

        {/* Main bio */}
        <BentoCard className="md:col-span-4">
          <div className="flex items-center gap-2 text-[var(--primary)] mb-5">
            <User className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Who I am</span>
          </div>
          <p className="text-xl md:text-2xl leading-relaxed font-light text-[var(--foreground)]">
            Junior dev. Based in India. I like to
            {' '}<span className="text-gradient-blue font-semibold">build and break stuff</span>.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">
            Open to Internships, full-time roles and freelance work.
            Let's make something worth breaking.
          </p>
        </BentoCard>

        {/* Location */}
        <BentoCard className="md:col-span-2 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[var(--accent)] mb-4">
            <Globe className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Base</span>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-1">India</h3>
            <p className="text-sm text-[var(--muted)]">Working remotely worldwide</p>
          </div>
        </BentoCard>

        {/* Status */}
        <BentoCard className="md:col-span-2 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">Open to work</span>
          </div>
          <div className="text-5xl font-bold text-gradient-blue mt-2">5</div>
          <p className="text-[var(--muted)] font-mono text-xs uppercase tracking-widest mt-1">public projects</p>
        </BentoCard>

        {/* Focus */}
        <BentoCard className="md:col-span-2">
          <div className="flex items-center gap-2 text-[var(--primary)] mb-4">
            <Code2 className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Focus</span>
          </div>
          <p className="text-base font-medium">
            Full-stack web apps, AI tooling, and Chrome extensions.
          </p>
        </BentoCard>

        {/* Hobby */}
        <BentoCard className="md:col-span-2">
          <div className="flex items-center gap-2 text-amber-400 mb-4">
            <Coffee className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Fuel</span>
          </div>
          <p className="text-base font-medium">
            Caffeine + curiosity. Late-night debugging sessions that turn into features.
          </p>
        </BentoCard>
      </div>
    </section>
  );
}
