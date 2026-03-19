"use client"

import { NavBar } from "@/components/ui/tubelight-navbar"
import { BackgroundPaths } from "@/components/ui/background-paths"
import { LampContainer } from "@/components/ui/lamp"
import { SkillsMarquee } from "@/components/ui/marquee"
import { DisplayCards } from "@/components/ui/display-cards"
import { PulseBeamsDemo } from "@/components/ui/pulse-beams"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Cursor } from "@/components/ui/inverted-cursor"
import { SpecialText } from "@/components/ui/special-text"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { AnimatedTabs } from "@/components/ui/animated-tabs"
import { FileText } from "lucide-react"

export default function PortfolioPage() {
  return (
    <main className="relative bg-slate-950 text-white overflow-x-hidden cursor-none">
      {/* Custom Cursor - Desktop Only */}
      <Cursor size={60} />

      {/* Navigation */}
      <NavBar />

      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* 1. HERO Section */}
      <section id="home" className="relative min-h-screen">
        <BackgroundPaths title="Shaik Mohammed Suhaib" />
      </section>

      {/* 2. ABOUT Section */}
      <section id="about" className="py-24 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <SpecialText inView>About Me</SpecialText>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                {`I'm an IT student focused on building AI-powered systems and real-world products.`}
              </p>
              <p className="text-slate-400 leading-relaxed">
                Currently exploring agentic AI, recommendation systems, and web-based AI tools — combining product thinking with engineering to turn ideas into functional, user-focused applications.
              </p>
              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/RIxiV1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/shaiksuhaib"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com/suhaibX0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Twitter
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  Currently available for opportunities
                </div>
                <div className="space-y-2">
                  <p className="text-slate-300"><span className="text-slate-500">Location:</span> Tirupati, India</p>
                  <p className="text-slate-300"><span className="text-slate-500">Focus:</span> AI Systems, Full Stack</p>
                  <p className="text-slate-300"><span className="text-slate-500">Email:</span> shaiksuhaib360@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SKILLS Section with Lamp */}
      <section id="skills">
        <LampContainer>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white">
              <SpecialText inView>Skills & Technologies</SpecialText>
            </h2>
          </div>
          <SkillsMarquee />
        </LampContainer>
      </section>

      {/* 4. PROJECTS Section */}
      <section id="projects" className="py-24 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <SpecialText inView>Featured Projects</SpecialText>
          </h2>
          
          {/* Quick Preview Cards */}
          <div className="flex justify-center mb-16">
            <DisplayCards />
          </div>

          {/* Full Project Explorer */}
          <AnimatedTabs />
        </div>
      </section>

      {/* 5. BLOG Section */}
      <section id="blog" className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <SpecialText inView>Blog</SpecialText>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Recommendation Systems: The Math Behind Netflix, Spotify & Social Media",
                description: "Why your 'Recommended for You' is actually a giant math problem. Exploring the algorithms that power modern content discovery.",
                date: "Mar 2026",
                tag: "AI/ML",
                url: "https://medium.com/@shaiksuhaib360"
              },
              {
                title: "Network Theory: How Everything Connects",
                description: "The invisible threads that bind our world. Understanding the mathematics of connections and relationships.",
                date: "Sep 2025",
                tag: "Math",
                url: "https://medium.com/@shaiksuhaib360"
              },
              {
                title: "Why Chaos Theory Explains the Butterfly Effect",
                description: "Diving into chaos theory and understanding why small changes can lead to dramatically different outcomes.",
                date: "Sep 2025",
                tag: "Science",
                url: "https://medium.com/@shaiksuhaib360"
              }
            ].map((blog) => (
              <a
                key={blog.title}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-slate-800 bg-slate-900 p-6 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-cyan-400 border border-cyan-400/30 rounded-full px-2 py-0.5">
                    {blog.tag}
                  </span>
                  <span className="text-xs text-slate-500">{blog.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                  {blog.title}
                </h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  {blog.description}
                </p>
                <div className="mt-4 text-sm text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read on Medium →
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="https://medium.com/@shaiksuhaib360"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
            >
              View all posts on Medium →
            </a>
          </div>
        </div>
      </section>

      {/* 6. CONTACT Section */}
      <PulseBeamsDemo />

      {/* 7. RESUME Section */}
      <section id="resume" className="py-24 flex flex-col items-center justify-center bg-slate-950">
        <a
          href="https://drive.google.com/file/d/1ZaHawnbNC8nFV-uir2fsXjMqfoUzO4YJ/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InteractiveHoverButton text="Download Resume" />
        </a>
        <p className="text-slate-500 text-sm mt-4 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          PDF format
        </p>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500">
            © {new Date().getFullYear()} Shaik Mohammed Suhaib. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
