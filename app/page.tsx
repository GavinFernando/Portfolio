// src/app/page.tsx

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { projects } from "@/lib/projects";

const profile = {
  name: "Gavin Fernando",
  //title: "Web-App Developer | Cybersecurity MSc | HCI inspired",
  pitch:
    "I build clean, usable interfaces with a security aware mindset from my cybersecurity background.",
  bio: "A versatile Web-App, UI Designer skilled in building secure platforms with an interest of HCI. Currently enrolled as a Cybersecurity Masters student at Universität des Saarlandes",
  avatarUrl: "/profile_pic.png",
  initials: "GF",
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma", "Python", "SQL", "Canva"],
  email: "gavinfernando172001@gmail.com",
  github: "https://github.com/GavinFernando",
  linkedin: "https://www.linkedin.com/in/gavin-fernando-lk2001/?skipRedirect=true",
};

const content = {
  para1: "Lets get in touch!",
};

type ExtracurricularLink = {
  label: string;
  href: string;
};

type ExtracurricularItem = {
  title: string;
  description: string;
  links: ExtracurricularLink[];
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

const extracurriculars: ExtracurricularItem[] = [
  {
    title: "Content Designing",
    description:
      "Using Canva to create personal designs and content for commercial use.",
    links: [
      { label: "Personal work", href: "https://canva.link/a2tedep2ih2ddhs" },
      { label: "Commercial work", href: "https://canva.link/jbf6tkfr9akmtn3" },
      { label: "Commercial work", href: "https://canva.link/443s46yzfld1s4x" },
    ],
  },
  {
    title: "Music",
    description: "Public music profile on Instagram.",
    links: [
      { label: "@wherehesing", href: "https://www.instagram.com/wherehesing/?hl=en" },
    ],
  },
  {
    title: "Social Skills",
    description:
      "Very good with group coordination, making new friends, and working well within a team. Volunteered as part of the student crew for Mensch und Computer 2026 in Duisburg.",
    links: [
      { label: "LinkedIn post", href: "https://lnkd.in/p/eeMvQ5U8" },
    ],
    image: {
      src: "/extracurricular/mensch-und-computer.jpeg",
      alt: "Student volunteer group photo at Mensch und Computer 2026, Duisburg",
      width: 1280,
      height: 720,
    },
  },
];

export default function Home() {
  return (
    <>
      {/* Full-bleed photo hero */}
      <section className="relative isolate flex min-h-[88vh] w-full flex-col justify-end overflow-hidden bg-black sm:min-h-screen">
        <Image
          src={profile.avatarUrl}
          alt={profile.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] grayscale"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/65 via-40% to-black/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent"
        />
        {/* Top nav */}
        <nav className="rise absolute inset-x-0 top-0 z-10 flex w-full items-center bg-black/85 px-3 py-3 backdrop-blur-sm sm:px-6 sm:py-4">
          <div className="flex items-center gap-1 sm:gap-8">
            {[
              { label: "Skills", href: "#skills" },
              { label: "Projects", href: "#projects" },
              { label: "Who am I", href: "#whoami" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-2 py-1.5 text-xs font-bold text-[#66dbc8] transition-colors hover:bg-white/15 hover:text-white sm:px-3 sm:text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Name + pitch */}
        <div className="rise stagger-2 relative z-10 px-6 pb-14 text-center sm:px-10 sm:pb-20">
          <h1 className="text-3xl font-bold tracking-wide text-white uppercase sm:text-4xl lg:text-5xl">
            {profile.name}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-balance text-white/75 sm:text-lg lg:max-w-2xl lg:text-xl">
            {profile.pitch}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button
              variant="outline"
              className="border-white/30 bg-white/5 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:!bg-green-600 hover:!text-white hover:!border-green-600 hover:shadow-lg hover:shadow-green-600/25"
              asChild
            >
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-white/30 bg-white/5 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:!bg-blue-600 hover:!text-white hover:!border-blue-600 hover:shadow-lg hover:shadow-blue-600/25"
              asChild
            >
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>

      <main className="relative mx-auto max-w-3xl px-6 py-16 space-y-16 lg:max-w-5xl lg:px-10 lg:py-24 lg:space-y-20 xl:max-w-6xl">
      {/* Skills */}
      <section id="skills" className="rise stagger-4 space-y-3">
        <h2 className="text-2xl font-semibold text-[#66dbc8] lg:text-3xl">Skills</h2>
        <div className="flex flex-wrap justify-left gap-2">
          {profile.skills.map((skill, i) => (
            <Badge
              key={skill}
              variant="secondary"
              className="pop cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-[#66dbc8] hover:text-[#0b3954]"
              style={{ animationDelay: `${0.36 + i * 0.05}s` }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      <Separator />

      {/* About */}
      <section id="whoami" className="rise stagger-5 space-y-3">
        <h2 className="text-2xl font-semibold text-[#66dbc8] lg:text-3xl">Who am I?</h2>
        <p className="text-base text-muted-foreground leading-relaxed lg:text-lg">{profile.bio}</p>
      </section>

      <Separator />

      {/* Projects */}
      <section id="projects" className="rise stagger-6 space-y-6">
        <h2 className="text-2xl font-semibold text-[#66dbc8] lg:text-3xl">Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              aria-label={`${project.title} — ${project.description}`}
              className="pop group block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#66dbc8] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{ animationDelay: `${0.45 + i * 0.09}s` }}
            >
              <Card className="relative h-full transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:shadow-foreground/10 group-hover:ring-foreground/25">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between gap-3">
                    <span className="text-[var(--subtopic-accent)]">{project.title}</span>
                    <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="transition-colors duration-300 group-hover:border-foreground/30"
                    >
                      {tag}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Separator />

      {/* Other skills & extracurricular activities */}
      <section className="rise stagger-6 space-y-6">
        <h2 className="text-2xl font-semibold text-[#66dbc8] lg:text-3xl">
          Other Skills &amp; Extracurricular Activities
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {extracurriculars.map((item, i) => (
            <Card
              key={item.title}
              className="pop h-full"
              style={{ animationDelay: `${0.45 + i * 0.09}s` }}
            >
              {item.image && (
                <div className="relative mx-6 mt-6 overflow-hidden rounded-lg">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    className="h-auto w-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-[var(--subtopic-accent)]">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {item.links.map((link, j) => (
                  <Button
                    key={`${link.href}-${j}`}
                    variant="outline"
                    size="sm"
                    className="transition-all duration-300 hover:-translate-y-0.5 hover:!bg-[#66dbc8] hover:!text-[#0b3954]"
                    asChild
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </Button>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section id="contact" className="rise stagger-6 space-y-3">
        <h2 className="text-2xl font-semibold text-[#66dbc8] lg:text-3xl">Curious to know how I can cater your tech?</h2>
        <p className="text-base text-muted-foreground leading-relaxed lg:text-lg">{content.para1}</p>
        <Button
          className="sheen-sweep group transition-all duration-300 hover:-translate-y-0.5 hover:!bg-red-600 hover:!text-white hover:!border-red-600 hover:shadow-lg hover:shadow-red-600/30"
          asChild
        >
          <a href={`mailto:${profile.email}`}>
            <Mail className="transition-transform duration-300 group-hover:-rotate-12" />
            Contact Me
          </a>
        </Button>
      </section>
      </main>
    </>
  );
}
