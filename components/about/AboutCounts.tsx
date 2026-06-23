"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { BiMedal, BiGroup, BiBookOpen, BiHomeAlt } from "react-icons/bi";

const countWidgets = [
  {
    title: "Years of Excellence",
    description: "Delivering consistent quality education and strong values.",
    count: 15,
    suffix: "+",
    icon: BiMedal,
  },
  {
    title: "Students",
    description: "Young minds nurtured towards knowledge and growth.",
    count: 500,
    suffix: "+",
    icon: BiGroup,
  },
  {
    title: "Teachers",
    description: "Dedicated mentors shaping the future with passion.",
    count: 20,
    suffix: "+",
    icon: BiBookOpen,
  },
  {
    title: "Classrooms",
    description: "Well-equipped spaces designed for focused learning.",
    count: 20,
    suffix: "+",
    icon: BiHomeAlt,
  },
];

export default function AboutCounts({ shadow = "" }) {
  return (
    <>
      {countWidgets.map((widget, i) => {
        const Icon = widget.icon;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`
              px-6 py-8
              group relative min-h-56 h-full overflow-hidden
              bg-linear-to-br from-gray-700 via-gray-800 to-gray-900 
              rounded-xl shadow-xl hover:shadow-2xl
              border border-gray-600/50 hover:border-orange-500/50
              transition-all duration-300
              ${shadow}
            `}
          >
            {/* TOP SECTION */}
            <div className="py-4 flex justify-between items-start">
              <div>
                <p className="text-white font-semibold text-lg tracking-wide mb-3">
                  {widget.title}
                </p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {widget.description}
                </p>
              </div>

              <Icon
                className="
                  text-[#F8B82C]
                  opacity-100
                  group-hover:opacity-125
                  group-hover:scale-125
                  transition-all duration-300
                  shrink-0 ml-4
                "
                size={44}
              />
            </div>

            {/* NUMBER */}
            <div className="absolute bottom-6 left-6">
              <h1 className="text-5xl sm:text-6xl font-bold text-[#F8B82C] tracking-tight leading-none">
                <CountUp
                  end={widget.count}
                  duration={2}
                  enableScrollSpy
                  scrollSpyOnce
                />
                <span className="text-[#F8B82C] ml-0.5">{widget.suffix}</span>
              </h1>
            </div>

            {/* BOTTOM LINE */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300" />
          </motion.div>
        );
      })}
    </>
  );
}
