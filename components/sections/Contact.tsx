"use client";
import { useContext, useEffect, useRef } from "react";
import { SectionContext } from "../contexts/SectionContext";

export default function Contact() {
  const sectionRef = useRef<any>(null);
  const thisSection = "Services";
  const { setSection } = useContext(SectionContext);

  useEffect(() => {
    const onScroll = () => {
      if (sectionRef.current) {
        const { top, bottom } = sectionRef.current.getBoundingClientRect();
        if (
          window.scrollY > window.scrollY + top - 400 &&
          window.scrollY < window.scrollY + bottom - 400
        )
          setSection(thisSection);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [sectionRef.current]);

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen">
      Contact
    </section>
  );
}
