import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}

// Helper component for navigation links
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const isInternal = href.startsWith('/') && !href.startsWith('#');
  if (isInternal) {
    return (
      <Link
        to={href}
        className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
    >
      {children}
    </a>
  );
};

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" />
  </a>
);

// The main reusable Hero Section component
export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-background px-5 py-6 font-sans sm:px-8 sm:py-8 md:p-12',
        className
      )}
    >
      {/* Header */}
      <header className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg font-bold tracking-wider sm:text-xl"
        >
          {logoText}
        </motion.div>
        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-1.5 md:hidden"
          aria-label="Open menu"
        >
          <span className="block h-0.5 w-6 bg-foreground"></span>
          <span className="block h-0.5 w-6 bg-foreground"></span>
          <span className="block h-0.5 w-5 bg-foreground"></span>
        </motion.button>
      </header>

      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center gap-6 py-6 sm:gap-8 md:grid-cols-3 md:gap-4 md:py-0">

        {/* Left Text Content — hidden on mobile, shown on md+ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-3 text-center md:order-1 md:text-left"
        >
          <p className="mx-auto max-w-xs text-xs leading-relaxed text-foreground/80 sm:text-sm md:mx-0">{mainText}</p>
          <a href={readMoreLink} className="mt-3 inline-block text-xs font-medium text-foreground underline decoration-from-font sm:mt-4 sm:text-sm">
            Read More
          </a>
        </motion.div>

        {/* Center Image with Circle */}
        <div className="relative order-1 flex h-[280px] items-center justify-center sm:h-[340px] md:order-2 md:h-full">
            {/* Yellow circle — responsive sizes */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="absolute z-0 h-[220px] w-[220px] rounded-full bg-yellow-400/90 sm:h-[280px] sm:w-[280px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
            ></motion.div>
            {/* Portrait with multiply blend — white bg becomes transparent */}
            <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="relative z-10 h-auto w-40 scale-150 object-cover mix-blend-multiply sm:w-52 md:w-64 lg:w-72"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found`;
                }}
            />
        </div>

        {/* Right Text — large heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-2 flex items-center justify-center text-center md:order-3 md:justify-start md:text-left"
        >
          <h1 className="leading-[0.9] text-foreground">
            <span className="block text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {overlayText.part1}
            </span>
            <span className="block text-lg font-light tracking-[0.25em] opacity-50 mt-2 sm:text-xl md:text-2xl lg:text-3xl">
              {overlayText.part2}
            </span>
          </h1>
        </motion.div>
      </div>

      {/* Footer Elements */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-xs font-medium text-foreground/80 sm:text-sm"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
