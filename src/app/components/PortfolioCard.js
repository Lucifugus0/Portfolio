/**
 * ============================================================
 * PORTFOLIO CARD COMPONENT
 * ============================================================
 *
 * Component ini menampilkan satu card portfolio/project
 * dengan efek hover yang menampilkan informasi project
 * DAN auto-slideshow gambar dengan efek fade
 *
 * KONSEP YANG DIPELAJARI:
 * -----------------------
 * 1. Next.js Image component dengan fill property
 * 2. Hover animations dengan Framer Motion
 * 3. CSS transitions untuk smooth effects
 * 4. Overlay gradients untuk readability
 * 5. useEffect untuk auto-slideshow dengan interval
 * 6. AnimatePresence untuk animasi fade antar gambar
 */
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/**
 * PORTFOLIO CARD COMPONENT
 * ------------------------
 *
 * PROPS:
 * ------
 * @param {string} title - Nama project
 * @param {string} subtitle - Kategori/tipe project
 * @param {string|null} thumbnail - Path ke gambar thumbnail (fallback jika images kosong)
 * @param {string[]} images - Array gambar untuk slideshow
 * @param {number} slideDelay - Delay tambahan sebelum mulai slideshow (untuk stagger effect)
 * @param {string} className - Class CSS tambahan dari parent
 */
const PortfolioCard = ({
  title,
  subtitle,
  thumbnail,
  images = [],
  slideDelay = 0,
  className = ''
}) => {
  /**
   * useState untuk Current Image Index
   * -----------------------------------
   * Menyimpan index gambar yang sedang ditampilkan
   */
  const [currentIndex, setCurrentIndex] = useState(0);

  // Gunakan images jika ada, atau buat array dari thumbnail
  const imageList = images && images.length > 0
    ? images
    : (thumbnail ? [thumbnail] : []);

  /**
   * useEffect untuk Auto-Slideshow
   * -------------------------------
   * setInterval = Menjalankan fungsi berulang setiap X milidetik
   *
   * Interval: 4000-6000ms (4-6 detik) + slideDelay untuk stagger
   * Setiap card punya delay berbeda agar tidak sinkron
   */
  useEffect(() => {
    // Hanya jalankan jika ada lebih dari 1 gambar
    if (imageList.length <= 1) return;

    // Random interval antara 4-6 detik
    const baseInterval = 4000 + Math.random() * 2000; // 4000-6000ms

    // Delay awal sebelum mulai slideshow (untuk stagger effect antar card)
    const initialDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % imageList.length);
      }, baseInterval);

      // Cleanup interval saat component unmount
      return () => clearInterval(interval);
    }, slideDelay);

    // Cleanup timeout saat component unmount
    return () => clearTimeout(initialDelay);
  }, [imageList.length, slideDelay]);

  return (
    /**
     * MOTION.DIV - Card Container
     * ---------------------------
     *
     * relative = Position relative untuk absolute children
     * overflow-hidden = Menyembunyikan content yang overflow (penting untuk hover effect)
     *
     * group = Menandai element sebagai parent untuk group-hover
     * cursor-pointer = Cursor berubah jadi pointer saat hover
     *
     * whileHover={{ scale: 1.02 }} = Card membesar sedikit saat hover
     */
    <motion.div
      className={`relative overflow-hidden rounded-2xl bg-neutral-100 group cursor-pointer ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* IMAGE CONTAINER */}
      <div className="relative w-full h-full min-h-[250px]">
        {imageList.length > 0 ? (
          /**
           * AnimatePresence untuk Fade Transition
           * --------------------------------------
           * mode="wait" = Tunggu animasi exit selesai sebelum animasi enter
           *
           * Setiap gambar punya key unik (currentIndex)
           * Saat key berubah, AnimatePresence akan:
           * 1. Animasi exit gambar lama (opacity 0)
           * 2. Animasi enter gambar baru (opacity 1)
           */
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={imageList[currentIndex]}
                alt={`${title} - Image ${currentIndex + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          /**
           * PLACEHOLDER GRADIENT
           * --------------------
           * Jika tidak ada image, tampilkan gradient sebagai placeholder
           */
          <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300" />
        )}

        {/* Image Counter Indicator (jika ada lebih dari 1 gambar) */}
        {imageList.length > 1 && (
          <div className="absolute top-3 right-3 flex gap-1 z-10">
            {imageList.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white w-4'
                    : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/**
         * OVERLAY GRADIENT
         * ----------------
         * Muncul saat hover untuk membuat text lebih mudah dibaca
         */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/**
         * TEXT CONTENT (Muncul saat hover)
         * --------------------------------
         * Slide up dari bawah saat hover
         */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {/* Subtitle - kategori project */}
          <p className="text-white/80 text-sm mb-1">{subtitle}</p>
          {/* Title - nama project */}
          <h3 className="text-white text-xl font-semibold">{title}</h3>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
