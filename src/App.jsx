import React, { useState, useEffect } from 'react';
import { useScroll, useSpring, motion } from 'framer-motion';
import Home from './pages/Home';
import PlatformPage from './pages/Platform';
import ServiceDetail from './pages/ServiceDetail';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';
import { LoadingScreen } from './components/PageComponents';

// The site never changes the address itself, so "/" (and "/index.html") are the only real paths.
// Anything else, like a mistyped address, shows the Not Found page.
const KNOWN_PATHS = ['/', '/index.html'];

const App = () => {
  const [unknownPath, setUnknownPath] = useState(() => !KNOWN_PATHS.includes(window.location.pathname));
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [currentServiceId, setCurrentServiceId] = useState(null); // Track which service was clicked
  const [currentProjectId, setCurrentProjectId] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500);
  }, []);

  // Handle Navigation
  const handleNavigation = (destination) => {
    // Check if destination starts with 'service-' (e.g., service-web-systems)
    if (destination.startsWith('service-')) {
      const serviceId = destination.replace('service-', '');
      setCurrentServiceId(serviceId);
      setCurrentPage('service-detail');
    } else if (destination.startsWith('project-')) {
      const projectId = destination.replace('project-', '');
      setCurrentProjectId(projectId);
      setCurrentPage('project-detail');
    } else {
      setCurrentPage(destination);
    }
  };

  // Keep this below all hooks (hooks must run before any early return).
  if (unknownPath) {
    return (
      <NotFound
        path={window.location.pathname}
        onHome={() => {
          window.history.replaceState({}, '', '/'); // put "/" back in the address bar
          setUnknownPath(false);
        }}
      />
    );
  }

  if (loading) {
    return <LoadingScreen title="CALLISTO" subtitle="SYSTEM INITIALIZING..." />;
  }

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-orange-600 origin-left z-50" style={{ scaleX }} />
      <motion.div className="fixed top-0 left-0 bottom-0 w-1 bg-red-600 origin-top z-50 shadow-[0_0_15px_rgba(220,38,38,0.8)] hidden md:block" style={{ scaleY }} />

      {currentPage === 'home' && <Home navigateTo={handleNavigation} />}
      {currentPage === 'platform' && <PlatformPage onBack={() => setCurrentPage('home')} />}
      {currentPage === 'service-detail' && <ServiceDetail serviceId={currentServiceId} onBack={() => setCurrentPage('home')} />}
      {currentPage === 'project-detail' && <ProjectDetail projectId={currentProjectId} onBack={() => setCurrentPage('home')} />}
    </>
  );
};

export default App;