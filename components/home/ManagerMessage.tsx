"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function ManagerMessage() {
  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-10 sm:pt-24">
      {/* Soft glow */}
      <div className="pointer-events-none absolute -left-24 top-10 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          {/* ================= IMAGE ================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 relative mx-auto mb-14 w-full max-w-sm lg:order-1 lg:mb-0"
          >
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-orange-100 shadow-[0_50px_120px_-60px_rgba(234,88,12,0.35)]">
              <img
                src="/images/manager.png"
                alt="Mr. Rajesh Sony, School Manager"
                className="h-[420px] w-full object-cover sm:h-[460px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
            </div>

            {/* Badge */}
            <div className="absolute left-1/2 -bottom-5 -translate-x-1/2">
              <span className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-orange-600/30">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Manager
              </span>
            </div>
          </motion.div>

          {/* ================= CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="order-2 pt-4 text-center lg:pt-0 lg:text-left"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-600">
              Leadership
            </p>

            <h2 className="mt-4 font-[family-name:var(--font-fraunces)] text-3xl font-semibold leading-[1.15] text-slate-950 sm:text-4xl lg:text-[2.75rem]">
              Inspiring leadership in a single, confident vision.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600 lg:mx-0">
              At RM Suncity Public School, leadership means nurturing every
              student with clarity, care, and a purposeful direction. We focus
              on building a culture of achievement, wellbeing and strong values.
            </p>

            {/* Desktop divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8 hidden h-px w-full origin-left bg-gradient-to-r from-orange-500 via-amber-300 to-transparent lg:block"
            />

            {/* Leadership Stats */}
            <div className="mt-10 flex flex-col gap-8 text-center lg:flex-row lg:items-center lg:text-left">
              {/* Number */}
              <div className="flex shrink-0 items-center justify-center gap-3 lg:justify-start">
                <span className="font-[family-name:var(--font-fraunces)] text-5xl font-semibold leading-none text-orange-600">
                  <CountUp
                    end={15}
                    duration={2}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  +
                </span>

                <span className="text-xs uppercase leading-[1.35] tracking-[0.18em] text-slate-500">
                  Years of
                  <br />
                  Leadership
                </span>
              </div>

              {/* Description */}
              <p className="text-sm leading-7 text-slate-600 lg:border-l lg:border-slate-200 lg:pl-8">
                Leading with consistency and vision, while nurturing a school
                culture built on curiosity, respect, and strong parent
                partnership.
              </p>
            </div>

            {/* Signature */}
            <p className="mt-8 font-[family-name:var(--font-fraunces)] text-xl italic text-slate-700">
              — Mr. Rajesh Sony, Manager
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
