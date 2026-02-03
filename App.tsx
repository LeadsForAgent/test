
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ValentinePage from './components/ValentinePage';
import RosePage from './components/RosePage';
import CountdownPage from './components/CountdownPage';

const App: React.FC = () => {
  const [view, setView] = useState<'countdown' | 'valentine' | 'rose'>('countdown');

  // Load state from local storage to persist timer completion and acceptance
  useEffect(() => {
    const timerFinished = localStorage.getItem('valentine_timer_finished') === 'true';
    const accepted = localStorage.getItem('valentine_accepted') === 'true';

    if (accepted) {
      setView('rose');
    } else if (timerFinished) {
      setView('valentine');
    }
  }, []);

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
