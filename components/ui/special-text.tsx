"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useInView } from "motion/react"
import { cn } from "@/lib/utils"

interface SpecialTextProps {
  children: string
  speed?: number
  delay?: number
  inView?: boolean
  once?: boolean
  className?: string
}

const CHARS = "_!X$0-+*#"

export function SpecialText({
  children,
  speed = 15,
  delay = 0,
  inView: inViewProp,
  once = true,
  className,
}: SpecialTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const inViewHook = useInView(containerRef, { once })
  const isInView = inViewProp !== undefined ? inViewProp : inViewHook
  
  const [displayText, setDisplayText] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  const scramble = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)

    let iteration = 0
    const originalText = children
    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (index < iteration) {
              return originalText[index]
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join("")
      )

      if (iteration >= originalText.length) {
        clearInterval(interval)
        setIsAnimating(false)
      }

      iteration += 1 / 3
    }, speed)

    return () => clearInterval(interval)
  }, [children, speed, isAnimating])

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(scramble, delay)
      return () => clearTimeout(timer)
    }
  }, [isInView, scramble, delay])

  return (
    <span ref={containerRef} className={cn("font-sans", className)}>
      {displayText || children}
    </span>
  )
}
