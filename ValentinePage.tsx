
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeartBackground from './HeartBackground';
import { playRomanticSuccess, playCrowdBoo } from '../utils/audio';

interface ValentinePageProps {
  onAccept: () => void;
}

const ValentinePage: React.FC<ValentinePageProps> = ({ onAccept }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const noBtnRef = useRef<HTMLButtonElement>(null);

  // Initial positioning logic for the No button to stay centered initially
  useEffect(() => {
    // Positioning is handled by flexbox initially.
  }, []);

  const moveButton = () => {
    // Play the crowd booing sound effect whenever the No button moves
    playCrowdBoo();

    const padding = 20;
    const btnWidth = noBtnRef.current?.offsetWidth || 100;
    const btnHeight = noBtnRef.current?.offsetHeight || 50;

    // Calculate random position within viewport
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(padding, Math.random() * maxY);

    setNoButtonPos({ x: randomX, y: randomY });
  };

  const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent default touch behavior to avoid double triggering
    if (e.type === 'touchstart') {
      // e.preventDefault();
    }
    moveButton();
  };

  const handleYesClick = () => {
    // Play the playful romantic success sound
    playRomanticSuccess();
    onAccept();
  };

  const isMoved = noButtonPos.x !== 0 || noButtonPos.y !== 0;

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-rose-100 via-pink-200 to-red-100 px-4">
      <HeartBackground />
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="z-10 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-romantic text-rose-600 mb-12 drop-shadow-sm select-none">
          Will you be my valentine?
        </h1>

        <div className="flex flex-row items-center justify-center gap-6">
          {/* YES BUTTON */}
          <button
            onClick={handleYesClick}
            className="px-10 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xl rounded-full shadow-lg transform hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer z-10"
          >
            Yes! ❤️
          </button>

          {/* NO BUTTON */}
          <motion.button
            ref={noBtnRef}
            onMouseEnter={handleNoInteraction}
            onTouchStart={handleNoInteraction}
            style={isMoved ? {
              position: 'fixed',
              left: noButtonPos.x,
              top: noButtonPos.y,
            } : {}}
            className="px-10 py-4 bg-gray-200 text-gray-600 font-bold text-xl rounded-full shadow-md cursor-default select-none transition-all duration-300 ease-out z-50"
          >
            No
          </motion.button>
        </div>
      </motion.div>
      
      <div className="absolute bottom-8 text-rose-400 opacity-60 font-romantic text-xl animate-pulse select-none">
        made with love
      </div>
    </div>
  );
};

export default ValentinePage;
