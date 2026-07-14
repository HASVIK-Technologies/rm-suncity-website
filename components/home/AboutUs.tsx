"use client";

import { motion } from "framer-motion";
import { BiCheckboxChecked } from "react-icons/bi";
import MainTitle from "../MainTitle";
import CountUp from "react-countup";

export default function AboutSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-8 pb-12 px-4 -mt-0.5">
      <div className="max-w-7xl mx-auto">
        <MainTitle title="About Us" />

        <div className="mx-auto grid lg:grid-cols-1 gap-3 items-center">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="px-10"
          >
            <p className="text-gray-700 leading-relaxed mb-6">
              RM Suncity Public School was founded in 2012 with a vision to deliver
              quality education that blends academic excellence with strong
              moral values. We believe learning should shape not just minds, but
              character and confidence. <br />
              Over the years, our institution has grown into a nurturing environment 
              where students are encouraged to explore, innovate, and develop into 
              responsible individuals ready to face the future.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              {[
                "Experienced and dedicated teachers",
                "Focus on academic excellence",
                "Safe and supportive learning environment",
                "Holistic development of every student",
              ].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="flex gap-2 mb-2 items-start"
                >
                  <BiCheckboxChecked className="text-[#F8B82C] text-2xl me-2 shrink-0 pt-0.5" />
                  <span className="text-gray-700">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* COUNTS */}
          <div className="my-4 md:my-6 grid grid-cols-2 md:grid-cols-4 overflow-hidden">
            <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} className="p-6 text-center flex flex-col col-span-1 md:col-span-1 order-2 md:order-1 justify-center">
              <h1 className="text-4xl md:text-6xl font-semibold text-[#F8B82C] mb-4">
                <CountUp end={500} duration={2} enableScrollSpy scrollSpyOnce />
                +
              </h1>
              <p className="text-gray-700 mt-2 text-lg">Happy Students</p>
            </motion.div>

            <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} className="col-span-2 md:col-span-2 p-8 text-center flex flex-col order-1 md:order-2 justify-center md:border-s md:border-e border-0 border-gray-200">
              <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[180px] font-semibold text-[#F8B82C] leading-none mb-2">
                <CountUp end={15} duration={2} enableScrollSpy scrollSpyOnce />
              </h1>
              <p className="text-gray-700  mt-3 text-lg md:text-xl font-medium uppercase tracking-wide">
                Years of Excellence
              </p>
            </motion.div>

            <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} className="p-6 text-center flex flex-col col-span-1 md:col-span-1 order-3 md:order-3 justify-center">
              <h1 className="text-4xl md:text-6xl text-[#F8B82C] font-semibold mb-4">
                <CountUp end={20} duration={2} enableScrollSpy scrollSpyOnce />+
              </h1>
              <p className="text-gray-700 mt-2 text-lg">Experienced Teachers</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
