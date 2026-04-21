/**
 * ============================================================
 * FLOATING PARTICLES COMPONENT
 * ============================================================
 *
 * Component untuk menampilkan simbol coding yang melayang
 * di background sebagai efek dekoratif
 *
 * KONSEP YANG DIPELAJARI:
 * -----------------------
 * 1. useMemo untuk optimasi (mencegah re-render berlebihan)
 * 2. CSS keyframes untuk animasi infinite
 * 3. Random positioning dan timing
 * 4. Absolute positioning dengan z-index
 */
'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * FLOATING PARTICLES COMPONENT
 * ----------------------------
 *
 * PROPS:
 * ------
 * @param {number} count - Jumlah particles (default: 15)
 * @param {string} className - Class tambahan untuk container
 */
const FloatingParticles = ({ count = 15, className = '' }) => {
  // Simbol coding yang akan ditampilkan
  const codeSymbols = ['<', '>', '/', '{', '}', '(', ')', ';', '//', '[]', '{}', '&&', '||', '=>', '++', '==='];

  /**
   * useMemo untuk generate particles sekali saja
   * Mencegah re-render berlebihan karena random values
   */
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
      x: Math.random() * 100, // Position X (0-100%)
      y: Math.random() * 100, // Position Y (0-100%)
      size: 12 + Math.random() * 16, // Font size (12-28px)
      duration: 15 + Math.random() * 20, // Animation duration (15-35s)
      delay: Math.random() * 10, // Animation delay (0-10s)
      opacity: 0.03 + Math.random() * 0.07, // Opacity (0.03-0.1)
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute font-mono text-neutral-900 select-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 15, 0, -15, 0],
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {particle.symbol}
        </motion.span>
      ))}
    </div>
  );
};

export default FloatingParticles;
