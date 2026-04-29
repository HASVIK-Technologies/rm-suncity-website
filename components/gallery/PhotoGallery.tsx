"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import MainTitle from "../MainTitle";

/* ---------------- DATA ---------------- */

const galleryData = [
  { src: "gallery1.jpg", span: "md:col-span-1 md:row-span-2" },
  { src: "gallery2.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery3.jpg", span: "md:col-span-1 md:row-span-2" },
  { src: "gallery4.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery5.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery6.jpg", span: "md:col-span-1 md:row-span-2" },
  { src: "gallery7.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery8.jpg", span: "md:col-span-1 md:row-span-2" },

  { src: "gallery9.jpg", span: "md:col-span-3 md:row-span-3" },
  { src: "gallery10.jpg", span: "md:col-span-1 md:row-span-2" },
  { src: "gallery11.jpg", span: "md:col-span-1 md:row-span-2" },
  { src: "gallery12.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery13.jpg", span: "md:col-span-1 md:row-span-1" },
  { src: "gallery14.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery15.jpg", span: "md:col-span-1 md:row-span-2" },
  { src: "gallery16.jpg", span: "md:col-span-1 md:row-span-1" },

  { src: "gallery17.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery18.jpg", span: "md:col-span-1 md:row-span-2" },
  { src: "gallery19.jpg", span: "md:col-span-1 md:row-span-2" },
  { src: "gallery20.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery21.jpg", span: "md:col-span-1 md:row-span-2" },
  { src: "gallery22.jpg", span: "md:col-span-1 md:row-span-1" },
  { src: "gallery23.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery24.jpg", span: "md:col-span-2 md:row-span-2" },

  { src: "gallery25.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery26.jpg", span: "md:col-span-2 md:row-span-2" },
];

/* ---------------- COMPONENT ---------------- */

export default function ModernPhotoGallery() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 pt-10 pb-20 px-4 md:px-6">

      {/* Heading */}
      <div className="text-center mb-12">
        <MainTitle title="Moments at RM Suncity" />
      </div>

      {/* Grid */}
      <div className="
        max-w-7xl mx-auto 
        grid 
        grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
        auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[160px]
        gap-1
      ">
        
        {galleryData.map((item, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            
            key={index}
            className={`
              relative overflow-hidden
              cursor-pointer group hover:shadow-xl
              ${item.span}
            `}
            onClick={() => setSelected(item)}
          >
            {/* Image */}
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={`/images/gallery/${item.src}`}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />

            {/* Premium Overlay */}
            <div className="
              absolute inset-0 
              bg-gradient-to-t from-black/40 via-black/10 to-transparent 
              opacity-0 group-hover:opacity-100 
              transition duration-300
            " />

            {/* Subtle Shine Effect */}
            <div className="
              absolute inset-0 
              bg-white/10 opacity-0 group-hover:opacity-100 
              transition duration-300
            " />
          </motion.div>
        ))}

      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="max-w-6xl w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`/images/gallery/${selected.src}`}
                className="w-full rounded-2xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
