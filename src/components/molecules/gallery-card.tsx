import { useRef } from "react";
import type { GalleryItem } from "../../models/gallery-item";

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
      className={`group relative w-full h-full border border-ash-grey bg-ink-black/75 overflow-hidden shrink-0 transition-colors duration-300 hover:border-slate-500/30 hover:border-dashed ${clickable ? "cursor-pointer" : ""}`}
    >
      {/* Poster (pre-hover background) */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover opacity-40 group-hover:opacity-0 transition-opacity duration-500"
        />
      </div>

      <video
        ref={videoRef}
        src={item.video}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="absolute inset-0 bg-ink-black/30 pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity duration-300 group-hover:opacity-0">
        <span
          className="text-6xl font-ibm sm:text-7xl md:text-8xl font-normal tracking-tighter leading-none"
        >
          {item.id}
        </span>
      </div>

      <div className="absolute flex flex-col w-full inset-x-0 bottom-0 bg-dark-teal items-start p-4 z-10 pointer-events-none translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="wrap-break-word font-medium text-beige text-sm">{item.description}</p>
        <h2 className="mt-3 font-ibm text-5xl font-normal tracking-wide text-beige uppercase">
          {item.title}
        </h2>
      </div>
    </div>
  );
}