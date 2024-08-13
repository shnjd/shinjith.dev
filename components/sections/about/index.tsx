import Section from "@/components/base/Section";
import Image from "next/image";
import Link from "@/components/base/Link";
import Technologies from "./Technologies";

export default function About() {
  return (
    <Section name="About" subHeading="A Glimpse Into Me">
      <div className="about-image-grad h-full space-y-8 px-40 py-20 text-subtle">
        <div className="flex items-center gap-8">
          <div className="group shrink-0 overflow-hidden rounded-2xl transition-all duration-500 hover:rounded-3xl">
            <div className="relative bg-surface/45 p-0.5 backdrop-blur-lg backdrop-saturate-200">
              <div className="relative h-[400px] w-[320px] shrink-0 overflow-hidden rounded-[14px] transition-all duration-500 group-hover:rounded-[22px]">
                <Image
                  alt="Shinjith P R"
                  src="/shinjith.jpg"
                  fill
                  className="saturate-50 transition-all duration-500 ease-out group-hover:scale-105 group-hover:saturate-100"
                />
              </div>
            </div>
          </div>

          <p className="flex grow flex-col gap-4">
            <span>
              I am a{" "}
              <span className="text-secondary-fg dark:text-secondary">
                software engineer
              </span>{" "}
              with over two years of experience designing and developing
              interactive, accessible software solutions based on cutting-edge
              technologies and libraries.
            </span>
            <span>
              I specialize in designing visually appealing, user-friendly web
              interfaces, but I also like working on a wide range of different
              goods.
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
          <ul className="about-tech-list my-4 grid grid-cols-3 gap-4">
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
            What else do I know?
          </p>
          <Technologies />
        </div>
      </div>
    </Section>
  );
}
