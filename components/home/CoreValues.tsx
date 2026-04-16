"use client";

import { motion } from "framer-motion";
import {
  BiShield,
  BiStar,
  BiHeart,
  BiCheckShield,
  BiSearch,
  BiCrown,
} from "react-icons/bi";
import MainTitle from "../MainTitle";

const values = [
  {
    title: "Integrity",
    desc: "We nurture honesty, responsibility and strong moral character in every student.",
    icon: BiShield,
  },
  {
    title: "Excellence",
    desc: "We encourage students to strive for their best in academics and personal growth.",
    icon: BiStar,
  },
  {
    title: "Respect",
    desc: "We foster respect for teachers, parents, peers and the community.",
    icon: BiHeart,
  },
  {
    title: "Discipline",
    desc: "We develop punctuality, self-control and dedication to learning.",
    icon: BiCheckShield,
  },
  {
    title: "Curiosity",
    desc: "We inspire students to ask questions and develop a love for learning.",
    icon: BiSearch,
  },
  {
    title: "Leadership",
    desc: "We help students build confidence and become future leaders.",
    icon: BiCrown,
  },
];

export default function CoreValues() {
  return (
    <section
      className="relative pt-12 pb-20 bg-fixed bg-gray-800"   
    >
      {/* Overlay */}
      <div className="absolute inset-0 opacity-5" style={{ background: 'url(/images/bg_img1.png)' }}></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <MainTitle align="center" title="Our Core Values" color="white" />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 pt-3">
          {values.map((value, i) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-gray-700 p-10"
              >
                <div className="flex flex-col items-start">
                  {/* Icon */}
                  <div className="flex items-center justify-center bg-gray-600 text-[#F8B82C] rounded-full p-3 mb-6">
                    <Icon className="text-2xl md:text-3xl" />
                  </div>

                  {/* Content */}
                  <div>
                    <h5 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 leading-snug tracking-tight">
                      {value.title}
                    </h5>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
