"use client";
import CurriculumStructure from "@/components/academics/CurriculumStructure";
import HeroAcademics from "@/components/academics/HeroAcademics";
import { CONTACT } from "@/config/contact";
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

        {/* ================= STAGE SUBJECTS ================= */}
        <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-gray-600 sm:mb-5 sm:text-3xl">
                Stage-Wise Focus Areas
              </h2>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-3 md:mt-1">
              {[
                {
                  title: "Early Years",
                  items: ["Language readiness", "Motor skills", "Creative play"],
                },
                {
                  title: "Primary",
                  items: ["Mathematics", "Environmental Science", "English & Hindi"],
                },
                {
                  title: "Secondary",
                  items: ["Science", "Social Studies", "Board preparation"],
                },
              ].map((subject, i) => (
                <div
                  key={i}
                  className="border border-gray-200 bg-white p-4 rounded-2xl transition-all duration-300 ease-out sm:rounded-3xl sm:p-6 hover:-translate-y-1 hover:border-gray-300 hover:bg-gray-50 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]"
                >
                  <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{subject.title}</h3>
                  <ul className="space-y-2 sm:space-y-3 text-gray-600 text-sm">
                    {subject.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1 text-orange-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto text-center border border-gray-200 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">
              Enroll Today for a Complete School Journey
            </h2>
            <p className="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base">
              Admissions are open for Nursery through Class 10. Join a caring school environment rooted in strong academics and holistic growth.
            </p>

            <a
              href={`${CONTACT.whatsappUrl}?text=${encodeURIComponent("Hello, I would like to enquire about admissions at RM Suncity Public School.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-5 sm:px-6 py-2.5 sm:py-3 bg-orange-500 text-white text-sm hover:bg-orange-600 transition rounded-full"
            >
              Enquire Now
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
