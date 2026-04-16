"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function PrincipalMessage() {
  return (
    <section className="relative bg-white py-0 lg:py-10 overflow-hidden">
      <div className="mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
        {/* Left content */}
        <div></div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative px-6"
        >
          {/* Accent Line */}
          <div className="absolute -left-6 top-4 w-2 h-28 bg-orange-500"></div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 mb-6">
            Principal's Message
          </h2>

          {/* Name */}
          <h3 className="text-xl font-semibold text-[#F8B82C] mb-4">
            Mr. Rajesh Sony
          </h3>

          {/* Message */}
          <p className="text-gray-600 leading-relaxed mb-4">
            At RM Suncity Public School, we believe that education is the
            foundation for shaping responsible and confident individuals. Our
            mission is to inspire curiosity, creativity, and strong values in
            every student.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Through a balanced blend of modern learning methods and traditional
            values, we strive to nurture young minds and prepare them for the
            challenges of tomorrow.
          </p>

          {/* Signature */}
          <div className="mt-6 font-medium text-gray-800">— Principal</div>

          {/* Experience Text */}
          <div className="text-5xl sm:text-7xl font-bold text-[#F8B82C] mb-3 mt-6">
            <CountUp end={20} duration={2} enableScrollSpy scrollSpyOnce />+
          </div>

          <p className="uppercase text-sm tracking-widest text-gray-500 mb-6">
            Years of Educational Leadership
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative lg:absolute -left-10 bottom-0"
        >
          <img
            src="/images/principal.png"
            alt="Principal"
            className="w-full max-w-lg md:max-w-xl h-72 md:h-100"
          />
        </motion.div>
      </div>
    </section>
  );
}
