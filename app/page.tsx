import SectionContextProvider from "@/components/contexts/SectionContext";
import NavigationMenu from "@/components/home/Navigator";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <SectionContextProvider>
      <div className="h-full w-full px-5 text-fg">
        <NavigationMenu />
        <About />
        <Contact />
      </div>
    </SectionContextProvider>
  );
}
