import type { Project } from "../models/project";

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "NEURAL CANVAS",
    stakeholder: "NEURALART.CO",
    category: "AI & Generative Art",
    year: "2025",
    description: "An interactive generative AI design engine for real-time visual exploration.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
    link: "#",
    stacks_used: ["React", "TensorFlow.js", "Node.js", "Python", "TailwindCSS", "TypeScript", "Vercel", "AWS"]
  },
  {
    id: "proj-2",
    title: "CYBER MATRIX",
    stakeholder: "CYBER ANTIX",
    category: "Web3 & Security",
    year: "2025",
    description: "High-performance decentralized dashboard with real-time data visualization.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop",
    link: "#",
    stacks_used: ["Wordpress", "React", "TailwindCSS", "TypeScript", "Azure"]
  },
  {
    id: "proj-3",
    title: "AETHER ARCHITECTURE",
    category: "3D & Interactive",
    year: "2024",
    description: "Spatial 3D architectural showcase built using WebGL and custom shaders.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    link: "#",
    stacks_used: ["React", "Three.js", "TailwindCSS", "TypeScript", "Vercel"]
  },
  {
    id: "proj-4",
    title: "LUMINA AUDIO",
    stakeholder: "LUMINA",
    category: "Sound Design & Web Audio",
    year: "2024",
    description: "Immersive audio visualizer converting spatial soundscapes into dynamic light patterns.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop",
    link: "#",
    stacks_used: ["React", "Web Audio", "TailwindCSS", "TypeScript", "Vercel"]
  }
];
