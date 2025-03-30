'use client';
<<<<<<< HEAD
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Animasi Teks dari Kiri ke Tengah */}
        <motion.div initial={{ x: '-50vw', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 80, damping: 15, duration: 1 }} viewport={{ once: true }}>
          <h2 className="text-xl font-medium text-gray-300">Hi</h2>
          <h1 className="text-4xl font-bold mt-2">
            I'm <span className="text-orange-500">Vincent Muliadi</span>
            <br /> a Frontend Developer
          </h1>
          <p className="text-gray-400 mt-4">Saya adalah Frontend Developer yang berfokus pada desain interaktif, responsif, dan performa optimal, siap menciptakan solusi digital inovatif dengan pengalaman pengguna yang luar biasa</p>
          <div className="mt-6 flex gap-4">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="px-6 py-2 bg-white text-black font-semibold rounded-lg">
              Hire Me
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg">
              Experience
            </motion.button>
          </div>
        </motion.div>

        {/* Animasi Gambar dari Kanan ke Tengah */}
        <motion.div className="flex justify-center" initial={{ x: '50vw', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 80, damping: 15, duration: 1, delay: 0.3 }} viewport={{ once: true }}>
          <Image src="/assets/me3.jpeg" alt="Profile" width={320} height={320} className="rounded-3xl shadow-lg border-4 border-gray-700" />
        </motion.div>
      </div> 
    </div>
=======
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SocialButtons from './components/socialbutton';
import './globals.css';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="text-white">
      {/* Home Section */}
      <section id="home" className="flex items-center justify-center min-h-screen p-6 overflow-hidden">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Animasi Teks */}
          <motion.div 
            initial={{ x: '-100vw', opacity: 0 }} 
            animate={{ x: 20 - scrollY * 1.4, opacity: 1 }} 
            transition={{ type: 'spring', stiffness: 80, damping: 15, duration: 2 }}>
            <h2 className="text-xl font-medium text-gray-300">Hello World;</h2>
            <h1 className="text-4xl font-bold mt-2">
              I'm <span className="text-orange-500">Vincent Muliadi</span>
              <br /> a Fullstack Developer
            </h1>
            <h2 className="text-xl font-medium mt-5 text-gray-300">Welcome to my portfolio website</h2>
            <div className="mt-6 flex gap-4">
              <SocialButtons />
            </div>
          </motion.div>

          {/* Animasi Gambar */}
          <motion.div 
            className="flex justify-center" 
            initial={{ x: '100vw', opacity: 0 }} 
            animate={{ x: -20 + scrollY * 1.4, opacity: 1 }} 
            transition={{ type: 'spring', stiffness: 80, damping: 15, duration: 2 }}>
            <Image src="/me3.jpeg" alt="Profile" width={300} height={250} className="rounded-3xl shadow-lg" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center p-6">
        <h1 className="text-4xl font-bold">About Me</h1>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="min-h-screen flex items-center justify-center p-6">
        <h1 className="text-4xl font-bold">My Portfolio</h1>
      </section>
      </div>
>>>>>>> recovery-branch
  );
}
