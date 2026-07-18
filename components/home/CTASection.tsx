"use client";

import { motion } from "framer-motion";
import {
  BiMap,
  BiLogoWhatsapp,
  BiEnvelope,
} from "react-icons/bi";
import { CONTACT } from "@/config/contact";

export default function VisitSection() {
  return (
    <section className="py-16 relative bg-linear-to-r from-amber-500 to-yellow-400">
      <div
        className="absolute inset-0 opacity-15"
        style={{ background: "url(/images/bg_img1.png)" }}
      ></div>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={false}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left */}
          <motion.div
            className="relative z-5"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              Plan Your Visit
            </h2>

            <p className="text-gray-100 leading-relaxed mb-8 max-w-lg">
              Visit RM Suncity Public School to explore our campus, meet our
              educators, and experience an environment designed to inspire
              learning and growth.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href={CONTACT.locationUrl}
                target="_blank"
                className="text-lg w-full sm:w-auto flex justify-center items-center gap-2 border-2 border-white bg-white text-orange-600 px-6 py-3 font-semibold hover:bg-transparent hover:border-white hover:text-white transition"
              >
                <BiMap className="text-xl" />
                View Location
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                href={CONTACT.emailUrl}
                className="text-lg w-full sm:w-auto flex justify-center items-center gap-2 border-2 border-white bg-white text-orange-600 px-6 py-3 font-semibold hover:bg-transparent hover:border-white hover:text-white transition"
              >
                <BiEnvelope className="text-xl" />
                Email Us
              </motion.a>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative bg-white shadow-lg p-12 border-l-4 border-white"
          >
            <h3 className="text-xl font-semibold text-orange-600 mb-4">
              We invite you to RM Suncity Public School
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              We invite parents to visit our campus and discover how RM Suncity
              Public School nurtures academic excellence, discipline, and
              character development.
            </p>

            <motion.a
              whileHover={{ scale: 1.05 }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              href={`${CONTACT.whatsappUrl}?text=Hello%21%20I%20want%20to%20visit%20your%20campus.%20Please%20let%20me%20know%20the%20available%20slots.`}
              target="_blank"
              className="w-full sm:w-auto flex justify-center items-center gap-2 bg-green-500 text-white px-6 py-3 font-semibold hover:bg-green-600 transition"
            >
              <BiLogoWhatsapp className="text-xl" />
              Book Visit
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* MAP AREA */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-white/70 w-full max-w-7xl h-120 shadow-lg mx-auto mt-10 relative z-10"
      >
        <iframe
          className="w-full h-full"
          src={CONTACT.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </section>
  );
}
