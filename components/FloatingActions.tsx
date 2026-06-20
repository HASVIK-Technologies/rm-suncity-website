"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiBell, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const notices = [
  { text: "Admissions open for the academic year 2025–26.", isNew: true },
  { text: "Parent Teacher Meeting scheduled for next Saturday.", isNew: true },
  { text: "Annual Sports Day will be conducted next month.", isNew: false },
  {
    text: "New computer lab facilities introduced for students.",
    isNew: false,
  },
  {
    text: "Scholarship opportunities available for meritorious students.",
    isNew: false,
  },
];

export default function FloatingActions() {
  const [open, setOpen] = useState(false);

  const newCount = notices.filter((notice) => notice.isNew).length;
  const whatsappNumber = "918877226655";
  const whatsappMessage = "Hello! I would like to inquire about RM Suncity Public School.";

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-9999 flex flex-col items-end gap-4">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-20 right-0 w-82.5 overflow-hidden rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.6)] sm:w-90"
          >
            <div className="flex items-center justify-between bg-gray-900 px-5 pb-3 pt-4">
              <h3 className="text-lg font-semibold text-white">Notices</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-white transition hover:text-orange-400"
                aria-label="Close notices"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="relative h-100 overflow-hidden bg-gray-800">
              <motion.div
                animate={{ y: ["0%", "-50%"] }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                className="absolute w-full"
              >
                {[...notices, ...notices].map((notice, index) => (
                  <div
                    key={`${notice.text}-${index}`}
                    className="flex items-center justify-between border-b border-gray-700 px-5 py-4"
                  >
                    <span className="pr-4 text-sm leading-relaxed text-white">
                      {notice.text}
                    </span>

                    {notice.isNew && (
                      <motion.span
                        animate={{ opacity: [1, 0.45, 1], scale: [1, 1.05, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        className="bg-orange-500 px-2 py-0.5 text-[10px] font-semibold text-white"
                      >
                        NEW
                      </motion.span>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-xl transition hover:bg-orange-600"
        aria-label={open ? "Close notices" : "Open notices"}
        title={open ? "Close notices" : "Open notices"}
      >
        <motion.span
          animate={newCount > 0 ? { scale: [1, 1.12, 1], opacity: [1, 0.75, 1] } : {}}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <FiBell size={24} />
        </motion.span>

        {newCount > 0 && (
          <span className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-red-500 text-[10px] font-semibold text-white">
            {newCount}
          </span>
        )}
      </button>

      <button
        onClick={handleWhatsAppClick}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600"
        aria-label="Contact us on WhatsApp"
        title="Contact us on WhatsApp"
      >
        <FaWhatsapp size={30} />
      </button>
    </div>
  );
}
