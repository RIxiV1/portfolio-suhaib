'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Background3D from './Background3D';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <Background3D />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container px-4 text-center z-10"
      >
        <motion.span 
          variants={itemVariants}
          className="inline-block text-primary font-mono text-sm tracking-widest uppercase mb-4"
        >
          Engineering Premium Digital Experiences
        </motion.span>
        
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-8xl font-bold tracking-tight mb-6"
        >
          Building <span className="text-primary italic">software</span> <br /> 
          that leaves a mark.
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I'm Suhaib, a full-stack engineer focused on building clean, high-performance web applications with a focus on UI/UX and 3D interactions.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="px-8 py-4 bg-primary text-black font-semibold rounded-full hover:scale-105 transition-transform flex items-center gap-2 group">
            View My Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 glass text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
            Contact Me
          </button>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest font-mono">Scroll to explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;
