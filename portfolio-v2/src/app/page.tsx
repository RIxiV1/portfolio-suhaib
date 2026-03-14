import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero/Hero";
import Projects from "@/components/sections/Projects/Projects";
import About from "@/components/sections/About/About";
import TechStack from "@/components/sections/TechStack/TechStack";
import Experience from "@/components/sections/Experience/Experience";
import Contact from "@/components/sections/Contact/Contact";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Contact />
      <footer className="py-10 text-center text-muted text-xs font-mono border-t border-white/5">
        &copy; {new Date().getFullYear()} SUHAIB. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}
