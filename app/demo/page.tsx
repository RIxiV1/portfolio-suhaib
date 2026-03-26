"use client";

import { HeroScrollDemo } from "@/components/demos/HeroScrollDemo";
import ShaderDemo from "@/components/demos/ShaderDemo";
import MinimalistHeroDemo from "@/components/demos/MinimalistHeroDemo";
import { AnimatedTabsDemo } from "@/components/demos/AnimatedTabsDemo";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 w-full z-[100] bg-black/50 backdrop-blur-md p-4 border-b border-white/10 flex justify-center gap-8">
        <a href="#hero" className="hover:text-primary transition-colors">Hero</a>
        <a href="#scroll" className="hover:text-primary transition-colors">Scroll</a>
        <a href="#shaders" className="hover:text-primary transition-colors">Shaders</a>
        <a href="#tabs" className="hover:text-primary transition-colors">Tabs</a>
      </nav>

      <section id="hero">
        <MinimalistHeroDemo />
      </section>

      <section id="scroll">
         <HeroScrollDemo />
      </section>

      <section id="shaders">
        <ShaderDemo />
      </section>

      <section id="tabs">
        <AnimatedTabsDemo />
      </section>
      
      <footer className="p-20 text-center opacity-40">
        <p>Integrated Components Demo</p>
      </footer>
    </main>
  );
}
