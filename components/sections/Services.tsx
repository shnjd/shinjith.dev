"use client";
import Section from "../base/Section";
import { AnimatePresence, motion } from "motion/react";
import { Service } from "@/lib/types";
import { IconBulb, IconBugOff, IconCode, IconTools } from "@tabler/icons-react";

const services: Service[] = [
  {
    icon: <IconBulb size={32} />,
    title: "Planning & Analysis",
    description:
      "We'll understand your goals, research the market, and create a project plan for your website or app.",
  },
  {
    icon: <IconTools size={32} />,
    title: "Design & Prototyping",
    description:
      "Our designers will create a user-friendly, visually appealing interface with previews for your review.",
  },
  {
    icon: <IconCode size={32} />,
    title: "Development & Coding",
    description:
      "Our developers will build your site using top-notch technologies for functionality & performance.",
  },
  {
    icon: <IconBugOff size={32} />,
    title: "Testing & Deployment",
    description:
      "We ensure your project works flawlessly through rigorous testing and deploy it to the web for users.",
  },
];

type CardProps = {
  card: Service;
  index: number;
};

function Card({ card, index = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, x: 10 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ delay: 0.3 * index * 0.2, type: "tween" }}
      viewport={{ once: true }}
      className="relative z-10 flex flex-col justify-end gap-1 rounded-lg border border-border bg-gradient-to-tr from-background/40 via-surface/20 to-primary/5 p-3 pt-12 shadow-sm backdrop-blur-lg backdrop-saturate-200 sm:p-5 sm:pt-14 md:pt-16 lg:pt-20"
    >
      <div className="mb-2 text-lg text-subtle transition-all sm:text-xl md:text-2xl">
        {card.icon}
      </div>

      <h3 className="text-sm font-medium text-fg transition-all sm:text-base md:text-lg">
        {card.title}
      </h3>
      <p className="text-xs text-muted transition-all sm:text-sm">
        {card.description}
      </p>
    </motion.div>
  );
}

export default function Services() {
  return (
    <Section
      name="Services"
      subHeading="Bringing Your Dreams to Life"
      className="min-h-fit w-full"
    >
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-2 pb-4 pt-4 sm:gap-4 sm:pb-6 sm:pt-5 md:grid-cols-2 md:pb-6 md:pt-6 lg:grid-cols-4 lg:pb-10 lg:pt-8 xl:pb-16 2xl:pb-20">
        <AnimatePresence>
          {services.map((card, index) => (
            <Card card={card} key={card.title} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}
