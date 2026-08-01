"use client";

import { motion } from "framer-motion";
import {
  FaLightbulb,
  FaUserFriends,
  FaArrowRight,
  FaSchool,
} from "react-icons/fa";

const mentors = [
  {
    name: "Mr. Arpit Kumar Soni",
    role: "Mentor & Director",
    image: "/images/Arpit Kumar Soni - Mentor & Director.jpeg",
    icon: FaLightbulb,
    description:
      "With deep experience in education and leadership, Mr. Arpit Kumar Soni mentors our students to think beyond boundaries, embrace challenges, and become responsible, confident individuals.",
  },
  {
    name: "Mr. Arun Kumar Soni",
    role: "Mentor",
    image: "/images/Arun Kumar Soni - Mentor.jpeg",
    icon: FaUserFriends,
    description:
      "Mr. Arun Kumar Soni inspires students with his vast knowledge and compassionate approach, encouraging them to grow with confidence, discipline, and a genuine love for learning.",
  },
];

export default function MentorsSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-4 pb-16 sm:pb-20">
      {/* soft ambient sun glow, echoes Manager/Principal */}
      <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-orange-100/50 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-orange-600">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-orange-300" />
            Guided by
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-orange-300" />
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl font-semibold leading-tight text-slate-950">
            Our Mentors
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Alongside our leadership, our mentors work closely with students
            every day, guiding character, confidence and everyday growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-12 overflow-hidden rounded-[2rem] border border-orange-100/70 bg-white shadow-[0_30px_90px_-70px_rgba(234,88,12,0.4)]"
        >
          <div className="grid divide-y divide-orange-100/70 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
            {mentors.map((mentor, i) => {
              const Icon = mentor.icon;
              return (
                <div
                  key={mentor.name}
                  className="group relative p-5 sm:p-6 lg:p-8"
                >
                  <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-5 sm:gap-6">
                    {/* Arched portrait, matching Manager/Principal */}
                    <div className="relative">
                      <div className="relative h-full min-h-[260px] overflow-hidden rounded-t-[5rem] rounded-b-2xl ring-1 ring-orange-100">
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />
                      </div>
                    </div>

                    <div className="flex flex-col py-1">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                        <Icon className="text-lg" />
                      </div>

                      <h3 className="mt-4 font-[family-name:var(--font-fraunces)] text-xl sm:text-2xl font-semibold text-slate-950">
                        {mentor.name}
                      </h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
                        {mentor.role}
                      </p>

                      <span className="mt-3 h-px w-10 bg-gradient-to-r from-orange-500 to-amber-300" />

                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {mentor.description}
                      </p>

                      <a
                        href="/about"
                        className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 px-5 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
                      >
                        Learn More
                        <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mt-6 overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-orange-50 to-amber-50/60 p-6 sm:p-7"
        >
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white shadow-md shadow-orange-600/30">
              <FaSchool className="text-xl" />
            </div>
            <span className="hidden h-12 w-px bg-orange-200 sm:block" />
            <p className="text-center text-base leading-7 text-slate-700 sm:text-left">
              At{" "}
              <span className="font-semibold text-slate-950">
                RM Suncity Public School
              </span>
              , our leaders and mentors work together to create a nurturing
              environment where every student can learn, grow, and shine.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
