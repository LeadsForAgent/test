
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ValentinePage from './components/ValentinePage';
import RosePage from './components/RosePage';
import CountdownPage from './components/CountdownPage';

const App: React.FC = () => {
  // Target date for logic consistency
  const TARGET_DATE = new Date("2026-02-06T21:30:00-05:00").getTime();

  const [view, setView] = useState<'countdown' | 'valentine' | 'rose'>(() => {
    const accepted = localStorage.getItem('valentine_accepted') === 'true';
    if (accepted) return 'rose';

    const now = Date.now();
    const isPastTarget = now >= TARGET_DATE;
    const timerFinishedFlag = localStorage.getItem('valentine_timer_finished') === 'true';

    // If it's already past the specific date, we can show the valentine page.
    // Otherwise, we must show the countdown.
    if (isPastTarget || timerFinishedFlag) {
      // Re-verify it's actually past the date in case the flag was from an old session
      if (isPastTarget) return 'valentine';
    }
    
    return 'countdown';
  });

  const handleTimerFinish = useCallback(() => {
    localStorage.setItem('valentine_timer_finished', 'true');
    setView('valentine');
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem('valentine_accepted', 'true');
    setView('rose');
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        {view === 'countdown' && (
          <motion.div
            key="countdown-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <CountdownPage onFinish={handleTimerFinish} />
          </motion.div>
        )}

        {view === 'valentine' && (
          <motion.div
            key="valentine-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <ValentinePage onAccept={handleAccept} />
          </motion.div>
        )}

        {view === 'rose' && (
          <motion.div
            key="rose-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <RosePage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
