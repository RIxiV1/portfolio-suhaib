'use client';

import { motion } from 'framer-motion';

const techs = [
  { name: 'JavaScript', icon: '⚡', color: '#f0db4f' },
  { name: 'TypeScript', icon: '🔷', color: '#3178c6' },
  { name: 'Python', icon: '🐍', color: '#3572a5' },
  { name: 'React', icon: '⚛️', color: '#61dafb' },
  { name: 'Next.js', icon: '▲', color: '#ffffff' },
  { name: 'Node.js', icon: '🟢', color: '#83cd29' },
  { name: 'Tailwind', icon: '🎨', color: '#38bdf8' },
  { name: 'HTML', icon: '🌐', color: '#e34c26' },
  { name: 'CSS', icon: '🖌️', color: '#264de4' },
  { name: 'SQL', icon: '🗄️', color: '#f29111' },
  { name: 'Git', icon: '🔗', color: '#f05032' },
  { name: 'Chrome API', icon: '🌍', color: '#4285f4' },
];

export default function TechStack() {
  return (
    <section className="py-24 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container-narrow mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-3 block">Toolkit</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gradient">Tools of the trade.</h2>
        </motion.div>
      </div>

      {/* Infinite scroll track */}
      <div className="relative flex overflow-x-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }} />
        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }} />

        <motion.div
          animate={{ x: [0, -(techs.length * 192) / 2] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="flex gap-6 py-4 whitespace-nowrap"
        >
          {[...techs, ...techs].map((tech, i) => (
            <motion.div
              key={`${tech.name}-${i}`}
              whileHover={{ scale: 1.08, y: -4 }}
              className="flex items-center gap-3 px-6 py-4 glass glass-hover rounded-2xl cursor-default min-w-[160px]"
            >
              <span className="text-2xl">{tech.icon}</span>
              <span className="font-medium text-sm">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
