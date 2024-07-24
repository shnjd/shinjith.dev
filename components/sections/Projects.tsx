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
      className={`flex items-center ${toRight ? "project-grad-right flex-row-reverse text-start" : "project-grad-left flex-row text-end"}`}
    >
      <div className="relative aspect-video w-1/2 shrink-0 basis-1/2">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover object-top"
        />
      </div>

      <div className={`space-y-3 ${toRight ? "-mr-20" : "-ml-20"}`}>
        <div className="h-fit space-y-3 rounded-md border border-surface/25 bg-gradient-to-br from-background/80 via-surface/50 to-primary/20 p-5 text-subtle backdrop-blur-lg backdrop-saturate-200">
          {project.description.map((pd, index) => (
            <p key={`${project.name}-desc-${index}`}>{pd}</p>
          ))}

          <div className="flex justify-end gap-4">
            <Link href={project.github_url} secondary underline={false}>
              <IconBrandGithub size={20} />
            </Link>

            <Link href={project.live_url} secondary underline={false}>
              <IconExternalLink size={20} />
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          {project.technologies.map((pt) => (
            <Tag key={pt}>{pt}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  return (
    <Section name="Projects" subHeading="Imagination in Action">
      <div className="prjects-grad px-40 py-20">
        <p className="w-fit border-b border-secondary-fg py-0.5 text-xl font-medium text-secondary-fg dark:border-secondary dark:text-secondary">
          Some of my best projects
        </p>

        <ul className="my-8 space-y-20">
          {projects.map((p, index) => (
            <Project key={p.id} project={p} toRight={index % 2 === 1} />
          ))}
        </ul>
      </div>
    </Section>
  );
}
