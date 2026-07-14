"use client";

import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaArrowUp,
  FaRegImage,
  FaPaintBrush,
  FaTheaterMasks,
  FaBasketballBall,
  FaEye,
  FaArrowRight,
} from "react-icons/fa";
import {
  BiChevronLeft,
  BiChevronRight,
  BiX,
} from "react-icons/bi";

// Activity data configuration
const activityConfig = {
  "Art and Craft": {
    title: "Art & Craft",
    icon: FaPaintBrush,
    description:
      "Students express their imagination through drawing, painting, sketching, clay modelling, and creative craft activities that enhance artistic skills and creativity.",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    textColor: "text-pink-600",
  },
  Culture: {
    title: "Culture",
    icon: FaTheaterMasks,
    description:
      "Our cultural programs celebrate India's rich traditions through dance, music, drama, festivals, and stage performances while building confidence and teamwork.",
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
  },
  Sports: {
    title: "Sports",
    icon: FaBasketballBall,
    description:
      "We encourage students to participate in indoor and outdoor sports to improve physical fitness, discipline, leadership, teamwork, and sportsmanship.",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-600",
  },
};

// Generate image paths dynamically
const generateImages = (folder: string, count: number) => {
  const extension = folder === "Art and Craft" ? "anc" : folder === "Culture" ? "c" : "s";
  return Array.from({ length: count }, (_, i) => ({
    id: `${folder}-${i + 1}`,
    src: `/images/${folder}/${extension}${i + 1}.jpg`,
    alt: `${folder} activity ${i + 1}`,
    category: folder,
  }));
};

const allImages = [
  ...generateImages("Art and Craft", 10),
  ...generateImages("Culture", 10),
  ...generateImages("Sports", 8),
];

// Lightbox Component
// Lightbox Component - memoized for performance
const Lightbox = memo(({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: typeof allImages;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <BiX className="w-6 h-6 text-white" />
      </button>

      <button
        className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        <BiChevronLeft className="w-8 h-8 text-white" />
      </button>

      <button
        className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        <BiChevronRight className="w-8 h-8 text-white" />
      </button>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="max-w-5xl max-h-[85vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
        />
        <div className="text-center mt-4 text-white">
          <p className="text-lg font-medium">{images[currentIndex].category}</p>
          <p className="text-sm text-white/70">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
});

// Gallery Item Component - memoized for performance
const GalleryItem = memo(({
  image,
  onClick,
}: {
  image: (typeof allImages)[0];
  onClick: () => void;
}) => {
  const config = activityConfig[image.category as keyof typeof activityConfig];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg"
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${config.color} opacity-0 group-hover:opacity-70 transition-opacity duration-300`} />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
        <div className="flex items-center gap-2 mb-2">
          <config.icon className={`w-5 h-5 text-white`} />
          <span className="text-white/90 text-sm font-medium">{config.title}</span>
        </div>
        <p className="text-white text-lg font-semibold">{image.alt}</p>
      </div>

      {/* Hover Border */}
      <div className={`absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-colors duration-300`} />
    </motion.div>
  );
});

// Activity Section Component - memoized
const ActivitySection = memo(({
  category,
  images,
  onImageClick,
}: {
  category: string;
  images: typeof allImages;
  onImageClick: (image: (typeof allImages)[0], index: number) => void;
}) => {
  const config = activityConfig[category as keyof typeof activityConfig];
  const IconComponent = config.icon;

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center gap-3 px-6 py-3 ${config.bgColor} rounded-full mb-6`}>
            <IconComponent className={`w-6 h-6 ${config.textColor}`} />
            <span className={`font-semibold ${config.textColor}`}>{config.title}</span>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            {config.description}
          </p>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <GalleryItem
              key={image.id}
              image={image}
              onClick={() => onImageClick(image, allImages.indexOf(image))}
            />
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mt-10"
        >
          <button className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${config.color} text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1`}>
            View More {config.title} Activities
            <FaArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
});

// Floating Decorations - Static blur effects for performance
const FloatingDecorations = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute top-32 left-10 w-20 h-20 bg-orange-200/20 rounded-full blur-xl" />
    <div className="absolute top-64 right-20 w-32 h-32 bg-purple-200/20 rounded-full blur-xl" />
    <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-pink-200/20 rounded-full blur-xl" />
  </div>
);

// Back to Top Button - memoized
const BackToTop = memo(({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-40"
      >
        <FaArrowUp className="w-5 h-5" />
      </motion.button>
    )}
  </AnimatePresence>
));

// Main Component
export default function CoCurricularActivities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [filteredImages, setFilteredImages] = useState(allImages);

  const categories = ["All", ...Object.keys(activityConfig)];

  // Filter images based on search and category
  useEffect(() => {
    let result = allImages;

    if (activeFilter !== "All") {
      result = result.filter((img) => img.category === activeFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (img) =>
          img.alt.toLowerCase().includes(query) ||
          img.category.toLowerCase().includes(query)
      );
    }

    setFilteredImages(result);
  }, [searchQuery, activeFilter]);

  // Back to top visibility - optimized with requestAnimationFrame and passive listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowBackToTop(window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation functions - memoized with useCallback
  const openLightbox = useCallback((image: (typeof allImages)[0], index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

  // Keyboard navigation - optimized with useCallback
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage, closeLightbox]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-orange-50/30">
      <FloatingDecorations />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/creative.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full mb-8"
            >
              <FaRegImage className="w-5 h-5 text-orange-400" />
              <span className="text-white/90 font-medium">Gallery Overview</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Co-Curricular
              <span className="block bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Activities
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            >
              Learning goes beyond the classroom. Our co-curricular activities help
              students develop creativity, leadership, teamwork, discipline, confidence,
              and life skills.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-8 mt-12"
            >
              {[
                { value: "28+", label: "Activities" },
                { value: "3", label: "Categories" },
                { value: "500+", label: "Students" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Search and Filter Section */}
      <section className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-96">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaTimes className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              <FaFilter className="w-4 h-4 text-gray-400 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                    activeFilter === category
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Image Counter */}
          <div className="mt-3 text-sm text-gray-500">
            Showing {filteredImages.length} of {allImages.length} images
          </div>
        </div>
      </section>

      {/* Activity Sections */}
      {Object.keys(activityConfig).map((category) => (
        <ActivitySection
          key={category}
          category={category}
          images={filteredImages.filter((img) => img.category === category)}
          onImageClick={openLightbox}
        />
      ))}

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Join Our Activities Today!
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Every student has unique talents waiting to be discovered. Our co-curricular
              programs provide the perfect platform to explore and excel.
            </p>
            <button className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              Learn More About Admissions
            </button>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={filteredImages}
            currentIndex={currentImageIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>

      {/* Back to Top */}
      <BackToTop show={showBackToTop} />
    </main>
  );
}