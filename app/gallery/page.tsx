"use client";

import HeroGallery from "@/components/gallery/HeroGallery";
import PhotoGallery from "@/components/gallery/PhotoGallery";
import SchoolVideos from "@/components/home/SchoolVideos";

export default function Gallery() {
  return (
    <main>
      <HeroGallery />
      <PhotoGallery />
      <SchoolVideos />
    </main>
  );
}
