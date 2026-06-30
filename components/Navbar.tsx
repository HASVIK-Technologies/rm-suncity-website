"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { TfiEmail } from "react-icons/tfi";
import { PiPhone } from "react-icons/pi";
import { FaFacebook, FaSignOutAlt } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FiChevronDown, FiBell } from "react-icons/fi";
import LoginPopup from "./LoginPopup";
import toast from "react-hot-toast";

const notices = [
  { text: "Admissions open for the academic year 2025–26.", isNew: true },
  { text: "Parent Teacher Meeting scheduled for next Saturday.", isNew: true },
  { text: "Annual Sports Day will be conducted next month.", isNew: false },
  { text: "New computer lab facilities introduced for students.", isNew: false },
  { text: "Scholarship opportunities available for meritorious students.", isNew: false },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<{
    name: string;
    profileImage: string | null;
    phone: string | null;
  } | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loggedIn =
      typeof window !== "undefined" &&
      localStorage.getItem("adminLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    // Load user profile from localStorage
    if (loggedIn) {
      const storedProfile = localStorage.getItem("userProfile");
      if (storedProfile) {
        try {
          setUserProfile(JSON.parse(storedProfile));
        } catch {
          setUserProfile(null);
        }
      }
    } else {
      setUserProfile(null);
    }
  }, []);

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
      }
    };

    if (notificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationOpen]);

  // Helper to get initials from name
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminPhone");
    localStorage.removeItem("userProfile");
    setIsLoggedIn(false);
    setUserProfile(null);
    setProfileOpen(false);
    toast.success("Logged out successfully");
    router.push("/");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/academics", label: "Academics" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact Us" },
  ];

  const contactDetails = {
    contactNumber: "+91 9235818178",
    emailId: "rmsuncity2012@gmail.com",
    facebookPage: "https://www.facebook.com/rmsuncitymaniar",
    instaPage: "https://www.instagram.com/rmsuncity",
  };

  return (
    <>
      {/* 🔹 Top Bar (Normal Flow) */}
      <div className="bg-white border-b border-gray-200 hidden md:flex">
        <div className="flex items-center justify-between px-8 h-7 max-w-7xl w-full text-sm text-gray-900 mx-auto">
          <div className="flex items-center">
            <TfiEmail className="me-3 text-blue-600 text-lg text-semibold" />
            <span className="me-6">{contactDetails.emailId}</span>

            <PiPhone className="me-2 text-green-600 text-lg text-semibold" />
            <span>{contactDetails.contactNumber}</span>
          </div>


          <div className="flex gap-3">
            <Link href={contactDetails.facebookPage} target="_blank">
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

                    {/* {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                        className="absolute left-0 right-0 -bottom-1 h-0.5 bg-orange-600 rounded"
                      />
                    )} */}
                  </Link>
                </li>
              );
            })}
            {isLoggedIn ? (
              <li className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full transition-colors duration-300 shadow-sm"
                >
                  Admin
                  <FiChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-56 z-50"
                  >
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        {userProfile?.profileImage ? (
                          <img
                            src={userProfile.profileImage}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-200"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm ring-2 ring-orange-200">
                            {userProfile?.name
                              ? getInitials(userProfile.name)
                              : "AD"}
                          </div>
                        )}
                      </div>
                      {/* Name */}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {userProfile?.name || "Admin User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {userProfile?.phone || "Logged in"}
                        </p>
                      </div>
                    </div>
                    {/* Profile Link */}
                    <Link
                      href="/admin/add-notice"
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-800 hover:bg-orange-50 transition"
                      onClick={() => setProfileOpen(false)}
                    >
                      <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        {userProfile?.profileImage ? (
                          <img
                            src={userProfile.profileImage}
                            alt=""
                            className="w-5 h-5 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-semibold text-gray-600">
                            {userProfile?.name
                              ? getInitials(userProfile.name)
                              : "AD"}
                          </span>
                        )}
                      </span>
                      <span className="text-sm font-medium">Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-gray-800 hover:bg-red-50 transition border-t border-gray-100"
                    >
                      <FaSignOutAlt size={14} />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </motion.div>
                )}
              </li>
            ) : (
              <li>
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
                  aria-label={notificationOpen ? "Close notifications" : "Open notifications"}
                >
                  <motion.span
                    animate={notices.filter(n => n.isNew).length > 0 ? { scale: [1, 1.12, 1], opacity: [1, 0.75, 1] } : {}}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center justify-center"
                  >
                    <FiBell size={24} />
                  </motion.span>
                  {notices.filter(n => n.isNew).length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-red-500 text-[10px] font-semibold text-white">
                      {notices.filter(n => n.isNew).length}
                    </span>
                  )}
                </button>
              </li>
            )}
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
                {isLoggedIn ? (
                  <>
                    {/* User Info Header - Mobile */}
                    <li className="px-6 py-2 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">
                          {userProfile?.profileImage ? (
                            <img
                              src={userProfile.profileImage}
                              alt="Profile"
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            getInitials(userProfile?.name || "Admin User")
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {userProfile?.name || "Admin User"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {userProfile?.phone || "Logged in"}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="px-6 py-2">
                      <Link
                        href="/admin/add-notice"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full transition-colors shadow-sm"
                        onClick={() => setMenuOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li className="px-6 py-2">
                      <button
                        onClick={() => {
                          handleLogout();
                          setMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        <FaSignOutAlt size={14} />
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="px-6 py-2">
                    <button
                      onClick={() => {
                        setNotificationOpen(!notificationOpen);
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 text-gray-700 hover:text-orange-600 font-semibold rounded-lg transition-colors"
                    >
                      <span className="relative">
                        <FiBell size={20} />
                        {notices.filter(n => n.isNew).length > 0 && (
                          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-red-500 text-[9px] font-semibold text-white">
                            {notices.filter(n => n.isNew).length}
                          </span>
                        )}
                      </span>
                      Notifications
                    </button>
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Login Popup */}
      <LoginPopup
        isOpen={loginOpen}
        onClose={() => {
          setLoginOpen(false);
          const loggedIn =
            typeof window !== "undefined" &&
            localStorage.getItem("adminLoggedIn") === "true";
          setIsLoggedIn(loggedIn);
        }}
      />

      {/* Notification Panel */}
      <AnimatePresence>
        {notificationOpen && (
          <motion.div
            ref={notificationRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 right-4 z-50 w-80 bg-white rounded-xl shadow-2xl overflow-hidden"
          >
            {/* HEADER - Full orange background with Notices and count */}
            <div className="flex items-center justify-between px-5 py-3 bg-orange-500">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold text-lg">Notices</h3>
                <span className="bg-white text-orange-500 px-2 py-0.5 rounded-full text-sm font-semibold">
                  {notices.filter(n => n.isNew).length} new
                </span>
              </div>
              <button
                onClick={() => setNotificationOpen(false)}
                aria-label="Close Notifications"
                className="text-white hover:text-gray-200 transition p-1"
              >
                ✕
              </button>
            </div>
            <div className="relative h-96 overflow-hidden bg-white">
              <motion.div
                animate={{ y: ["0%", "-50%"] }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                className="absolute w-full"
              >
                {[...notices, ...notices].map((notice, index) => (
                  <div
                    key={`${notice.text}-${index}`}
                    className="flex items-center justify-between border-b border-gray-100 px-4 py-3"
                  >
                    <span className="text-sm text-gray-700 leading-relaxed">
                      {notice.text}
                    </span>
                    {notice.isNew && (
                      <motion.span
                        animate={{ opacity: [1, 0.45, 1], scale: [1, 1.05, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        className="bg-orange-500 px-2 py-0.5 rounded text-[10px] font-semibold text-white ml-2 flex-shrink-0"
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
    </>
  );
}
