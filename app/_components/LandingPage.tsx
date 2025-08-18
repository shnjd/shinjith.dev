import About from "./About";
import Cover from "./Cover";
import Contact from "./Contact";
import Experience from "./Experience";
import Projects from "./Projects";
import Services from "./Services";

export default function LandingPage() {
  return (
    <div className="h-full w-full text-fg">
      <Cover />
      <About />
      <Experience />
      <Projects />
      <Services />
      <Contact />
    </div>
  );
}
