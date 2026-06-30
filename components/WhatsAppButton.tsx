"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const whatsappNumber = "919235818178"; // Replace with your WhatsApp number (country code + number)
  const whatsappMessage = "Hello! I would like to inquire about RM Suncity Public School.";

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 z-40 flex items-center justify-center"
      style={{ zIndex: 9998 }}
      aria-label="Contact us on WhatsApp"
      title="Contact us on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </button>
  );
}
