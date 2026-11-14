import HeroGallery from "@/components/gallery/HeroGallery";
import PhotoGallery from "@/components/gallery/PhotoGallery";
import MomentsSection from "@/components/shared/MomentsSection";
import { getGalleryData, getVideosData } from "@/services/gallery";

export default async function Gallery() {
  const [{ images }, { videos }] = await Promise.all([
    getGalleryData(),
    getVideosData(),
  ]);

  return (
    <main>
      <HeroGallery />
      <PhotoGallery images={images} />
      <MomentsSection videos={videos} />
    </main>
  );
}
