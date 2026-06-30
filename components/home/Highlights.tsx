"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import MainTitle from "../MainTitle";

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
    <section className="pt-1 pb-12 bg-white px-6">
      <div className="max-w-7xl mx-auto px-6 md:px-0">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 mb-8">
            <MainTitle title="Our Highlights" />
          </div>
        </motion.div>

        <div className="border border-gray-200 rounded-2xl p-6 mb-8 text-gray-700 leading-relaxed">
          <motion.p>
            At RM Suncity, we believe in the all-round development of children.
            So, we provide opportunities that nurture academic excellence,
            creativity, leadership, sportsmanship, and moral values. Our
            students are encouraged to explore their talents and participate in
            various activities that help them grow into confident, responsible,
            and compassionate individuals.
          </motion.p>
          <ul className="mt-6 ps-4">
            <li>
              🏆 &nbsp;&nbsp; Academic Excellence with a strong focus on conceptual learning.
            </li>
            <li>
              🎨 &nbsp;&nbsp; Co-curricular Activities including art, music, dance, and
              cultural programs.
            </li>
            <li>
              ⚽ &nbsp;&nbsp; Sports & Physical Education for fitness, teamwork, and
              discipline.
            </li>
            <li>
              🧠 &nbsp;&nbsp; Olympiad & Competitive Exam Preparation to enhance analytical
              and problem-solving skills.
            </li>
            <li>
              💻 &nbsp;&nbsp; Smart Classrooms & Digital Learning for an engaging educational
              experience.
            </li>
            <li>
              🎤 &nbsp;&nbsp; Personality Development & Public Speaking to build confidence
              and communication skills.
            </li>
            <li>
              🌱 &nbsp;&nbsp; Value-Based Education that instills ethics, discipline, and
              respect.
            </li>
            <li>
              🏅 &nbsp;&nbsp; Regular Competitions & Achievement Recognition to motivate and
              celebrate excellence.
            </li>
            <li>
              👨‍🏫 &nbsp;&nbsp; Experienced and Dedicated Faculty committed to every child's
              growth.
            </li>
            <li>
              🤝 &nbsp;&nbsp; Safe and Nurturing Environment where every student feels valued
              and inspired.
            </li>
          </ul>
        </div>

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
                <div
                  className={
                    "overflow-hidden transition duration-300 hover:-translate-y-1 flex flex-col w-full bg-white"
                  }
                >
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
      </div>
    </section>
  );
}
