"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { TfiEmail } from "react-icons/tfi";
import { PiPhone } from "react-icons/pi";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/academics", label: "Academics" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  const contactDetails = {
    contactNumber: "+91 9721773151",
    emailId: "rmsuncity2012@gmail.com",
    facebookPage: "https://www.facebook.com/rmsuncitymaniar",
    instaPage: "https://www.instagram.com/rmsuncity"
  };

  return (
    <>
      {/* 🔹 Top Bar (Normal Flow) */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto flex items-center px-6 h-7 text-sm text-gray-900">
          <TfiEmail className="me-3 text-blue-600 text-lg text-semibold" />
          <span className="me-6">{contactDetails.emailId}</span>

          <PiPhone className="me-2 text-green-600 text-lg text-semibold" />
          <span>{contactDetails.contactNumber}</span>

          <div className="grow" />

          <div className="flex gap-3">
            <Link
              href={contactDetails.facebookPage}
              target="_blank"
            >
              <FaFacebook className="text-blue-600 hover:scale-110 transition" />
            </Link>
            <Link href={contactDetails.instaPage} target="_blank">
              <BsInstagram className="text-pink-500 hover:scale-110 transition" />
            </Link>
          </div>
        </div>
      </div>

      {/* 🔹 Navbar (Sticky = NO GAP EVER) */}
      <motion.nav
        initial={false}
        whileInView={{}}
        className="sticky top-0 z-50 bg-white shadow-md transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          {/* Logo */}
          <Link href="/" className="flex gap-2 items-center">
            <img
              src="/images/logo.png"
              alt="RM Suncity Public School Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h5 className="font-bold text-orange-600 leading-tight">
                RM Suncity
              </h5>
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Public School
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={`relative px-2 py-2 font-semibold transition-colors duration-300
                    ${
                      isActive
                        ? "text-orange-600"
                        : "text-gray-800 hover:text-orange-600"
                    }`}
                  >
                    {link.label}

                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                        className="absolute left-0 right-0 -bottom-1 h-0.5 bg-orange-600 rounded"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-gray-700"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-gray-700"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-gray-700"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-lg shadow-lg overflow-hidden"
            >
              <ul className="flex flex-col py-6 font-semibold text-gray-900">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`px-6 py-2 block transition
                      ${
                        pathname === link.href
                          ? "text-orange-600"
                          : "hover:text-orange-600"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
