"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import heroSlides from "@/data/heroSlides.json";
import { CONTACT } from "@/config/contact";

type Slide = {
  src: string;
  title: string;
  description: string;
  location?: string;
  phone?: string;
  email?: string;
};

const slides: Slide[] = heroSlides as Slide[];

export default function Hero() {

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden pt-20 pb-28 sm:pb-32 md:pb-36 min-h-150 sm:min-h-162.5 md:min-h-175 lg:min-h-160 flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 bg-cover bg-top"
            style={{ backgroundImage: `url(${slide.src})`, backgroundColor: "rgba(0,0,0,0.4)", backgroundBlendMode: "darken" }}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 1.5 }}
          />
        ))}
      </div>

      {/* Premium Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-gray-800/50" />

      {/* Content */}
      <div className="relative z-20 w-full flex">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.75, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: -20 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Logo */}
              <div className="flex align-center justify-center p-3 h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 mx-auto my-4 drop-shadow-md bg-white/80 rounded-full overflow-hidden">
                <img
                  src="/images/logo.png"
                  alt="RM Suncity Public School Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="py-6 px-10 flex flex-col justify-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl mb-5 font-bold text-white text-center">
                  {slides[index].title}
                </h1>

                <p className="text-sm sm:text-base text-white/90 text-center max-w-3xl mx-auto mb-4">
                  {slides[index].description}
                </p>

                <div className="w-auto mx-auto">
                  {slides[index].location && (
                    <div className="flex align-center gap-3 text-white mb-2 justify-center">
                      <FaMapMarkerAlt className="text-white text-md sm:text-lg shrink-0" />
                      <p className="text-sm sm:text-base font-semibold text-white">
                        {slides[index].location}
                      </p>
                    </div>
                  )}

                  <div className="flex align-center gap-3 text-white mb-2 justify-center">
                    <FaPhoneAlt className="text-white text-md sm:text-lg shrink-0" />
                    <p className="text-sm sm:text-base font-semibold text-white">
                      {slides[index].phone ?? CONTACT.phoneNumber}
                    </p>
                  </div>

                  <div className="flex align-center gap-3 text-white mb-2 justify-center">
                    <MdEmail className="text-white text-md sm:text-lg shrink-0" />
                    <p className="text-sm sm:text-base font-semibold text-white break-all">
                      {slides[index].email ?? CONTACT.email}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Students Image */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-0 w-32 sm:w-44 md:w-60 lg:w-72 xl:w-80 pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/images/Students.png"
          alt="Students"
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </motion.div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-20 sm:h-24"
        >
          <path
            d="M0,20 C360,120 1080,120 1440,20 L1440,120 L0,120 Z"
            className="fill-white"
          />
        </svg>
      </div>

      {/* Admissions Badge */}
      {/* {showAdmission && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute top-20 right-6 sm:right-12 z-30"
        >
          <div className="relative px-5 py-2 bg-orange-600 text-white shadow-xl">
            <FaStar className="absolute -top-2 -left-2 text-yellow-300 text-sm animate-pulse" />

            <span className="text-xs sm:text-sm font-semibold tracking-wide">
              Admissions Open {currentYear} – {nextYear}
            </span>
          </div>
        </motion.div>
      )} */}
    </section>
  );
}
