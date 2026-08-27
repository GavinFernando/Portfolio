// src/app/page.tsx

import Link from "next/link";
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
    <main className="mx-auto max-w-3xl px-6 py-16 space-y-16">
      {/* Hero / About */}
      <section className="flex flex-col items-center text-center gap-4">
        <Avatar className="h-72 w-50">
          <AvatarImage src={profile.avatarUrl} alt={profile.name} />
          <AvatarFallback>{profile.initials}</AvatarFallback>
        </Avatar>

        <div>
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          {/*<p className="text-muted-foreground">{profile.title}</p>*/}
        </div>

        <p className="max-w-xl text-lg">{profile.pitch}</p>

        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="hover:!bg-green-600 hover:!text-white hover:!border-green-600" asChild>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
          <Button variant="outline" className="hover:!bg-blue-600 hover:!text-white hover:!border-blue-600" asChild>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </Button>
        </div>

      </section>

      <Separator />

      {/* About */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">My Developer skills</h2>
        <div className="flex flex-wrap justify-left gap-2">
          {profile.skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
        
      </section>

      <Separator />

      {/* About */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Who am I?</h2>
        <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
      </section>

      <Separator/>

      {/* Projects */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Things I've built</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.slug}>
              <CardHeader>
                <CardTitle>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:underline underline-offset-4"
                  >
                    {project.title}
                  </Link>
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Curious to know how I can cater your tech?</h2>
        <p className="text-muted-foreground leading-relaxed">{content.para1}</p>
        <Button className="hover:!bg-red-600 hover:!text-white hover:!border-red-600" asChild>
            <a href={`mailto:${profile.email}`}>Contact Me</a>
          </Button>
      </section>
    </main>
  );
}