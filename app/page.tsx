import SectionContextProvider from "@/components/contexts/SectionContext";
import NavigationMenu from "@/components/home/Navigator";
import About from "@/components/sections/About";
import Contact from "@/components/sections/contact";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <SectionContextProvider>
      <div className="h-full w-full px-5 text-fg">
        <NavigationMenu />
        <About />
        <Experience />
        <Projects />
        <Services />
        <Contact />
      </div>
    </SectionContextProvider>
  );
}
