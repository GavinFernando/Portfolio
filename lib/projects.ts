// src/lib/projects.ts
//
// Single source of truth for project data. Both the homepage grid and the
// individual project detail pages import from here.

export type Project = {
  slug: string; // used in the URL: /projects/[slug]
  title: string;
  description: string; // short blurb shown on the homepage card
  longDescription?: string; // longer write-up shown on the detail page (falls back to description)
  tags: string[];
  externalLink?: string; // e.g. Figma prototype, GitHub repo, live demo
  externalLinkLabel?: string; // e.g. "View on Figma", "View on GitHub"
  images?: string[]; // paths under /public, e.g. "/projects/jingle-go/1.png"
  videos?: string[]; // path under /public (e.g. "/projects/beat-crusher/demo.mp4") or an embed URL
};

export const projects: Project[] = [
  {
    slug: "jingle-go",
    title: "Jingle Go🔔",
    description: "A Low Fi concept of an AR app to navigate Christmas Markets",
    longDescription:
      "JinglGO is an augmented reality (AR) based prototype designed to help people, both locals and tourists, navigate the Christmas Markets. It will provide real-time crowd updates, navigation features and intuitive and descriptive information about the market events, activities, stalls, and facilities all integrated within one seamless interface so that users can focus on having a good time instead of being overwhelmed",
    tags: ["Figma", "Canva"],
    externalLink:
      "https://www.figma.com/proto/iHQBtnz7p83uQHn3EPo9n1/JinglGo-my-Lofi?node-id=2131-43&t=rdpmKjBPQ5mKLDFr-1&scaling=min-zoom&content-scaling=fixed&page-id=2025%3A2&starting-point-node-id=2131%3A43",
    externalLinkLabel: "View Prototype on Figma",
    images: [
      "/projects/jingle-go/intro.png",
      "/projects/jingle-go/overview.png",
      "/projects/jingle-go/zoomed.png"
    ],
  },
  {
    slug: "beat-crusher",
    title: "Beat Crusher🥁",
    description:
      "A percussion instrument that uses drum pads to expressively control a drum synthesizer.",
    longDescription:
      "Beat Crusher is a percussion instrument that uses drum pads as a way to expressively control a drum synthesizer. Thirteen pads laid out on a big surface trigger the synth engine, while a motion-tracked drumstick feeds 3 different axes of movement into the sound in real time. The performer is able to control the sound of the instrument by choosing not only where on the surface to hit but also in what position and orientation the stick touches the pad. As the sound rings out, it continues to be changed by the way in which the performer moves the stick, giving a direct connection between the full arm movement involved in striking a percussive instrument and the sound that it makes.",
    tags: ["React", "TypeScript"],
    externalLink: "https://github.com/vladinator07/Seminar-Instrument-Project.git",
    externalLinkLabel: "View on GitHub",
    images: [
      "/projects/beat-crusher/performance.jpg",
      "/projects/beat-crusher/performance_2.jpg",
      "/projects/beat-crusher/performance_3.jpg",
      "/projects/beat-crusher/backwiring.jpg",
      "/projects/beat-crusher/prototype1.jpg",
      //fixed format issue
    ],
    videos: [
        "/projects/beat-crusher/prototype1.mp4",
        "/projects/beat-crusher/performance-main.mp4"
    ]
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}