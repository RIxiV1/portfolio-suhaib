'use client';

import { motion, type Transition, type Variants } from 'framer-motion';
import { MapPin, Code2, Coffee, Rocket, Github, Briefcase } from 'lucide-react';

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as unknown as Transition['ease'],
    },
  },
};

function BentoCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.2 }}
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
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col mb-14"
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
          About
        </span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient">
          A bit about me.
        </h2>
      </motion.div>

      {/* Bento grid */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-6 gap-4"
      >
        {/* Main bio — large card */}
        <BentoCard className="md:col-span-4">
          <div className="flex items-center gap-2 mb-5" style={{ color: 'var(--primary)' }}>
            <Code2 className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Who I am</span>
          </div>
          <p className="text-xl md:text-2xl leading-relaxed font-light mb-5">
            Junior developer. Based in India. I like to{' '}
            <span className="text-gradient-blue font-semibold">build and break stuff</span>.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            I write code that solves real problems — Chrome extensions, AI-powered tools, and
            full-stack web apps. I care about good UX, clean architecture, and shipping things
            that actually work. Currently open to internships, full-time roles, and freelance.
          </p>
        </BentoCard>

        {/* Location */}
        <BentoCard className="md:col-span-2 flex flex-col justify-between gap-4">
          <div className="flex items-center gap-2" style={{ color: 'var(--accent)' }}>
            <MapPin className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Location</span>
          </div>
          <div>
            <p className="text-2xl font-bold mb-1">India</p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Working remotely. Available worldwide.
            </p>
          </div>
        </BentoCard>

        {/* Open to work */}
        <BentoCard className="md:col-span-2 flex flex-col items-center justify-center text-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span
              className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color: '#34d399' }}
            >
              Open to work
            </span>
          </div>
          <div className="text-5xl font-bold text-gradient-blue">5</div>
          <p className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
            public projects
          </p>
        </BentoCard>

        {/* Focus */}
        <BentoCard className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4" style={{ color: 'var(--primary)' }}>
            <Rocket className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Focus</span>
          </div>
          <ul className="text-sm space-y-2" style={{ color: 'var(--muted)' }}>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--primary)]" />
              Full-stack web apps
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--primary)]" />
              AI tooling &amp; automation
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--primary)]" />
              Chrome extensions
            </li>
          </ul>
        </BentoCard>

        {/* Currently */}
        <BentoCard className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4" style={{ color: '#f59e0b' }}>
            <Coffee className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Currently</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            Building side projects, contributing to open-source, and learning every day.
            Fuelled by caffeine and curiosity.
          </p>
        </BentoCard>
      </motion.div>
    </section>
  );
}
