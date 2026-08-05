"use client";

import CurriculumStructure from "@/components/academics/CurriculumStructure";
import HeroAcademics from "@/components/academics/HeroAcademics";
import { CONTACT } from "@/config/contact";
import { FaBookOpen, FaHandsHelping, FaLightbulb } from "react-icons/fa";

export default function Academics() {
  const highlights = [
    {
      title: "Balanced learning",
      desc: "Strong academic foundations paired with value-based education and personal growth.",
      icon: FaBookOpen,
    },
    {
      title: "Skill-focused",
      desc: "Learning experiences designed to build confidence, creativity, and responsible thinking.",
      icon: FaLightbulb,
    },
    {
      title: "Supportive environment",
      desc: "A caring school atmosphere where every child is encouraged to grow at their own pace.",
      icon: FaHandsHelping,
    },
  ];

  const stageFocus = [
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
  ];

  return (
    <main>
      <div className="bg-white">
        <HeroAcademics />
        <CurriculumStructure />

        <section className="bg-gradient-to-b from-white to-orange-50/40 px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:items-center">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                  Curriculum philosophy
                </p>
                <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                  A clear, caring, and future-ready academic journey
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600">
                  Our curriculum is designed to nurture academic excellence while building discipline, curiosity, and confidence in every learner.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-3">
                {highlights.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                        <Icon className="text-lg" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>


        <section className="px-4 py-12 sm:px-6 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center sm:text-left">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                Learning focus
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Stage-wise focus areas
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600 sm:mx-0">
                Each stage is shaped to support age-appropriate growth, confidence, and academic readiness.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {stageFocus.map((subject, i) => (
                <div
                  key={i}
                  className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">{subject.title}</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
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

        <section className="bg-gray-100 px-4 py-12 sm:px-6 sm:py-16 md:py-20">
          <div className="mx-auto max-w-5xl rounded-[32px] bg-gradient-to-r from-amber-500 to-amber-600 p-8 text-center text-white shadow-lg sm:p-10">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Enroll today for a complete school journey
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-orange-50 sm:text-base">
              Admissions are open for Nursery through Class 10. Join a caring school environment rooted in strong academics and holistic growth.
            </p>

            <a
              href={`${CONTACT.whatsappUrl}?text=${encodeURIComponent("Hello, I would like to enquire about admissions at RM Suncity Public School.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
            >
              Enquire Now
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
