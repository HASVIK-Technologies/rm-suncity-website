"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBell, FiX } from "react-icons/fi";

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

export default function NoticeWidget() {
  const [open, setOpen] = useState(false);

  const newCount = notices.filter((n) => n.isNew).length;

  const closeNotification = () => setOpen(false);
  const toggleNotification = () => setOpen((prev) => !prev);

  return (
    <div>
      {/* BELL ICON */}
      <button
        onClick={toggleNotification}
        className="fixed bottom-24 right-6 flex items-center justify-center rounded-full bg-orange-500 text-white shadow-xl hover:shadow-2xl hover:bg-orange-600 transition-all duration-300 p-5"
        style={{ zIndex: 9999 }}
        aria-label={open ? "Close notices" : "Open notices"}
        title={open ? "Close notices" : "Open notices"}
      >
        <motion.span
          animate={newCount > 0 ? { scale: [1, 1.12, 1], opacity: [1, 0.75, 1] } : {}}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <FiBell size={32} />
        </motion.span>
      </button>

      {/* NOTIFICATION PANEL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-24 right-6 w-82.5 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.6)] sm:w-90"
            style={{ zIndex: 9999 }}
          >
            {/* HEADER - Exact structure as requested */}
            <div className="notification-header flex items-center justify-between px-5 pt-4 pb-3 bg-gray-900">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold text-lg">Notices</h3>
                <span className="text-orange-400 font-semibold text-lg">({newCount})</span>
              </div>

              <button
                aria-label="Close Notifications"
                onClick={closeNotification}
                className="text-white hover:text-orange-400 transition p-1"
              >
                ✕
              </button>
            </div>

            {/* SCROLL AREA */}
            <div className="relative h-100 overflow-hidden bg-gray-800">
              <motion.div
                animate={{ y: ["0%", "-50%"] }}
                transition={{
                  duration: 20,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="absolute w-full"
              >
                {[...notices, ...notices].map((notice, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-5 py-4 border-b border-gray-800"
                  >
                    <span className="text-sm text-white pr-4 leading-relaxed">
                      {notice.text}
                    </span>

                    {notice.isNew && (
                      <motion.span
                        animate={{ opacity: [1, 0.45, 1], scale: [1, 1.05, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        className="bg-orange-500 text-white text-[10px] px-2 py-0.75 font-semibold"
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
    </div>
  );
}
