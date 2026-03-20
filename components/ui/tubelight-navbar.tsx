"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Home, User, Briefcase, Code, BookOpen, Mail, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  icon: LucideIcon
  href: string
}

const navItems: NavItem[] = [
  { name: "Home", icon: Home, href: "#home" },
  { name: "About", icon: User, href: "#about" },
  { name: "Experience", icon: Briefcase, href: "#experience" },
  { name: "Skills", icon: Code, href: "#skills" },
  { name: "Projects", icon: Briefcase, href: "#projects" },
  { name: "Blog", icon: BookOpen, href: "#blog" },
  { name: "Contact", icon: Mail, href: "#contact" },
]

export function NavBar() {
  const [activeTab, setActiveTab] = useState(navItems[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <nav
      className={cn(
        "fixed z-50",
        isMobile
          ? "bottom-6 left-1/2 -translate-x-1/2"
          : "top-6 left-1/2 -translate-x-1/2"
      )}
    >
      <div className="flex items-center gap-1 md:gap-2 bg-foreground/5 backdrop-blur-2xl border border-foreground/10 py-2 px-2 rounded-full shadow-2xl shadow-black/20 dark:shadow-black/50">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300",
                isActive
                  ? "text-slate-950"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="tubelight"
                  className="absolute inset-0 rounded-full bg-white"
                  style={{
                    boxShadow:
                      "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.1)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {!isMobile && <span>{item.name}</span>}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
