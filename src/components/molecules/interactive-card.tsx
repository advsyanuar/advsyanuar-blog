import React, { useRef, useState } from "react";
import { motion } from "motion/react";

export interface InteractiveCardProps {
  /** Title of the card displayed on hover */
  title: string;
  /** Optional subtitle or metadata tag */
  subtitle?: string;
  /** Video URL for the background (plays only on hover) */
  videoSrc?: string;
  /** Optional static image poster when video is paused */
  posterSrc?: string;
  /** Additional CSS class names */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

const DEFAULT_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  subtitle,
  videoSrc = DEFAULT_VIDEO,
  posterSrc,
  className = "",
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Bracket motion variants (reveals outwards from inside corner to outside position)
  const bracketVariants = {
    topLeft: {
      initial: { x: 10, y: 10, opacity: 0 },
      animate: { x: 0, y: 0, opacity: 1 },
      exit: { x: 10, y: 10, opacity: 0 },
    },
    topRight: {
      initial: { x: -10, y: 10, opacity: 0 },
      animate: { x: 0, y: 0, opacity: 1 },
      exit: { x: -10, y: 10, opacity: 0 },
    },
    bottomLeft: {
      initial: { x: 10, y: -10, opacity: 0 },
      animate: { x: 0, y: 0, opacity: 1 },
      exit: { x: 10, y: -10, opacity: 0 },
    },
    bottomRight: {
      initial: { x: -10, y: -10, opacity: 0 },
      animate: { x: 0, y: 0, opacity: 1 },
      exit: { x: -10, y: -10, opacity: 0 },
    },
  };

  return (
    <motion.div
      className={`group relative aspect-video bg-neutral-950/50 backdrop-blur-lg border border-neutral-800 hover:border-neutral-600 cursor-pointer select-none transition-colors duration-300 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Video Content Container (Clipped to rect boundary) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 pointer-events-none"
          style={{ opacity: isHovered ? 0.9 : 0.4 }}
        />

        {/* Dark Overlay for Depth */}
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950/90 via-neutral-950/40 to-neutral-950/20 pointer-events-none" />

        {/* Content Container (Minimalist White Title Reveal) */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 z-10 pointer-events-none">
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{
                opacity: isHovered ? 1 : 0.5,
                y: isHovered ? 0 : 4,
              }}
              transition={{ duration: 0.2 }}
              className="mb-1.5"
            >
              <span className="inline-block text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 border border-white/20 bg-neutral-950/80 text-white/90">
                {subtitle}
              </span>
            </motion.div>
          )}

          {/* Title reveal */}
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 12,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-lg font-semibold tracking-wide text-white uppercase font-mono"
          >
            {title}
          </motion.h3>
        </div>
      </div>

      <motion.div
        className="absolute -top-2.5 -left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-white pointer-events-none z-20"
        variants={bracketVariants.topLeft}
        initial="initial"
        animate={isHovered ? "animate" : "exit"}
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
      />

      {/* Top Right */}
      <motion.div
        className="absolute -top-2.5 -right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-white pointer-events-none z-20"
        variants={bracketVariants.topRight}
        initial="initial"
        animate={isHovered ? "animate" : "exit"}
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
      />

      {/* Bottom Left */}
      <motion.div
        className="absolute -bottom-2.5 -left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-white pointer-events-none z-20"
        variants={bracketVariants.bottomLeft}
        initial="initial"
        animate={isHovered ? "animate" : "exit"}
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
      />

      {/* Bottom Right */}
      <motion.div
        className="absolute -bottom-2.5 -right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-white pointer-events-none z-20"
        variants={bracketVariants.bottomRight}
        initial="initial"
        animate={isHovered ? "animate" : "exit"}
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
      />
    </motion.div>
  );
};

export default InteractiveCard;
