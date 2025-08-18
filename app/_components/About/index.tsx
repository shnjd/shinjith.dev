import Section from "@/components/layouts/Section";
import Link from "@/components/core/Link";
import { technologies } from "@/lib/data/technologies";
import TechnologyItem from "./TechnologyItem";
import Marquee from "react-fast-marquee";
import data from "@/lib/data";
import { cn } from "@/utils/cn";

export default function About() {
  return (
    <Section name="About" subHeading="A Glimpse Into Me" className="min-h-fit">
      <div className="h-full space-y-8 py-4 text-sm text-subtle sm:space-y-10 sm:py-5 sm:text-base md:space-y-12 md:py-6 lg:py-8">
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <p className="flex grow flex-col gap-3 md:gap-4">
            {data.about.about.map((para, paraIdx) => (
              <span key={`about-para-${paraIdx}`}>
                {para.map((phrase, phraseIdx) =>
                  phrase?.href ? (
                    <Link
                      key={`about-para-${paraIdx}-phrase-${phraseIdx}`}
                      href={phrase.href}
                      secondary
                      className={cn(
                        !phrase?.noRightMargin && "mr-1",
                        phrase?.highlight &&
                          "text-secondary-fg dark:text-secondary",
                        phrase?.bold && "font-medium",
                      )}
                    >
                      {phrase.value}
                    </Link>
                  ) : (
                    <span
                      key={`about-para-${paraIdx}-phrase-${phraseIdx}`}
                      className={cn(
                        !phrase?.noRightMargin && "mr-1",
                        phrase?.highlight &&
                          "text-secondary-fg dark:text-secondary",
                        phrase?.bold && "font-medium",
                      )}
                    >
                      {phrase.value}
                    </span>
                  ),
                )}
              </span>
            ))}
          </p>
        </div>
        <div>
          <p>Here are some of the technologies I&apos;ve lately worked with:</p>
          <ul className="about-tech-list my-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            {data.about.recentTechnologies.map((tech) => (
              <li key={`recent-tech-${tech}`}>{tech}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="w-fit border-b border-secondary-fg py-0.5 text-secondary-fg dark:border-secondary dark:text-secondary">
            What Else Do I Know?
          </p>

          <Marquee speed={70} className="my-6 text-lg text-subtle">
            {technologies.map((tech) => (
              <TechnologyItem key={tech.name} {...tech} />
            ))}
          </Marquee>
        </div>
      </div>
    </Section>
  );
}
