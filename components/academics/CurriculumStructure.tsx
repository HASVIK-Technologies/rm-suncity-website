"use client";

import { motion } from "framer-motion";
import MainTitle from "../MainTitle";
import { BiBookOpen, BiLayer, BiTrendingUp, BiHappyBeaming } from "react-icons/bi";

export default function CurriculumStructure() {
  const data = [
    {
      title: "Early Years",
      desc: "Nursery and Kindergarten learning through play, language, and social confidence.",
      icon: BiHappyBeaming,
    },
    {
      title: "Primary School",
      desc: "Classes 1 to 5 strengthen literacy, numeracy, scientific curiosity, and life skills.",
      icon: BiBookOpen,
    },
    {
      title: "Middle School",
      desc: "Classes 6 to 8 build deeper understanding, projects, and integrated learning.",
      icon: BiLayer,
    },
    {
      title: "Secondary School",
      desc: "Classes 9 and 10 focus on academic excellence, board readiness, and confidence.",
      icon: BiTrendingUp,
    },
  ];

  return (
    <section className="px-6 py-15 bg-white">
      <div className="max-w-7xl mx-auto">
        <MainTitle title="Academic Pathway" />

        <div className="relative mt-16">
          {/* CENTER LINE */}
          <div className="absolute left-1/2 top-0 h-full w-px bg-gray-200 -translate-x-1/2" />

          <div className="flex flex-col gap-16">
            {data.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`relative flex items-center ${
                    isLeft ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* CONTENT */}
                  <div className="w-full md:w-[45%] border border-gray-200 p-6 bg-white">
                    <span className="text-xs text-gray-400 tracking-widest">
                      0{i + 1}
                    </span>

                    <h3 className="text-lg font-semibold mt-2 mb-2 text-gray-900">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* ICON DOT */}
                  <div className="absolute left-1/2 -translate-x-1/2 bg-white border border-gray-200 w-12 h-12 flex items-center justify-center">
                    <Icon className="text-orange-500" size={22} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
