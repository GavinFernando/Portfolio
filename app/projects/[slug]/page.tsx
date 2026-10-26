// src/app/projects/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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
            <ul key={i} className="space-y-2 text-base text-muted-foreground lg:text-lg">
              {lines.map((l, j) => (
                <li
                  key={j}
                  className="rise flex gap-3 leading-relaxed"
                  style={{ animationDelay: `${0.05 * j}s` }}
                >
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--accent-2)]"
                  />
                  <span>{l.trimStart().slice(2)}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="text-base leading-relaxed text-muted-foreground lg:text-lg">
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
    <main className="relative mx-auto max-w-3xl px-6 py-16 space-y-12 lg:max-w-5xl lg:px-10 lg:py-24 lg:space-y-16 xl:max-w-6xl">
      <Link
        href="/"
        className="rise group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
        <span className="link-sweep">Back to home</span>
      </Link>

      <section className="space-y-4">
        <h1 className="rise stagger-1 gradient-text text-4xl font-bold tracking-tight lg:text-5xl">
          {project.title}
        </h1>

        {project.subtitle && (
          <p className="rise stagger-2 text-base text-muted-foreground">
            {project.subtitle}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <Badge
              key={tag}
              variant="outline"
              className="pop cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-2)] hover:text-[var(--accent-2)]"
              style={{ animationDelay: `${0.18 + i * 0.045}s` }}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="rise stagger-3">
          <RichText text={project.longDescription ?? project.description} />
        </div>

        {project.externalLink && (
          <Button
            className="sheen-sweep group rise stagger-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/20"
            asChild
          >
            <a
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.externalLinkLabel ?? "View Project"}
              <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
              <div className="space-y-2 pt-3">
                <span aria-hidden className="accent-bar" />
                <h2 className="text-xl font-semibold">{sec.heading}</h2>
              </div>
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
            <div className="space-y-2">
              <span aria-hidden className="accent-bar" />
              <h2 className="text-xl font-semibold">Demo</h2>
            </div>
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
                    className="w-full rounded-lg border transition-shadow duration-300 hover:shadow-xl hover:shadow-foreground/10"
                    src={video}
                  />
                ) : (
                  <div
                    key={video}
                    className="aspect-video w-full overflow-hidden rounded-lg border transition-shadow duration-300 hover:shadow-xl hover:shadow-foreground/10"
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
            <div className="space-y-2">
              <span aria-hidden className="accent-bar" />
              <h2 className="text-xl font-semibold">Gallery</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {images.map((img, i) => (
                <figure
                  key={img.src}
                  className={cn(
                    "pop group/img space-y-2",
                    img.wide && "sm:col-span-2"
                  )}
                  style={{ animationDelay: `${Math.min(i, 8) * 0.07}s` }}
                >
                  <div className="overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10 transition-all duration-300 group-hover/img:-translate-y-1 group-hover/img:shadow-xl group-hover/img:shadow-foreground/10 group-hover/img:ring-[var(--accent-2)]/40">
                    {img.width && img.height ? (
                      <Image
                        src={img.src}
                        alt={img.caption ?? `${project.title} screenshot ${i + 1}`}
                        width={img.width}
                        height={img.height}
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="h-auto w-full transition-transform duration-500 ease-out group-hover/img:scale-[1.03]"
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
                          className="object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.03]"
                        />
                      </div>
                    )}
                  </div>
                  {img.caption && (
                    <figcaption className="text-xs text-muted-foreground transition-colors duration-300 group-hover/img:text-foreground">
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
