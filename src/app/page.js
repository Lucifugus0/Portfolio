'use client';
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
  );
}
