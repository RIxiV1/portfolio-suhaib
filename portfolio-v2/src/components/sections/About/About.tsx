'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Code2, Coffee, Globe } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section-padding container">
      <div className="flex flex-col mb-16">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-primary font-mono text-sm uppercase tracking-widest mb-4"
        >
          Perspective
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          A bit about me.
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {/* Main Bio Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-4 glass p-8 rounded-3xl"
        >
          <div className="flex items-center gap-3 mb-6 text-primary">
            <User className="w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-widest">About Me</span>
          </div>
          <p className="text-xl md:text-2xl leading-relaxed text-foreground/90">
            I'm a self-taught full-stack developer based in India. I specialize in building highly interactive, performant web applications that don't just work—they feel amazing to use. 
          </p>
          <p className="mt-6 text-muted leading-relaxed">
            My journey started with a curiosity for how things break, which naturally led to a passion for building robust systems. I love diving into the intersections of design, engineering, and 3D graphics.
          </p>
        </motion.div>

        {/* Status Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 glass p-8 rounded-3xl flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 mb-6 text-accent">
            < Globe className="w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-widest">Location</span>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-2">India</h3>
            <p className="text-muted text-sm">Working remotely with teams worldwide.</p>
          </div>
        </motion.div>

        {/* Stats 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2 glass p-8 rounded-3xl flex flex-col items-center justify-center text-center"
        >
          <div className="text-5xl font-bold text-primary mb-2">5+</div>
          <p className="text-muted font-mono text-xs uppercase tracking-widest">Public Projects</p>
        </motion.div>

        {/* Hobby Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2 glass p-8 rounded-3xl"
        >
          <div className="flex items-center gap-3 mb-4 text-secondary">
            <Coffee className="w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-widest">Hobby</span>
          </div>
          <p className="text-lg font-medium">Fueled by caffeine and curiosity. Exploring the world of generative art and 3D modeling.</p>
        </motion.div>

        {/* Tech Focus Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="md:col-span-2 glass p-8 rounded-3xl"
        >
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Code2 className="w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-widest">Focus</span>
          </div>
          <p className="text-lg font-medium">React, Next.js, and pushing the boundaries of Framer Motion.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
