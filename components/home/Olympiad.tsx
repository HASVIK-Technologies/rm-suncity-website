"use client";

import { motion } from "framer-motion";
import MainTitle from "../MainTitle";

export default function Olympiad() {
  return (
    <section className="relative px-6 pt-12 pb-20 bg-fixed bg-gray-800">
      <div
        className="absolute inset-0 opacity-5"
        style={{ background: "url(/images/bg_img1.png)" }}
      ></div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <MainTitle title="Olympiad Competitions" color="white" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 leading-relaxed mb-10">
            Our students actively participate in various Olympiad competitions,
            showcasing their knowledge and skills in subjects like Mathematics,
            Science, and English. These competitions provide a platform for
            students to challenge themselves, gain recognition, and develop a
            love for learning beyond the classroom.
            <br />
            <br />
            We are proud of our students' achievements in these competitions,
            which reflect their dedication, hard work, and the quality of
            education they receive at RM Suncity Public School. We encourage all
            our students to take part in these competitions to enhance their
            academic growth and confidence.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <img
              src="/images/olympiad1.jpeg"
              alt="Olympiad 1"
              className="w-full md:w-[48%] lg:w-[23%] object-cover rounded-lg shadow-md"
            />
            <img
              src="/images/olympiad2.jpeg"
              alt="Olympiad 2"
              className="w-full md:w-[48%] lg:w-[23%] object-cover rounded-lg shadow-md"
            />
            <img
              src="/images/olympiad3.jpeg"
              alt="Olympiad 3"
              className="w-full md:w-[48%] lg:w-[23%] object-cover rounded-lg shadow-md"
            />
            <img
              src="/images/olympiad4.jpeg"
              alt="Olympiad 4"
              className="w-full md:w-[48%] lg:w-[23%] object-cover rounded-lg shadow-md"
            />
            <img
              src="/images/olympiad-prize.jpeg"
              alt="Olympiad 5"
              className="w-full md:w-[48%] lg:w-[47.5%] object-cover rounded-lg shadow-md"
            />
            <img
              src="/images/olympiad-prize-2.jpeg"
              alt="Olympiad 5"
              className="w-full md:w-[48%] lg:w-[47.5%] object-cover rounded-lg shadow-md"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
