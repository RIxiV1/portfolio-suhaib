"use client"

import { motion, useInView, useReducedMotion } from "motion/react"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import { useMouseMove } from "@/hooks/use-mouse-move"

interface SpecialTextProps {
  children: string
  className?: string
  delay?: number
  inView?: boolean // Added back for compatibility
}

export function SpecialText({
  children,
  className,
  delay = 0,
  inView: inViewProp,
}: SpecialTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const inViewHook = useInView(containerRef, { once: true, margin: "-50px" })
  const isInView = inViewProp !== undefined ? inViewProp : inViewHook
  const prefersReduced = useReducedMotion()

  // Use a local ref for magnetic effect
  const mouse = useMouseMove(containerRef)
  
  const letters = children.split("")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  }

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      filter: "blur(15px)",
      scale: 0.5,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
      },
    },
  }

  if (prefersReduced) {
    return (
      <span className={cn("font-bold tracking-tight", className)}>
        {children}
      </span>
    )
  }

  return (
    <motion.span
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(
        "relative inline-flex flex-wrap justify-center py-4 px-2 cursor-default group/text",
        className
      )}
    >
      {/* Light Scan Effect */}
      <motion.div
        animate={{
          left: ["-100%", "200%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 3
        }}
        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent w-1/3 -skew-x-12 pointer-events-none"
      />

      {letters.map((char, i) => {
        // Calculate a slight magnetic offset based on mouse position
        // This is a subtle effect since we're using a single container ref for performance
        // We'll use the relative X/Y to nudge the letters
        const mouseX = mouse.x
        const mouseY = mouse.y
        
        return (
          <motion.span
            key={`${char}-${i}`}
            variants={letterVariants}
            whileHover={{
              y: -8,
              scale: 1.3,
              rotate: (Math.random() - 0.5) * 10,
            }}
            style={{
              // Add a slight "magnetic" drift
              x: mouseX ? (mouseX - 200) * 0.02 : 0,
              y: mouseY ? (mouseY - 50) * 0.02 : 0,
            }}
            className={cn(
              "inline-block relative text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 group-hover/text:from-cyan-400 group-hover/text:to-violet-400 transition-all duration-700 ease-out",
              char === " " ? "w-[0.3em]" : ""
            )}
          >
            {/* Subtle Glow Layer */}
            <motion.span
              animate={{ 
                opacity: [0, 0.4, 0],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.15,
              }}
              className="absolute inset-0 bg-cyan-400/10 blur-2xl rounded-full pointer-events-none opacity-0 group-hover/text:opacity-100 transition-opacity"
            />
            <span className="relative z-10">{char}</span>
          </motion.span>
        )
      })}
    </motion.span>
  )
}
