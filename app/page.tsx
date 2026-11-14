import Hero from "@/components/home/Hero"
import Highlights from "@/components/home/Highlights"
import PrincipalMessage from "@/components/home/PrincipalMessage"
import ManagerMessage from "@/components/home/ManagerMessage"
import CTASection from "@/components/home/CTASection"
import AboutUs from "@/components/home/AboutUs"
import FAQs from "@/components/home/FAQs"
import Olympiad from "@/components/home/Olympiad"
import MomentsSection from "@/components/shared/MomentsSection"
import MentorsSection from "@/components/home/MentorsSection"
import { getHighlightsData, getVideosData } from "@/services/gallery"

export default async function Home() {
  const [{ images }, { videos }] = await Promise.all([
    getHighlightsData(),
    getVideosData(),
  ])

  return (
    <main className="bg-white">
      <Hero />
      <AboutUs />
      <Olympiad />
      <Highlights images={images} />
      <MomentsSection videos={videos} />
      <ManagerMessage />
      <PrincipalMessage />
      <MentorsSection />
      <CTASection />
      <FAQs />
    </main>
  )
}
