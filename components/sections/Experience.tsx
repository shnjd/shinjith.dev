import { IconArrowUpRight, IconUsersPlus } from "@tabler/icons-react";
import Section from "../base/Section";
import Link from "next/link"

const techs = ["JavaScript", "TypeScript", "Nextjs", "React", "Tailwind"]

export default function Experience() {
  return (
    <Section name="Experience" subHeading="Waves of My Work">
      <div className="px-40 py-20">
        <div className="my-8 pr-6">
          <div className="contact-lines contact-line-1 h-0.5 rounded-full" />
          <div className="py-7 flex gap-8">
            <h3 className="text-2xl font-bold uppercase text-subtle shrink-0">April 2024</h3>
            <div>
              <h3 className="text-2xl mb-0.5 font-bold">Frontend Developer</h3>
              <h5 className="text-lg font-medium mb-3 text-subtle">TGH Tech</h5>
              <p className="max-w-[900px] text-muted">
                I have spent over 1.5 years at TGH Tech as a react developer, where I created and contributed to more than 7-8 customer projects using cutting-edge technologies and libraries.
                <br />
                It was my first professional work experience, and it helped me lay a solid foundation for my future career. I happened to improve and practice React, TypeScript, and other technologies with great team players.
              </p>

              <div className="flex flex-wrap my-4 gap-2">
                {techs.map(t => <div key={t} className="py-1 px-3 border rounded-full text-sm text-secondary-fg dark:text-subtle bg-gradient-to-tr from-background/25 to-secondary/25 border-overlay/45  backdrop-blur-lg backdrop-saturate-150">{t}</div>)}
              </div>

            </div>

          </div>
          <div className="contact-lines contact-line-2 h-0.5 rounded-full" />
        </div>

        <div className="space-y-4 mt-8">
          <p className="max-w-[800px]">
            I am eager to join an organization where I can develop my skills, make significant contributions, and enthusiastically support and advance the organization's vision.
          </p>

          <Link href="mailto:shinjithkanhangad@gmail.com" className="inline-flex mr-2 items-center gap-1.5 w-fit rounded-lg bg-primary px-5 py-2 font-medium text-primary-fg shadow-xl transition-all hover:bg-primary/90 hover:shadow-md">
            Hire me <IconUsersPlus size={16} />
          </Link>

          <Link href="https://resume.shinjith.dev" className="inline-flex items-center gap-1 w-fit text-primary rounded-lg hover:text-primary/90 px-5 py-2 font-medium transition-all">
            View resume
            <IconArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </Section >
  );
}
