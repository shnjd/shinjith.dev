'use client';
import { rubik } from '@/lib/fonts';
import Image from 'next/image';
import { motion } from 'motion/react';
import Section from '@/components/layouts/Section';
import { displayName } from '@/lib/constants';
import { about } from '@/lib/data';

export default function Cover() {
  return (
    <Section
      name={'Cover'}
      className="relative flex items-center justify-center"
      limitOnXl={false}
      withoutTitle
    >
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 pt-5">
        <p className="text-subtle mb-5 text-sm font-medium xl:pl-3 xl:text-2xl">
          Hey, I am
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'tween', duration: 0.2 }}
          viewport={{ once: true }}
          className={`${rubik.className} text-primary/50 flex w-full justify-between text-center text-9xl text-[min(16rem,max(15vw,3rem))] font-bold tracking-wide uppercase`}
        >
          {displayName.map((l, index) => (
            <span key={`shinjith-${l}-${index}`}>{l}</span>
          ))}
        </motion.h1>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center p-3 text-center md:bottom-12 xl:bottom-16">
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 1.1 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, type: 'tween', duration: 0.2 }}
          viewport={{ once: true }}
          className="relative mb-3 h-32 w-32 xl:h-40 xl:w-40"
        >
          <Image
            src="/assets/images/shinjith.jpg"
            height={160}
            width={160}
            className="rounded-full object-cover object-top"
            alt="shinjith's portrait"
            priority
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 60, scale: 1.1 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: 'tween', duration: 0.2 }}
          viewport={{ once: true }}
          className="text-fg text-xl font-semibold sm:text-2xl md:text-3xl"
        >
          {about.title}
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 60, scale: 1.1 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, type: 'tween', duration: 0.2 }}
          viewport={{ once: true }}
          className="text-subtle mb-1.5 text-sm font-medium sm:text-base md:text-lg"
        >
          {about.caption}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 40, scale: 1.1 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.45, type: 'tween', duration: 0.2 }}
          viewport={{ once: true }}
          className="text-muted max-w-lg text-sm font-normal sm:text-base"
        >
          {about.description}
        </motion.p>
      </div>
    </Section>
  );
}
