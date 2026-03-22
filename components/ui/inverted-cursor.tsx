import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

interface CursorProps {
  size?: number
  className?: string
}

export function Cursor({ size = 60, className }: CursorProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Add a slight spring for "premium" feel and performance shielding
  const springConfig = { damping: 25, stiffness: 250 }
  const edgeX = useSpring(cursorX, springConfig)
  const edgeY = useSpring(cursorY, springConfig)

  useEffect(() => {
    if ('ontouchstart' in window) {
      setIsTouchDevice(true)
      return
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - size / 2)
      cursorY.set(e.clientY - size / 2)
      if (!isVisible) setIsVisible(true)
    }

    const hideCursor = () => setIsVisible(false)
    const showCursor = () => setIsVisible(true)

    window.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseleave", hideCursor)
    document.addEventListener("mouseenter", showCursor)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseleave", hideCursor)
      document.removeEventListener("mouseenter", showCursor)
    }
  }, [size, isVisible, cursorX, cursorY])

  if (isTouchDevice) return null

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed z-[9999] rounded-full bg-white mix-blend-difference hidden md:block",
        className
      )}
      style={{
        width: size,
        height: size,
        x: edgeX,
        y: edgeY,
        opacity: isVisible ? 1 : 0,
        willChange: "transform, opacity",
      }}
    />
  )
}
