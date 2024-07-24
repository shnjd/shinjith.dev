import { IconArrowUpRight, IconUsersPlus } from "@tabler/icons-react";
import Section from "../base/Section";
import Link from "next/link";

const techs = ["JavaScript", "TypeScript", "Nextjs", "React", "Tailwind"];

export default function Experience() {
  return (
    <Section name="Experience" subHeading="Waves of My Work">
      <div className="px-40 py-20">
        <div className="my-8 pr-6">
          <div className="contact-lines contact-line-1 h-0.5 rounded-full" />
          <div className="flex gap-8 py-7">
            <h3 className="shrink-0 text-2xl font-bold uppercase text-subtle">
              April 2024
            </h3>
            <div>
              <h3 className="mb-0.5 text-2xl font-bold">Frontend Developer</h3>
              <h5 className="mb-3 text-lg font-medium text-subtle">TGH Tech</h5>
              <p className="max-w-[900px] text-muted">
                I have spent over 1.5 years at TGH Tech as a react developer,
                where I created and contributed to more than 7-8 customer
                projects using cutting-edge technologies and libraries.
                <br />
                It was my first professional work experience, and it helped me
                lay a solid foundation for my future career. I happened to
                improve and practice React, TypeScript, and other technologies
                with great team players.
              </p>

              <div className="my-4 flex flex-wrap gap-2">
                {techs.map((t) => (
                  <div
                    key={t}
                    className="rounded-full border border-overlay/45 bg-gradient-to-tr from-background/25 to-secondary/25 px-3 py-1 text-sm text-secondary-fg backdrop-blur-lg backdrop-saturate-150 dark:text-subtle"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="contact-lines contact-line-2 h-0.5 rounded-full" />
        </div>

        <div className="mt-8 space-y-4">
          <p className="max-w-[800px]">
            I am eager to join an organization where I can develop my skills,
            make significant contributions, and enthusiastically support and
            advance the organization's vision.
          </p>

          <Link
            href="mailto:shinjithkanhangad@gmail.com"
            className="mr-2 inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary px-5 py-2 font-medium text-primary-fg shadow-xl transition-all hover:bg-primary/90 hover:shadow-md"
          >
            Hire me <IconUsersPlus size={16} />
          </Link>

          <Link
            href="https://resume.shinjith.dev"
            className="inline-flex w-fit items-center gap-1 rounded-lg px-5 py-2 font-medium text-primary transition-all hover:text-primary/90"
          >
            View resume
            <IconArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </Section>
  );
}
