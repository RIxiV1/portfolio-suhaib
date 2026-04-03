'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Click {
  id: number;
  x: number;
  y: number;
}

export default function ClickEffect() {
  const [clicks, setClicks] = useState<Click[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setClicks((prev) => [...prev, newClick]);
      
      // Remove the click after animation completes
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <AnimatePresence>
      {clicks.map((click) => (
        <motion.div
          key={click.id}
          initial={{
            opacity: 0.8,
            scale: 0,
            x: click.x - 20,
            y: click.y - 20,
          }}
          animate={{
            opacity: 0,
            scale: 2.5,
            x: click.x - 20,
            y: click.y - 20,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed top-0 left-0 w-10 h-10 border-2 border-white/60 rounded-full pointer-events-none z-[100]"
        />
      ))}
    </AnimatePresence>
  );
}
