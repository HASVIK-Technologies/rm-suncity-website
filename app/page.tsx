import Hero from "@/components/home/Hero"
import Highlights from "@/components/home/Highlights"
import CoreValues from "@/components/home/CoreValues"
import PrincipalMessage from "@/components/home/PrincipalMessage"
import CTASection from "@/components/home/CTASection"
import AboutUs from "@/components/home/AboutUs"
import FAQs from "@/components/home/FAQs"
import SchoolVideos from "@/components/home/SchoolVideos"
import OurMission from "@/components/about/OurMission"

export default function Home() {
  return (
    <main className="bg-white">

      <Hero />
      <AboutUs />
      <SchoolVideos />
      <OurMission />
      <Highlights />
      <CoreValues />
      <PrincipalMessage />
      <CTASection />
      <FAQs />
    </main>
  )
}
