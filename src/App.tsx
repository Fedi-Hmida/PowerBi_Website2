import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Architecture from './pages/Architecture';
import Stakeholders from './pages/Stakeholders';
import About from './pages/About';
import Login from './pages/Login';
import Events from './pages/Events';
import Performance from './pages/Performance';
import Results from './pages/Results';
import Media from './pages/Media';
import { useTheme } from './lib/theme';
import { ProtectedRoute } from './components/auth';
import { useAuth } from './contexts/AuthContext';
import type { PageType } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isLoading, setIsLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'dashboard':
        return (
          <ProtectedRoute requirePage="dashboard">
            <Dashboard />
          </ProtectedRoute>
        );
      case 'events':
        return (
          <ProtectedRoute requirePage="events">
            <Events />
          </ProtectedRoute>
        );
      case 'performance':
        return (
          <ProtectedRoute requirePage="performance">
            <Performance />
          </ProtectedRoute>
        );
      case 'results':
        return (
          <ProtectedRoute requirePage="results">
            <Results />
          </ProtectedRoute>
        );
      case 'media':
        return (
          <ProtectedRoute requirePage="media">
            <Media />
          </ProtectedRoute>
        );
      case 'architecture':
        return (
          <ProtectedRoute requirePage="architecture">
            <Architecture />
          </ProtectedRoute>
        );
      case 'stakeholders':
        return (
          <ProtectedRoute requirePage="stakeholders">
            <Stakeholders />
          </ProtectedRoute>
        );
      case 'about':
        return <About />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-8 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0085C3] border-r-[#FFD100] border-b-[#009F3D]"></div>
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#0085C3]/50 border-r-[#FFD100]/50"></div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold bg-gradient-to-r from-[#0085C3] via-[#FFD100] to-[#009F3D] bg-clip-text text-transparent mb-2"
          >
            Analytics Olympiques
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-gray-600 dark:text-gray-300"
          >
            Chargement de votre expérience...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-all duration-1000">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0085C3] via-[#FFD100] to-[#009F3D] z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0085C3]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#009F3D]/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#FFD100]/10 rounded-full blur-2xl"
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentPage}-${isAuthenticated ? user?.id : 'guest'}`}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 1.05 }}
          transition={{ 
            duration: 0.6,
            ease: [0.4, 0.0, 0.2, 1]
          }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}

export default App;
