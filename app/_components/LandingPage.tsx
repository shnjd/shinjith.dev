import About from './About';
import Cover from './Cover';
import Contact from './Contact';
import Experience from './Experience';
import Projects from './Projects';
import Services from './Services';

export default function LandingPage() {
  return (
    <div className="text-fg h-full w-full">
      <Cover />
      <About />
      <Experience />
      <Projects />
      <Services />
      <Contact />
    </div>
  );
}
