import Hero from "@/components/home/Hero"
import Highlights from "@/components/home/Highlights"
import PrincipalMessage from "@/components/home/PrincipalMessage"
import ManagerMessage from "@/components/home/ManagerMessage"
import CTASection from "@/components/home/CTASection"
import AboutUs from "@/components/home/AboutUs"
import FAQs from "@/components/home/FAQs"
import Olympiad from "@/components/home/Olympiad"
import MomentsSection from "@/components/shared/MomentsSection"

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <AboutUs />
      <Olympiad />
      <Highlights />
      <MomentsSection />
      <ManagerMessage />
      <PrincipalMessage />
      <CTASection />
      <FAQs />
    </main>
  )
}
