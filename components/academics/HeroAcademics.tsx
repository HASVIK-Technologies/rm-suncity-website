"use client";

import { motion } from "framer-motion";

export default function HeroAcademics() {
  return (
    <section
      className="relative py-60 text-center overflow-hidden"
      style={{
        background: "url(/images/hero5.jpg) no-repeat center center/cover",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-black/50 to-gray-900/50 absolute inset-0 flex flex-col items-center justify-center"
      >
        <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Academics That Build Futures
            </h1>
            <p className="text-gray-200 mb-6">
              A structured and holistic approach to education focused on
              conceptual clarity, discipline, and real-world learning.
            </p>

            <div className="mx-auto flex justify-center gap-6 text-sm text-gray-200">
              <span><span className="text-orange-600 me-1.5">✔</span> Holistic Learning</span>
              <span><span className="text-orange-600 me-1.5">✔</span> Expert Faculty</span>
              <span><span className="text-orange-600 me-1.5">✔</span> Modern Curriculum</span>
            </div>
          </motion.div>

          <div className="h-60 bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
           <img
              src="/images/academics.jpg"
              alt="Academics"
              className="w-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
