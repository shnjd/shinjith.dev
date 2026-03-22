"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import ProjectItem from "./ProjectItem";
import { projects } from "@/lib/data";

const sort = (a: DataProject, b: DataProject) =>
  new Date(a.created_at) < new Date(b.created_at) ? 1 : -1;

export default function ProjectList() {
  return (
    <div className="relative z-10 mx-auto h-full flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, type: "tween" }}
        viewport={{ once: true }}
        className="w-full pt-20"
      >
        <Link
          href="/"
          className="text-secondary flex items-baseline font-mono text-sm leading-none font-semibold transition-all sm:text-base md:text-xl"
        >
          <span className="mr-1 text-xs sm:text-sm md:text-base">❯</span>
          shnjd
          <span className="blink text-sm sm:text-base md:text-lg">_</span>
        </Link>
      </motion.div>

      <div className="w-full grow py-1">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "tween" }}
          viewport={{ once: true }}
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
            <AnimatePresence>
              {(projects as DataProject[]).sort(sort).map((project, index) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  isLast={index === projects.length - 1}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
