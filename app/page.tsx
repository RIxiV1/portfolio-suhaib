import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import TechStack from '@/components/sections/TechStack';
import Experience from '@/components/sections/Experience';
import Writing from '@/components/sections/Writing';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Page() {
  return (
    <main className="relative flex flex-col min-h-screen bg-black text-white">
      {/* Subtle grid background */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Experience />
      <Writing />
      <Contact />
      <Footer />
    </main>
  );
}
