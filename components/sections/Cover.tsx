"use client";
import { rubik } from "@/lib/fonts";
import Section from "../base/Section";
import Image from "next/image";
import { motion } from "framer-motion";

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

        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "tween" }}
          viewport={{ once: true }}
          className={`${rubik.className} flex w-full justify-between text-center text-9xl text-[min(16rem,max(15vw,3rem))] font-bold uppercase tracking-wide text-primary/50`}
        >
          {SHINJITH.map((l) => (
            <span key={`shinjith-${l}`}>{l}</span>
          ))}
        </motion.h2>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center p-3 text-center md:bottom-12 xl:bottom-16">
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 1.1 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: "tween" }}
          viewport={{ once: true }}
          className="relative mb-3 h-32 w-32 xl:h-40 xl:w-40"
        >
          <Image
            src="/assets/images/shinjith.jpg"
            fill
            className="rounded-full object-cover object-top"
            alt="shinjith's portrait"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 60, scale: 1.1 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, type: "tween" }}
          viewport={{ once: true }}
          className="text-xl font-semibold text-fg sm:text-2xl md:text-3xl"
        >
          Web Developer
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 60, scale: 1.1 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, type: "tween" }}
          viewport={{ once: true }}
          className="mb-1.5 text-sm font-medium text-subtle sm:text-base md:text-lg"
        >
          Based in Kerala, India
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 40, scale: 1.1 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, type: "tween" }}
          viewport={{ once: true }}
          className="max-w-lg text-sm font-normal text-muted sm:text-base"
        >
          Who specializes in creating pixel-perfect, engaging, and accessible
          digital experiences. Currently, I&apos;m concentrating on developing
          useful web projects and learning new things.
        </motion.p>
      </div>
    </Section>
  );
}
