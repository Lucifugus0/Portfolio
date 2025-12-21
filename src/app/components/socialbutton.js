'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const SocialButtons = () => {
  return (
    <div className="flex gap-4 mt-4">
      <motion.a 
        href="https://github.com/Lucifugus0" 
        target="_blank" 
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }} 
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <FaGithub className="text-3xl hover:text-gray-400 transition-colors duration-200" />
      </motion.a>

      <motion.a 
        href="https://www.linkedin.com/in/vincent-muliadi-924157186/?locale=in_ID" 
        target="_blank" 
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }} 
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <FaLinkedin className="text-3xl hover:text-blue-500 transition-colors duration-200" />
      </motion.a>

      <motion.a 
        href="https://www.instagram.com/vincent_.m24/" 
        target="_blank" 
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }} 
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <FaInstagram className="text-3xl hover:text-pink-500 transition-colors duration-200" />
      </motion.a>
    </div>
  );
};

export default SocialButtons;
