'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowUpRight, Github, ExternalLink, X, Home, User, Briefcase, Mail } from 'lucide-react';
import { projects } from '@/data/projects';
import { useRouter } from 'next/navigation';

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  const navigateTo = (id: string) => {
    closePalette();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(query.toLowerCase()) ||
    project.description.toLowerCase().includes(query.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  const actions = [
    { name: 'Go to Home', icon: Home, id: 'hero' },
    { name: 'About Me', icon: User, id: 'about' },
    { name: 'My Projects', icon: Briefcase, id: 'projects' },
    { name: 'Contact Me', icon: Mail, id: 'contact' },
  ].filter(action => action.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePalette}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-[101]"
          >
            <div className="glass rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
              <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
                <Search className="w-5 h-5 text-muted" />
                <input
                  autoFocus
                  placeholder="Type a command or search projects..."
                  className="bg-transparent border-none outline-none text-lg w-full placeholder:text-muted"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono font-medium text-muted">
                  <span className="text-xs">ESC</span>
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                {/* Quick Actions */}
                {actions.length > 0 && (
                  <div className="mb-6">
                    <p className="px-3 mb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-muted">Navigation</p>
                    <div className="grid grid-cols-1 gap-1">
                      {actions.map((action) => (
                        <button
                          key={action.id}
                          onClick={() => navigateTo(action.id)}
                          className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors group text-left"
                        >
                          <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all font-mono">
                            <action.icon className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                          </div>
                          <span className="flex-1 font-medium">{action.name}</span>
                          <Command className="w-3.5 h-3.5 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {filteredProjects.length > 0 && (
                  <div>
                    <p className="px-3 mb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-muted">Projects</p>
                    <div className="grid grid-cols-1 gap-1">
                      {filteredProjects.map((project) => (
                        <a
                          key={project.id}
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={closePalette}
                          className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/5 bg-white/5">
                            <img src={project.thumbnail} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{project.title}</p>
                            <div className="flex gap-2 mt-1">
                              {project.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-[10px] text-muted font-mono">{tag}</span>
                              ))}
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {filteredProjects.length === 0 && actions.length === 0 && (
                  <div className="py-12 text-center text-muted">
                    <p>No results found for "{query}"</p>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5 flex justify-between items-center text-[10px] text-muted uppercase tracking-widest font-mono">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1.5"><span className="p-1 rounded bg-white/5 border border-white/10">ESC</span> to close</span>
                  <span className="flex items-center gap-1.5"><span className="p-1 rounded bg-white/5 border border-white/10">↵</span> to select</span>
                </div>
                <div className="flex items-center gap-2">
                  <Command className="w-3 h-3" />
                  <span>K to Toggle</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
