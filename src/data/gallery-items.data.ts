import { type GalleryItem } from "../models/gallery-item";

const VIDEO_BASE = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample";


export const ITEMS: GalleryItem[] = [
  {
    id: "Pr",
    title: "PROJECTS",
    numbering: 1,
    description: "Besides making software for a big company in a team, or employed in general, i have done some personal projects like this website for example and other independent clients, like mein freund!",
    color: "#06b6d4",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop",
    video: `${VIDEO_BASE}/ForBiggerBlazes.mp4`
  },
  {
    id: "Ar",
    title: "ARTICLES",
    numbering: 2,
    description: "Clicking this will direct 'YOU' to the standalone blog page using WordPress. If you want to see me 'rambling' about things i care the most then be my guest, darling <3",
    color: "#ec4899",
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1200&auto=format&fit=crop",
    video: `${VIDEO_BASE}/ForBiggerEscapes.mp4`
  },
  {
    id: "De",
    title: "DEMOS",
    numbering: 3,
    description: "I build a lot of Console apps, some of them are hosted on Github and some of them aren't. This panel is dedicated to my 'curated' runnable projects. Not limited to just apps and webs but also music and something else.",
    color: "#8b5cf6",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1200&auto=format&fit=crop",
    video: `${VIDEO_BASE}/ForBiggerFun.mp4`
  },
  {
    id: "Ab",
    title: "ABOUT",
    numbering: 4,
    description: "You'll see more about me, in summaries, well mostly my professional career. This panel would display my informations like a CV/Resume almost. Redundant you say?.",
    color: "#10b981",
    image: "https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1200&auto=format&fit=crop",
    video: `${VIDEO_BASE}/ForBiggerJoyrides.mp4`
  },
];