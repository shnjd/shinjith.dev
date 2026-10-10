"use client";

import { motion } from "motion/react";
import BackLink from "@/components/common/BackLink";
import ProjectItem from "./ProjectItem";
import { projects } from "@/lib/data";
import { reveal } from "@/lib/motion";

const sort = (a: DataProject, b: DataProject) =>
  new Date(a.created_at) < new Date(b.created_at) ? 1 : -1;

export default function ProjectList() {
  return (
    <div className="relative z-10 mx-auto h-full flex-col items-center justify-center">
      <BackLink className="pt-20" />

      <div className="w-full grow py-1">
        <motion.div
          {...reveal({ delay: 0.08 })}
          className="text-3xl font-semibold"
        >
          Projects Archive
        </motion.div>

        <table className="mt-10 w-full table-auto border-collapse">
          <thead className="text-subtle text-left text-xs sm:text-sm">
            <tr>
              <th className="py-1 font-medium">Date</th>
              <th className="py-1 font-medium">Project</th>
              <th className="hidden py-1 font-medium sm:table-cell">
                Built WIth
              </th>
              <th className="hidden py-1 font-medium lg:block">Link</th>
            </tr>
          </thead>
          <tbody className="text-subtle text-left text-sm sm:text-base">
            {(projects as DataProject[]).sort(sort).map((project, index) => (
              <ProjectItem
                key={project.id}
                project={project}
                isLast={index === projects.length - 1}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
