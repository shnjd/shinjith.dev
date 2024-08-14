import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Cover from "@/components/sections/Cover";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";

export default function Home() {
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
