/**
 * ============================================================
 * NAVBAR COMPONENT
 * ============================================================
 *
 * Component navigasi yang fixed di atas halaman
 * Dengan animasi hover underline, active indicator, dan logo animation
 *
 * KONSEP YANG DIPELAJARI:
 * -----------------------
 * 1. useState untuk state management
 * 2. useEffect untuk side effects (scroll listener)
 * 3. Event listeners di React
 * 4. AnimatePresence untuk animasi mount/unmount
 * 5. Hover underline animation dengan pseudo-element
 */
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section berdasarkan scroll position
      const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (section) => {
    const target = document.getElementById(section);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
    setMobileMenuOpen(false);
    setActiveSection(section);
  };

  const navItems = [
    { label: 'Personal', section: 'about' },
    { label: 'Services', section: 'services' },
    { label: 'Portfolio', section: 'portfolio' },
    { label: 'About', section: 'contact' },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md ${
          scrolled ? 'shadow-lg' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* LOGO dengan animasi */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleScrollTo('home')}
          >
            <motion.div
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-black overflow-hidden"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-bold text-sm text-white">V</span>
            </motion.div>
            <motion.span
              className="font-semibold text-lg text-neutral-900"
              initial={{ opacity: 1 }}
              whileHover={{ letterSpacing: '0.05em' }}
              transition={{ duration: 0.2 }}
            >
              Vincent
            </motion.span>
          </motion.div>

          {/* DESKTOP NAVIGATION dengan hover underline */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.li
                key={index}
                className="relative cursor-pointer text-sm font-medium transition-colors group"
                onClick={() => handleScrollTo(item.section)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {/* Text */}
                <span
                  className={`${
                    activeSection === item.section
                      ? 'text-neutral-900'
                      : 'text-neutral-600 group-hover:text-neutral-900'
                  } transition-colors`}
                >
                  {item.label}
                </span>

                {/* Underline animation */}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-neutral-900"
                  initial={{ width: 0 }}
                  animate={{
                    width: activeSection === item.section ? '100%' : 0,
                  }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </motion.li>
            ))}
          </ul>

          {/* CTA BUTTON dengan glow effect */}
          <motion.button
            className="hidden md:block px-5 py-2 rounded-full text-sm font-medium bg-neutral-900 text-white relative overflow-hidden group"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleScrollTo('contact')}
          >
            {/* Shimmer effect */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">Hire Me</span>
          </motion.button>

          {/* HAMBURGER BUTTON dengan animasi */}
          <motion.button
            className="md:hidden text-neutral-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* MOBILE MENU dengan stagger animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white pt-20"
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="flex flex-col items-center gap-8 p-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  className={`text-2xl font-medium ${
                    activeSection === item.section
                      ? 'text-neutral-900'
                      : 'text-neutral-600'
                  }`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.1, x: 10 }}
                  onClick={() => handleScrollTo(item.section)}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                className="mt-4 px-8 py-3 bg-neutral-900 text-white rounded-full text-lg font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScrollTo('contact')}
              >
                Hire Me
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
