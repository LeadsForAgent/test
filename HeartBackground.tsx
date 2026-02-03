
import React from 'react';
import { motion } from 'framer-motion';

const HeartBackground: React.FC = () => {
  const hearts = Array.from({ length: 15 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((_, i) => (
        <Heart key={i} delay={i * 1.5} />
      ))}
    </div>
  );
};

const Heart: React.FC<{ delay: number }> = ({ delay }) => {
  const size = Math.random() * 30 + 15;
  const left = Math.random() * 100;

  return (
    <motion.div
      initial={{ y: '110vh', x: `${left}vw`, opacity: 0, scale: 0.5, rotate: 0 }}
      animate={{ 
        y: '-10vh', 
        opacity: [0, 0.5, 0],
        scale: [0.5, 1, 0.5],
        rotate: [0, 45, -45, 0]
      }}
      transition={{
        duration: 10 + Math.random() * 5,
        repeat: Infinity,
        delay,
        ease: "linear"
      }}
      className="absolute text-rose-300 select-none"
      style={{ fontSize: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </motion.div>
  );
};

export default HeartBackground;
