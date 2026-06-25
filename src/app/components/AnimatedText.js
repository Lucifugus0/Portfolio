/**
 * ============================================================
 * ANIMATED TEXT COMPONENT
 * ============================================================
 *
 * Component untuk berbagai animasi text:
 * - Typing Effect (seperti mesin ketik)
 * - Word-by-word reveal
 * - Character-by-character reveal
 *
 * KONSEP YANG DIPELAJARI:
 * -----------------------
 * 1. useState dan useEffect untuk animasi berbasis waktu
 * 2. setInterval untuk timing
 * 3. String manipulation (split, slice)
 * 4. Framer Motion stagger animations
 */
'use client';

import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * TYPING TEXT - Efek mesin ketik
 */
export const TypingText = ({
  text,
  speed = 100,
  delay = 0,
  className = '',
  cursor = true,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    // Delay sebelum mulai typing
    const startTimeout = setTimeout(() => {
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [isInView, text, speed, delay]);

  // Cursor blink effect
  useEffect(() => {
    if (!cursor) return;

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [cursor]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {cursor && (
        <span
          className={`inline-block w-0.5 h-[1em] bg-current ml-0.5 ${
            showCursor ? 'opacity-100' : 'opacity-0'
          } transition-opacity`}
        />
      )}
    </span>
  );
};

/**
 * WORD REVEAL - Setiap kata muncul satu per satu
 */
export const WordReveal = ({
  text,
  delay = 0,
  staggerDelay = 0.1,
  className = '',
}) => {
  const words = text.split(' ');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

/**
 * CHARACTER REVEAL - Setiap karakter muncul satu per satu
 */
export const CharacterReveal = ({
  text,
  delay = 0,
  staggerDelay = 0.03,
  className = '',
}) => {
  const characters = text.split('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

/**
 * GRADIENT TEXT ANIMATION - Text dengan gradient bergerak
 */
export const GradientText = ({ text, className = '' }) => {
  return (
    <motion.span
      className={`bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-900 bg-clip-text text-transparent bg-[length:200%_100%] ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {text}
    </motion.span>
  );
};

export default { TypingText, WordReveal, CharacterReveal, GradientText };
