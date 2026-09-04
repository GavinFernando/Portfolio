// src/app/projects/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  getProjectBySlug,
  projects,
  type ProjectImage,
} from "@/lib/projects";

// Pre-render a static page for every project at build time
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// Render a section/overview body: blank lines split paragraphs, and a run of
// lines beginning with "- " becomes a bullet list.
function RichText({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        const isList = lines.every((l) => l.trimStart().startsWith("- "));

        if (isList) {
          return (
            <ul key={i} className="list-disc space-y-2 pl-5 text-muted-foreground">
              {lines.map((l, j) => (
                <li key={j} className="leading-relaxed">
                  {l.trimStart().slice(2)}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="leading-relaxed text-muted-foreground">
            {lines.join(" ")}
          </p>
        );
      })}
    </div>
  );
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

  const images: ProjectImage[] = (project.images ?? []).map((img) =>
    typeof img === "string" ? { src: img } : img
  );

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 space-y-12">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:underline underline-offset-4"
      >
        ← Back to home
      </Link>

      <section className="space-y-4">
        <h1 className="text-3xl font-bold">{project.title}</h1>

        {project.subtitle && (
          <p className="text-sm text-muted-foreground">{project.subtitle}</p>
        )}

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <RichText text={project.longDescription ?? project.description} />

        {project.externalLink && (
          <Button asChild>
            <a href={project.externalLink} target="_blank" rel="noopener noreferrer">
              {project.externalLinkLabel ?? "View Project"}
            </a>
          </Button>
        )}
      </section>

      {/* Deep-dive sections, if present */}
      {project.sections && project.sections.length > 0 && (
        <>
          {project.sections.map((sec) => (
            <section key={sec.heading} className="space-y-3">
              <Separator />
              <h2 className="text-xl font-semibold">{sec.heading}</h2>
              <RichText text={sec.body} />
            </section>
          ))}
        </>
      )}

      {/* Video, if present */}
      {project.videos && project.videos.length > 0 && (
        <>
          <Separator />
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Demo</h2>
            <div
              className={cn(
                "grid gap-4",
                project.videos.length > 1 && "sm:grid-cols-2"
              )}
            >
              {project.videos.map((video) =>
                video.endsWith(".mp4") ? (
                  <video
                    key={video}
                    controls
                    className="w-full rounded-lg border"
                    src={video}
                  />
                ) : (
                  <div
                    key={video}
                    className="aspect-video w-full overflow-hidden rounded-lg border"
                  >
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
      {images.length > 0 && (
        <>
          <Separator />
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Gallery</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {images.map((img, i) => (
                <figure
                  key={img.src}
                  className={cn("space-y-2", img.wide && "sm:col-span-2")}
                >
                  <div className="overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10">
                    {img.width && img.height ? (
                      <Image
                        src={img.src}
                        alt={img.caption ?? `${project.title} screenshot ${i + 1}`}
                        width={img.width}
                        height={img.height}
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="h-auto w-full"
                      />
                    ) : (
                      <div className="relative aspect-video w-full">
                        <Image
                          src={img.src}
                          alt={
                            img.caption ??
                            `${project.title} screenshot ${i + 1}`
                          }
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                  {img.caption && (
                    <figcaption className="text-xs text-muted-foreground">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
