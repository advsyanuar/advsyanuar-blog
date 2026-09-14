import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "../data/projects.data";
import type { Project } from "../models/project";
import useGetIcon from "../hooks/useGetIcon";

interface ProjectsProps {
  items?: Project[];
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 1.05,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
  }),
};

const Projects = ({ items = PROJECTS }: ProjectsProps) => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const {getIcon} = useGetIcon();

  const currentIndex = ((page % items.length) + items.length) % items.length;
  const currentProject = items[currentIndex];

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
    },
    []
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        paginate(1);
      } else if (e.key === "ArrowLeft") {
        paginate(-1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  return (
    <div className="relative flex flex-col h-full w-full bg-neutral-950 text-white overflow-hidden select-none">
      {/* FLEX 1: Full width image container */}
      <div className="relative flex-1 w-full overflow-hidden bg-black flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.25 },
              scale: { duration: 0.3 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentProject.image}
              alt={currentProject.title}
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* Subtle aesthetic gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-transparent to-neutral-950/20 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Optional overlay description tag on image */}
        {currentProject.description && (
          <div className="absolute top-6 left-6 md:top-8 md:left-10 z-10 flex flex-col gap-3 max-w-sm pointer-events-none">
            <p className="text-sm text-neutral-300 backdrop-blur-sm bg-neutral-950/40 p-3 hidden sm:block">
              {currentProject.description}
            </p>
            {currentProject.link !== "#" && (
              <a href={currentProject.link} target="_blank" rel="noopener noreferrer">
                <span className="inline-flex gap-2 items-center px-3 py-1 text-xs font-mono tracking-wider text-emerald-400 bg-neutral-900/80 backdrop-blur-md">
                  <img src={getIcon("github")?.icon_link || ""} alt="github" className="w-5 h-5" /> {currentProject.title}
                </span>
              </a>
            )}
          </div>
        )}

        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-10 z-10 max-w-sm pointer-events-none">
          <div className="flex flex-col flex-wrap gap-2">
            {currentProject.stacks_used.map((s) => (
              <span
                key={s}
                className="inline-flex gap-2 items-center px-3 py-1 text-base font-ibm font-light bg-neutral-800/40 backdrop-blur-md text-slate-100 shadow-sm"
              >
                <img src={getIcon(s)?.icon_link || ""} alt={s} className="w-5 h-5" /> {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* BASIS-1/6 or smaller: Title on the left, Navigation buttons on the right, justify-between */}
      <div className="basis-1/12 flex-none flex items-center justify-between px-6 md:pl-12 border-t border-white/10 bg-neutral-900/90 backdrop-blur-md z-20">
        {/* Title & Metadata on the Left */}
        <div className="flex flex-col justify-center gap-1 overflow-hidden pr-4">
          <h2 className="text-xl flex items-center sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white truncate">
            {currentProject.title}
            {currentProject.stakeholder ? (
              <span className="ml-2 text-md font-normal text-neutral-400">
                {"|" + currentProject.stakeholder}
              </span>
            ) : (
              <span className="ml-2 text-md font-normal text-neutral-400">
                {"|" + "Personal"}
              </span>
            )}
          </h2>
        </div>

        {/* Navigation Buttons & Counter on the Right */}
        <div className="flex items-center gap-4 sm:gap-6 flex-none">
          {/* Index Counter */}
          <div className="font-mono text-sm sm:text-base tracking-widest text-neutral-400">
            <span className="text-white font-bold">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="mx-1 text-neutral-600">/</span>
            <span>{String(items.length).padStart(2, "0")}</span>
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous Slide"
              className="p-3 border border-white/10 bg-white/5 hover:bg-white/15 text-white transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next Slide"
              className="p-3 border border-white/10 bg-white/5 hover:bg-white/15 text-white transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;