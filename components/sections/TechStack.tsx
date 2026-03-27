'use client';

import { motion } from 'framer-motion';

const techs = [
  { name: 'JavaScript', icon: '⚡' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Python', icon: '🐍' },
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'HTML', icon: '🌐' },
  { name: 'CSS', icon: '🖌️' },
  { name: 'SQL', icon: '🗄️' },
  { name: 'Git', icon: '🔗' },
  { name: 'Chrome API', icon: '🌍' },
];

export default function TechStack() {
  return (
    <section className="py-24 border-y border-white/10 bg-[#050505]">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3 block">Toolkit</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Tools of the trade.</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center justify-center gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <span className="text-3xl">{tech.icon}</span>
              <span className="font-medium text-sm text-neutral-300">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
