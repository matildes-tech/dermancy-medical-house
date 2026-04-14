import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ParallaxSection {
  id: string | number;
  content: ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  imageElement?: ReactNode;
  reverse?: boolean;
}

interface ParallaxScrollFeatureSectionProps {
  sections: ParallaxSection[];
  className?: string;
}

function ParallaxItem({ section }: { section: ParallaxSection }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const clipPath = useTransform(scrollYProgress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const translateY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <div
      ref={ref}
      className={cn(
        "min-h-[75vh] flex items-center justify-center gap-8 md:gap-16 lg:gap-24 px-6 md:px-10",
        "flex-col md:flex-row",
        section.reverse && "md:flex-row-reverse"
      )}
    >
      <motion.div style={{ y: translateY, opacity }} className="max-w-md">
        {section.content}
      </motion.div>

      {(section.imageUrl || section.imageElement) && (
        <motion.div style={{ opacity, clipPath }} className="relative">
          {section.imageElement ? (
            section.imageElement
          ) : (
            <img
              src={section.imageUrl}
              alt={section.imageAlt || ""}
              className="w-72 h-80 md:w-80 md:h-96 object-cover rounded-lg"
              loading="lazy"
            />
          )}
        </motion.div>
      )}
    </div>
  );
}

export function ParallaxScrollFeatureSection({ sections, className }: ParallaxScrollFeatureSectionProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {sections.map((section) => (
        <ParallaxItem key={section.id} section={section} />
      ))}
    </div>
  );
}
