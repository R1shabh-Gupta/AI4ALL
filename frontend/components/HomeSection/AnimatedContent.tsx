"use client";

import StarGrid from "@/components/StarGrid";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Button } from "../ui/button";

export default function AnimatedContent() {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          ".hero__heading, .hero__body, .hero__button, .hero__image, .hero__glow",
          { opacity: 1 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.fromTo(
        ".hero__heading",
        { scale: 0.5 },
        { scale: 1, opacity: 1, duration: 1.4 }
      );

      tl.fromTo(
        ".hero__body",
        { y: 20 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=0.6"
      );

      tl.fromTo(
        ".hero__button",
        { scale: 1.5 },
        { scale: 1, opacity: 1, duration: 1.3 },
        "-=0.8"
      );
      tl.fromTo(
        ".hero__image",
        { y: 100 },
        { y: 0, opacity: 1, duration: 1.3 },
        "+=0.3"
      );
      tl.fromTo(
        ".hero__glow",
        { scale: 0.5 },
        { scale: 1, opacity: 1, duration: 1.8 },
        "-=1"
      );
    },
    { scope: container }
  );

  return (
    <div className="relative text-center" ref={container}>
      <StarGrid />

      <h1 className="text-5xl font-medium opacity-0 mt-14 hero__heading text-balance md:text-7xl">
        <span className="bg-clip-text font-semibold text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient shadow-2xl">
          TuringLabs
        </span>{" "}
        is Where Innovation Meets Simplicity
      </h1>

      <div className="max-w-xl mx-auto mt-6 opacity-0 hero__body text-balance text-slate-300">
        A no-code tool designed to simplify and democratize the process of
        selecting, tuning, and deploying machine learning models.
      </div>

      <Button className="mt-8 opacity-0 hero__button">Get Started</Button>

      <div className="mt-16 opacity-0 hero__image glass-container w-fit">
        <div className="absolute inset-0 opacity-0 hero__glow -z-10 bg-blue-500/30 blur-2xl filter" />
        <img
          src="/assets/images/hero_dashboard.avif"
          alt="Dashboard"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
