import { useRef } from "react";
import type { GalleryItem } from "../../models/gallery-item";
import DotMatrix from "../decoratives/dot-matrix";

export function GalleryCard({
  item,
  onClick,
  clickable,
}: {
  item: GalleryItem;
  onClick?: (rect: DOMRect) => void;
  clickable: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  const handleClick = () => {
    if (!clickable || !onClick) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) onClick(rect);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`group relative w-full h-full border border-white/15 bg-neutral-950/75 overflow-hidden shrink-0 transition-colors duration-300 hover:border-slate-500/30 hover:border-dashed ${clickable ? "cursor-pointer" : ""}`}
    >
      {/* Poster (pre-hover background) */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover opacity-40 group-hover:opacity-0 transition-opacity duration-500"
          loading="lazy"
        />
      </div>

      {/* Video (plays on hover) */}
      <video
        ref={videoRef}
        src={item.video}
        poster={item.image}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="absolute inset-0 bg-neutral-950/50 pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity duration-300 group-hover:opacity-0">
        <span
          className="text-6xl font-ibm sm:text-7xl md:text-8xl font-normal tracking-tighter leading-none"
        >
          {/*{item.id} */}
        <DotMatrix key={item.id} text={item.id} color="#90A1B9" showLabel={false} delay={0.0} />
        </span>
      </div>

      <div className="absolute flex flex-col w-full inset-x-0 bottom-0 bg-black items-start p-4 z-10 pointer-events-none translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="wrap-break-word text-slate-400 text-sm">{item.description}</p>
        <h2 className="mt-3 font-ibm text-5xl font-normal tracking-wide text-white uppercase">
          <sup className="text-lg font-ibm font-light">{item.numbering.toString().padStart(2, '0')}</sup>{item.title}
        </h2>
      </div>
    </div>
  );
}