import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import useGetIcon from "../hooks/useGetIcon";
import useDemo from "../hooks/useDemos";

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

const Demos = () => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInteractive, setIsInteractive] = useState<boolean>(false);
  const { getIcon } = useGetIcon();
  const { demos, loading, error } = useDemo();

  const paginate = useCallback(
    (newDirection: number) => {
      setIsLoading(true);
      setIsInteractive(false);
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
  if (!demos || demos.length === 0) {
    return <div>No demos found.</div>;
  }
  const currentIndex = ((page % demos.length) + demos.length) % demos.length;
  const currentDemo = demos[currentIndex];

  return (
    <div className="relative flex flex-col h-full w-full bg-neutral-950 text-white overflow-hidden select-none">
      {/* FLEX 1: Full width iframe canvas container */}
      <div className="relative flex-1 w-full overflow-hidden bg-black flex items-center justify-center">
        {/* Loading Spinner Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-neutral-950/90 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-mono text-neutral-400 tracking-wider">
                LOADING LIVE DEMO...
              </span>
            </div>
          </div>
        )}

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
            <iframe
              src={currentDemo.demoUrl}
              title={currentDemo.title}
              onLoad={() => setIsLoading(false)}
              className="w-full h-full border-0 bg-neutral-950"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </motion.div>
        </AnimatePresence>

        {/* Pointer Events Control Overlay (Prevents pointer capture while scrolling slides unless unlocked) */}
        {!isInteractive && (
          <div className="absolute inset-0 z-10 bg-transparent" />
        )}

        {/* Interact / Lock Toggle Button */}
        <div className="absolute bottom-6 right-58 md:bottom-8 md:right-60 z-20">
          <button
            type="button"
            onClick={() => setIsInteractive((prev) => !prev)}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer backdrop-blur-md active:scale-95 ${
              isInteractive
                ? "bg-ash-grey text-ink-black font-bold shadow-lg border-cyan-200"
                : "bg-ash-grey text-ink-black hover:bg-ash-grey/80"
            }`}
          >
            {isInteractive ? (
              <>
                <span className="w-2 h-2 rounded-full bg-neutral-950 animate-pulse" />
                LOCK SLIDE NAVIGATION
              </>
            ) : (
              <>
                ENABLE INTERACTION
              </>
            )}
          </button>
        </div>

        {/* Description & Link overlay on iframe */}
        {currentDemo.description && (
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-10 z-20 flex flex-col gap-3 max-w-sm pointer-events-none">
            <p className="text-sm text-ink-blank backdrop-blur-sm bg-ash-grey/80 p-3 hidden sm:block">
              {currentDemo.description}
            </p>
            {currentDemo.githubLink && currentDemo.githubLink !== "#" && (
              <a
                href={currentDemo.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto w-fit"
              >
                <span className="inline-flex gap-2 items-center px-3 py-1 text-xs font-mono tracking-wider text-emerald-400 bg-ink-black/80 backdrop-blur-md">
                  <img
                    src={getIcon("github")?.icon_link || ""}
                    alt="github"
                    className="w-4 h-4"
                  />{" "}
                  {currentDemo.title}
                </span>
              </a>
            )}
          </div>
        )}

        {/* Stack Badges on bottom right */}
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-10 z-20 max-w-sm pointer-events-none">
          <div className="flex flex-col flex-wrap gap-2">
            {currentDemo.stacksUsed.map((s) => (
              <span
                key={s}
                className="inline-flex gap-2 items-center px-3 py-1 text-base font-ibm font-light bg-neutral-800/60 backdrop-blur-md text-slate-100 shadow-sm border border-white/5"
              >
                <img
                  src={getIcon(s)?.icon_link || ""}
                  alt={s}
                  className="w-5 h-5"
                />{" "}
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* BASIS-1/12: Title on the left, Navigation buttons on the right, justify-between */}
      <div className="basis-1/12 flex-none flex items-center justify-between px-6 md:px-12 py-4 border-t border-white/10 bg-neutral-900/90 backdrop-blur-md z-20">
        {/* Title & Metadata on the Left */}
        <div className="flex flex-col justify-center gap-1 overflow-hidden pr-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium tracking-widest text-neutral-400">
              {currentDemo.year || "2025"}
            </span>
            <span className="h-1 w-1 bg-neutral-600" />
            <span className="text-xs font-mono tracking-wider text-neutral-400 uppercase">
              {currentDemo.category}
            </span>
          </div>
          <h2 className="text-xl flex items-center sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white truncate">
            {currentDemo.title}
            {currentDemo.stakeholder ? (
              <span className="ml-2 text-md font-normal text-neutral-400">
                {"|" + currentDemo.stakeholder}
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
          <div className="font-mono hidden sm:flex text-sm sm:text-base tracking-widest text-neutral-400">
            <span className="text-white font-bold">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="mx-1 text-neutral-600">/</span>
            <span>{String(demos.length).padStart(2, "0")}</span>
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

export default Demos;