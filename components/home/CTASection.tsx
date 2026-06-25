"use client";

import { motion } from "framer-motion";
import {
  BiMap,
  BiLogoWhatsapp,
  BiEnvelope,
  BiLinkExternal,
} from "react-icons/bi";

export default function VisitSection() {
  return (
    <section className="relative pt-20 pb-100 bg-linear-to-r from-amber-500 to-yellow-400">
      <div
        className="absolute inset-0 opacity-15"
        style={{ background: "url(/images/bg_img1.png)" }}
      ></div>
      <div className="max-w-7xl mx-auto px-6 xl:px-0">
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

            <p className="text-gray-200 leading-relaxed mb-8 max-w-lg">
              Visit RM Suncity Public School to explore our campus, meet our
              educators, and experience an environment designed to inspire
              learning and growth.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://www.google.com/maps/place//@26.0122534,84.1315854,17.44z/data=!4m6!1m5!3m4!2zMjbCsDAwJzQzLjIiTiA4NMKwMDcnNTMuOCJF!8m2!3d26.012!4d84.1316?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                className="text-lg w-full sm:w-auto flex justify-center items-center gap-2 border-2 border-white bg-white text-orange-600 px-6 py-3 font-semibold hover:bg-transparent hover:border-white hover:text-white transition"
              >
                <BiMap className="text-xl" />
                View Location
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                href="mailto:rmsuncity2012@gmail.com"
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
              href="https://wa.me/918922985156?text=Hello%21%20I%20want%20to%20visit%20your%20campus.%20Please%20let%20me%20know%20the%20available%20slots."
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
        className="bg-white/70 overflow-hidden absolute z-20 bottom-0 w-full h-80 shadow-lg mx-auto"
      >
        <div className="absolute flex gap-4 top-2 left-2 z-30 bg-white/90 px-4 py-2">
          <div className="grow">
            <h4 className="text-sm font-semibold text-gray-700">
              RM Suncity Public School
            </h4>
            <p className="text-xs text-gray-600">Maniar, Khejuri Mod, Ballia</p>
          </div>
          <a
            href="https://www.google.com/maps/place//@26.0122534,84.1315854,17.44z/data=!4m6!1m5!3m4!2zMjbCsDAwJzQzLjIiTiA4NMKwMDcnNTMuOCJF!8m2!3d26.012!4d84.1316?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            className="flex items-center gap-1 text-sm text-blue-700 hover:text-blue-900 transition"
          >
            <BiLinkExternal className="text-2xl" />
          </a>
        </div>
        <iframe
          className="w-full h-full"
          src="https://maps.google.com/maps?q=26.012000,84.131611&z=17&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </section>
  );
}
