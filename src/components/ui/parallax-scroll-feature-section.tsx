'use client'

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxSection {
  id: string | number;
  content: ReactNode;
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean;
}

interface ParallaxScrollProps {
  sections: ParallaxSection[];
  className?: string;
}

/**
 * Single parallax section — handles its own scroll-linked animations.
 * Text slides up + fades in, image reveals with a clip-path wipe.
 */
function ParallaxItem({ section }: { section: ParallaxSection }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );
  const translateY = useTransform(scrollYProgress, [0, 1], [-50, 0]);

  return (
    <div
      ref={ref}
      className={`min-h-screen flex items-center justify-center gap-10 px-6 md:gap-20 lg:gap-40 md:px-12 ${
        section.reverse ? "flex-col-reverse md:flex-row-reverse" : "flex-col md:flex-row"
      }`}
    >
      {/* Text content */}
      <motion.div style={{ y: translateY, opacity }} className="max-w-sm">
        {section.content}
      </motion.div>

      {/* Image with clip-path reveal */}
      <motion.div
        style={{ opacity, clipPath }}
        className="relative"
      >
        <img
          src={section.imageUrl}
          className="w-64 h-64 object-cover rounded-lg sm:w-72 sm:h-72 md:w-80 md:h-80"
          alt={section.imageAlt}
          loading="lazy"
        />
      </motion.div>
    </div>
  );
}

export function ParallaxScrollFeatureSection({ sections, className }: ParallaxScrollProps) {
  return (
    <div className={className}>
      {sections.map((section) => (
        <ParallaxItem key={section.id} section={section} />
      ))}
    </div>
  );
}
