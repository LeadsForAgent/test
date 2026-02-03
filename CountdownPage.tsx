
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import HeartBackground from './HeartBackground';

interface CountdownPageProps {
  onFinish: () => void;
}

const CountdownPage: React.FC<CountdownPageProps> = ({ onFinish }) => {
  // Set the target time to 4 days, 1 hour and 35 minutes from now
  const targetDate = useMemo(() => {
    // We use a specific key for this duration to ensure it updates for the user if they've seen a previous version
    const key = 'valentine_target_date_v3_4d_1h_35m';
    const saved = localStorage.getItem(key);
    if (saved) return parseInt(saved, 10);
    
    const now = Date.now();
    const fourDays = 4 * 24 * 60 * 60 * 1000;
    const oneHour = 1 * 60 * 60 * 1000;
    const thirtyFiveMinutes = 35 * 60 * 1000;
    const target = now + fourDays + oneHour + thirtyFiveMinutes;
    
    localStorage.setItem(key, target.toString());
    return target;
  }, []);

  const calculateTimeLeft = () => {
    const difference = targetDate - Date.now();
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
    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft();
      setTime(updatedTime);

      if (updatedTime.difference <= 0) {
        clearInterval(timer);
        onFinish();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onFinish]);

  const { timeLeft } = time;

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <motion.div 
        key={value}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-6xl font-bold text-rose-600 bg-white/40 backdrop-blur-sm rounded-2xl p-4 min-w-[80px] md:min-w-[120px] shadow-lg border border-white/50"
      >
        {value.toString().padStart(2, '0')}
      </motion.div>
      <span className="text-sm md:text-base text-rose-500 font-semibold mt-2 uppercase tracking-widest">{label}</span>
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
        <h1 className="text-5xl md:text-7xl font-romantic text-rose-600 mb-2 drop-shadow-sm">
          Hello my love
        </h1>
        <h2 className="text-2xl md:text-3xl font-romantic text-rose-500 mb-6 opacity-80">
          Something special is coming...
        </h2>
        <p className="text-rose-400 font-semibold mb-12 italic">Patiently waiting for the magic to begin</p>

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
        className="absolute bottom-12 text-rose-400 font-romantic text-2xl"
      >
        counting down the heartbeats...
      </motion.div>
    </div>
  );
};

export default CountdownPage;
