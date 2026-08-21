// src/app/projects/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProjectBySlug, projects } from "@/lib/projects";

// Pre-render a static page for every project at build time
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 space-y-10">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:underline underline-offset-4"
      >
        ← Back to home
      </Link>

      <section className="space-y-4">
        <h1 className="text-3xl font-bold">{project.title}</h1>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <p className="text-muted-foreground leading-relaxed">
          {project.longDescription ?? project.description}
        </p>

        {project.externalLink && (
          <Button asChild>
            <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
              {project.externalLinkLabel ?? "View Project"}
            </a>
          </Button>
        )}
      </section>

      {/* Video, if present */}
      {project.videos && project.videos.length > 0 && (
        <>
            <Separator />
            <section className="space-y-3">
            <h2 className="text-xl font-semibold">Demo</h2>
            <div className="grid gap-4 sm:grid-cols-2">
                {project.videos.map((video) =>
                video.endsWith(".mp4") ? (
                    <video key={video} controls className="w-full rounded-lg border" src={video} />
                ) : (
                    <div key={video} className="aspect-video w-full overflow-hidden rounded-lg border">
                    <iframe
                        src={video}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                    </div>
                )
                )}
            </div>
            </section>
        </>
        )}

      {/* Image gallery, if present */}
      {project.images && project.images.length > 0 && (
        <>
          <Separator />
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.images.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-video overflow-hidden rounded-lg border"
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                   />
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}