"use client";

import { motion } from "framer-motion";

export default function HeroAcademics() {
  return (
    <section
      className="relative py-60 text-center overflow-hidden"
      style={{
        background: "url(/images/classroom.jpeg) no-repeat center center/cover",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-linear-to-r from-black/60 to-gray-900/60 absolute inset-0 flex flex-col items-center justify-center"
      >
        <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Nursery to Class 10: Learning at Every Step
            </h1>
            <p className="text-gray-200 mb-6">
              A complete school journey that balances early childhood discovery,
              strong fundamentals, and confident Class 10 board preparation.
            </p>

            <div className="mx-auto flex flex-col sm:flex-row justify-center gap-4 text-sm text-gray-200">
              <span className="inline-flex items-center gap-2">
                <span className="text-orange-600">✔</span> Age-appropriate learning
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-orange-600">✔</span> Caring faculty
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-orange-600">✔</span> Board-ready foundation
              </span>
            </div>
          </motion.div>

          <div className="h-60 bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
            <img
              src="/images/academics.jpg"
              alt="Children in classroom"
              className="w-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
