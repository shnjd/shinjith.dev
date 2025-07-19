import { IconArrowUpRight, IconUsersPlus } from "@tabler/icons-react";
import Section from "../base/Section";
import Link from "next/link";
import Tag from "../base/Tag";
import portfolio from "@/portfolio.json";
import { IExperience } from "@/lib/types";
import { Fragment } from "react";

const experiences = portfolio.experience;

const Item = ({ experience }: { experience: IExperience }) => {
  return (
    <div className="flex flex-col gap-2 py-7 sm:gap-4 lg:flex-row lg:gap-8">
      <p className="w-[240px] shrink-0 text-sm font-bold uppercase text-muted sm:text-xl md:text-2xl lg:text-subtle">
        {experience.to}
      </p>
      <div>
        <h3 className="mb-0.5 text-xl font-bold sm:text-2xl">
          {experience.role}
        </h3>
        <h4 className="mb-3 text-sm font-medium text-subtle sm:text-base md:text-lg">
          {experience.company}
        </h4>
        <p className="max-w-[900px] text-sm text-muted sm:text-base">
          {experience.description.map((d, index) => (
            <Fragment key={`${experience.company}-desc-${index}`}>
              {d}
              {index !== experience.description.length - 1 && <br />}
            </Fragment>
          ))}
        </p>

        <ul className="mt-4 flex list-none flex-wrap gap-2">
          {experience.technologies.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </ul>
      </div>
    </div>
  );
};

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
          <ul className="list-none">
            {experiences.map((e) => (
              <li key={e.company}>
                <Item experience={e} />
                <div className="contact-lines contact-line-2 h-0.5 rounded-full" />
              </li>
            ))}
          </ul>
          <div className="contact-lines contact-line-2 h-0.5 rounded-full" />
        </div>

        <div className="mt-6 space-y-4 sm:mt-8">
          <p className="max-w-[800px] text-sm text-subtle sm:text-base">
            I am eager to join an organization where I can develop my skills,
            make significant contributions, and enthusiastically support and
            advance the organization&apos;s vision.
          </p>

          <Link
            href="mailto:shinjithdev@gmail.com"
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
