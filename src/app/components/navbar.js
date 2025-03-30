'use client';

import { motion } from 'framer-motion';

const Navbar = () => {
  const handleScroll = (section) => {
    const target = document.getElementById(section);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60, // Mengurangi tinggi navbar
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full text-orange-500 py-4 px-6 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <motion.p 
          className="text-xl font-bold cursor-pointer"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          onClick={() => handleScroll('home')}
        >
          Vincent Muliadi
        </motion.p>
        <ul className="flex space-x-6">
          {['home', 'about', 'portfolio'].map((section, index) => (
            <motion.li 
              key={index} 
              whileHover={{ scale: 1.1 }} 
              transition={{ duration: 0.2 }}
              className="relative cursor-pointer"
              onClick={() => handleScroll(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
