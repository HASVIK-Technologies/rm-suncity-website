"use client";

import { motion, type Variants } from "framer-motion";
import MainTitle from "@/components/MainTitle";

export default function Curriculum() {
  const stages = [
    {
      title: "Nursery & KG",
      desc: "Play-based learning, language development, and emotional confidence.",
    },
    {
      title: "Classes 1 to 5",
      desc: "Strong foundations in reading, numeracy, science, and social skills.",
    },
    {
      title: "Classes 6 to 8",
      desc: "Hands-on projects, concept clarity, and preparation for higher learning.",
    },
    {
      title: "Classes 9 & 10",
      desc: "Board exam readiness, disciplined study habits, and future guidance.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <main>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 sm:px-6 py-16 sm:py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200 rounded-full blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-orange-600 font-medium text-sm sm:text-base mb-3 sm:mb-4 tracking-wide"
            >
              Academics
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6"
            >
              Curriculum
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              A comprehensive learning journey from Nursery to Class 10, designed to nurture every child&apos;s potential at every stage of their education.
            </motion.p>
          </div>
        </section>

        {/* From Nursery to Class 10 Section */}
        <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 sm:mb-14"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                From Nursery to Class 10
              </h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                Every stage of learning is carefully crafted to meet the developmental needs and growth potential of students at different ages.
              </p>
            </motion.div>

            {/* Cards Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {stages.map((stage, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-orange-400 transition-all duration-300 cursor-pointer"
                >
                  {/* Orange accent line at top */}
                  <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Card number */}
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-4">
                    {i + 1}
                  </span>
                  
                  {/* Card title */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {stage.title}
                  </h3>
                  
                  {/* Card description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {stage.desc}
                  </p>
                  
                  {/* Arrow indicator */}
                  <div className="mt-4 flex items-center text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Learn more</span>
                    <svg
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Holistic Development at Every Step
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                Our curriculum balances academic excellence with character building, creativity, and practical life skills. We ensure every child receives personalized attention and a supportive learning environment.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-orange-50 px-6 py-3 rounded-full">
                  <span className="text-orange-700 font-medium">CBSE Aligned</span>
                </div>
                <div className="bg-amber-50 px-6 py-3 rounded-full">
                  <span className="text-amber-700 font-medium">Experienced Faculty</span>
                </div>
                <div className="bg-green-50 px-6 py-3 rounded-full">
                  <span className="text-green-700 font-medium">Student-Centered</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}