"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function PrincipalMessage() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 sm:pb-24">
      {/* Soft glow */}
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile divider */}
        <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
          <span className="h-px flex-1 max-w-[35%] bg-gradient-to-r from-transparent to-orange-400" />
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          <span className="h-px flex-1 max-w-[35%] bg-gradient-to-l from-transparent to-orange-400" />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          {/* ================= IMAGE ================= */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="order-1 relative mx-auto mb-14 w-full max-w-sm lg:order-2 lg:mb-0"
          >
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-orange-100 shadow-[0_50px_120px_-60px_rgba(234,88,12,0.35)]">
              <img
                src="/images/principal.png"
                alt="Mr. Rajnarayan Sharma, School Principal"
                className="h-[420px] w-full object-cover object-top sm:h-[460px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
            </div>

            <div className="absolute left-1/2 -bottom-5 -translate-x-1/2">
              <span className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-orange-600/30">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Principal
              </span>
            </div>
          </motion.div>

          {/* ================= CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 text-center lg:order-1 lg:text-left"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-600">
              Principal&apos;s Message
            </p>

            <h2 className="mt-4 font-[family-name:var(--font-fraunces)] text-3xl font-semibold leading-[1.15] text-slate-950 sm:text-4xl lg:text-[2.75rem]">
              A confident message from our principal.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600 lg:mx-0">
              At RM Suncity Public School, strong academic performance grows
              from a caring school culture. We support students to discover
              their talents while holding fast to respect, resilience and
              community values.
            </p>

            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-600 lg:mx-0">
              Through a balanced blend of modern learning methods and
              traditional values, we nurture young minds and prepare them for
              the challenges of tomorrow.
            </p>

            {/* Desktop divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8 hidden h-px w-full origin-left bg-gradient-to-r from-orange-500 via-amber-300 to-transparent lg:block"
            />

            {/* Stats */}
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
                  Excellence
                </span>
              </div>

              {/* Description */}
              <p className="text-sm leading-7 text-slate-600 lg:border-l lg:border-slate-200 lg:pl-8">
                Fifteen years of dedicated leadership focused on inspiring
                confident learners and responsible individuals.
              </p>
            </div>

            <p className="mt-8 font-[family-name:var(--font-fraunces)] text-xl italic text-slate-700">
              — Mr. Rajnarayan Sharma, Principal
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
