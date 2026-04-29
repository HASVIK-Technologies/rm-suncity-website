"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import MainTitle from "@/components/MainTitle";
import "swiper/css";
import "swiper/css/autoplay";

const items = [
  {
    title: "Quality Education",
    description:
      "Providing strong academic foundations through structured learning and experienced, dedicated teachers guiding every student.",
    image: "/images/QualityEducation.jpg",
  },
  {
    title: "Experienced Teachers",
    description:
      "Our skilled teachers guide students with care, personal attention, and mentorship to help them achieve their full potential.",
    image: "/images/teachers.png",
  },
  {
    title: "Holistic Development",
    description:
      "We support overall student growth through balanced learning in academics, sports, creativity, discipline, and character building.",
    image: "/images/holistic.jpg",
  },
  {
    title: "Computer Lab",
    description:
      "Students gain practical technology skills in our computer lab with access to modern systems and guided learning sessions.",
    image: "/images/computer-lab.jpg",
  },
  {
    title: "Rakshabandhan",
    description:
      "Students celebrate Rakshabandhan together, learning the values of love, respect, tradition, and strong community bonding.",
    image: "/images/rakshabandhan.png",
  },
  {
    title: "Rewarding Achievements",
    description:
      "We recognize and celebrate student achievements in academics and activities to inspire confidence and continued success.",
    image: "/images/reward.png",
  },
  {
    title: "Creative Learning",
    description:
      "Creative activities like art, music, storytelling, and projects help students express ideas and develop innovative thinking.",
    image: "/images/creative.jpg",
  },
];

export default function Highlights() {
  return (
    <section className="pt-1 pb-12 bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        {/* <MainTitle align="center" title="What We Offer" /> */}

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
          loop
          spaceBetween={4}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {items.map((item, i) => (
            <SwiperSlide key={i}>
              <div className={"overflow-hidden transition duration-300 hover:-translate-y-1 flex flex-col w-full bg-white"}>
                {/* Image */}
                <div className="h-64 overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 text-center flex flex-col grow">
                  <h5 className="text-lg sm:text-xl font-semibold text-orange-600 mb-2 leading-snug tracking-tight">
                    {item.title}
                  </h5>

                  <p className="text-gray-600 text-sm leading-relaxed grow">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}
