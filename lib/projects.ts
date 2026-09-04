// src/lib/projects.ts
//
// Single source of truth for project data. Both the homepage grid and the
// individual project detail pages import from here.

export type ProjectImage = {
  src: string; // path under /public, e.g. "/projects/playerschain/home.jpg"
  caption?: string; // shown under the image in the gallery
  width?: number; // intrinsic pixel width — lets the gallery show it uncropped
  height?: number; // intrinsic pixel height
  wide?: boolean; // span the full width of the gallery grid
};

export type ProjectSection = {
  heading: string;
  // Supports blank-line-separated paragraphs. Lines that start with "- "
  // inside a block are rendered as a bullet list.
  body: string;
};

export type Project = {
  slug: string; // used in the URL: /projects/[slug]
  title: string;
  subtitle?: string; // small line under the title on the detail page
  description: string; // short blurb shown on the homepage card
  longDescription?: string; // longer write-up shown on the detail page (falls back to description)
  sections?: ProjectSection[]; // optional deep-dive sections on the detail page
  tags: string[];
  externalLink?: string; // e.g. Figma prototype, GitHub repo, live demo
  externalLinkLabel?: string; // e.g. "View on Figma", "View on GitHub"
  images?: (string | ProjectImage)[]; // paths under /public, e.g. "/projects/jingle-go/1.png"
  videos?: string[]; // path under /public (e.g. "/projects/beat-crusher/demo.mp4") or an embed URL
};

export const projects: Project[] = [
  {
    slug: "playerschain",
    title: "PlayersChain 🎸",
    subtitle:
      "BEng Software Engineering dissertation - IIT / University of Westminster - 2024",
    description:
      "A blockchain dApp for registering luxury musical instruments and verifying their ownership — my BEng dissertation.",
    longDescription:
      "PlayersChain is a decentralized web app (dApp) I designed, built and evaluated for my BEng Software Engineering dissertation at the Informatics Institute of Technology, in collaboration with the University of Westminster.\n\n" +
      "Vintage and luxury instruments from brands like Fender, Gibson and PRS are routinely counterfeited with the original serial numbers, and the manufacturers' own 1990s-era databases can't prove who currently owns an instrument or where it is — and hold nothing at all for instruments made before the 1970s. PlayersChain moves that record onto a tamper-proof ledger, so any musician can register an instrument, verify it by serial number, keep its information current, and transfer ownership to another verified user.\n\n" +
      "The smart contracts are written in Solidity and target Arbitrum, Ethereum's layer-2 network, which I selected after benchmarking gas fees (~$0.05 versus ~$3.83 on Ethereum), throughput (~40,000 TPS) and scalability against Ethereum, Avalanche and Stellar.",
    sections: [
      {
        heading: "The problem",
        body:
          'A replica of a 1956 Fender Stratocaster can be bought for around $245 carrying the same serial number, brand stamp and finish as a $40,000 original. Manufacturers publish serial-number lookups, but they warn that "not all serial numbers are included," offer no proof of current ownership or location, and have no record of pre-1970s instruments.\n\n' +
          "I ran into this directly while trying to buy a Stratocaster on Facebook Marketplace — a genuine serial number on a guitar an expert later confirmed was a fake. That was the motivation for the project.",
      },
      {
        heading: "What I built",
        body:
          "- Create a profile and sign in\n" +
          "- Register a new or vintage instrument with its type, brand, serial number, manufacturing date, status, ownership, location and estimated market value\n" +
          "- Duplicate serial numbers are rejected on-chain, so no two records can claim the same instrument\n" +
          "- Search any instrument by serial number to view its full record\n" +
          "- Update an instrument's location, market value or condition\n" +
          "- Transfer ownership to another verified user, after which the previous owner can no longer edit the record",
      },
      {
        heading: "How it works",
        body:
          "PlayersChain uses a three-tier architecture: a React and Ant Design front end, a Solidity smart-contract logic tier reached through Web3.js, and the Arbitrum blockchain as the data tier. Contracts were developed and unit-tested with Hardhat, Truffle and Ganache, and MetaMask handles wallet connection and gas. All seven contract functions pass their Truffle unit tests.",
      },
      {
        heading: "Evaluation",
        body:
          "The prototype was reviewed with music-industry experts (a store owner, a gigging guitarist and a guitar technician), blockchain engineers and general musicians. 87.5% of evaluators thought it would be useful for registering instruments, 93.8% said they would use it to track their own, and 56% rated it 5 out of 5 for quality and ease of use.",
      },
    ],
    tags: [
      "Solidity",
      "React",
      "Blockchain",
      "Arbitrum",
      "Web3.js",
      "Hardhat",
      "Dissertation",
    ],
    externalLink:
      "https://drive.google.com/file/d/1FtlJ5TO60zrbqvdrgs2yiB3kOtfdvb5b/view?usp=sharing",
    externalLinkLabel: "Read the full dissertation",
    images: [
      {
        src: "/projects/playerschain/home.jpg",
        caption: "Landing page and sign-in",
        width: 1247,
        height: 897,
        wide: true,
      },
      {
        src: "/projects/playerschain/create-profile.jpg",
        caption: "Creating a user profile",
        width: 1228,
        height: 659,
      },
      {
        src: "/projects/playerschain/navbar.jpg",
        caption: "Navigation once signed in — every core action gets its own page",
        width: 1247,
        height: 286,
        wide: true,
      },
      {
        src: "/projects/playerschain/register-instrument.jpg",
        caption: "Registering an instrument against a unique serial number",
        width: 1247,
        height: 672,
      },
      {
        src: "/projects/playerschain/search-instrument.jpg",
        caption: "Searching for an instrument by serial number",
        width: 1248,
        height: 672,
      },
      {
        src: "/projects/playerschain/update-instrument.jpg",
        caption: "Updating an instrument's location, market value or status",
        width: 1248,
        height: 672,
      },
      {
        src: "/projects/playerschain/transfer-ownership.jpg",
        caption: "Transferring ownership to another verified user",
        width: 1248,
        height: 672,
      },
      {
        src: "/projects/playerschain/contact.jpg",
        caption: "Contact page",
        width: 1247,
        height: 672,
      },
      {
        src: "/projects/playerschain/tech-stack.jpg",
        caption: "Technology stack across the presentation, logic and data tiers",
        width: 794,
        height: 967,
      },
      {
        src: "/projects/playerschain/unit-tests.jpg",
        caption: "All seven smart-contract functions passing their Truffle unit tests",
        width: 1247,
        height: 616,
        wide: true,
      },
    ],
  },
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
