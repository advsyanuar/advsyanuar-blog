import { useState, type PropsWithChildren } from "react";
import { motion } from "motion/react";

interface RevealPageLayoutProps extends PropsWithChildren {
  title: string;
  origin?: DOMRect;
  onClose: () => void;
  list: string[]
}

export default function RevealPageLayout({
  title,
  origin,
  onClose,
  children,
  list
}: RevealPageLayoutProps) {
  const fallback: DOMRect = origin ??
    ({ left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 } as DOMRect);
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <motion.div
      className="fixed flex z-50 overflow-hidden bg-beige"
      initial={{
        left: fallback.left,
        top: fallback.top,
        width: fallback.width,
        height: fallback.height,
      }}
      animate={{
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
      }}
      exit={{
        left: fallback.left,
        top: fallback.top,
        width: fallback.width,
        height: fallback.height,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <div className="flex flex-col justify-between pb-6 h-full w-20 border-r border-dashed border-r-slate-800">
        <div className="flex flex-col">
          <button
            type="button"
            onClick={onClose}
            className="flex flex-col items-center w-full h-20 justify-center bg-ink-black/75 font-ibm text-beige backdrop-blur-md transition-colors duration-300 cursor-pointer hover:bg-ink-black/90"
          >
            <span className="text-7xl font-thin">×</span>
          </button>
          <button
            type="button"
            hidden={title === "ABOUT"}
            onClick={() => setPanelOpen(!panelOpen)}
            className="flex flex-col items-center w-full h-20 justify-center font-ibm text-ink-black backdrop-blur-md transition-colors duration-300 cursor-pointer hover:bg-ink-black/90 hover:text-beige border-b border-dashed"
          >
            <span className="text-3xl font-thin">&#8651;</span>
          </button>
        </div>
        <h1 className="-rotate-90 origin-center font-normal text-ink-black tracking-widest text-7xl">{title}</h1>
      </div>

      <div className="relative z-20 h-full w-full flex">
        <motion.div 
          initial={{ width: 0 }}
          animate={{
            width: panelOpen ? "25%" : "0%",
            opacity: panelOpen ? 1 : 0,
            pointerEvents: panelOpen ? "auto" : "none",
            visibility: panelOpen ? "visible" : "hidden"
          }}
          exit={{ width: 0 }}
          transition={{ duration: 0.4 }}
          className="text-ink-black">
            <ul className="p-2 font-ibm font-light">
              {list && list.map((l, i) =>
                <li key={`${l}-item-${i}`} className="flex flex-col items-start">
                  <div className="text-base flex items-center justify-between w-full">
                    <a>&mdash;&mdash; {l}</a> 
                    <span className="text-xs">[Console]</span> 
                  </div> 
                </li>
              )}
            </ul>
        </motion.div>
        {children}
      </div>
    </motion.div>
  );
}