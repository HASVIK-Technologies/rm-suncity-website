"use client";
import CurriculumStructure from "@/components/academics/CurriculumStructure";
import HeroAcademics from "@/components/academics/HeroAcademics";
import {
  BiBook,
  BiBrain,
  BiLayer,
  BiTrendingUp,
  BiFootball,
  BiPaint,
} from "react-icons/bi";

export default function Academics() {
  return (
    <main>
      <div className="bg-white">
        <HeroAcademics />
        <CurriculumStructure />

        {/* ================= METHODOLOGY ================= */}
        <section className="px-6 py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-10">
              Teaching Methodology
            </h2>

            <div className="grid md:grid-cols-2 gap-10">
              {[
                {
                  icon: BiBrain,
                  title: "Concept-Based Learning",
                  desc: "Deep understanding rather than rote memorization.",
                },
                {
                  icon: BiBook,
                  title: "Practical Exposure",
                  desc: "Hands-on learning through activities and projects.",
                },
                {
                  icon: BiLayer,
                  title: "Student Engagement",
                  desc: "Interactive classrooms that encourage participation.",
                },
                {
                  icon: BiTrendingUp,
                  title: "Continuous Assessment",
                  desc: "Regular evaluation for consistent improvement.",
                },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <div key={i} className="flex gap-4">
                    <Icon className="text-orange-500 mt-1" size={22} />
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= SUBJECTS ================= */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-10">Core Subjects</h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {["Mathematics", "Science", "Languages", "Social Studies"].map(
                (subject, i) => (
                  <div
                    key={i}
                    className="border border-gray-200 p-6 text-center hover:border-orange-400 transition"
                  >
                    <p className="font-medium">{subject}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ================= FACULTY ================= */}
        <section className="px-6 py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-10">Our Faculty</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Experienced and qualified educators",
                "Mentorship-driven teaching approach",
                "Continuous professional development",
              ].map((text, i) => (
                <div key={i} className="border border-gray-200 p-6">
                  <p className="text-gray-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ASSESSMENT ================= */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-10">
              Assessment & Growth
            </h2>

            <div className="flex flex-col md:flex-row justify-between gap-6">
              {[
                "Regular Tests",
                "Performance Tracking",
                "Parent Communication",
              ].map((step, i) => (
                <div
                  key={i}
                  className="flex-1 border border-gray-200 p-6 text-center"
                >
                  <span className="text-sm text-gray-400">0{i + 1}</span>
                  <p className="mt-2 font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CO-CURRICULAR ================= */}
        <section className="px-6 py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-10">
              Co-Curricular Activities
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: BiFootball, label: "Sports" },
                { icon: BiPaint, label: "Arts" },
                { icon: BiLayer, label: "Clubs & Activities" },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <div
                    key={i}
                    className="border border-gray-200 p-6 text-center hover:border-orange-400 transition"
                  >
                    <Icon className="mx-auto text-orange-500 mb-3" size={28} />
                    <p className="font-medium">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center border border-gray-200 p-10">
            <h2 className="text-2xl font-semibold mb-4">
              Start Your Academic Journey With Us
            </h2>
            <p className="text-gray-600 mb-6">
              Admissions are now open. Join a learning environment focused on
              growth, discipline, and excellence.
            </p>

            <button className="px-6 py-3 bg-orange-500 text-white text-sm hover:bg-orange-600 transition">
              Enquire Now
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
