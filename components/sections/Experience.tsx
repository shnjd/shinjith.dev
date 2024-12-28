import { IconArrowUpRight, IconUsersPlus } from "@tabler/icons-react";
import Section from "../base/Section";
import Link from "next/link";
import Tag from "../base/Tag";

const techs = ["JavaScript", "TypeScript", "Nextjs", "React", "Tailwind"];

export default function Experience() {
  return (
    <Section
      name="Experience"
      subHeading="Waves of My Work"
      className="min-h-fit"
    >
      <div className="py-4 sm:py-5 md:py-6 lg:py-8">
        <div className="my-4 sm:my-5 md:my-6 lg:my-8">
          <div className="contact-lines contact-line-1 h-0.5 rounded-full" />
          <div className="flex flex-col gap-2 py-7 sm:gap-4 lg:flex-row lg:gap-8">
            <h3 className="shrink-0 text-sm font-bold uppercase text-muted sm:text-xl md:text-2xl lg:text-subtle">
              April 2024
            </h3>
            <div>
              <h3 className="mb-0.5 text-xl font-bold sm:text-2xl">
                Frontend Developer
              </h3>
              <h5 className="mb-3 text-sm font-medium text-subtle sm:text-base md:text-lg">
                TGH Tech
              </h5>
              <p className="max-w-[900px] text-sm text-muted sm:text-base">
                I have spent over 1.5 years at TGH Tech as a react developer,
                where I created and contributed to more than 7-8 customer
                projects using cutting-edge technologies and libraries.
                <br />
                It was my first professional work experience, and it helped me
                lay a solid foundation for my future career. I happened to
                improve and practice React, TypeScript, and other technologies
                with great team players.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {techs.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </div>
          <div className="contact-lines contact-line-2 h-0.5 rounded-full" />
        </div>

        <div className="mt-6 space-y-4 sm:mt-8">
          <p className="max-w-[800px] text-sm text-subtle sm:text-base">
            I am eager to join an organization where I can develop my skills,
            make significant contributions, and enthusiastically support and
            advance the organization&apos;s vision.
          </p>

          <Link
            href="mailto:shinjithkanhangad@gmail.com"
            className="mr-5 inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary px-5 py-2 font-medium text-primary-fg shadow-xl transition-all hover:bg-primary/90 hover:shadow-md"
          >
            Hire me <IconUsersPlus size={16} />
          </Link>

          <Link
            href="https://resume.shinjith.dev/?download=true"
            className="inline-flex w-fit items-center gap-1 rounded-lg py-2 font-medium text-primary transition-all hover:text-primary/90"
          >
            View resume
            <IconArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </Section>
  );
}
