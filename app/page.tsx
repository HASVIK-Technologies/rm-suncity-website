import Hero from "@/components/home/Hero"
import Highlights from "@/components/home/Highlights"
import CoreValues from "@/components/home/CoreValues"
import PrincipalMessage from "@/components/home/PrincipalMessage"
import CTASection from "@/components/home/CTASection"
import AboutUs from "@/components/home/AboutUs"
import FAQs from "@/components/home/FAQs"

export default function Home() {
  return (
    <main className="bg-white">

      <Hero />
      <AboutUs />
      <Highlights />
      <CoreValues />
      <PrincipalMessage />
      <CTASection />
      <FAQs />
    </main>
  )
}
