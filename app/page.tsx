// src/app/page.tsx

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    "I build clean, usable interfaces — with a security-aware mindset from my cybersecurity background.",
  bio: "A versatile Web-App, UI Designer skilled in building secure platforms with an interest of HCI. Currently enrolled as a Cybersecurity Masters student at Universität des Saarlandes",
  avatarUrl: "profile_pic.png",
  initials: "GF",
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma", "Python", "SQL", "Canva"],
  email: "gavinfernando172001@gmail.com",
  github: "https://github.com/GavinFernando",
  linkedin: "https://www.linkedin.com/in/gavin-fernando-lk2001/?skipRedirect=true",
};

const content = {
  para1: "Lets get in touch!",
};

export default function Home() {
  return (
    <main className="relative mx-auto max-w-3xl px-6 py-16 space-y-16">
      {/* Ambient background wash */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="aurora absolute -top-40 -left-40 h-[26rem] w-[26rem] rounded-full opacity-[0.10] dark:opacity-[0.18]" />
        <div
          className="aurora absolute top-1/2 -right-48 h-[22rem] w-[22rem] rounded-full opacity-[0.08] dark:opacity-[0.15]"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      {/* Hero / About */}
      <section className="flex flex-col items-center text-center gap-4">
        <div className="relative rise">
          <div
            aria-hidden
            className="aurora pointer-events-none absolute -inset-5 rounded-full opacity-40 dark:opacity-60"
          />
          <Avatar className="bobbing relative h-72 w-50 ring-2 ring-background">
            <AvatarImage src={profile.avatarUrl} alt={profile.name} />
            <AvatarFallback>{profile.initials}</AvatarFallback>
          </Avatar>
        </div>

        <div className="rise stagger-1">
          <h1 className="gradient-text text-4xl font-bold tracking-tight sm:text-5xl">
            {profile.name}
          </h1>
          {/*<p className="text-muted-foreground">{profile.title}</p>*/}
        </div>

        <p className="rise stagger-2 max-w-xl text-lg text-balance">
          {profile.pitch}
        </p>

        <div className="rise stagger-3 flex gap-3 pt-2">
          <Button
            variant="outline"
            className="transition-all duration-300 hover:-translate-y-0.5 hover:!bg-green-600 hover:!text-white hover:!border-green-600 hover:shadow-lg hover:shadow-green-600/25"
            asChild
          >
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
          <Button
            variant="outline"
            className="transition-all duration-300 hover:-translate-y-0.5 hover:!bg-blue-600 hover:!text-white hover:!border-blue-600 hover:shadow-lg hover:shadow-blue-600/25"
            asChild
          >
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </Button>
        </div>
      </section>

      <Separator className="appear stagger-4" />

      {/* Skills */}
      <section className="rise stagger-4 space-y-3">
        <div className="space-y-2">
          <span aria-hidden className="accent-bar" />
          <h2 className="text-2xl font-semibold">My Developer skills</h2>
        </div>
        <div className="flex flex-wrap justify-left gap-2">
          {profile.skills.map((skill, i) => (
            <Badge
              key={skill}
              variant="secondary"
              className="pop cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-[var(--accent-2)] hover:text-white"
              style={{ animationDelay: `${0.36 + i * 0.05}s` }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      <Separator />

      {/* About */}
      <section className="rise stagger-5 space-y-3">
        <div className="space-y-2">
          <span aria-hidden className="accent-bar" />
          <h2 className="text-2xl font-semibold">Who am I?</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
      </section>

      <Separator />

      {/* Projects */}
      <section className="rise stagger-6 space-y-6">
        <div className="space-y-2">
          <span aria-hidden className="accent-bar" />
          <h2 className="text-2xl font-semibold">Things I&apos;ve built</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              aria-label={`${project.title} — ${project.description}`}
              className="pop group block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-2)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{ animationDelay: `${0.45 + i * 0.09}s` }}
            >
              <Card className="glow-card relative h-full transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:shadow-foreground/10 group-hover:ring-foreground/25">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between gap-3">
                    <span className="link-sweep">{project.title}</span>
                    <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent-2)]" />
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

      <section className="rise stagger-6 space-y-3">
        <div className="space-y-2">
          <span aria-hidden className="accent-bar" />
          <h2 className="text-2xl font-semibold">Curious to know how I can cater your tech?</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">{content.para1}</p>
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
  );
}
