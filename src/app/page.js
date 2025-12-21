'use client';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { DiVisualstudio } from 'react-icons/di';
import SocialButtons from './components/socialbutton';
import { FaHtml5, FaCss3Alt, FaPhp, FaJs, FaLaravel, FaNodeJs, FaReact, FaBootstrap } from 'react-icons/fa';
import { DiNetbeans } from 'react-icons/di';
import { SiTailwindcss , SiUnity , SiAndroidstudio } from 'react-icons/si';
import './globals.css';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('tech');
  const aboutRef = useRef(null);
  const [aboutVisible, setAboutVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (aboutRef.current) {
        const rect = aboutRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setAboutVisible(isVisible);
      }
      setScrollY(window.scrollY); // ini penting supaya re-render jalan terus
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const techStack = [
    { name: 'HTML', icon: <FaHtml5 className="text-orange-500" /> },
    { name: 'CSS', icon: <FaCss3Alt className="text-blue-500" /> },
    { name: 'PHP', icon: <FaPhp className="text-purple-500" /> },
    { name: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
    { name: 'Laravel', icon: <FaLaravel className="text-red-600" /> },
    { name: 'NodeJS', icon: <FaNodeJs className="text-green-600" /> },
    { name: 'Tailwind', icon: <SiTailwindcss className="text-cyan-400" /> },
    { name: 'Bootstrap', icon: <FaBootstrap className="text-indigo-400" /> },
    { name: 'ReactJS', icon: <FaReact className="text-blue-400" /> },
  ];

  const tools = [
    { name: 'VS Code', icon: <DiVisualstudio className="text-blue-500" /> },
    { name: 'Netbeans', icon: <DiNetbeans className="text-yellow-500" /> },
    { name: 'Android Studio', icon: <SiAndroidstudio className="text-green-400" /> },
    { name: 'Unity', icon: <SiUnity className="text-gray-300" /> },
  ];

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
        <motion.section
          id="about"
          ref={aboutRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: aboutVisible ? 1 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="min-h-screen flex flex-col items-center px-6 pt-16 gap-6"
        >
        <h1 className="text-4xl font-bold mb-6">About Me</h1>

        {/* Gambar kecil dan deskripsi */}
        <div className="flex flex-col md:flex-row items-center gap-6 max-w-4xl w-full">
          <Image src="/me3.jpeg" alt="Profile" width={300} height={250} className="rounded-3xl shadow-md" />
          <p className="text-lg text-gray-300 leading-relaxed text-center md:text-left">
            I’m a passionate Fullstack Developer with experience building both front-end and back-end applications. I love transforming ideas into scalable and elegant solutions. From designing sleek UI components to building robust APIs, I thrive in every layer of web development.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 text-center">
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-4 py-2 rounded transition-all duration-300 
                ${activeTab === 'tech' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white'}`}
            >
              Tech Stack
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`px-4 py-2 rounded transition-all duration-300 
                ${activeTab === 'tools' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white'}`}
            >
              Tools
            </button>
          </div>
          {/* Grid Items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            {(activeTab === 'tech' ? techStack : tools).map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2 }}
                className="flex flex-col items-center border border-y-white p-4 rounded-xl w-30 h-30 justify-center"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-sm text-gray-200">{item.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Portfolio Section */}
      <section id="portfolio" className="min-h-screen flex items-center justify-center p-6">
        <h1 className="text-4xl font-bold">My Portfolio</h1>
      </section>
    </div>
  );
}
