/**
 * ============================================================
 * MARQUEE COMPONENT
 * ============================================================
 *
 * Component ini menampilkan logo tech stack yang bergerak (sliding)
 * secara infinite/terus-menerus seperti ticker atau banner
 *
 * KONSEP YANG DIPELAJARI:
 * -----------------------
 * 1. Framer Motion animate dengan repeat infinite
 * 2. Array duplication untuk seamless loop
 * 3. CSS overflow hidden untuk masking
 */
'use client';

// Import motion untuk animasi
import { motion } from 'framer-motion';

// Import icons dari react-icons
// FaReact, FaNodeJs, FaLaravel = Icons dari Font Awesome
// Si... = Icons dari Simple Icons
import { FaReact, FaNodeJs, FaLaravel } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiMongodb, SiPostgresql } from 'react-icons/si';

/**
 * DATA TECH LOGOS
 * ---------------
 * Array berisi object dengan:
 * - name: Nama teknologi (untuk ditampilkan)
 * - icon: Component icon dari react-icons
 *
 * TIPS: Anda bisa menambah/mengubah teknologi sesuai skill Anda
 */
const techLogos = [
  { name: 'React', icon: FaReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'Laravel', icon: FaLaravel },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'PostgreSQL', icon: SiPostgresql },
];

/**
 * MARQUEE COMPONENT
 * -----------------
 * Functional component tanpa props (self-contained)
 */
const Marquee = () => {
  return (
    /**
     * CONTAINER UTAMA
     * ---------------
     * overflow-hidden = Menyembunyikan content yang keluar dari container
     * Ini penting agar animasi terlihat seperti "sliding" dari satu sisi
     *
     * border-y = Border atas dan bawah
     * py-6 = Padding vertical (atas-bawah)
     */
    <div className="w-full overflow-hidden border-y border-neutral-200 py-6 bg-white">
      {/**
       * MOTION.DIV - Container yang beranimasi
       * --------------------------------------
       *
       * animate={{ x: [0, -1920] }}
       * - x = Posisi horizontal
       * - [0, -1920] = Dari posisi 0 ke -1920px (bergerak ke kiri)
       *
       * transition={{
       *   x: {
       *     repeat: Infinity,    // Ulangi selamanya
       *     repeatType: 'loop',  // Tipe pengulangan: loop (reset ke awal)
       *     duration: 25,        // 25 detik untuk satu cycle
       *     ease: 'linear',      // Kecepatan konstan (tidak ease in/out)
       *   }
       * }}
       */}
      <motion.div
        className="flex gap-16 items-center"
        animate={{
          x: [0, -1920], // Bergerak 1920px ke kiri
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear',
          },
        }}
      >
        {/**
         * DUPLICATING ARRAY UNTUK SEAMLESS LOOP
         * -------------------------------------
         *
         * [...techLogos, ...techLogos, ...techLogos, ...techLogos]
         *
         * Spread operator (...) menggabungkan array
         * Kita duplicate 4x agar saat animasi reset, tidak terlihat "putus"
         *
         * Bayangkan seperti conveyor belt:
         * [A B C D] [A B C D] [A B C D] [A B C D]
         *
         * Saat kita scroll dari kiri ke kanan, ketika sampai di akhir,
         * kita reset ke awal dan karena item-nya sama, terlihat seamless
         */}
        {[...techLogos, ...techLogos, ...techLogos, ...techLogos].map((tech, index) => (
          /**
           * INDIVIDUAL TECH ITEM
           * --------------------
           * Setiap item menampilkan icon + nama
           *
           * key={index} - WAJIB ada saat mapping array
           * React membutuhkan key untuk tracking element mana yang berubah
           *
           * shrink-0 = Jangan menyusut (flex-shrink: 0)
           * Ini penting agar item tidak compressed saat space terbatas
           */
          <div
            key={index}
            className="flex items-center gap-3 text-neutral-600 hover:text-neutral-900 transition-colors shrink-0"
          >
            {/**
             * DYNAMIC COMPONENT RENDERING
             * ---------------------------
             *
             * tech.icon adalah sebuah Component (FaReact, SiNextdotjs, dll)
             * Di React, kita bisa menyimpan component dalam variable dan render seperti:
             *
             * <tech.icon /> atau React.createElement(tech.icon, props)
             *
             * className="text-2xl" = Ukuran icon (1.5rem)
             */}
            <tech.icon className="text-2xl" />
            {/**
             * whitespace-nowrap = Text tidak boleh wrap ke baris baru
             * Ini mencegah text terpotong saat container sempit
             */}
            <span className="text-lg font-medium whitespace-nowrap">{tech.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/**
 * EXPORT DEFAULT
 * --------------
 * Membuat component bisa di-import di file lain:
 *
 * import Marquee from './components/Marquee';
 * <Marquee />
 */
export default Marquee;
