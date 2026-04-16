"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Hero() {
  const month = new Date().getMonth();
  const showAdmission = [2, 3, 4].includes(month);

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const images = [
    "/images/hero.jpg",
    "/images/hero2.jpg",
    "/images/reward.png",
    "/images/QualityEducation.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden pt-20 pb-28 sm:pb-32 md:pb-36 min-h-150 sm:min-h-162.5 md:min-h-175 lg:min-h-160 flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 bg-cover bg-top"
            style={{ backgroundImage: `url(${img})` }}
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
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <div className="flex align-center justify-center p-3 h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 mx-auto my-4 drop-shadow-md bg-white/80 rounded-full overflow-hidden">
              <img
                src="/images/logo.png"
                alt="RM Suncity Public School Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            className="py-6 px-10 flex flex-col justify-center"
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* School Name */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl mb-5 font-bold text-white text-center">
              RM Suncity Public School
            </h1>

            <div className="w-auto mx-auto">
              {/* Location */}
              <div className="flex align-center gap-3 text-white mb-2">
                <FaMapMarkerAlt className="text-white text-md sm:text-lg shrink-0" />
                <p className="text-sm sm:text-base font-semibold text-white">
                  Maniar, Khejuri Mod, Ballia
                </p>
              </div>

              {/* Phone */}
              <div className="flex align-center gap-3 text-white mb-2">
                <FaPhoneAlt className="text-white text-md sm:text-lg shrink-0" />
                <p className="text-sm sm:text-base font-semibold text-white">
                  +91 97217 73151
                </p>
              </div>

              {/* Email */}
              <div className="flex align-center gap-3 text-white mb-2">
                <MdEmail className="text-white text-md sm:text-lg shrink-0" />
                <p className="text-sm sm:text-base font-semibold text-white break-all">
                  rmsuncity2012@gmail.com
                </p>
              </div>
            </div>

            {/* Tagline */}
            {/* <p className="text-sm sm:text-base md:text-lg text-white mb-8 sm:mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
              Nurturing young minds through modern education, strong values, and
              a vibrant learning environment that inspires excellence.
            </p> */}

            {/* <div className="text-center mt-4">
              <a className="bg-orange-600 text-white hover:bg-orange-700 transition px-5 cursor-pointer py-3 text-semibold shadow-lg">
                Contact Us
              </a>
            </div> */}
          </motion.div>
        </div>
      </div>

      {/* Students Image */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-0 w-32 sm:w-44 md:w-60 lg:w-72 xl:w-80 pointer-events-none">
        <img
          src="/images/Students.png"
          alt="Students"
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </div>

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
