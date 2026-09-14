import { lazy, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import RevealPageLayout from "../layout/reveal-page-layout";
import type { GalleryItem } from "../../models/gallery-item";
import { ITEMS } from "../../data/gallery-items.data";
import { GalleryCard } from "./gallery-card";
import useGetIcon from "../../hooks/useGetIcon";
import TextType from "../decoratives/text-type";

// Lazy loaded section components
const Projects = lazy(() => import("../../sections/projects"));
const Demos = lazy(() => import("../../sections/demos"));
const About = lazy(() => import("../../sections/about"));

export default function ScrollHorizontal() {
  const [openCard, setOpenCard] = useState<{
    item: GalleryItem;
    origin: DOMRect;
  } | null>(null);

  const { getIcon } = useGetIcon();

  const socialLinks = [
    { name: "instagram", label: "Instagram", url: "https://instagram.com" },
    { name: "spotify", label: "Spotify", url: "https://spotify.com" },
    { name: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/yanuar-adinagoro/" },
  ];

  const conditionalRendering = (): ReactNode => {
    if (!openCard) return null;
    switch (openCard.item.id.toLowerCase()) {
      case "pr":
        return <Projects />;
      case "de":
        return <Demos />;
      case "ab":
        return <About />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-7rem)] overflow-hidden m-14 bg-slate-50">
      <div className="h-12 flex items-center">
        <div className="flex-1 flex items-center">
          <span className="h-12 px-2 bg-slate-900 flex flex-col justify-center border-r border-slate-800 border-dashed">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="28" viewBox="0 0 40 28" fill="none" id="Logo"><g id="logomark"><path fillRule="evenodd" clipRule="evenodd" d="M9.98578 4.11462L0 14C1.99734 15.9773 4.27899 17.6437 6.76664 18.9474C7.45424 20.753 8.53203 22.4463 10 23.8995C15.5229 29.3668 24.4772 29.3668 30 23.8995C31.468 22.4463 32.5458 20.753 33.2334 18.9473C35.721 17.6437 38.0027 15.9773 40 14L30.0223 4.12266C30.0149 4.11527 30.0075 4.10788 30 4.1005C24.4772 -1.36683 15.5229 -1.36683 10 4.1005C9.99527 4.10521 9.99052 4.10991 9.98578 4.11462ZM29.0445 20.7309C26.1345 21.7031 23.0797 22.201 20 22.201C16.9203 22.201 13.8656 21.7031 10.9556 20.7309C11.2709 21.145 11.619 21.5424 12 21.9196C16.4183 26.2935 23.5817 26.2935 28 21.9196C28.381 21.5424 28.7292 21.145 29.0445 20.7309ZM12.2051 5.8824C12.9554 6.37311 13.7532 6.79302 14.588 7.13536C16.3038 7.83892 18.1428 8.20104 20 8.20104C21.8572 8.20104 23.6962 7.83892 25.412 7.13536C26.2468 6.79302 27.0446 6.3731 27.795 5.88238C23.4318 1.77253 16.5682 1.77254 12.2051 5.8824Z" fill="#FFFFFF"/></g></svg>
          </span>
          <span className="h-12 px-4 flex flex-col justify-center">
            <TextType 
              text={["Hi there I'm Yanuar", "i'm a 'junior' software engineer", "...and a musician", "...also a little bit of this and that."]}
              typingSpeed={75}
              pauseDuration={2000}
              showCursor
              cursorCharacter="█"
              deletingSpeed={50}
              cursorBlinkDuration={0.5}
              className="font-ibm text-slate-900 uppercase font-semibold text-2xl"
            />
          </span>
        </div>
        <div className="basis-1/7 flex justify-end items-center">
          <button
            type="button"
            aria-label="Email"
            className="group h-12 flex items-center border border-slate-400/40 bg-white/10 px-3 md:px-4 py-2 font-ibm text-xs tracking-widest text-slate-900 uppercase cursor-pointer transition-colors duration-300 hover:border-slate-950 hover:border-dashed hover:bg-slate-950 hover:text-white"
          >
            <svg
              className="h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 6-10 7L2 6" />
            </svg>
            <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-32 group-hover:ml-2 group-hover:opacity-100 transition-all duration-300">
              Email
            </span>
          </button>
          <button
            type="button"
            aria-label="Phone"
            className="group flex h-12 items-center border border-slate-400/40 bg-white/10 px-3 md:px-4 py-2 font-ibm text-xs tracking-widest text-slate-900 uppercase cursor-pointer transition-colors duration-300 hover:border-slate-950 hover:border-dashed hover:bg-slate-950 hover:text-white"
          >
            <svg
              className="h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-32 group-hover:ml-2 group-hover:opacity-100 transition-all duration-300">
              Phone
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 items-start w-full h-full flex-1">
        {ITEMS.map((item) => {
          if (item.id === "Ar") {
            return (
              <GalleryCard
                key={item.id}
                item={item}
                clickable={true}
                onClick={() => window.open("http://advsyanuar.cloud", "__blank")}
              />
            );
          }
          return (
            <GalleryCard
              key={item.id}
              item={item}
              clickable={true}
              onClick={(origin) => setOpenCard({ item, origin })}
            />
          );
        })}
      </div>

      <div className="flex items-center text-black h-12 border-t border-slate-900 border-dashed">
        {socialLinks.map((social) => {
          const icon = getIcon(social.name);
          return (
            <a
              key={social.name}
              href={icon?.stack_link || social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="group h-12 flex items-center border border-slate-400/40 bg-white/10 px-3 md:px-4 py-2 font-ibm text-xs tracking-widest text-slate-900 uppercase cursor-pointer transition-colors duration-300 hover:border-slate-950 hover:border-dashed hover:bg-slate-950 hover:text-white"
            >
              {icon?.icon_link ? (
                <img
                  src={icon.icon_link}
                  alt={social.label}
                  className="h-5 w-5 shrink-0 object-contain"
                />
              ) : (
                <span className="h-5 w-5 shrink-0 flex items-center justify-center font-bold text-xs">
                  {social.label.charAt(0)}
                </span>
              )}
              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-32 group-hover:ml-2 group-hover:opacity-100 transition-all duration-300">
                {social.label}
              </span>
            </a>
          );
        })}
      </div>

      <AnimatePresence>
        {openCard && (
          <RevealPageLayout
            key={openCard.item.id}
            title={openCard.item.title}
            origin={openCard.origin}
            list={["item1", "item2", "item3"]}
            onClose={() => setOpenCard(null)}
          >
            {conditionalRendering()}
          </RevealPageLayout>
        )}
      </AnimatePresence>
    </div>
  );
}