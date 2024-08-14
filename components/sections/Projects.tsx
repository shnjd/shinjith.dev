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
      className={`group flex flex-col items-center ${toRight ? "project-grad-right lg:flex-row-reverse lg:text-start" : "project-grad-left lg:flex-row lg:text-end"}`}
    >
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-t transition-all duration-500 group-hover:rounded-t-lg lg:w-1/2 lg:basis-1/2 lg:rounded-md lg:group-hover:rounded-xl">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="origin-top object-cover object-top saturate-50 transition-all duration-500 ease-out group-hover:scale-105 group-hover:saturate-100"
        />
      </div>

      <div
        className={`-mt-[10vw] max-w-lg space-y-3 sm:max-w-xl lg:mt-0 lg:max-w-none ${toRight ? "lg:-mr-20" : "lg:-ml-20"}`}
      >
        <h4 className="hidden text-lg font-bold sm:text-xl md:text-2xl lg:block">
          {project.name}
        </h4>
        <div
          className={`h-fit space-y-2 rounded-md border border-overlay/75 from-background/80 via-surface/50 to-primary/20 p-3 text-sm text-subtle shadow-lg backdrop-blur-lg backdrop-saturate-200 transition-all duration-500 group-hover:shadow-sm sm:space-y-3 sm:p-4 sm:text-base md:p-5 ${toRight ? "bg-gradient-to-bl" : "bg-gradient-to-br"}`}
        >
          {project.description.map((pd, index) => (
            <p key={`${project.name}-desc-${index}`}>{pd}</p>
          ))}

          <div
            className={`hidden justify-center gap-4 sm:flex ${toRight ? "lg:justify-start" : "lg:justify-end"}`}
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
          className={`flex flex-wrap justify-center gap-2 ${toRight ? "lg:justify-start" : "lg:justify-end"}`}
        >
          {project.technologies.map((pt) => (
            <Tag key={pt} className="shadow-sm">
              {pt}
            </Tag>
          ))}
        </div>

        <div className={`flex justify-center gap-8 sm:hidden`}>
          <Link href={project.github_url} secondary underline={false}>
            <IconBrandGithub size={20} />
          </Link>

          <Link href={project.live_url} secondary underline={false}>
            <IconExternalLink size={20} />
          </Link>
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
    <div className="group overflow-hidden rounded-md border border-overlay/75 bg-gradient-to-br from-background/80 via-surface/50 to-primary/20 p-3 backdrop-blur-lg backdrop-saturate-200 sm:p-4 md:p-5 xl:w-[31%]">
      <div className={`mb-4 flex justify-end gap-4`}>
        <Link href={project.github_url} secondary underline={false}>
          <IconBrandGithub size={20} />
        </Link>

        <Link href={project.live_url} secondary underline={false}>
          <IconExternalLink size={20} />
        </Link>
      </div>

      <h4 className="mb-2 text-lg font-bold sm:mb-3 sm:text-xl md:text-2xl">
        {project.name}
      </h4>

      <div className="mb-4 space-y-2 text-sm text-muted sm:space-y-3 sm:text-base">
        {project.description.map((pd, index) => (
          <p key={`${project.name}-desc-${index}`}>{pd}</p>
        ))}
      </div>

      <div className={`flex flex-wrap gap-1.5 sm:gap-2`}>
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
      <div className="prjects-grad py-4 sm:py-5 md:py-6 lg:py-8">
        <p className="w-fit border-b border-secondary-fg py-0.5 text-sm font-medium text-secondary-fg sm:text-base md:text-lg lg:text-xl dark:border-secondary dark:text-secondary">
          Some of my best projects
        </p>

        <ul className="mx-auto mb-12 mt-4 space-y-8 sm:mb-14 sm:mt-5 sm:max-w-screen-sm sm:space-y-10 md:mb-16 md:mt-6 md:space-y-12 lg:mb-20 lg:ml-0 lg:mt-8 lg:max-w-none lg:space-y-20 xl:mb-24 xl:space-y-24 2xl:mb-28 2xl:space-y-28">
          {projects
            .filter((p) => p.featured)
            .map((p, index) => (
              <Project key={p.id} project={p} toRight={index % 2 === 1} />
            ))}
        </ul>

        <p className="mx-auto w-fit border-b border-secondary-fg py-0.5 text-sm font-medium text-secondary-fg sm:max-w-sm sm:text-base md:text-lg lg:text-xl xl:max-w-none dark:border-secondary dark:text-secondary">
          Other noteworthy projects
        </p>

        <div className="project-cards-grad mx-auto mt-4 flex flex-col flex-wrap justify-between gap-4 sm:mt-5 sm:max-w-screen-sm sm:gap-5 md:mt-6 md:gap-6 lg:mt-8 xl:max-w-none xl:flex-row xl:gap-4 2xl:gap-6">
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
