import React from "react";
import { motion } from "framer-motion";
import { TProject } from "@/lib/types";
import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import Tag from "../base/Tag";

type Props = {
  project: TProject;
  isLast: boolean;
  index: number;
};

function ProjectItem({ project, isLast = false, index = 0 }: Props) {
  const date = new Date(project.created_at);
  const dateString = `${String(date.getMonth()).padStart(2, "0")}/${String(
    date.getFullYear(),
  ).slice(2)}`;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10, x: 100 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ delay: 0.5 + index * 0.05, type: "tween" }}
      viewport={{ once: true }}
    >
      <td
        width={20}
        className={`border-surface py-3 pr-4 align-top ${
          !isLast ? "border-b" : ""
        }`}
      >
        {dateString}
      </td>

      <td
        className={`group hidden items-center gap-2 border-surface py-3 pr-4 align-top font-medium md:table-cell ${
          !isLast ? "border-b" : ""
        }`}
      >
        {project.name}
      </td>

      <td
        className={`group items-center border-surface py-1 pr-4 align-top font-medium md:hidden ${
          !isLast ? "border-b" : ""
        }`}
      >
        <a
          href={project?.live_url || project?.github_url}
          target="_blank"
          rel="noreferrer"
          className="flex gap-2 py-2 transition-all"
        >
          {project.name}
          <IconArrowUpRight className="-translate-x-[1px] translate-y-[1px] text-fg transition-all group-hover:-translate-y-[2px] group-hover:translate-x-1" />
        </a>
      </td>

      <td
        className={`hidden border-surface py-3 pr-4 align-top sm:table-cell ${
          !isLast ? "border-b" : ""
        }`}
      >
        <ul className="flex list-none flex-wrap gap-1.5">
          {project?.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </ul>
      </td>

      <td
        className={`hidden border-surface py-1 align-top lg:table-cell ${
          !isLast ? "border-b" : ""
        }`}
      >
        {project?.live_url ? (
          <a
            href={project?.live_url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-nowrap items-center text-sm transition-all"
          >
            <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
              {project.live_url}
            </div>
            <IconArrowUpRight className="m-2 -translate-x-[1px] translate-y-[1px] text-subtle transition-all group-hover:translate-x-0 group-hover:translate-y-0" />
          </a>
        ) : (
          project?.github_url && (
            <a
              href={project?.github_url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-nowrap items-center text-sm transition-all"
            >
              <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                {project.github_url}
              </div>
              <IconBrandGithub className="m-2" />
            </a>
          )
        )}
      </td>
    </motion.tr>
  );
}

export default ProjectItem;
