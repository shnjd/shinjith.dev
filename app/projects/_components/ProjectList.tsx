"use client";

import { motion } from "motion/react";
import ProjectItem from "./ProjectItem";
import { projects } from "@/lib/data";
import { reveal } from "@/lib/motion";

const sort = (a: DataProject, b: DataProject) =>
  new Date(a.created_at) < new Date(b.created_at) ? 1 : -1;

export default function ProjectList() {
  return (
    <div className="relative z-10 mx-auto h-full max-w-7xl flex-col items-center justify-center">
      <div className="w-full grow pt-32 pb-1">
        <motion.h1
          {...reveal({ delay: 0.08 })}
          className="text-3xl font-semibold"
        >
          Projects Archive
        </motion.h1>

        <table className="mt-10 w-full table-auto border-collapse">
          <caption className="sr-only">
            Projects by date, with the stack and links for each
          </caption>
          <thead className="text-subtle text-left text-xs sm:text-sm">
            <tr>
              <th scope="col" className="py-1 font-medium">
                Date
              </th>
              <th scope="col" className="py-1 font-medium">
                Project
              </th>
              <th scope="col" className="hidden py-1 font-medium sm:table-cell">
                Built With
              </th>
              <th scope="col" className="hidden py-1 font-medium lg:table-cell">
                Link
              </th>
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
