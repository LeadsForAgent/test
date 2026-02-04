
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import HeartBackground from './HeartBackground';

interface CountdownPageProps {
  onFinish: () => void;
}

const CountdownPage: React.FC<CountdownPageProps> = ({ onFinish }) => {
  // Target: Friday, February 6, 2026, at 9:30 PM Eastern Time (EST is UTC-5)
  // ISO string with offset: 2026-02-06T21:30:00-05:00
  const TARGET_DATE_STRING = "2026-02-06T21:30:00-05:00";
  
  const targetTimestamp = useMemo(() => {
    return new Date(TARGET_DATE_STRING).getTime();
  }, []);

  const calculateTimeLeft = () => {
    const difference = targetTimestamp - Date.now();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return { timeLeft, difference };
  };

  const [time, setTime] = useState(calculateTimeLeft());

  useEffect(() => {
    // Immediate check on mount: if time is already up, move to the next page.
    if (time.difference <= 0) {
      onFinish();
      return;
    }

    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft();
      setTime(updatedTime);

      if (updatedTime.difference <= 0) {
        clearInterval(timer);
        onFinish();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTimestamp, onFinish, time.difference]);

  const { timeLeft } = time;

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <motion.div 
        key={value}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-6xl font-bold text-rose-600 bg-white/40 backdrop-blur-sm rounded-2xl p-4 min-w-[80px] md:min-w-[120px] shadow-lg border border-white/50 select-none"
      >
        {value.toString().padStart(2, '0')}
      </motion.div>
      <span className="text-sm md:text-base text-rose-500 font-semibold mt-2 uppercase tracking-widest select-none">{label}</span>
    </div>
  );

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-pink-100 via-rose-200 to-red-100 px-4">
      <HeartBackground />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="z-10 text-center"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-romantic text-rose-600 mb-2 drop-shadow-sm select-none"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          Hello my love
        </motion.h1>
        <h2 className="text-2xl md:text-3xl font-romantic text-rose-500 mb-6 opacity-80 select-none">
          Something special is coming...
        </h2>
        <p className="text-rose-400 font-semibold mb-12 italic select-none">The heart keeps count until we meet</p>

        <div className="flex flex-wrap justify-center items-center gap-y-8">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Mins" />
          <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>
      </motion.div>

      <motion.div 
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-12 text-rose-400 font-romantic text-2xl select-none"
      >
        counting down the heartbeats...
      </motion.div>
    </div>
  );
};

export default CountdownPage;
