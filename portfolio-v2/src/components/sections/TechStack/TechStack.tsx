'use client';

import React from 'react';
import { motion } from 'framer-motion';

const technologies = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", 
  "Node.js", "Three.js", "GSAP", "PostgreSQL", "Prisma", 
  "Docker", "AWS", "Git", "Figma", "Redux", "Zustand"
];

const TechStack = () => {
  return (
    <section className="py-20 bg-white/5 border-y border-white/10 overflow-hidden">
      <div className="container px-4 mb-12">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-primary font-mono text-sm uppercase tracking-widest mb-4 inline-block"
        >
          Toolkit
        </motion.span>
        <h2 className="text-3xl md:text-5xl font-bold">Tools of the trade.</h2>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex whitespace-nowrap gap-12 py-4"
        >
          {/* First set of tech */}
          {technologies.map((tech, i) => (
            <div key={i} className="flex items-center gap-4 text-2xl md:text-4xl font-bold text-muted hover:text-white transition-colors cursor-default">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {tech}
            </div>
          ))}
          {/* Duplicated for seamless loop */}
          {technologies.map((tech, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-4 text-2xl md:text-4xl font-bold text-muted hover:text-white transition-colors cursor-default">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
