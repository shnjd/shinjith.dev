import Section from "@/components/base/Section";
import Link from "@/components/base/Link";
import Technologies from "./Technologies";

export default function About() {
  return (
    <Section name="About" subHeading="A Glimpse Into Me" className="min-h-fit">
      <div className="h-full space-y-8 py-4 text-sm text-subtle sm:space-y-10 sm:py-5 sm:text-base md:space-y-12 md:py-6 lg:py-8">
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <p className="flex grow flex-col gap-3 md:gap-4">
            <span>
              I am a{" "}
              <span className="text-secondary-fg dark:text-secondary">
                software engineer
              </span>{" "}
              with over two years of experience creating interactive and
              accessible solutions using modern technologies. While I specialize
              in designing visually appealing, user-friendly web interfaces, I
              like working on a variety of projects.
            </span>

            <span>
              <span className="text-secondary-fg dark:text-secondary">
                Web developer
              </span>{" "}
              in practice. LBS College of Engineering alumna.
            </span>
            <span>
              Intrigued by design, travel, music, strategy, art, philosophy,
              delicious food, and even conversions pique my interest.
            </span>
            <span>
              seeking to be inspired, to put effort on things that make a
              difference, to envision the improbable, and to be surrounded by
              beautiful minds.
            </span>
            <span>
              <span className="font-medium">Say hello</span> on Instagram{" "}
              <Link
                href="https://www.instagram.com/shinjith_"
                secondary
                className="text-secondary-fg dark:text-secondary"
              >
                @shinjith_
              </Link>
            </span>
            <span>
              I was recently working on a project called{" "}
              <Link
                href={"https://pomtick.pages.dev"}
                secondary
                className="text-secondary-fg dark:text-secondary"
              >
                Pomtick
              </Link>
              , which is a cross-platform pomodoro productivity timer built with
              React (NextJS + TypeScript), Tauri, and Turborepo.
            </span>
          </p>
        </div>
        <div>
          <p>Here are some of the technologies I&apos;ve lately worked with:</p>
          <ul className="about-tech-list my-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>React</li>
            <li>Nextjs</li>
            <li>Tauri</li>
            <li>Turborepo</li>
          </ul>
        </div>
        <div>
          <p className="w-fit border-b border-secondary-fg py-0.5 text-secondary-fg dark:border-secondary dark:text-secondary">
            What Else Do I Know?
          </p>
          <Technologies />
        </div>
      </div>
    </Section>
  );
}
