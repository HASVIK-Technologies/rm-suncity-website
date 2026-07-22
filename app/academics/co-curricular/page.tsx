import CoCurricularHero from "@/components/academics/co-curricular/CoCurricularHero";
import CoCurricularSection from "@/components/academics/co-curricular/CoCurricularSection";
import MainTitle from "@/components/MainTitle";
import { coCurricularData } from "@/data/coCurricularData";

export const metadata = {
  title: "Co-Curricular | RM Suncity Public School",
  description:
    "Discover the co-curricular activities and vibrant learning experiences at RM Suncity Public School.",
};

export default function CoCurricularPage() {
  return (
    <main className="bg-white">
      <CoCurricularHero />

      <section className="px-4 py-12 sm:px-6 sm:py-16 md:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <MainTitle title="Co-Curricular Activities" />
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-8 text-gray-600 sm:text-xl">
            Our co-curricular programs are designed to complement academic learning, fostering creativity, teamwork, and personal growth. Students can explore a wide range of activities that enhance their skills and passions.
          </p>
          <div className="space-y-8 md:space-y-12">
            {coCurricularData.map((section) => (
              <CoCurricularSection key={section.id} section={section} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
