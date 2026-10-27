"use client"

import * as React from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProjectImage } from "@/lib/projects"

function ProjectGallery({
  images,
  projectTitle,
}: {
  images: ProjectImage[]
  projectTitle: string
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)
  const openImage = openIndex !== null ? images[openIndex] : null

  React.useEffect(() => {
    if (openIndex === null) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenIndex(null)
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [openIndex])

  return (
    <>
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
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`View ${img.caption ?? `${projectTitle} screenshot ${i + 1}`} larger`}
              className="block w-full cursor-zoom-in overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10 transition-all duration-300 group-hover/img:-translate-y-1 group-hover/img:shadow-xl group-hover/img:shadow-foreground/10"
            >
              {img.width && img.height ? (
                <Image
                  src={img.src}
                  alt={img.caption ?? `${projectTitle} screenshot ${i + 1}`}
                  width={img.width}
                  height={img.height}
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="h-auto w-full transition-transform duration-500 ease-out group-hover/img:scale-[1.03]"
                />
              ) : (
                <div className="relative aspect-video w-full">
                  <Image
                    src={img.src}
                    alt={img.caption ?? `${projectTitle} screenshot ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.03]"
                  />
                </div>
              )}
            </button>
            {img.caption && (
              <figcaption className="text-xs text-muted-foreground transition-colors duration-300 group-hover/img:text-foreground">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {openImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={openImage.caption ?? `${projectTitle} screenshot`}
          onClick={() => setOpenIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="size-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={openImage.src}
            alt={openImage.caption ?? `${projectTitle} screenshot ${openIndex! + 1}`}
            onClick={(event) => event.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
        </div>
      )}
    </>
  )
}

export { ProjectGallery }
