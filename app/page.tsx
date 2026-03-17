'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import TechStack from '@/components/sections/TechStack';
import Experience from '@/components/sections/Experience';
import Writing from '@/components/sections/Writing';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import NexusGraph from '@/components/sections/NexusGraph';
import { AnimatePresence, motion } from 'framer-motion';

export default function Page() {
  const [showNexus, setShowNexus] = useState(false);

  useEffect(() => {
    const handleToggle = () => setShowNexus(prev => !prev);
    window.addEventListener('toggle-nexus', handleToggle);
    return () => window.removeEventListener('toggle-nexus', handleToggle);
  }, []);

  return (
    <>
      <main className={showNexus ? 'hidden' : 'block'}>
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Experience />
        <Writing />
        <Contact />
        <Footer />
      </main>

      <AnimatePresence>
        {showNexus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <NexusGraph />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
