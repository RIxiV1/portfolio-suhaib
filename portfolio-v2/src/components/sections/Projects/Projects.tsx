'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, Project } from '@/data/projects';
import Image from 'next/image';
import { ExternalLink, Github, Eye } from 'lucide-react';
import ProjectModal from '@/components/ui/ProjectModal';

const categories = ["All", "AI", "Frontend", "Chrome API", "Python", "TypeScript"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(project => 
    activeCategory === "All" || project.tags.includes(activeCategory)
  );

  return (
    <section id="projects" className="section-padding container">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="flex flex-col">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-mono text-sm uppercase tracking-widest mb-4"
          >
            Selected Works
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Dynamic creations.
          </motion.h2>
        </div>

        {/* Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all border ${
                activeCategory === category 
                  ? "bg-primary text-black border-primary font-bold shadow-lg shadow-primary/20" 
                  : "bg-white/5 text-muted border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
              className="group relative flex flex-col glass rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Project Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Visual indicator for clickable */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="p-4 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary">
                      <Eye className="w-6 h-6" />
                   </div>
                </div>

                {/* Overlay Links */}
                <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all z-10" onClick={(e) => e.stopPropagation()}>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-full hover:bg-white hover:text-black transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-full hover:bg-white hover:text-black transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                </div>
                <p className="text-muted text-sm mb-6 flex-1 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-wider font-mono text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
