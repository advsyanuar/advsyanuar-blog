import { lazy, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import RevealPageLayout from "../layout/reveal-page-layout";
import type { GalleryItem } from "../../models/gallery-item";
import { GalleryCard } from "./gallery-card";
import useGetIcon from "../../hooks/useGetIcon";
import TextType from "../decoratives/text-type";
import useProjects from "../../hooks/useProjects";
import useDemo from "../../hooks/useDemos";
import useSiteSettings from "../../hooks/useSiteSettings";
import Loading from "../../sections/loading";

// Lazy loaded section components
const Projects = lazy(() => import("../../sections/projects"));
const Demos = lazy(() => import("../../sections/demos"));
const About = lazy(() => import("../../sections/about"));
const NotImplemented = lazy(() => import("../../sections/not-implemented"));

export default function ScrollHorizontal() {
  const [openCard, setOpenCard] = useState<{
    item: GalleryItem;
    origin: DOMRect;
  } | null>(null);
  const [consoleOrigin, setConsoleOrigin] = useState<DOMRect | null>(null);
  const [list, setList] = useState<string[] | []>([]);
  const { getIcon } = useGetIcon();

  const { projects } = useProjects();
  const projectNameList = projects.map(p => p.title);
  const { demos } = useDemo();
  const demoNameList = demos.map(d => d.title);
  const { siteSettings, loading, error } = useSiteSettings();

  const conditionalRendering = (): ReactNode => {
    if (!openCard) return null;

    switch (openCard.item.id.toLowerCase()) {
      case "pr": {
          return <Projects />; 
        }
      case "de":{
        return <Demos />;}
      case "ab":
        return <About />;
      default:
        return null;
    }
  };

  const [isMadeWithOpen, setIsMadeWithOpen] = useState(false);
  const dropupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropupRef.current && !dropupRef.current.contains(event.target as Node)) {
        setIsMadeWithOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if(!openCard) return;

    switch (openCard.item.id.toLowerCase()) {
      case "pr": {
        setList(projectNameList);
        break;
      }
      case "de": {
        setList(demoNameList);
        break;
      }
      default:
        break;
    }
  }, [openCard])

  if (loading) return <Loading />;
  if (error) return <div>Error</div>;
  return (
    <div className="relative flex flex-col h-full xl:h-[calc(100vh-7rem)] overflow-hidden m-0 xl:m-14 bg-beige">
      <div className="h-12 flex items-center">
        <div className="flex-1 flex items-center">
          <span className="h-12 px-2 bg-ash-grey flex flex-col justify-center border-r border-ash-grey border-dashed">
            {siteSettings && <div dangerouslySetInnerHTML={{ __html: siteSettings.siteLogo }} />}
          </span>
          <span className="h-12 px-4 flex flex-col justify-center">
            <TextType 
              text={siteSettings ? siteSettings.typedTexts : []}
              typingSpeed={75}
              pauseDuration={2000}
              showCursor
              cursorCharacter="█"
              deletingSpeed={50}
              cursorBlinkDuration={0.5}
              className="font-ibm text-ink-black uppercase font-semibold text-lg md:text-2xl flex-nowrap"
            />
          </span>
        </div>
        <div className="basis-1/7 flex justify-end items-center shrink-0">
          <button
            type="button"
            aria-label="Console"
            onClick={(e) => {
              setOpenCard(null);
              setConsoleOrigin(e.currentTarget.getBoundingClientRect());
            }}
            className="group h-12 flex items-center border-x border-ash-grey border-dashed bg-beige/10 px-3 md:px-4 py-2 font-ibm text-xs tracking-widest text-ink-black uppercase cursor-pointer transition-colors duration-300 hover:border-ink-black/10 hover:border-dashed hover:bg-ink-black/10"
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
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
            <span className="font-semibold whitespace-nowrap sm:max-w-0 sm:ml-0 sm:overflow-hidden sm:opacity-0 sm:group-hover:max-w-32 sm:group-hover:ml-2 sm:group-hover:opacity-100 transition-all duration-300">
             Console 
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 items-start w-full h-full flex-1">
        {siteSettings && siteSettings.galleryItems.map((item) => {
          if (item.id === "Ar") {
            return (
              <GalleryCard
                key={item.id}
                item={item}
                clickable={true}
                onClick={() => window.open("http://blog.advsyanuar.cloud", "__blank")}
              />
            );
          }
          return (
            <GalleryCard
              key={item.id}
              item={item}
              clickable={true}
              onClick={(origin) => {
                setConsoleOrigin(null);
                setOpenCard({ item, origin });
              }}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center text-ink-black h-12 ">
          {siteSettings && siteSettings.socialLinks.map((social) => {
            const icon = getIcon(social.name);
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group h-12 flex items-center border-x border-ash-grey border-dashed bg-beige/10 px-3 md:px-4 py-2 font-ibm text-xs tracking-widest text-ink-black uppercase cursor-pointer transition-colors duration-300 hover:border-ink-black/10 hover:border-dashed hover:bg-ink-black/10"
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
                <span className="max-w-0 overflow-hidden font-semibold whitespace-nowrap opacity-0 group-hover:max-w-32 group-hover:ml-2 group-hover:opacity-100 transition-all duration-300">
                  {social.label}
                </span>
              </a>
            );
          })}
        </div>
        
        <div ref={dropupRef} className="relative flex items-center text-ink-black h-12">
          {/* Mobile Dropup Toggle & Menu */}
          <div className="sm:hidden flex items-center h-12">
            <button
              type="button"
              onClick={() => setIsMadeWithOpen((prev) => !prev)}
              aria-label="Made with tech stack"
              aria-expanded={isMadeWithOpen}
              className="h-12 px-3 flex items-center gap-2 border-l border-ash-grey border-dashed bg-beige/10 font-ibm text-xs tracking-widest text-ink-black uppercase cursor-pointer transition-colors duration-200 hover:bg-ash-grey/10"
            >
              <span className="font-semibold">Made with</span>
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${
                  isMadeWithOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>

            {/* Dropup Panel (Mobile) */}
            {isMadeWithOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-52 bg-ash-grey text-ink-black shadow-xl py-2 z-40">
                <div className="px-3 py-1.5 border-b border-ink-black/40 text-[10px] font-ibm tracking-widest text-ink-black uppercase">
                  Made with
                </div>
                <div className="max-h-60 overflow-y-auto py-1">
                  {siteSettings &&
                    siteSettings.madeWith.map((made) => {
                      const icon = getIcon(made);
                      const Tag = icon?.stack_link ? "a" : "div";
                      return (
                        <Tag
                          key={made}
                          {...(icon?.stack_link
                            ? { href: icon.stack_link, target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          onClick={() => setIsMadeWithOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 text-xs font-ibm uppercase transition-colors duration-150 hover:bg-ink-black/40 cursor-pointer"
                        >
                          {icon?.icon_link ? (
                            <img
                              src={icon.icon_link}
                              alt={made}
                              className="h-5 w-5 shrink-0 object-contain"
                            />
                          ) : (
                            <span className="h-5 w-5 shrink-0 flex items-center justify-center font-bold text-xs bg-ash-grey">
                              {made.charAt(0)}
                            </span>
                          )}
                          <span className="truncate">{made}</span>
                        </Tag>
                      );
                    })}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Inline Display */}
          <div className="hidden sm:flex items-center h-12">
            <h2 className="font-ibm text-base uppercase cursor-default mr-3">Made with</h2>
            {siteSettings &&
              siteSettings.madeWith.map((made) => {
                const icon = getIcon(made);
                const Tag = icon?.stack_link ? "a" : "div";
                return (
                  <Tag
                    key={made}
                    {...(icon?.stack_link
                      ? { href: icon.stack_link, target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    aria-label={made}
                    className="relative group h-12 w-12 flex items-center justify-center border-l border-ash-grey border-dashed bg-beige/10 font-ibm text-xs text-ink-black uppercase cursor-pointer transition-colors duration-200 hover:bg-ash-grey/10"
                  >
                    {icon?.icon_link ? (
                      <img
                        src={icon.icon_link}
                        alt={made}
                        className="h-5 w-5 shrink-0 object-contain transition-transform duration-200 group-hover:scale-110"
                      />
                    ) : (
                      <span className="h-5 w-5 shrink-0 flex items-center justify-center font-bold text-xs">
                        {made.charAt(0)}
                      </span>
                    )}

                    {/* Popover / Tooltip revealing stack name */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 z-60 whitespace-nowrap bg-slate-950 text-slate-100 text-[11px] font-ibm tracking-wider uppercase px-2.5 py-1 rounded shadow-lg border border-slate-800 flex items-center gap-1.5 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-slate-950">
                      <span>{made}</span>
                    </div>
                  </Tag>
                );
              })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {openCard && (
          <RevealPageLayout
            key={openCard.item.id}
            title={openCard.item.title}
            origin={openCard.origin}
            list={list}
            onClose={() => setOpenCard(null)}
          >
            {conditionalRendering()}
          </RevealPageLayout>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {consoleOrigin && (
          <RevealPageLayout
            key="console"
            title="CONSOLE"
            origin={consoleOrigin}
            list={[]}
            onClose={() => setConsoleOrigin(null)}
          >
            <NotImplemented
              title="Console"
              message="Whoops! This feature isn't wired up yet. COME BACK HERE LATER! But here you can 'talk' with the AI embedded in the console. Pretty cool huh?"
              features={[]}
            />
          </RevealPageLayout>
        )}
      </AnimatePresence>
    </div>
  );
}