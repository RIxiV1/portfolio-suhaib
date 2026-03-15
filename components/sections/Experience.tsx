'use client';

import { motion } from 'framer-motion';
import { experience } from '@/data/experience';
import { Briefcase, GraduationCap, FolderGit2 } from 'lucide-react';

const icons = {
  work: Briefcase,
  education: GraduationCap,
  project: FolderGit2,
};

const colors = {
  work: 'var(--primary)',
  education: 'var(--accent)',
  project: '#10b981',
};

export default function Experience() {
  return (
    <section id="experience" className="section-padding container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col mb-14"
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-3">Journey</span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient">My Story.</h2>
      </motion.div>

      <div className="relative">
        {/* Vertical neon line */}
        <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, var(--primary), var(--accent), rgba(255,255,255,0.05))' }} />

        <div className="space-y-8">
          {experience.map((exp, i) => {
            const Icon = icons[exp.type];
            const color = colors[exp.type];
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-16"
              >
                {/* Node */}
                <div
                  className="absolute left-0 w-12 h-12 rounded-2xl flex items-center justify-center border"
                  style={{ background: `${color}15`, borderColor: `${color}40`, color }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="glass glass-hover rounded-2xl p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold">{exp.role}</h3>
                      <p className="text-sm font-mono" style={{ color }}>{exp.org}</p>
                    </div>
                    <span className="text-xs font-mono text-[var(--muted)] px-3 py-1.5 glass rounded-full">{exp.period}</span>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider border"
                        style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--muted)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
