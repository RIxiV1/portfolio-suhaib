'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';

function FloatingOrb({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={style}
    />
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background orbs */}
      <FloatingOrb className="w-[600px] h-[600px] -top-40 -left-40 opacity-10"
        style={{ background: 'radial-gradient(circle, #256af4, transparent)' } as React.CSSProperties}
      />
      <FloatingOrb className="w-[500px] h-[500px] -bottom-20 -right-20 opacity-10"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' } as React.CSSProperties}
      />

      {/* Static grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <motion.div
        style={{ y, opacity }}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 container-narrow flex flex-col items-center text-center gap-8"
      >
        {/* Status badge */}
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-mono text-[var(--muted)] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for work
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={item} className="flex flex-col gap-2">
          <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-bold tracking-[-0.04em] leading-none text-gradient">
            SUHAIB
          </h1>
          <p className="text-[clamp(1.1rem,3vw,1.8rem)] font-light text-[var(--muted)] tracking-tight">
            I build{' '}
            <span className="text-gradient-blue font-medium">(and break)</span>
            {' '}things for the web.
          </p>
        </motion.div>

        {/* Sub-description */}
        <motion.p
          variants={item}
          className="max-w-lg text-sm leading-relaxed text-[var(--muted)]"
        >
          Junior dev. Based in India. Open to internships, full-time roles & freelance.
          Let's make something worth breaking.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap items-center gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-full font-semibold text-white transition-all hover:scale-[1.03] active:scale-[0.97]"
            style={{ background: 'var(--primary)', boxShadow: '0 0 40px var(--primary-glow)' }}
          >
            View my work
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full font-semibold glass glass-hover transition-all hover:scale-[1.03] active:scale-[0.97]"
          >
            Get in touch
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={item} className="flex items-center gap-4">
          {[
            { icon: Github, href: 'https://github.com/RIxiV1', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/shaiksuhaib', label: 'LinkedIn' },
            { icon: Twitter, href: 'https://x.com/suhaibX0', label: 'Twitter' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 glass glass-hover rounded-xl transition-all hover:scale-110 hover:text-[var(--primary)]"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--muted)]"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
