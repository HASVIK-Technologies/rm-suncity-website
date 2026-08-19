"use client";

import { motion } from "framer-motion";
import { BiSolidStar } from "react-icons/bi";

export default function HeroExamSchedule() {
  return (
    <section
      className="relative flex min-h-[420px] items-center justify-center overflow-hidden sm:min-h-[480px]"
      style={{
        background: "url(/images/pencils.jpg) no-repeat center center/cover",
      }}
    >

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 text-center text-white sm:px-6 sm:py-20 md:px-8"
      >

        <h1 className="mx-auto mt-6 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Examination Schedule
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-orange-50 sm:text-lg">
                  Class-wise exam dates and shift timings for Nursery through Class 10
                  <br />
          kept up to date by the school office each term.
        </p>
      </motion.div>
    </section>
  );
}
