'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Code2, Layers, Calendar } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass rounded-[2.5rem] border border-white/10 shadow-2xl custom-scrollbar"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side: Visuals & Info */}
              <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 border border-white/5">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h2>
                    <p className="text-muted leading-relaxed text-lg">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-mono text-primary uppercase tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-4 bg-primary text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Live Demo
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-4 glass text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side: Code Preview & Extra Details */}
              <div className="p-8 md:p-12 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-6 text-primary">
                  <Code2 className="w-6 h-6" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold">Project Architecture</span>
                </div>

                {project.codeSnippet && (
                  <div className="relative rounded-2xl overflow-hidden bg-[#0D0D11] border border-white/10 p-6 mb-8 font-mono text-xs md:text-sm leading-relaxed group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-50" />
                    <pre className="text-[#A9B1D6] overflow-x-auto custom-scrollbar">
                      <code>{project.codeSnippet}</code>
                    </pre>
                    <div className="absolute top-4 right-4 text-[10px] text-muted opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                      Preview
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6">
                  <div className="glass p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 mb-3 text-secondary">
                      <Layers className="w-5 h-5" />
                      <span className="font-mono text-[10px] uppercase tracking-widest">Key Features</span>
                    </div>
                    <ul className="text-sm text-muted space-y-2 list-disc list-inside">
                      <li>Modern architecture utilizing {project.tags[0]}</li>
                      <li>Highly optimized frontend performance</li>
                      <li>Scalable and maintainable code structure</li>
                    </ul>
                  </div>

                  <div className="glass p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 mb-3 text-accent">
                      <Calendar className="w-5 h-5" />
                      <span className="font-mono text-[10px] uppercase tracking-widest">Status</span>
                    </div>
                    <p className="text-sm text-muted">
                      Production ready. Built following industrial best practices and modern design patterns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
