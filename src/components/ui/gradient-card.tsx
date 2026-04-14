import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative flex flex-col justify-between h-full w-full overflow-hidden rounded-2xl p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg",
  {
    variants: {
      gradient: {
        cream: "bg-gradient-to-br from-[#F5F3EE] to-[#EBE8E0]/60",
        warm: "bg-gradient-to-br from-[#EDE9E1] to-[#E0D9CE]/50",
        gold: "bg-gradient-to-br from-[#F2EFE7] to-[#DDD5C5]/40",
        sage: "bg-gradient-to-br from-[#EEF0EC] to-[#DEE3DA]/50",
      },
    },
    defaultVariants: {
      gradient: "cream",
    },
  }
);

export interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  badgeText?: string;
  badgeColor?: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  imageUrl?: string;
}

const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  ({ className, gradient, badgeText, badgeColor, title, description, ctaText, ctaHref, imageUrl, ...props }, ref) => {
    const cardAnimation = {
      rest: { scale: 1, y: 0 },
      hover: { scale: 1.02, y: -3 },
    };

    const imageAnimation = {
      rest: { scale: 1, rotate: 0 },
      hover: { scale: 1.08, rotate: 2 },
    };

    return (
      <motion.div
        variants={cardAnimation}
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="h-full"
        ref={ref}
      >
        <div className={cn(cardVariants({ gradient }), className)} {...props}>
          {imageUrl && (
            <motion.img
              src={imageUrl}
              alt={`${title}`}
              variants={imageAnimation}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="absolute -right-1/4 -bottom-1/4 w-3/4 opacity-50 pointer-events-none"
            />
          )}

          <div className="z-10 flex flex-col h-full">
            {badgeText && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/50 px-3 py-1 text-xs font-medium backdrop-blur-sm w-fit"
                style={{ color: '#2C2C2A', fontFamily: "'DM Sans', sans-serif" }}
              >
                {badgeColor && (
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: badgeColor }} />
                )}
                {badgeText}
              </div>
            )}

            <div className="flex-grow">
              <h3 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 22,
                fontWeight: 500,
                color: '#2C2C2A',
                marginBottom: 8,
              }}>
                {title}
              </h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                lineHeight: 1.6,
                color: '#888780',
                maxWidth: 260,
              }}>
                {description}
              </p>
            </div>

            <a
              href={ctaHref}
              className="group mt-5 inline-flex items-center gap-1.5"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: '#2C2C2A',
                textDecoration: 'none',
              }}
            >
              {ctaText}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </motion.div>
    );
  }
);
GradientCard.displayName = "GradientCard";

export { GradientCard, cardVariants };
