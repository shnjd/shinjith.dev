"use client";
import { motion } from "motion/react";
import Section from "@/components/layouts/Section";
import { services } from "@/lib/data";
import { reveal, stagger } from "@/lib/motion";

type CardProps = {
  card: DataService;
  index: number;
};

function Card({ card, index = 0 }: CardProps) {
  const Icon = card.icon;

  return (
    <motion.div
      {...reveal({ delay: stagger(index), y: 16 })}
      className="border-border from-background/40 via-surface/20 to-primary/5 relative z-10 flex flex-col justify-end gap-1 rounded-2xl border bg-linear-to-tr p-3 pt-12 shadow-xs backdrop-blur-lg backdrop-saturate-200 sm:p-5 sm:pt-14 md:pt-16 lg:pt-20"
    >
      <div className="text-subtle mb-2 text-lg sm:text-xl md:text-2xl">
        <Icon size={32} />
      </div>

      <h3 className="text-fg text-sm font-medium sm:text-base md:text-lg">
        {card.title}
      </h3>
      <p className="text-muted text-xs sm:text-sm">{card.description}</p>
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
      <div className="mx-auto grid max-w-(--breakpoint-xl) grid-cols-1 gap-2 pt-4 pb-4 sm:gap-4 sm:pt-5 sm:pb-6 md:grid-cols-2 md:pt-6 md:pb-6 lg:grid-cols-4 lg:pt-8 lg:pb-10 xl:pb-16 2xl:pb-20">
        {services.map((card, index) => (
          <Card card={card} key={card.title} index={index} />
        ))}
      </div>
    </Section>
  );
}
