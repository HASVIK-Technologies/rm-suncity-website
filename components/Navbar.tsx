"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { TfiEmail } from "react-icons/tfi";
import { PiPhone } from "react-icons/pi";
import { FaFacebook, FaSignOutAlt } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import LoginPopup from "./LoginPopup";
import toast from "react-hot-toast";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<{ name: string; profileImage: string | null } | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const loggedIn = typeof window !== "undefined" && localStorage.getItem("adminLoggedIn") === "true";
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
      <div className="bg-white border-b hidden md:flex">
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
                            {userProfile?.name ? getInitials(userProfile.name) : "AD"}
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
                            {userProfile?.name ? getInitials(userProfile.name) : "AD"}
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
                  onClick={() => setLoginOpen(true)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Login
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
                        setLoginOpen(true);
                        setMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Login
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
          const loggedIn = typeof window !== "undefined" && localStorage.getItem("adminLoggedIn") === "true";
          setIsLoggedIn(loggedIn);
        }} 
      />
    </>
  );
}
