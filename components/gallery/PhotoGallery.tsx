"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import MainTitle from "../MainTitle";
import type { GalleryImage } from "@/services/gallery";

type PhotoGalleryProps = {
  images: GalleryImage[];
};

const fallbackGalleryImages: GalleryImage[] = Array.from({ length: 26 }, (_, index) => ({
  id: `fallback-${index + 1}`,
  serialNumber: String(index + 1),
  title: "",
  description: "",
  src: `/images/gallery/gallery${index + 1}.jpg`,
}));

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const displayImages = images.length > 0 ? images : fallbackGalleryImages;
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
    };

    if (selected) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 px-4 pb-20 pt-10 sm:px-6">
      <div className="mb-12 text-center">
        <MainTitle title="Moments at RM Suncity" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayImages.map((image, index) => {
          const hasCaption = Boolean(image.title && image.description);

          return (
            <motion.button
              type="button"
              key={image.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-xl bg-gray-200 text-left shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600"
              onClick={() => setSelected(image)}
              aria-label={hasCaption ? `${image.title}: ${image.description}` : `Open gallery photo ${index + 1}`}
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={image.src}
                alt={image.title || `RM Suncity gallery photo ${index + 1}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500"
              />

              {hasCaption && (
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/25 to-transparent p-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <h3 className="text-lg font-semibold">{image.title}</h3>
                  <p className="mt-1 line-clamp-3 text-sm text-white/90">{image.description}</p>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selected.title || "Gallery photo"}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Close photo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <motion.div
              className="flex max-h-full w-full max-w-6xl flex-col items-center"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={selected.src}
                className="max-h-[80vh] w-full rounded-2xl object-contain shadow-2xl"
                alt={selected.title || "RM Suncity gallery photo"}
                referrerPolicy="no-referrer"
              />
              {selected.title && selected.description && (
                <div className="mt-4 max-w-3xl text-center text-white">
                  <h2 className="text-xl font-semibold">{selected.title}</h2>
                  <p className="mt-1 text-sm text-white/85">{selected.description}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
