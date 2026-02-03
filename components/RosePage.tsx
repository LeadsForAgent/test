

import React from 'react';
import { motion } from 'framer-motion';

const RosePage: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full bg-gradient-to-b from-gray-950 via-red-950 to-black text-white px-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-[80vw] h-[80vw] bg-red-600 rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="z-10 text-center"
      >
        <div className="relative">
          <motion.span 
            className="text-8xl md:text-9xl mb-8 block drop-shadow-[0_0_25px_rgba(255,0,0,0.8)]"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 2, 0, -2, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            🌹
          </motion.span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-romantic text-rose-100 mb-6 tracking-wide drop-shadow-lg">
          Close your eyes to receive
        </h2>
        <h2 className="text-4xl md:text-6xl font-romantic text-rose-300 drop-shadow-lg">
          the enchanted rose
        </h2>

        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mt-12 text-rose-400 font-light italic text-lg"
        >
          Can you feel the magic?
        </motion.div>
      </motion.div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-red-500 rounded-full opacity-30"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.3, 0],
              x: [0, Math.random() * 40 - 20]
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RosePage;
