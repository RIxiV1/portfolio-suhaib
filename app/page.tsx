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
    <main>
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
