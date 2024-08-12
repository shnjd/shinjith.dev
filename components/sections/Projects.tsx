import { TProject } from "@/lib/types";
import Section from "../base/Section";
import Image from "next/image";
import porfolio from "@/portfolio.json";
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
      className={`group flex items-center ${toRight ? "project-grad-right flex-row-reverse text-start" : "project-grad-left flex-row text-end"}`}
    >
      <div className="relative aspect-video w-1/2 shrink-0 basis-1/2 overflow-hidden rounded-md transition-all duration-500 group-hover:rounded-xl">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="origin-top object-cover object-top saturate-50 transition-all duration-500 ease-out group-hover:scale-105 group-hover:saturate-100"
        />
      </div>

      <div className={`space-y-3 ${toRight ? "-mr-20" : "-ml-20"}`}>
        <h4 className="text-2xl font-bold">{project.name}</h4>
        <div
          className={`h-fit space-y-3 rounded-md border border-overlay/75 from-background/80 via-surface/50 to-primary/20 p-5 text-subtle shadow-lg backdrop-blur-lg backdrop-saturate-200 transition-all duration-500 group-hover:shadow-sm ${toRight ? "bg-gradient-to-bl" : "bg-gradient-to-br"}`}
        >
          {project.description.map((pd, index) => (
            <p key={`${project.name}-desc-${index}`}>{pd}</p>
          ))}

          <div
            className={`flex gap-4 ${toRight ? "justify-start" : "justify-end"}`}
          >
            <Link href={project.github_url} secondary underline={false}>
              <IconBrandGithub size={20} />
            </Link>

            <Link href={project.live_url} secondary underline={false}>
              <IconExternalLink size={20} />
            </Link>
          </div>
        </div>

        <div
          className={`flex flex-wrap gap-2 ${toRight ? "justify-start" : "justify-end"}`}
        >
          {project.technologies.map((pt) => (
            <Tag key={pt} className="shadow-sm">
              {pt}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

type ProjectCardProps = {
  project: TProject;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group w-[31%] overflow-hidden rounded-md border border-overlay/75 bg-gradient-to-br from-background/80 via-surface/50 to-primary/20 p-5 backdrop-blur-lg backdrop-saturate-200">
      <div className={`mb-4 flex justify-end gap-4`}>
        <Link href={project.github_url} secondary underline={false}>
          <IconBrandGithub size={20} />
        </Link>

        <Link href={project.live_url} secondary underline={false}>
          <IconExternalLink size={20} />
        </Link>
      </div>

      <h4 className="mb-1 text-2xl font-bold">{project.name}</h4>

      <div className="mb-4 space-y-3 text-muted">
        {project.description.map((pd, index) => (
          <p key={`${project.name}-desc-${index}`}>{pd}</p>
        ))}
      </div>

      <div className={`flex flex-wrap gap-2`}>
        {project.technologies.map((pt) => (
          <Tag key={pt} className="shadow-sm">
            {pt}
          </Tag>
        ))}
      </div>
    </div>
  );
};

const projects = porfolio.projects;

export default function Projects() {
  return (
    <Section name="Projects" subHeading="Imagination in Action">
      <div className="prjects-grad px-40 py-20">
        <p className="w-fit border-b border-secondary-fg py-0.5 text-xl font-medium text-secondary-fg dark:border-secondary dark:text-secondary">
          Some of my best projects
        </p>

        <ul className="my-12 space-y-28">
          {projects
            .filter((p) => p.featured)
            .map((p, index) => (
              <Project key={p.id} project={p} toRight={index % 2 === 1} />
            ))}
        </ul>

        <p className="mt-24 w-fit border-b border-secondary-fg py-0.5 text-xl font-medium text-secondary-fg dark:border-secondary dark:text-secondary">
          Other noteworthy projects
        </p>

        <div className="project-cards-grad flex flex-wrap justify-between py-8 xl:gap-4 2xl:gap-6">
          {projects
            .filter((p) => !p.featured)
            .map((p) => (
              <ProjectCard project={p} key={p.id} />
            ))}
        </div>
      </div>
    </Section>
  );
}
