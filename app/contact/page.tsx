"use client";

import { useState } from "react";
import {
  FaWhatsapp,
  FaUser,
  FaPhone,
  FaPaperPlane,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaChevronRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import { CONTACT } from "@/config/contact";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Contact() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; mobile?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: { name?: string; mobile?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your full name";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!mobile.trim()) {
      newErrors.mobile = "Please enter your mobile number";
    } else if (!/^[0-9]{10}$/.test(mobile.replace(/\s/g, ""))) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setShowSuccess(true);

    const fullMessage = message.trim()
      ? `Hello, my name is ${name.trim()} and my mobile number is ${mobile.trim()}.\n\nMessage: ${message.trim()}`
      : `Hello, my name is ${name.trim()} and my mobile number is ${mobile.trim()}. I would like to contact you.`;
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `${CONTACT.whatsappUrl}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setIsSubmitting(false);
    }, 500);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobile(e.target.value);
    if (errors.mobile) {
      setErrors((prev) => ({ ...prev, mobile: undefined }));
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const contactPersons = [
    {
      name: "RM Suncity Helpline",
      phone: "+91 89229 85156",
      phoneUrl: "tel:+918922985156",
    },
    {
      name: "Manager: Rajesh Kumar Soni",
      phone: "+91 97217 73151",
      phoneUrl: "tel:+919721773151",
    },
    {
      name: "Mentor: Arun Kumar Soni",
      phone: "+91 87388 81415",
      phoneUrl: "tel:+918738881415",
    },
    {
      name: "Mentor & Director: Arpit Soni",
      phone: "+91 74600 09899",
      phoneUrl: "tel:+917460009899",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:py-24">
        <div className="absolute inset-0" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm backdrop-blur"
              >
                Contact us
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl"
              >
                We’re here to help you every step of the way.
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="max-w-2xl text-lg leading-relaxed text-gray-600"
              >
                Reach out for admissions, school queries, or general guidance. We’ll respond with the support you need.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-3"
              >
                <a
                  href={CONTACT.phoneUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
                >
                  Call now <FaChevronRight className="text-sm" />
                </a>
                <a
                  href={CONTACT.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
                >
                  Get directions <FaChevronRight className="text-sm" />
                </a>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="grid gap-3 sm:grid-cols-3"
              >
                <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                    <FaPhoneAlt />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Call us</p>
                  <p className="text-sm text-gray-600">Mon-Sat · 8AM-5PM</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                    <FaWhatsapp />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">WhatsApp</p>
                  <p className="text-sm text-gray-600">Quick response</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <FaEnvelope />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">24h response</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-[32px] border border-gray-100 bg-white/90 p-6 shadow-2xl shadow-orange-100 backdrop-blur"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                  <FaUser className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Contact persons</h2>
                  <p className="text-sm text-gray-500">Direct phone support for assistance</p>
                </div>
              </div>

              <div className="space-y-3">
                {contactPersons.map((person) => (
                  <a
                    key={person.name}
                    href={person.phoneUrl}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:border-orange-200 hover:bg-orange-50"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{person.name}</p>
                      <p className="text-sm text-gray-600">{person.phone}</p>
                    </div>
                    <FaPhoneAlt className="text-orange-500" />
                  </a>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-orange-600">
                  <FaMapMarkerAlt />
                  <span className="font-semibold">Visit our campus</span>
                </div>
                <p className="text-sm text-gray-700">
                  R.M. Suncity Public School, Khejuri Road Pillue, Maniyar, Gor Pokhar, Ballia, Uttar Pradesh 277302
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20 bg-amber-50">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-xl shadow-gray-100"
          >
            <div className="border-b border-gray-100 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Find our school</h3>
                  <p className="text-sm text-gray-500">A quick look at our location</p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="mb-4 flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <FaMapMarkerAlt className="mt-1 text-orange-500" />
                <div>
                  <p className="font-semibold text-gray-900">R.M. Suncity Public School</p>
                  <p className="text-sm text-gray-600">Khejuri Road Pillue, Maniyar, Gor Pokhar, Ballia, Uttar Pradesh 277302</p>
                </div>
              </div>

              <div className="mb-4 flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <FaClock className="mt-1 text-orange-500" />
                <div>
                  <p className="font-semibold text-gray-900">Office hours</p>
                  <p className="text-sm text-gray-600">Monday to Saturday · 8:00 AM to 5:00 PM</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-100">
                <iframe
                  src={CONTACT.mapEmbedUrl}
                  width="100%"
                  height="320"
                  allowFullScreen
                  loading="lazy"
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-xl shadow-gray-100"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                <FaPhone />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
                <p className="text-sm text-gray-500">We usually reply shortly through WhatsApp.</p>
              </div>
            </div>

            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, height: 0 }}
                  animate={{ opacity: 1, scale: 1, height: "auto" }}
                  exit={{ opacity: 0, scale: 0.95, height: 0 }}
                  className="mb-4 flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 p-3"
                >
                  <MdCheckCircle className="text-xl text-green-500" />
                  <p className="text-sm font-medium text-green-700">Opening WhatsApp... Please wait!</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter your full name"
                    className={`w-full rounded-2xl border-2 bg-gray-50 py-3 pl-12 pr-4 text-gray-700 placeholder-gray-400 outline-none transition ${
                      errors.name
                        ? "border-red-300 bg-red-50 focus:border-red-500"
                        : "border-gray-200 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 flex items-center gap-1 text-sm text-red-500">
                    <FiAlertCircle className="text-xs" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="mobile" className="mb-2 block text-sm font-semibold text-gray-700">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="mobile"
                    value={mobile}
                    onChange={handleMobileChange}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={15}
                    className={`w-full rounded-2xl border-2 bg-gray-50 py-3 pl-12 pr-4 text-gray-700 placeholder-gray-400 outline-none transition ${
                      errors.mobile
                        ? "border-red-300 bg-red-50 focus:border-red-500"
                        : "border-gray-200 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    }`}
                  />
                </div>
                {errors.mobile && (
                  <p className="mt-2 flex items-center gap-1 text-sm text-red-500">
                    <FiAlertCircle className="text-xs" />
                    {errors.mobile}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-700">
                  Your Message <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={handleMessageChange}
                  placeholder="How can we help you?"
                  rows={4}
                  className="w-full resize-none rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`flex w-full items-center justify-center gap-3 rounded-2xl py-4 px-6 font-bold text-white shadow-lg transition ${
                  isSubmitting
                    ? "cursor-not-allowed bg-green-400"
                    : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                    />
                    Opening WhatsApp...
                  </>
                ) : (
                  <>
                    <FaWhatsapp className="text-xl" />
                    Send via WhatsApp
                    <FaPaperPlane className="text-sm opacity-70" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50 p-4 text-center text-sm text-orange-600">
              Your message will be sent directly to our WhatsApp. Please ensure WhatsApp is installed on your device.
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
