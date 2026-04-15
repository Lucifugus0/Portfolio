/**
 * ============================================================
 * SPOTLIGHT EFFECT COMPONENT
 * ============================================================
 *
 * Component untuk menampilkan efek cahaya radial
 * yang mengikuti posisi mouse
 *
 * KONSEP YANG DIPELAJARI:
 * -----------------------
 * 1. Mouse event tracking
 * 2. Radial gradient CSS
 * 3. useRef untuk DOM reference
 * 4. Motion values untuk smooth animation
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * SPOTLIGHT EFFECT COMPONENT
 * --------------------------
 *
 * PROPS:
 * ------
 * @param {string} className - Class tambahan untuk container
 * @param {string} color - Warna spotlight (default: neutral)
 * @param {number} size - Ukuran spotlight dalam px (default: 400)
 */
const SpotlightEffect = ({ className = '', color = 'neutral', size = 400 }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values untuk posisi mouse (dengan spring untuk smooth movement)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring config untuk smooth following
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  // Color variants
  const colorMap = {
    neutral: 'rgba(0, 0, 0, 0.03)',
    blue: 'rgba(59, 130, 246, 0.05)',
    purple: 'rgba(139, 92, 246, 0.05)',
  };

  const spotlightColor = colorMap[color] || colorMap.neutral;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x,
          y,
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default SpotlightEffect;
