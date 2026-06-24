/**
 * ============================================================
 * PORTFOLIO PAGE - Vincent Muliadi
 * ============================================================
 *
 * FILE INI ADALAH HALAMAN UTAMA PORTFOLIO ANDA
 *
 * KONSEP PENTING REACT:
 * ---------------------
 * 1. COMPONENT: Blok kode yang bisa dipakai ulang (seperti fungsi di PHP)
 * 2. JSX: Sintaks yang mirip HTML tapi di dalam JavaScript
 * 3. STATE: Data yang bisa berubah dan membuat UI ter-update otomatis
 * 4. PROPS: Data yang dikirim dari parent ke child component
 * 5. HOOKS: Fungsi khusus React (useState, useEffect, useRef)
 *
 * 'use client' = Memberitahu Next.js bahwa file ini berjalan di browser (client-side)
 * Tanpa ini, kode akan berjalan di server dan tidak bisa pakai useState, useEffect, dll
 */
'use client';

/**
 * IMPORT STATEMENTS
 * -----------------
 * Import adalah cara mengambil kode dari file/library lain
 * Mirip seperti "include" atau "require" di PHP
 */
// useRef: Untuk mengakses DOM element secara langsung
// useState: Untuk menyimpan data yang bisa berubah (state)
import { useRef, useState } from 'react';

// Image dari Next.js = Optimasi gambar otomatis (lazy loading, resize, dll)
import Image from 'next/image';

// motion dari Framer Motion = Library untuk animasi yang smooth
// AnimatePresence = Untuk animasi saat element muncul/hilang
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Import icon dari react-icons (seperti Font Awesome tapi untuk React)
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp, FaArrowRight, FaQuoteLeft, FaGooglePlay, FaAppStoreIos, FaFigma } from 'react-icons/fa';
import { FaReact, FaNodeJs, FaLaravel } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiMongodb, SiPostgresql, SiFigma, SiFlutter, SiDart, SiMysql } from 'react-icons/si';
import { HiOutlineCode, HiOutlineDesktopComputer, HiOutlineDatabase, HiOutlineCog } from 'react-icons/hi';

// Import component yang sudah kita buat
import Marquee from './components/Marquee';
import ServiceCard from './components/ServiceCard';
import ExperienceItem from './components/ExperienceItem';
import PortfolioCard from './components/PortfolioCard';
import PortfolioModal from './components/PortfolioModal';

// Import animasi components baru
import AnimatedCounter from './components/AnimatedCounter';
import FloatingParticles from './components/FloatingParticles';
import SpotlightEffect from './components/SpotlightEffect';
import { TypingText, WordReveal } from './components/AnimatedText';

/**
 * ============================================================
 * DATA UNTUK PORTFOLIO
 * ============================================================
 *
 * Dalam React, kita biasanya menyimpan data dalam array/object
 * lalu me-render menggunakan .map() untuk loop
 *
 * Ini lebih bersih daripada hardcode satu-satu di HTML
 */

// Data untuk section Services
// Setiap object mewakili satu card service
// Card putih yang berubah hitam saat hover
const services = [
  {
    title: 'Frontend Development',
    description: 'Building responsive and interactive user interfaces using React, Next.js, and modern CSS frameworks.',
  },
  {
    title: 'Backend Development',
    description: 'Creating robust server-side applications and RESTful APIs using Node.js, Laravel, and Express.',
  },
  {
    title: 'Database Design',
    description: 'Designing efficient database schemas and optimizing queries for MySQL, PostgreSQL, and MongoDB.',
  },
  {
    title: 'AI Engineering',
    description: 'Integrating intelligent features like LLMs, automation, and smart workflows to make applications think, adapt, and work smarter.',
  },
];

// Data untuk section Experience
// GANTI DATA INI dengan pengalaman Anda yang sebenarnya
const experiences = [
  {
    role: 'Computer Science Student',
    company: 'Universitas Bunda Mulia — Bachelor of Informatics, Artificial Intelligence Specialization',
    description: 'Studying software development, algorithms, and computer systems while building practical projects.',
    years: 'September 2022 - Now',
  },
  {
    role: 'Fullstack Developer', // GANTI dengan posisi Anda
    company: 'PT Tri Solusi Neo Optima (TSNO)', // GANTI dengan nama perusahaan
    description: 'Developed mobile applications using modern technologies and collaborated with cross-functional teams.',
    years: 'January 2025 - June 2026', // GANTI dengan tahun yang benar
  },
];

// Data untuk section Portfolio
// GANTI dengan project Anda yang sebenarnya
// Struktur baru: multiple images (karousel), deskripsi lengkap, dan links
const portfolioItems = [
  {
    // PROYEK 1: Ulin Mahoni Apps - Full-stack (Mobile, Web/Backend API, Admin Panel)
    title: 'Ulin Mahoni',
    subtitle: 'Full-Stack Development',
    thumbnail: '/assets/images/UlinMahoni/Mobile/M1.jpg',
    images: [
      '/assets/images/UlinMahoni/Mobile/M1.jpg',
      '/assets/images/UlinMahoni/Mobile/M2.jpg',
      '/assets/images/UlinMahoni/Web/Web1.png',
      '/assets/images/UlinMahoni/Admin/A1.jpg',
    ],
    description: 'Ekosistem digital untuk brand Ulin Mahoni yang menyediakan layanan penyewaan properti seperti kos, villa, dan apartemen. Saya terlibat end-to-end: dari prototyping UI/UX di Figma, aplikasi mobile untuk pelanggan, website dan REST API dengan Laravel, hingga admin panel untuk pengelolaan properti.',
    tech: [
      { name: 'Figma', icon: SiFigma },
      { name: 'Flutter', icon: SiFlutter },
      { name: 'Dart', icon: SiDart },
      { name: 'Laravel', icon: FaLaravel },
      { name: 'MySQL', icon: SiMysql },
    ],
    github: 'https://github.com/Lucifugus0/ulinmahoni.git',
    demo: null,
    // Multi-platform breakdown - ditampilkan sebagai tab di modal
    platforms: [
      {
        name: 'Ulin Mahoni - Mobile',
        images: [
          '/assets/images/UlinMahoni/Mobile/M1.jpg',
          '/assets/images/UlinMahoni/Mobile/M2.jpg',
          '/assets/images/UlinMahoni/Mobile/M3.jpg',
          '/assets/images/UlinMahoni/Mobile/M4.jpg',
          '/assets/images/UlinMahoni/Mobile/M5.jpg',
          '/assets/images/UlinMahoni/Mobile/M6.jpg',
          '/assets/images/UlinMahoni/Mobile/M7.jpg',
          '/assets/images/UlinMahoni/Mobile/M8.jpg',
          '/assets/images/UlinMahoni/Mobile/M9.jpg',
          '/assets/images/UlinMahoni/Mobile/M10.jpg',
        ],
        description: 'Aplikasi mobile untuk pelanggan dengan fitur pencarian properti, booking, riwayat transaksi, dan pembayaran online.',
        tech: [
          { name: 'Flutter', icon: SiFlutter },
          { name: 'Dart', icon: SiDart },
        ],
        github: 'https://github.com/Lucifugus0/ulinmahoni.git',
        playStore: 'https://play.google.com/store/apps/details?id=com.ulinmahoni.apps',
        appStore: 'https://apps.apple.com/id/app/ulin-mahoni/id6749755854',
      },
      {
        name: 'Ulin Mahoni - Web/Backend API',
        images: [
          '/assets/images/UlinMahoni/Web/Web1.png',
          '/assets/images/UlinMahoni/Web/Web2.png',
          '/assets/images/UlinMahoni/Web/Web3.png',
          '/assets/images/UlinMahoni/Web/Web4.png',
        ],
        description: 'Website dan REST API yang menjadi tulang punggung sistem, menangani autentikasi, manajemen data properti, booking, dan integrasi pembayaran.',
        tech: [
          { name: 'Laravel', icon: FaLaravel },
          { name: 'MySQL', icon: SiMysql },
        ],
        github: 'https://github.com/Lucifugus0/ulinmahoni.git',
      },
      {
        name: 'Ulin Mahoni - Admin Panel',
        images: [
          '/assets/images/UlinMahoni/Admin/A1.jpg',
          '/assets/images/UlinMahoni/Admin/A2.jpg',
          '/assets/images/UlinMahoni/Admin/A3.jpg',
          '/assets/images/UlinMahoni/Admin/A4.jpg',
          '/assets/images/UlinMahoni/Admin/A5.jpg',
          '/assets/images/UlinMahoni/Admin/A6.jpg',
        ],
        description: 'Panel admin untuk mengelola listing properti, memantau booking, dan mengatur transaksi pelanggan secara real-time.',
        tech: [
          { name: 'Laravel', icon: FaLaravel },
          { name: 'MySQL', icon: SiMysql },
        ],
        github: 'https://github.com/Lucifugus0/ulinmahoni.git',
      },
      {
        name: 'Ulin Mahoni - Figma Mobile',
        images: [
          '/assets/images/UlinMahoni/FigmaMobile/FM1.png',
          '/assets/images/UlinMahoni/FigmaMobile/FM2.png',
        ],
        description: 'Prototyping UI/UX untuk aplikasi mobile, mulai dari wireframe, user flow, hingga design system yang konsisten sebelum masuk ke tahap development.',
        tech: [
          { name: 'Figma', icon: SiFigma },
        ],
        figma: 'https://www.figma.com/design/5niRiia7CF1AAtcGLENn6u/Mock-Up-UlinMahoni?node-id=674-2342&t=hoN1hAsjEUbKb4C0-1',
        figmaPrototype: 'https://www.figma.com/proto/5niRiia7CF1AAtcGLENn6u/Mock-Up-UlinMahoni?node-id=1163-5050&p=f&t=UDmWknpgh4QDRVox-1&scaling=scale-down&content-scaling=fixed&page-id=674%3A2342&starting-point-node-id=674%3A2366',
      },
      {
        name: 'Ulin Mahoni - Figma Web',
        images: [
          '/assets/images/UlinMahoni/FigmaWeb/FW1.png',
          '/assets/images/UlinMahoni/FigmaWeb/FW2.png',
          '/assets/images/UlinMahoni/FigmaWeb/FW3.png',
        ],
        description: 'Prototyping UI/UX untuk website dan admin panel, mencakup layout, komponen, dan alur navigasi sebelum diimplementasikan ke kode.',
        tech: [
          { name: 'Figma', icon: SiFigma },
        ],
        figma: 'https://www.figma.com/design/5niRiia7CF1AAtcGLENn6u/Mock-Up-UlinMahoni?node-id=0-1&t=hoN1hAsjEUbKb4C0-1',
        figmaPrototype: 'https://www.figma.com/proto/5niRiia7CF1AAtcGLENn6u/Mock-Up-UlinMahoni?node-id=320-3451&p=f&t=cxh0zQY7PYfrOcur-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=426%3A2353',
      },
    ],
  },
  {
    // PROYEK 2: Wiguna Perkasa Network - Website Pemesanan Layanan WiFi
    title: 'Wiguna Perkasa Network',
    subtitle: 'Web Development',
    thumbnail: '/assets/images/Wiguna/W1.png',
    images: [
      '/assets/images/Wiguna/W1.png',
      '/assets/images/Wiguna/W2.png',
      '/assets/images/Wiguna/W3.png',
      '/assets/images/Wiguna/W4.png',
      '/assets/images/Wiguna/W5.png',
    ],
    description: 'Website untuk pemesanan layanan WiFi dari Wiguna Perkasa Network. Mencakup manajemen pelanggan, integrasi multi payment gateway (BCA, Mandiri, Dana, OVO, ShopeePay), generate QR code untuk pembayaran, serta panel admin untuk mengelola pesanan dan pengiriman pesan ke pelanggan. Dikerjakan secara solo dari awal hingga akhir menggunakan PHP vanilla dan Bootstrap.',
    tech: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    github: 'https://github.com/Lucifugus0/wiguna_perkasa.network.git',
    demo: null,
  },
  {
    // PROYEK 3: WHD (Warehouse Delivery/Distribution) - Mobile App
    title: 'WHD',
    subtitle: 'Mobile App Development',
    thumbnail: '/assets/images/WHD/WH1.jpg',
    images: [
      '/assets/images/WHD/WH1.jpg',
      '/assets/images/WHD/WH2.jpg',
      '/assets/images/WHD/WH3.jpg',
      '/assets/images/WHD/WH4.jpg',
      '/assets/images/WHD/WH5.jpg',
      '/assets/images/WHD/WH6.jpg',
    ],
    description: 'Aplikasi mobile Android untuk dokumentasi outbound kendaraan muatan di gudang PT. Dunia Kimia Jaya. Mencatat detail transaksi (nama pengirim, nomor kendaraan, info kontainer, dll), mewajibkan 9 foto berurutan dengan timestamp otomatis sebagai bukti, lalu menghasilkan laporan PDF terstruktur. Berjalan sepenuhnya offline dengan riwayat hingga 15 record yang bisa diedit, di-rename, dan dibagikan.',
    tech: [
      { name: 'Flutter', icon: SiFlutter },
      { name: 'Dart', icon: SiDart },
    ],
    github: 'https://github.com/Lucifugus0/WH-Documentation-Apps.git',
    demo: null,
  },
];

// Data statistik untuk About section
const stats = [
  { number: '+3', label: 'Projects Completed' },
  { number: '+5', label: 'Technologies Mastered' },
];

/**
 * ============================================================
 * MAIN COMPONENT - Home
 * ============================================================
 *
 * Ini adalah FUNCTION COMPONENT utama
 * Setiap halaman di Next.js adalah sebuah function yang return JSX
 *
 * export default = Membuat function ini bisa di-import di file lain
 */
export default function Home() {
  /**
   * useRef Hook
   * -----------
   * useRef digunakan untuk:
   * 1. Mengakses DOM element secara langsung (seperti document.getElementById)
   * 2. Menyimpan nilai yang tidak trigger re-render
   *
   * Cara pakai: tambahkan ref={namaRef} di JSX element
   */
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const experienceRef = useRef(null);
  const portfolioRef = useRef(null);

  /**
   * useState untuk Modal Portfolio
   * -------------------------------
   * selectedImage: Menyimpan data gambar yang sedang ditampilkan di modal
   * - null = Modal tertutup
   * - { image, title, subtitle } = Modal terbuka dengan data tersebut
   */
  const [selectedImage, setSelectedImage] = useState(null);

  /**
   * useInView Hook (dari Framer Motion)
   * ------------------------------------
   * Mendeteksi apakah element sedang terlihat di viewport (layar)
   *
   * once: true = Animasi hanya berjalan sekali (tidak ulang saat scroll balik)
   * margin: Jarak sebelum element dianggap "terlihat"
   */
  const aboutInView = useInView(aboutRef, { once: true, margin: '-100px' });
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const experienceInView = useInView(experienceRef, { once: true, margin: '-100px' });
  const portfolioInView = useInView(portfolioRef, { once: true, margin: '-100px' });

  /**
   * Animation Variants
   * ------------------
   * Framer Motion menggunakan "variants" untuk mendefinisikan state animasi
   *
   * hidden: State awal sebelum animasi
   * visible: State akhir setelah animasi
   *
   * Ini membuat kode lebih bersih dan reusable
   */
  // Enhanced fade in up dengan scale dan blur
  const fadeInUp = {
    hidden: { opacity: 0, y: 60, scale: 0.95, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom easing untuk smooth feel
      },
    },
  };

  // Stagger container dengan delay lebih dramatis
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay antar child element
        delayChildren: 0.1,
      },
    },
  };

  // Fade in from left
  const fadeInLeft = {
    hidden: { opacity: 0, x: -60, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Fade in from right
  const fadeInRight = {
    hidden: { opacity: 0, x: 60, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Scale in animation
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  /**
   * ============================================================
   * JSX RETURN
   * ============================================================
   *
   * JSX adalah sintaks yang mirip HTML di dalam JavaScript
   *
   * Perbedaan JSX dengan HTML:
   * - class → className
   * - for → htmlFor
   * - style="..." → style={{...}}
   * - Event: onclick → onClick
   * - Semua tag harus ditutup: <img /> bukan <img>
   *
   * {} = JavaScript expression di dalam JSX
   * Contoh: {nama}, {1 + 1}, {kondisi ? 'ya' : 'tidak'}
   */
  return (
    /**
     * Fragment (<> </>) atau div pembungkus
     * React component harus return satu parent element
     */
    <div className="bg-white min-h-screen">

      {/* ============================================================
          HERO SECTION
          ============================================================
          Section pertama yang dilihat pengunjung
          Desain: Typography besar + foto profil di samping
          DENGAN: Floating particles, Spotlight effect, Animated gradient
      */}
      <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden animated-gradient">
        {/* Floating Code Particles - Background decoration */}
        <FloatingParticles count={20} className="z-0" />

        {/* Spotlight Effect - Follows mouse */}
        <SpotlightEffect className="z-0" size={500} />

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT SIDE - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Heading dengan Word Reveal Animation */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-neutral-900 leading-none tracking-tight">
                <WordReveal text="Fullstack" delay={0.2} staggerDelay={0.05} />
                <br />
                <WordReveal text="Developer" delay={0.5} staggerDelay={0.05} />
              </h1>

              {/* Tagline dengan Typing Effect */}
              <p className="mt-6 text-lg text-neutral-600 max-w-md">
                Hi, I'm Vincent Muliadi. A Fullstack Developer
                <span className="text-neutral-900 font-medium">
                  {' '}<TypingText text="Turning Coffee into Code" speed={80} delay={1500} />
                </span>
              </p>

              {/* Social Links */}
              <div className="flex gap-4 mt-8">
                {/**
                 * Array.map() - Cara React untuk loop/iterasi
                 *
                 * Mirip foreach di PHP, tapi return JSX
                 *
                 * Key prop WAJIB ada saat mapping array ke elements
                 * Key harus unique untuk setiap item
                 */}
                {[
                  { icon: FaGithub, href: 'https://github.com/Lucifugus0', label: 'GitHub' },
                  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/vincent-muliadi-924157186/', label: 'LinkedIn' },
                  { icon: FaInstagram, href: 'https://www.instagram.com/vin_.m22/', label: 'Instagram' },
                  { icon: FaWhatsapp, href: 'https://wa.me/6285694608028', label: 'WhatsApp' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    className="social-icon-hero w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 transition-all duration-300"
                    whileHover={{ scale: 1.1, backgroundColor: '#171717', color: '#ffffff' }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* RIGHT SIDE - Profile Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
                {/*
                  Next.js Image Component
                  -----------------------
                  Keunggulan dibanding <img> biasa:
                  - Lazy loading otomatis
                  - Optimasi ukuran otomatis
                  - Placeholder blur saat loading
                  - Responsive images

                  fill = Image mengisi parent container
                  className="object-cover" = Seperti background-size: cover
                */}
                <Image
                  src="/assets/images/Me/me4.jpg"
                  alt="Vincent Muliadi"
                  fill
                  className="object-cover rounded-3xl"
                  priority // priority = Load gambar ini lebih dulu (untuk hero image)
                />

                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent rounded-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MARQUEE SECTION - Tech Stack Slider
          ============================================================
          Component terpisah di /components/Marquee.js
          Menampilkan logo tech stack yang bergerak otomatis
      */}
      <Marquee />

      {/* ============================================================
          ABOUT SECTION
          ============================================================
          Layout: Video/Image + Stats + Description
      */}
      <section id="about" className="py-24" ref={aboutRef}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Label - Tag kecil di atas judul */}
          <motion.span
            className="inline-block text-sm font-medium text-neutral-500 border border-neutral-300 rounded-full px-4 py-1 mb-6"
            initial={{ opacity: 0 }}
            animate={aboutInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left - Title and Description */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 leading-tight mb-6">
                Design has always been more than just a job - it's my passion.
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                As a fullstack developer, I transform ideas into elegant, scalable web applications.
                From designing intuitive user interfaces to building robust backend systems,
                I thrive in every layer of development. My goal is to create digital experiences
                that are not just functional, but delightful to use.
              </p>
            </motion.div>

            {/* Right - Video/Image with Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Profile Image Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 mb-8">
                <Image
                  src="/assets/images/Me/me1.jpeg"
                  alt="Vincent Muliadi"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Stats Grid dengan Animated Counter */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={aboutInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    {/* Animated Counter - Angka menghitung dari 0 */}
                    <AnimatedCounter
                      value={stat.number}
                      duration={2000}
                      className="text-5xl md:text-6xl font-light text-neutral-900"
                    />
                    <p className="text-sm text-neutral-500 mt-2">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SERVICES SECTION
          ============================================================
          Layout: Title di kiri + Grid cards di kanan
      */}
      <section id="services" className="py-24 bg-neutral-50" ref={servicesRef}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Section Info */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -40 }}
              animate={servicesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-medium text-neutral-500 border border-neutral-300 rounded-full px-4 py-1 mb-6">
                Services
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight mb-4">
                A Comprehensive look at what I offer and how I deliver
              </h2>
              <p className="text-neutral-600 mb-6">
                A comprehensive look at my services and how I can help bring your ideas to life.
              </p>

              {/* CTA Button */}
              <motion.button
                className="px-6 py-3 bg-neutral-900 text-white rounded-full text-sm font-medium inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Talk
                <FaArrowRight size={12} />
              </motion.button>
            </motion.div>

            {/* Right Column - Service Cards Grid */}
            <motion.div
              className="lg:col-span-2"
              variants={staggerContainer}
              initial="hidden"
              animate={servicesInView ? 'visible' : 'hidden'}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/**
                 * Rendering Service Cards
                 * -----------------------
                 * Loop melalui array services dan render ServiceCard component
                 *
                 * {...service} = Spread operator
                 * Sama dengan menulis: title={service.title} description={service.description} variant={service.variant}
                 */}
                {services.map((service, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <ServiceCard {...service} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          EXPERIENCE SECTION
          ============================================================
          Layout: Timeline dengan tahun di samping kanan
      */}
      <section id="experience" className="py-24" ref={experienceRef}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left - Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={experienceInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-medium text-neutral-500 border border-neutral-300 rounded-full px-4 py-1 mb-6">
                Experience
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight mb-4">
                A Yearly snapshot of my creative growth
              </h2>
              <p className="text-neutral-600">
                An annual summary that summarizes my creative journey and development throughout the years.
              </p>
            </motion.div>

            {/* Right - Experience List */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={experienceInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {experiences.map((exp, index) => (
                <ExperienceItem
                  key={index}
                  {...exp}
                  isLast={index === experiences.length - 1}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PORTFOLIO SECTION
          ============================================================
          Layout: Grid asimetris untuk visual interest
      */}
      <section id="portfolio" className="py-24 bg-neutral-50" ref={portfolioRef}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={portfolioInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className="inline-block text-sm font-medium text-neutral-500 border border-neutral-300 rounded-full px-4 py-1 mb-6">
                Portfolio
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight">
                Explore my portfolio of
                <br />
                creative solutions
              </h2>
            </div>
            <p className="text-neutral-600 mt-4 md:mt-0 max-w-sm">
              Explore my portfolio full of creative solutions and innovative projects.
            </p>
          </motion.div>

          {/* Portfolio Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate={portfolioInView ? 'visible' : 'hidden'}
          >
            {/**
             * Grid Layout dengan span
             * -----------------------
             * lg:col-span-2 = Mengambil 2 kolom pada layar besar
             * lg:row-span-2 = Mengambil 2 baris pada layar besar
             *
             * Ini membuat layout grid yang tidak simetris (lebih menarik secara visual)
             */}
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
                onClick={() => setSelectedImage(item)}
              >
                {/**
                 * slideDelay = Delay sebelum slideshow mulai (dalam ms)
                 * Setiap card punya delay berbeda (0, 1000, 2000, 3000ms)
                 * Ini membuat slideshow tidak sinkron - lebih natural
                 */}
                <PortfolioCard
                  {...item}
                  slideDelay={index * 1000}
                  className={index === 0 ? 'h-full min-h-[400px]' : 'min-h-[250px]'}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          FOOTER dengan Animasi
          ============================================================
      */}
      <footer className="py-12 bg-neutral-900 border-t border-neutral-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand dengan fade in */}
            <motion.div
              className="md:col-span-2"
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="flex items-center gap-2 mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="w-8 h-8 bg-white rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-neutral-900 font-bold text-sm">V</span>
                </motion.div>
                <span className="font-semibold text-lg text-white">Vincent</span>
              </motion.div>
              <p className="text-white text-sm max-w-xs">
                Fullstack Developer based in Indonesia, creating modern web applications
                with cutting-edge technologies.
              </p>

              {/* Social Links dengan hover animation */}
              <div className="flex gap-4 mt-6">
                {[
                  { icon: FaGithub, href: 'https://github.com/Lucifugus0' },
                  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/vincent-muliadi-924157186/' },
                  { icon: FaInstagram, href: 'https://www.instagram.com/vin_.m22/' },
                  { icon: FaWhatsapp, href: 'https://wa.me/6285694608028' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#ffffff' }}
                    className="hover:opacity-70 transition-opacity"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={22} style={{ color: '#ffffff' }} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links dengan stagger animation */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4" style={{ color: '#ffffff' }}>Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((link, index) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.a
                      href={`#${link.toLowerCase()}`}
                      className="hover:opacity-70 transition-opacity text-sm inline-block"
                      style={{ color: '#ffffff' }}
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info dengan stagger animation */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-white text-sm">
                {['Jakarta, Indonesia', 'vincentmuliadi777@gmail.com', '+62 856-9460-8028'].map((info, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {info}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Copyright dengan fade in */}
          <motion.div
            className="mt-12 pt-8 border-t border-neutral-700 text-center text-white text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p>All rights reserved © Vincent Muliadi {new Date().getFullYear()}</p>
          </motion.div>
        </div>
      </footer>

      {/* ============================================================
          PORTFOLIO MODAL
          ============================================================
          Modal popup dengan karousel gambar dan detail proyek
          Component terpisah di /components/PortfolioModal.js
      */}
      <AnimatePresence>
        {selectedImage && (
          <PortfolioModal
            project={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
