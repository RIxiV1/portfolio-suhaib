'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { projects, Project } from '@/data/projects';
import { ExternalLink, Github, X, Code2, Eye } from 'lucide-react';

const CATEGORIES = ['All', 'AI', 'Frontend'];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        className="relative w-full max-w-5xl max-h-[88vh] overflow-y-auto glass rounded-[2rem] border"
        style={{ borderColor: 'var(--border-hover)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 glass glass-hover rounded-full z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left */}
          <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <div className="aspect-video rounded-2xl overflow-hidden mb-8 border relative" style={{ borderColor: 'var(--border)' }}>
              <Image 
                src={project.thumbnail} 
                alt={project.title} 
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
            <p className="text-sm font-mono text-[var(--muted)] mb-5">{project.tagline}</p>
            <p className="text-[var(--muted)] leading-relaxed mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map(t => (
                <span key={t} className="px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest border"
                  style={{ background: 'rgba(37,106,244,0.1)', borderColor: 'rgba(37,106,244,0.3)', color: 'var(--primary)' }}>
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-xl font-mono uppercase tracking-wider text-xs font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                <ExternalLink className="w-4 h-4" /> View Project
              </a>
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                className="px-5 py-3.5 glass glass-hover rounded-xl flex items-center justify-center transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right: Code preview */}
          <div className="p-8 md:p-10" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="flex items-center gap-2 text-[var(--primary)] mb-6">
              <Code2 className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">Architecture Preview</span>
            </div>
            {project.codeSnippet && (
              <div className="relative rounded-2xl overflow-hidden border mb-6"
                style={{ background: '#0d0d11', borderColor: 'var(--border)' }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-transparent opacity-60" />
                <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                  {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                    <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <pre className="p-5 text-xs md:text-sm leading-relaxed overflow-x-auto" style={{ color: '#a9b1d6', fontFamily: 'var(--font-jetbrains), monospace' }}>
                  <code>{project.codeSnippet}</code>
                </pre>
              </div>
            )}
            <div className="glass p-5 rounded-2xl">
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--muted)] mb-2">Status</p>
              <p className="text-sm">Production-ready. Built following industrial patterns.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects.filter(p => category === 'All' || p.tags.includes(category));

  return (
    <>
      <section id="projects" className="section-padding container-narrow">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-3 block">Selected Works</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient">What I've built.</h2>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-2 flex-wrap"
          >
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-all"
                style={category === c
                  ? { background: 'var(--primary)', borderColor: 'var(--primary)', color: 'var(--primary-foreground)', boxShadow: '0 0 20px var(--primary-glow)' }
                  : { background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--muted)' }
                }
              >
                {c}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -5, boxShadow: '0 10px 40px -10px var(--primary-glow)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(project)}
                className="group glass glass-hover rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={project.thumbnail} 
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Preview icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-4 rounded-full border"
                      style={{ background: 'rgba(37,106,244,0.2)', backdropFilter: 'blur(8px)', borderColor: 'rgba(37,106,244,0.4)' }}>
                      <Eye className="w-6 h-6 text-[var(--primary)]" />
                    </div>
                  </div>

                  {/* Top-right links */}
                  <div className="absolute top-4 right-4 flex gap-2 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all z-10"
                    onClick={e => e.stopPropagation()}>
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                      className="p-2 glass rounded-full hover:text-[var(--primary)] transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Featured tag */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest border"
                        style={{ background: 'rgba(37,106,244,0.2)', borderColor: 'rgba(37,106,244,0.4)', color: 'var(--primary)' }}>
                        featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-8">
                  <h3 className="text-lg font-bold mb-1 group-hover:text-[var(--primary)] transition-colors">{project.title}</h3>
                  <p className="text-xs font-mono text-[var(--muted)] mb-4">{project.tagline}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider border"
                        style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--muted)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
