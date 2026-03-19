"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface CursorProps {
  size?: number
  className?: string
}

export function Cursor({ size = 60, className }: CursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    })
  }, [])

  const handleMouseEnter = useCallback(() => setIsVisible(true), [])
  const handleMouseLeave = useCallback(() => setIsVisible(false), [])

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window) {
      setIsTouchDevice(true)
      return
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseenter", handleMouseEnter)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseenter", handleMouseEnter)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave])

  if (isTouchDevice) return null

  return (
    <div
      className={cn(
        "pointer-events-none fixed z-[9999] rounded-full bg-white mix-blend-difference transition-transform duration-100 ease-out",
        !isVisible && "opacity-0",
        className
      )}
      style={{
        width: size,
        height: size,
        left: position.x - size / 2,
        top: position.y - size / 2,
      }}
    />
  )
}
