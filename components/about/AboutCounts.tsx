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
              px-5
              group relative min-h-48 h-full overflow-hidden
              bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 
              ${shadow}
            `}
          >
            {/* TOP SECTION */}
            <div className="py-4 flex justify-between items-start">
              <div>
                <p className="text-white font-semibold text-lg tracking-wide mb-3">
                  {widget.title}
                </p>
                <p className="text-gray-300 text-xs mt-1 leading-relaxed max-w-[80%]">
                  {widget.description}
                </p>
              </div>

              <Icon
                className="
                  text-[#F8B82C]
                  opacity-90
                  group-hover:opacity-100
                  group-hover:scale-110
                  transition-all duration-300
                "
                size={36}
              />
            </div>

            {/* NUMBER */}
            <div className="absolute bottom-5 left-5">
              <h1 className="text-3xl sm:text-5xl font-semibold text-[#F8B82C] tracking-tight">
                <CountUp
                  end={widget.count}
                  duration={2}
                  enableScrollSpy
                  scrollSpyOnce
                />
                <span className="text-[#F8B82C] ml-1">{widget.suffix}</span>
              </h1>
            </div>

            {/* BOTTOM LINE */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-orange-400 group-hover:w-full transition-all duration-300" />
          </motion.div>
        );
      })}
    </>
  );
}
