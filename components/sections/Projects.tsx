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
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl max-h-[88vh] overflow-y-auto bg-[#0a0a0a] rounded-3xl border border-white/10"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-white/5 hover:bg-white/10 rounded-full z-10 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left */}
          <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/5">
            <div className="aspect-video rounded-2xl overflow-hidden mb-8 border border-white/10 relative">
              <Image 
                src={project.thumbnail} 
                alt={project.title} 
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-white">{project.title}</h2>
            <p className="text-sm font-mono text-neutral-400 mb-5">{project.tagline}</p>
            <p className="text-neutral-300 leading-relaxed mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map(t => (
                <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-xl font-mono uppercase tracking-wider text-xs font-bold flex items-center justify-center gap-2 bg-white text-black transition-transform hover:scale-105">
                <ExternalLink className="w-4 h-4" /> View Project
              </a>
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                className="px-5 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl flex items-center justify-center transition-colors text-white">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right: Code preview */}
          <div className="p-8 md:p-10 bg-black/40">
            <div className="flex items-center gap-2 text-white mb-6">
              <Code2 className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">Architecture Preview</span>
            </div>
            {project.codeSnippet && (
              <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-6 bg-black">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <pre className="p-5 text-xs md:text-sm leading-relaxed overflow-x-auto text-neutral-300 font-mono">
                  <code>{project.codeSnippet}</code>
                </pre>
              </div>
            )}
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">Status</p>
              <p className="text-sm text-neutral-300">Production-ready. Built following industrial patterns.</p>
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3 block">Selected Works</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">What I've built.</h2>
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
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-colors ${
                  category === c 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
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
                transition={{ duration: 0.3 }}
                onClick={() => setSelected(project)}
                className="group bg-[#0a0a0a] border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden cursor-pointer transition-colors"
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
                    <div className="p-4 rounded-full bg-white text-black">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Top-right links */}
                  <div className="absolute top-4 right-4 flex gap-2 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all z-10"
                    onClick={e => e.stopPropagation()}>
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                      className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:text-black hover:bg-white transition-colors border border-white/10">
                      <Github className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Featured tag */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-1 text-white group-hover:text-neutral-300 transition-colors">{project.title}</h3>
                  <p className="text-xs font-mono text-neutral-500 mb-4">{project.tagline}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-neutral-400">
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
