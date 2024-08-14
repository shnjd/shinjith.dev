import { rubik } from "@/lib/fonts";
import Section from "../base/Section";
import Image from "next/image";

const SHINJITH = ["S", "h", "i", "n", "j", "i", "t", "h"];

export default function Cover() {
  return (
    <Section
      name={"Cover"}
      className="relative flex items-center justify-center"
      limitOnXl={false}
      withoutTitle
    >
      <div className="absolute left-1/2 top-0 w-full -translate-x-1/2 pt-5">
        <p className="mb-5 text-sm font-medium text-subtle xl:pl-3 xl:text-2xl">
          Hey, I am
        </p>

        <h2
          className={`${rubik.className} flex w-full justify-between text-center text-9xl text-[min(16rem,max(15vw,3rem))] font-bold uppercase tracking-wide text-primary/70`}
        >
          {SHINJITH.map((l) => (
            <span key={`shinjith-${l}`}>{l}</span>
          ))}
        </h2>
      </div>

      <div className="absolute bottom-16 flex flex-col items-center p-3 text-center">
        <div className="relative mb-3 h-28 w-28 xl:h-40 xl:w-40">
          <Image
            src="/shinjith.jpg"
            fill
            className="rounded-full object-cover object-top"
            alt="shinjith's portrait"
          />
        </div>

        <p className="text-xl font-semibold text-fg sm:text-2xl md:text-3xl">
          Web Developer
        </p>
        <p className="mb-1.5 text-sm font-medium text-subtle sm:text-base md:text-lg">
          Based in Kerala, India
        </p>
        <p className="max-w-lg text-xs font-normal text-muted sm:text-sm md:text-base">
          Who specializes in creating pixel-perfect, engaging, and accessible
          digital experiences. Currently, I&apos;m concentrating on developing
          useful web projects and learning new things.
        </p>
      </div>
    </Section>
  );
}
