"use client";

import { motion } from "framer-motion";
import {
  BiBookOpen,
  BiLayer,
  BiTrendingUp,
  BiHappyBeaming,
} from "react-icons/bi";
import {
  FaLanguage,
  FaCalculator,
  FaUsers,
  FaPalette,
  FaPuzzlePiece,
  FaMusic,
  FaFlask,
  FaOm,
  FaGlobeAsia,
  FaLaptopCode,
  FaBrain,
  FaBookOpen,
} from "react-icons/fa";
import MainTitle from "../MainTitle";
import type { ComponentType } from "react";

const SUBJECT_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Hindi: FaLanguage,
  English: FaBookOpen,
  Mathematics: FaCalculator,
  "Social Skills": FaUsers,
  "Art & Craft": FaPalette,
  "Creative Play": FaPuzzlePiece,
  "Music & Movement": FaMusic,
  Science: FaFlask,
  Sanskrit: FaOm,
  "Social Science": FaGlobeAsia,
  "Computer Science": FaLaptopCode,
  "GK/Reasoning": FaBrain,
};

export default function CurriculumStructure() {
  const data = [
    {
      title: "Early Years",
      desc: "Nursery and Kindergarten focus on learning through play, language development, sensory exploration, and building social confidence. Activities encourage curiosity, communication, fine motor skills, and safe risk-taking to prepare children for formal learning environments.",
      subjects: [
        "Hindi",
        "English",
        "Mathematics",
        "Social Skills",
        "Art & Craft",
        "Creative Play",
        "Music & Movement",
      ],
      icon: BiHappyBeaming,
      badge: "Nursery - KG",
    },
    {
      title: "Primary School",
      desc: "Classes 1 to 5 strengthen literacy and numeracy while nurturing scientific curiosity and creative thinking. Lessons blend conceptual foundations with hands-on projects, group work, and personal development to build strong study habits and confidence.",
      subjects: [
        "Hindi",
        "English",
        "Mathematics",
        "Science",
        "Sanskrit",
        "Social Science",
        "Computer Science",
        "GK/Reasoning",
      ],
      icon: BiBookOpen,
      badge: "Classes 1 - 5",
    },
    {
      title: "Middle School",
      desc: "Classes 6 to 8 deepen subject knowledge and introduce interdisciplinary projects that connect concepts across subjects. Emphasis is on critical thinking, collaborative research, technology integration, and preparation for subject-specialisation choices ahead.",
      subjects: [
        "Hindi",
        "English",
        "Mathematics",
        "Science",
        "Sanskrit",
        "Social Science",
        "Computer Science",
        "GK/Reasoning",
      ],
      icon: BiLayer,
      badge: "Classes 6 - 8",
    },
    {
      title: "Secondary School",
      desc: "Classes 9 and 10 focus on academic excellence, examination preparedness, and independent learning skills. Curriculum balances rigorous subject content, exam technique, and opportunities for leadership, mentoring, and career exploration to build confidence for higher studies.",
      subjects: [
        "Hindi",
        "English",
        "Mathematics",
        "Science",
        "Sanskrit",
        "Social Science",
        "Computer Science",
        "GK/Reasoning",
      ],
      icon: BiTrendingUp,
      badge: "Classes 9 - 10",
    },
  ];

  return (
    <section
      id="curriculum"
      className="bg-gradient-to-b from-white to-orange-50/40 px-4 py-12 sm:px-6 sm:py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <MainTitle title="Academic Pathway" />

        <div className="grid gap-6 lg:grid-cols-2">
          {data.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                    <Icon size={22} />
                  </div>
                  <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.desc}
                </p>

                <div className="mt-5 pt-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                    Key subjects
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.subjects?.map((sub, idx) => {
                      const SubIcon = SUBJECT_ICONS[sub];
                      return (
                        <span
                          key={idx}
                          className="group inline-flex items-center gap-2 rounded-xl border border-orange-100 bg-orange-50/60 px-3 py-1.5 text-sm text-gray-700 transition hover:border-orange-300 hover:bg-orange-100/70"
                        >
                          {SubIcon && (
                            <SubIcon className="text-sm text-orange-500 transition group-hover:scale-110" />
                          )}
                          {sub}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
