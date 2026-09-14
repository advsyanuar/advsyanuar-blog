import type { Demo } from "../models/demo";

export const DEMOS: Demo[] = [
  {
    id: "demo-1",
    title: "WEBGL CUBE SIMULATOR",
    stakeholder: "THREE.JS LAB",
    category: "3D Graphics & WebGL",
    year: "2025",
    description: "Real-time interactive 3D WebGL geometry shader simulation built with Three.js.",
    demo_url: "https://threejs.org/examples/webgl_geometry_cube.html",
    stacks_used: ["React", "Three.js", "TypeScript", "WebGL"],
    github_link: "https://github.com/mrdoob/three.js"
  },
  {
    id: "demo-2",
    title: "SPATIAL WATER CANVAS",
    stakeholder: "GL GRAPHICS",
    category: "Shader Animation",
    year: "2025",
    description: "Interactive fluid dynamics shader rendered live inside an HTML5 WebGL canvas.",
    demo_url: "https://threejs.org/examples/webgl_materials_cubemap.html",
    stacks_used: ["Three.js", "TypeScript", "Vercel"],
    github_link: "https://github.com"
  },
  {
    id: "demo-3",
    title: "PARTICLE COLLIDER",
    stakeholder: "COMPUTE VISUALS",
    category: "Physics & Canvas API",
    year: "2024",
    description: "High-density particle acceleration and collision simulation running on GPU shaders.",
    demo_url: "https://threejs.org/examples/webgl_points_waves.html",
    stacks_used: ["React", "Node.js", "TypeScript", "TailwindCSS"],
    github_link: "https://github.com"
  }
];
