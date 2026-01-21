import React, { useState, useEffect } from 'react';
import { useScroll, useSpring, motion } from 'framer-motion';
import Home from './pages/Home';
import PlatformPage from './pages/Platform';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500); 
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black z-[999] flex items-center justify-center flex-col text-center">
         <div className="relative flex items-center justify-center mb-6">
            <div className="absolute w-28 h-28 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
            <img src="/logo.png" alt="Loading" className="w-16 h-auto animate-pulse rounded-full" />
         </div>
         <h2 className="text-white font-black text-2xl tracking-widest uppercase">CALLISTO</h2>
         <p className="text-red-500 font-mono text-xs mt-2 tracking-[0.2em] animate-pulse">SYSTEM INITIALIZING...</p>
      </div>
    );
  }

  return (
    <>
      {/* Global Scroll Progress Bars */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-orange-600 origin-left z-50" style={{ scaleX }} />
      <motion.div className="fixed top-0 left-0 bottom-0 w-1 bg-red-600 origin-top z-50 shadow-[0_0_15px_rgba(220,38,38,0.8)] hidden md:block" style={{ scaleY }} />

      {/* Page Routing Logic */}
      {currentPage === 'home' && <Home navigateTo={setCurrentPage} />}
      {currentPage === 'platform' && <PlatformPage onBack={() => setCurrentPage('home')} />}
    </>
  );
};

export default App;