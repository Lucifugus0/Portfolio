/**
 * ============================================================
 * SERVICE CARD COMPONENT
 * ============================================================
 *
 * Component ini menampilkan satu card service/layanan
 * Card putih dengan border, berubah hitam saat hover
 *
 * KONSEP YANG DIPELAJARI:
 * -----------------------
 * 1. Props - Menerima data dari parent component
 * 2. Tailwind group-hover - Mengubah child saat parent di-hover
 * 3. CSS transitions - Animasi smooth antara state
 */
'use client';

import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

/**
 * SERVICE CARD COMPONENT
 * ----------------------
 *
 * PROPS:
 * @param {string} title - Judul service
 * @param {string} description - Deskripsi service
 */
const ServiceCard = ({ title, description }) => {
  /**
   * HOVER EFFECT dengan Tailwind group-hover
   * -----------------------------------------
   *
   * 1. Parent div punya class "group"
   * 2. Child elements pakai "group-hover:..." untuk berubah saat parent di-hover
   *
   * Contoh:
   * - bg-white group-hover:bg-neutral-900 = Putih -> Hitam saat hover
   * - text-neutral-800 group-hover:text-white = Gelap -> Putih saat hover
   *
   * transition-all duration-300 = Animasi smooth 300ms untuk semua perubahan
   */
  return (
    <motion.div
      className="p-6 rounded-2xl border border-neutral-200 cursor-pointer group
                 bg-white hover:bg-neutral-900
                 transition-all duration-300"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* TITLE - Berubah dari hitam ke putih saat hover */}
      <h3 className="text-xl font-semibold mb-3 text-neutral-800 group-hover:text-white transition-colors duration-300">
        {title}
      </h3>

      {/* DESCRIPTION - Berubah dari abu ke abu terang saat hover */}
      <p className="text-sm mb-6 text-neutral-600 group-hover:text-neutral-400 transition-colors duration-300">
        {description}
      </p>

      {/* ARROW ICON - Berubah warna dan geser ke kanan saat hover */}
      <div className="flex items-center gap-2 text-sm font-medium text-neutral-800 group-hover:text-white transition-colors duration-300">
        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
