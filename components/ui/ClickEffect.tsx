'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: string;
  x: number;
  y: number;
  destX: number;
  destY: number;
  color: string;
  size: number;
  rotation: number;
}

interface ClickEvent {
  id: number;
  particles: Particle[];
}

const COLORS = [
  '#ffffff', // absolute white
  'rgba(255, 255, 255, 0.9)', // slightly transparent white
  'rgba(255, 255, 255, 0.7)', // more transparent white (for depth)
  '#f8fafc', // slate-50 (near white)
  '#f1f5f9', // slate-100 (very light gray)
];

export default function ClickEffect() {
  const [clickEvents, setClickEvents] = useState<ClickEvent[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const particleCount = 10;
      const particles: Particle[] = [];
      const timestamp = Date.now();

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5);
        const distance = 35 + Math.random() * 55;
        
        particles.push({
          id: `${timestamp}-${i}`,
          x: e.clientX,
          y: e.clientY,
          destX: Math.cos(angle) * distance,
          destY: Math.sin(angle) * distance,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 2 + Math.random() * 3.5,
          rotation: Math.random() * 360,
        });
      }

      const newEvent = {
        id: timestamp,
        particles,
      };

      setClickEvents((prev) => [...prev, newEvent]);
      
      // Remove the group of particles after animation
      setTimeout(() => {
        setClickEvents((prev) => prev.filter((event) => event.id !== timestamp));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {clickEvents.flatMap(event => 
          event.particles.map(particle => (
            <motion.div
              key={particle.id}
              initial={{
                opacity: 1,
                scale: 1,
                x: particle.x,
                y: particle.y,
                rotate: 0
              }}
              animate={{
                opacity: 0,
                scale: 0.2,
                x: particle.x + particle.destX,
                y: particle.y + particle.destY,
                rotate: particle.rotation
              }}
              transition={{
                duration: 0.7,
                ease: [0.23, 1, 0.32, 1] // easeOutQuart
              }}
              style={{
                position: 'fixed',
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                borderRadius: Math.random() > 0.4 ? '50%' : '1px',
                left: 0,
                top: 0,
              }}
            />
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
