'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const experiences = [
  {
    year: "2024 - Present",
    company: "Freelance",
    role: "Full Stack Engineer",
    description: "Building custom web solutions for international clients using Next.js and Three.js."
  },
  {
    year: "2023 - 2024",
    company: "Startup Alpha",
    role: "Frontend Developer",
    description: "Spearheaded the UI/UX overhaul of the core product, increasing user engagement by 40%."
  },
  {
    year: "2022 - 2023",
    company: "Dev Studio",
    role: "Junior Developer",
    description: "Started my professional journey focusing on React and building responsive landing pages."
  }
];

const Experience = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="section-padding container">
      <div className="flex flex-col mb-16">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-primary font-mono text-sm uppercase tracking-widest mb-4"
        >
          Roadmap
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          My travel logs.
        </motion.h2>
      </div>

      <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
        {/* Vertical Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 hidden md:block" />
        <motion.div 
          style={{ scaleY }}
          className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-primary origin-top -translate-x-1/2 hidden md:block"
        />

        {experiences.map((exp, index) => (
          <div key={index} className={`relative mb-12 md:mb-24 flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            {/* Center dot */}
            <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 rounded-full bg-primary -translate-x-1/2 z-10" />
            
            <motion.div 
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`w-full md:w-[45%] glass p-8 rounded-3xl ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
            >
              <div className="font-mono text-xs text-primary uppercase tracking-widest mb-2">{exp.year}</div>
              <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
              <div className="text-muted text-sm font-medium mb-4">{exp.company}</div>
              <p className="text-secondary/80 text-sm leading-relaxed">{exp.description}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
