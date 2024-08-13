import { rubik } from "@/lib/fonts";
import Section from "../base/Section";
import Image from "next/image";

const SHINJITH = ["S", "h", "i", "n", "j", "i", "t", "h"];

export default function Cover() {
  return (
    <Section
      name={"Cover"}
      className="relative flex items-center justify-center"
      withoutTitle
    >
      <div className="absolute left-1/2 top-0 w-full -translate-x-1/2 space-y-4 pt-5">
        <p className="pl-3 text-2xl font-medium text-subtle">Hey, I am</p>

        <h2
          className={`${rubik.className} flex justify-between text-center text-9xl text-[15vw] font-bold uppercase tracking-wide text-primary/70`}
        >
          {SHINJITH.map((l) => (
            <span key={`shinjith-${l}`}>{l}</span>
          ))}
        </h2>
      </div>
      <div className="absolute bottom-0 flex flex-col items-center p-12 text-center">
        <div className="relative mb-3 h-40 w-40">
          <Image
            src="/shinjith.jpg"
            fill
            className="rounded-full object-cover object-top"
            alt="shinjith's portrait"
          />
        </div>

        <p className="text-3xl font-semibold text-fg">Web Developer</p>
        <p className="mb-1.5 text-lg font-medium text-subtle">
          Based in Kerala, India
        </p>
        <p className="max-w-lg text-sm font-normal text-muted sm:text-base">
          Who specializes in creating pixel-perfect, engaging, and accessible
          digital experiences. Currently, I&apos;m concentrating on developing
          useful web projects and learning new things.
        </p>
      </div>
    </Section>
  );
}
