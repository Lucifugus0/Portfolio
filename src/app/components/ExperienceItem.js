/**
 * ============================================================
 * EXPERIENCE ITEM COMPONENT
 * ============================================================
 *
 * Component ini menampilkan satu item pengalaman kerja/pendidikan
 * dengan layout timeline (role/company di kiri, tahun di kanan)
 *
 * KONSEP YANG DIPELAJARI:
 * -----------------------
 * 1. whileInView - Animasi yang trigger saat element masuk viewport
 * 2. viewport: { once: true } - Animasi hanya berjalan sekali
 * 3. Conditional rendering dengan && operator
 * 4. Boolean props (isLast)
 */
'use client';

import { motion } from 'framer-motion';

/**
 * EXPERIENCE ITEM COMPONENT
 * -------------------------
 *
 * PROPS:
 * ------
 * @param {string} role - Posisi/jabatan (contoh: "Frontend Developer")
 * @param {string} company - Nama perusahaan/institusi
 * @param {string} description - Deskripsi tugas/tanggung jawab (optional)
 * @param {string} years - Periode kerja (contoh: "2023 - 2024")
 * @param {boolean} isLast - Apakah ini item terakhir? (untuk menghilangkan border)
 */
const ExperienceItem = ({ role, company, description, years, isLast = false }) => {
  return (
    /**
     * MOTION.DIV dengan whileInView
     * -----------------------------
     *
     * initial={{ opacity: 0, y: 20 }}
     * - State awal: tidak terlihat (opacity 0) dan 20px di bawah posisi seharusnya
     *
     * whileInView={{ opacity: 1, y: 0 }}
     * - Saat masuk viewport: terlihat penuh dan di posisi normal
     *
     * viewport={{ once: true }}
     * - Animasi hanya berjalan sekali (tidak replay saat scroll balik)
     *
     * PERBEDAAN whileInView vs animate:
     * - animate: Langsung berjalan saat component mount
     * - whileInView: Berjalan saat element terlihat di layar
     *
     * CONDITIONAL BORDER
     * ------------------
     * ${!isLast ? 'border-b border-neutral-200' : ''}
     *
     * !isLast = NOT isLast (kebalikan dari isLast)
     * - Jika BUKAN item terakhir, tambahkan border bawah
     * - Jika item terakhir, tidak ada border
     *
     * Ini membuat item terakhir tidak punya garis di bawahnya
     */
    <motion.div
      className={`flex flex-col md:flex-row md:items-start gap-4 md:gap-8 py-6 ${!isLast ? 'border-b border-neutral-200' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/**
       * LEFT SIDE - Role & Company
       * --------------------------
       * flex-1 = Mengambil semua space yang tersedia
       */}
      <div className="flex-1">
        {/* Role/Position - Text paling prominent */}
        <h3 className="text-lg font-semibold text-neutral-900">{role}</h3>

        {/* Company Name - Secondary text */}
        <p className="text-sm text-neutral-500 mt-1">{company}</p>

        {/**
         * CONDITIONAL RENDERING dengan &&
         * --------------------------------
         *
         * {description && (...)}
         *
         * Ini adalah "short-circuit evaluation"
         * - Jika description ada (truthy), render element di dalam ()
         * - Jika description tidak ada/null/undefined (falsy), tidak render apa-apa
         *
         * Sama dengan:
         * if (description) {
         *   return <p>...</p>
         * }
         *
         * Ini berguna untuk optional content yang mungkin tidak selalu ada
         */}
        {description && (
          <p className="text-sm text-neutral-600 mt-2 max-w-lg">{description}</p>
        )}
      </div>

      {/**
       * RIGHT SIDE - Years
       * ------------------
       * text-right = Text rata kanan
       * text-2xl md:text-3xl = Responsive font size
       *   - Mobile: 1.5rem
       *   - Desktop (md:): 1.875rem
       * font-light = Font weight 300 (tipis, elegant)
       * text-neutral-400 = Warna abu-abu muda
       */}
      <div className="text-right">
        <span className="text-2xl md:text-3xl font-light text-neutral-400">{years}</span>
      </div>
    </motion.div>
  );
};

export default ExperienceItem;
