/**
 * ============================================================
 * ANIMATED COUNTER COMPONENT
 * ============================================================
 *
 * Component untuk menampilkan angka yang menghitung naik
 * dari 0 ke nilai akhir dengan animasi smooth
 *
 * KONSEP YANG DIPELAJARI:
 * -----------------------
 * 1. useEffect untuk animasi berbasis waktu
 * 2. useInView untuk trigger saat masuk viewport
 * 3. requestAnimationFrame untuk animasi smooth
 * 4. Easing functions untuk efek natural
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Easing function - easeOutExpo
 * Memberikan efek cepat di awal, lambat di akhir
 */
const easeOutExpo = (t) => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

/**
 * ANIMATED COUNTER COMPONENT
 * --------------------------
 *
 * PROPS:
 * ------
 * @param {string} value - Nilai akhir (contoh: "+10", "50+", "100%")
 * @param {number} duration - Durasi animasi dalam ms (default: 2000)
 * @param {string} className - Class CSS tambahan
 */
const AnimatedCounter = ({ value, duration = 2000, className = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Extract number dan prefix/suffix dari value
  // Contoh: "+10" -> prefix: "+", number: 10, suffix: ""
  // Contoh: "50+" -> prefix: "", number: 50, suffix: "+"
  const extractNumber = (val) => {
    const match = val.match(/([^\d]*)(\d+)([^\d]*)/);
    if (match) {
      return {
        prefix: match[1] || '',
        number: parseInt(match[2], 10),
        suffix: match[3] || '',
      };
    }
    return { prefix: '', number: 0, suffix: '' };
  };

  const { prefix, number: targetNumber, suffix } = extractNumber(value);

  useEffect(() => {
    // Hanya animasi sekali dan saat masuk viewport
    if (!isInView || hasAnimated) return;

    setHasAnimated(true);

    let startTime = null;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Apply easing
      const easedProgress = easeOutExpo(progress);
      const currentCount = Math.floor(easedProgress * targetNumber);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, hasAnimated, targetNumber, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
