/**
 * ============================================================
 * PORTFOLIO MODAL COMPONENT
 * ============================================================
 *
 * Modal popup untuk menampilkan detail proyek portfolio
 * dengan karousel gambar yang bisa di-swipe dan navigasi tombol
 *
 * KONSEP YANG DIPELAJARI:
 * -----------------------
 * 1. useState untuk tracking current slide
 * 2. Framer Motion AnimatePresence untuk animasi masuk/keluar
 * 3. Drag gesture untuk swipe karousel
 * 4. Conditional rendering untuk links
 */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaTimes, FaChevronLeft, FaChevronRight, FaGithub, FaExternalLinkAlt, FaGooglePlay, FaAppStoreIos } from 'react-icons/fa';

/**
 * PORTFOLIO MODAL COMPONENT
 * -------------------------
 *
 * PROPS:
 * ------
 * @param {object} project - Data proyek yang akan ditampilkan
 * @param {function} onClose - Fungsi untuk menutup modal
 */
const PortfolioModal = ({ project, onClose }) => {
  /**
   * useState untuk Current Slide Index
   * -----------------------------------
   * Menyimpan index gambar yang sedang ditampilkan dalam karousel
   * Default: 0 (gambar pertama)
   */
  const [currentIndex, setCurrentIndex] = useState(0);

  // Jika tidak ada project, jangan render apa-apa
  if (!project) return null;

  // Destructure data dari project
  const { title, subtitle, images, description, tech, github, demo, playStore, appStore } = project;

  // Gunakan array kosong jika images undefined
  const imageList = images || [];

  /**
   * Navigation Functions
   * --------------------
   * prevSlide: Pindah ke gambar sebelumnya (dengan loop ke terakhir jika di awal)
   * nextSlide: Pindah ke gambar selanjutnya (dengan loop ke awal jika di akhir)
   */
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  /**
   * Swipe Handler untuk Karousel
   * ----------------------------
   * Mendeteksi arah swipe dan pindah slide sesuai arah
   *
   * offset.x > 100 = Swipe ke kanan = Previous slide
   * offset.x < -100 = Swipe ke kiri = Next slide
   */
  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      prevSlide();
    } else if (info.offset.x < -100) {
      nextSlide();
    }
  };

  return (
    /**
     * BACKDROP / OVERLAY
     * ------------------
     * fixed inset-0 = Menutupi seluruh layar
     * z-50 = Di atas semua element lain
     * bg-black/80 = Background hitam dengan 80% opacity
     *
     * onClick pada backdrop akan menutup modal
     */
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* MODAL CONTENT */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden flex flex-col"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()} // Mencegah klik di modal menutup modal
      >
        {/* CLOSE BUTTON */}
        <button
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-900 hover:bg-white transition-colors shadow-lg"
          onClick={onClose}
        >
          <FaTimes size={18} />
        </button>

        {/* ============================================================
            CAROUSEL SECTION
            ============================================================ */}
        {imageList.length > 0 ? (
          <div className="relative aspect-video w-full bg-neutral-100 flex-shrink-0">
            {/* Image Container dengan Drag Gesture */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
              >
                <Image
                  src={imageList[currentIndex]}
                  alt={`${title} - Slide ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons - Hanya tampil jika ada lebih dari 1 gambar */}
            {imageList.length > 1 && (
              <>
                {/* Previous Button */}
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-900 hover:bg-white transition-colors shadow-lg"
                  onClick={prevSlide}
                >
                  <FaChevronLeft size={16} />
                </button>

                {/* Next Button */}
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-900 hover:bg-white transition-colors shadow-lg"
                  onClick={nextSlide}
                >
                  <FaChevronRight size={16} />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {imageList.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-white w-6'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                      onClick={() => setCurrentIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          /* Placeholder jika tidak ada gambar */
          <div className="relative aspect-video w-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center flex-shrink-0">
            <p className="text-neutral-500">No images available</p>
          </div>
        )}

        {/* ============================================================
            PROJECT INFO SECTION
            ============================================================ */}
        <div className="p-6 overflow-y-auto">
          {/* Subtitle & Title */}
          <p className="text-sm text-neutral-500 mb-1">{subtitle}</p>
          <h3 className="text-2xl font-semibold text-neutral-900 mb-4">{title}</h3>

          {/* Description */}
          {description && (
            <p className="text-neutral-600 leading-relaxed mb-6">{description}</p>
          )}

          {/* Tech Stack */}
          {tech && tech.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-neutral-900 mb-2">Tech Stack:</p>
              <div className="flex flex-wrap gap-2">
                {tech.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons (GitHub, Demo, Play Store, App Store) */}
          {(github || demo || playStore || appStore) && (
            <div className="flex flex-wrap gap-3">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                  <FaGithub size={16} />
                  View Code
                </a>
              )}
              {demo && (
                <a
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 text-neutral-900 rounded-full text-sm font-medium hover:bg-neutral-100 transition-colors"
                >
                  <FaExternalLinkAlt size={14} />
                  Live Demo
                </a>
              )}
              {playStore && (
                <a
                  href={playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <FaGooglePlay size={14} />
                  Play Store
                </a>
              )}
              {appStore && (
                <a
                  href={appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <FaAppStoreIos size={14} />
                  App Store
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PortfolioModal;
