import { TProject } from "@/lib/types";
import Section from "../base/Section";
import Image from "next/image";
import { projects } from "@/portfolio.json";
import Link from "../base/Link";
import { IconExternalLink, IconBrandGithub } from "@tabler/icons-react";
import Tag from "../base/Tag";

type ProjectProps = {
  project: TProject;
  toRight: boolean;
};

const Project = ({ project, toRight }: ProjectProps) => {
  return (
    <div
      className={`flex group items-center ${toRight ? "project-grad-right flex-row-reverse text-start" : "project-grad-left flex-row text-end"}`}
    >
      <div className="relative aspect-video w-1/2 shrink-0 basis-1/2 overflow-hidden duration-500 rounded-md group-hover:rounded-xl transition-all">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover object-top saturate-50 transition-all duration-500 ease-out group-hover:scale-105 group-hover:saturate-100 origin-top"
        />
      </div>

      <div className={`space-y-3 ${toRight ? "-mr-20" : "-ml-20"}`}>
        <h4 className="text-2xl font-bold">{project.name}</h4>
        <div className={`
h-fit space-y-3 rounded-md border border-overlay/75 shadow-lg group-hover:shadow-sm transition-all duration-500 from-background/80 via-surface/50 to-primary/20 p-5 text-subtle backdrop-blur-lg backdrop-saturate-200 
${toRight ? "bg-gradient-to-bl" : "bg-gradient-to-br"}`}>
          {project.description.map((pd, index) => (
            <p key={`${project.name}-desc-${index}`}>{pd}</p>
          ))}

          <div className={`flex gap-4 ${toRight ? "justify-start" : "justify-end"}`}>
            <Link href={project.github_url} secondary underline={false}>
              <IconBrandGithub size={20} />
            </Link>

            <Link href={project.live_url} secondary underline={false}>
              <IconExternalLink size={20} />
            </Link>
          </div>
        </div>

        <div className={`flex flex-wrap gap-2 ${toRight ? "justify-start" : "justify-end"}`}>
          {project.technologies.map((pt) => (
            <Tag key={pt} className="shadow-sm">{pt}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

type ProjectCardProps = {
  project: TProject;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="w-[30%] p-5 group rounded-md overflow-hidden border border-overlay/75 backdrop-blur-lg backdrop-saturate-200 bg-gradient-to-br from-background/80 via-surface/50 to-primary/20">
      <div className={`flex gap-4 justify-end mb-4`}>
        <Link href={project.github_url} secondary underline={false}>
          <IconBrandGithub size={20} />
        </Link>

        <Link href={project.live_url} secondary underline={false}>
          <IconExternalLink size={20} />
        </Link>
      </div>

      <h4 className="text-2xl font-bold mb-1">{project.name}</h4>

      <div className="space-y-3 text-muted mb-4">
        {project.description.map((pd, index) => (
          <p key={`${project.name}-desc-${index}`}>{pd}</p>
        ))}
      </div>


      <div className={`flex flex-wrap gap-2`}>
        {project.technologies.map((pt) => (
          <Tag key={pt} className="shadow-sm">{pt}</Tag>
        ))}
      </div>

    </div>
  )
}

export default function Projects() {
  return (
    <Section name="Projects" subHeading="Imagination in Action">
      <div className="prjects-grad px-40 py-20">
        <p className="w-fit border-b border-secondary-fg py-0.5 text-xl font-medium text-secondary-fg dark:border-secondary dark:text-secondary">
          Some of my best projects
        </p>

        <ul className="my-12 space-y-28">
          {projects.filter(p => p.featured).map((p, index) => (
            <Project key={p.id} project={p} toRight={index % 2 === 1} />
          ))}
        </ul>

        <p className="w-fit border-b mt-24 border-secondary-fg py-0.5 text-xl font-medium text-secondary-fg dark:border-secondary dark:text-secondary">
          Other noteworthy projects
        </p>


        <div className="py-8 flex flex-wrap gap-6 justify-between project-cards-grad">
          {projects.filter(p => !p.featured).map(p => <ProjectCard project={p} key={p.id} />)}
        </div>
      </div>
    </Section>
  );
}
