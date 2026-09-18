import { useState, useEffect, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import useGetIcon from "../hooks/useGetIcon";
import useProjects from "../hooks/useProjects";

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

const Projects = () => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const { projects, loading, error } = useProjects();
  const { getIcon } = useGetIcon();
  const apihost = import.meta.env.VITE_ENDPOINT;
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

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!projects || projects.length === 0) {
    return <div>No projects found.</div>;
  }

  const currentIndex = ((page % projects.length) + projects.length) % projects.length;
  const currentProject = projects[currentIndex];

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="relative flex flex-col h-full w-full bg-ink-black text-beige overflow-hidden select-none">
      <div className="relative flex-1 w-full overflow-hidden bg-ink-black flex items-center justify-center">
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
              src={apihost + "/" + currentProject.images[0]}
              alt={currentProject.title}
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink-black/80 via-transparent to-ink-black/20 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Optional overlay description tag on image */}
        {currentProject.description && (
          <div className="absolute top-6 left-6 md:top-8 md:left-10 z-10 flex flex-col gap-3 max-w-sm pointer-events-none">
            <p className="text-sm font-ibm text-ash-grey backdrop-blur-sm bg-ink-black/40 p-3 hidden sm:block">
              {currentProject.description}
            </p>
            {currentProject.link && (
              <a href={currentProject.link} target="_blank" rel="noopener noreferrer">
                <span className="inline-flex gap-2 items-center px-3 py-1 text-xs font-medium tracking-wider text-emerald-400 bg-dark-teal/80 backdrop-blur-md">
                  <img src={getIcon("github")?.icon_link || ""} alt="github" className="w-5 h-5" /> {currentProject.title}
                </span>
              </a>
            )}
          </div>
        )}

        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-10 z-10 max-w-sm pointer-events-none">
          <div className="flex flex-col flex-wrap gap-2">
            {(currentProject.stackUsed || []).map((s) => (
              <span
                key={s}
                className="inline-flex gap-2 items-center px-3 py-1 text-base font-ibm font-light bg-dark-teal/40 backdrop-blur-md text-beige shadow-sm"
              >
                <img src={getIcon(s)?.icon_link || ""} alt={s} className="w-5 h-5" /> {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* BASIS-1/6 or smaller: Title on the left, Navigation buttons on the right, justify-between */}
      <div className="basis-1/12 flex-none flex items-center justify-between px-6 md:pl-12 border-t border-ash-grey bg-ink-black backdrop-blur-md z-20">
        {/* Title & Metadata on the Left */}
        <div className="flex flex-col justify-center gap-1 overflow-hidden pr-4">
          <h2 className="text-xl flex items-center sm:text-2xl md:text-3xl font-extrabold tracking-tight text-beige truncate">
            {currentProject.title}
          </h2>
        </div>

        {/* Navigation Buttons & Counter on the Right */}
        <div className="flex items-center gap-4 sm:gap-6 flex-none">
          {/* Index Counter */}
          <div className="font-mono text-sm sm:text-base tracking-widest text-neutral-400">
            <span className="text-beige font-bold">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="mx-1 text-neutral-600">/</span>
            <span>{String(projects.length).padStart(2, "0")}</span>
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous Slide"
              className="p-3 border border-ash-grey/10 bg-dark-teal/80 hover:bg-dark-teal text-beige transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
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
              className="p-3 border border-ash-grey/10 bg-dark-teal/80 hover:bg-dark-teal text-beige transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
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
    </Suspense>
  );
};

export default Projects;