'use client';

import { motion } from 'framer-motion';
import { MapPin, Code2, Coffee, Rocket } from 'lucide-react';

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className="section-padding container-narrow">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col mb-10"
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
          About
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          A bit about me.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* Main bio — large card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="md:col-span-4 bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-8 hover:bg-[#111] transition-colors"
        >
          <div className="flex items-center gap-2 mb-5 text-neutral-300">
            <Code2 className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Who I am</span>
          </div>
          <p className="text-xl md:text-2xl leading-relaxed font-light mb-5 text-white">
            CS student & developer. Based in India. I like to{' '}
            <span className="font-medium">build and break stuff</span>.
          </p>
          <p className="text-sm leading-relaxed text-neutral-400">
            I write code that solves real problems — Chrome extensions, AI-powered tools, and
            full-stack web apps. I care about good UX, clean architecture, and shipping things
            that actually work. Currently open to internships, full-time roles, and freelance.
          </p>
        </motion.div>

        {/* Location */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="md:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 flex flex-col justify-between gap-4 hover:bg-[#111] transition-colors"
        >
          <div className="flex items-center gap-2 text-neutral-300">
            <MapPin className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Location</span>
          </div>
          <div>
            <p className="text-2xl font-bold mb-1 text-white">India</p>
            <p className="text-sm text-neutral-400">
              Working remotely. Available worldwide.
            </p>
          </div>
        </motion.div>

        {/* Open to work */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="md:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-3 hover:bg-[#111] transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
              Open to work
            </span>
          </div>
          <div className="text-5xl font-bold text-white">4</div>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            public projects
          </p>
        </motion.div>

        {/* Focus */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="md:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 hover:bg-[#111] transition-colors"
        >
          <div className="flex items-center gap-2 mb-4 text-neutral-300">
            <Rocket className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Focus</span>
          </div>
          <ul className="text-sm space-y-2 text-neutral-400">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              Full-stack web apps
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              AI tooling & automation
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              Chrome extensions
            </li>
          </ul>
        </motion.div>

        {/* Currently */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="md:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 hover:bg-[#111] transition-colors"
        >
          <div className="flex items-center gap-2 mb-4">
            <Coffee className="w-4 h-4 text-amber-500" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-300">Currently</span>
          </div>
          <p className="text-sm leading-relaxed text-neutral-400">
            Building side projects, contributing to open-source, and learning every day.
            Fuelled by caffeine and curiosity.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
