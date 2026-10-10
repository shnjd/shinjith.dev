import { projects } from "@/lib/data";
import type { Doc } from "./fs";

/** A project from lib/data as a page, for `cat ~/projects/<id>.md`. */
export const projectDoc = (project: DataProject): Doc => ({
  title: project.name,
  date: project.created_at,
  Content: function Project() {
    return (
      <>
        {project.description.map((d) => (
          <p key={d}>{d}</p>
        ))}
        <h2>Built with</h2>
        <ul>
          {project.technologies.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {(project.live_url || project.github_url) && (
          <>
            <h2>Links</h2>
            <ul>
              {project.live_url && (
                <li>
                  <a href={project.live_url}>{project.live_url}</a>
                </li>
              )}
              {project.github_url && (
                <li>
                  <a href={project.github_url}>{project.github_url}</a>
                </li>
              )}
            </ul>
          </>
        )}
      </>
    );
  },
});

export { projects };
