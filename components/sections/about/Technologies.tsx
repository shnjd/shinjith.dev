import {
  IconBrandAws,
  IconBrandJavascript,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandReactNative,
  IconBrandTypescript,
  IconBrandYarn,
} from "@tabler/icons-react";
import { ReactNode } from "react";
import Marquee from "react-fast-marquee";
import {
  SiBootstrap,
  SiC,
  SiDjango,
  SiElectron,
  SiExpo,
  SiExpress,
  SiMantine,
  SiMarkdown,
  SiMui,
  SiNetlify,
  SiNodedotjs,
  SiNpm,
  SiPnpm,
  SiPython,
  SiRender,
  SiSocketdotio,
  SiTailwindcss,
  SiTauri,
} from "@icons-pack/react-simple-icons";

type Technology = {
  icon: ReactNode;
  name: string;
};

const technologies: Technology[] = [
  { name: "AWS", icon: <IconBrandAws className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },
  { name: "Bootstrap", icon: <SiBootstrap size={20} className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },

  { name: "C", icon: <SiC size={20} className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },
  { name: "Django", icon: <SiDjango size={20} className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },
  { name: "Electron", icon: <SiElectron size={20} className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },

  { name: "Expo", icon: <SiExpo size={20} className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },

  { name: "Express", icon: <SiExpress size={20} className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },

  { name: "JavaScript", icon: <IconBrandJavascript className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },
  { name: "Mantine", icon: <SiMantine size={20} className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },

  { name: "Markdown", icon: <SiMarkdown size={20} className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },
  { name: "Material UI", icon: <SiMui size={20} className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },

  { name: "Netlify", icon: <SiNetlify size={20} className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },

  { name: "Nextjs", icon: <IconBrandNextjs className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },
  { name: "Node", icon: <SiNodedotjs size={20} className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },
  { name: "NPM", icon: <SiNpm size={20} className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },
  { name: "PNPM", icon: <SiPnpm size={20} className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },

  { name: "Python", icon: <SiPython size={20} className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },

  { name: "React", icon: <IconBrandReact className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },
  { name: "React Native", icon: <IconBrandReactNative className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },
  { name: "Render", icon: <SiRender size={20} className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },
  { name: "Socket IO", icon: <SiSocketdotio size={20} className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },
  { name: "Tailwind", icon: <SiTailwindcss size={20} className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },

  { name: "Tauri", icon: <SiTauri size={20} className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },
  { name: "TypeScript", icon: <IconBrandTypescript className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },

  { name: "Yarn", icon: <IconBrandYarn className="text-subtle transition-all group-hover:text-secondary-fg dark:group-hover:text-secondary" /> },
];

export default function Technologies() {
  return (
    <Marquee speed={70} className="my-6 text-lg text-subtle">
      {technologies.map((tech) => (
        <div
          key={tech.name}
          aria-label={tech.name}
          title={tech.name}
          className="group mx-8 flex items-center gap-2 text-subtle transition-all hover:text-secondary-fg dark:hover:text-secondary"
        >
          {tech.icon} {tech.name}
        </div>
      ))}
    </Marquee>
  );
}
