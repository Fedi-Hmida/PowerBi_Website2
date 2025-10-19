import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import type { PageType } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { LoginButton, UserProfile } from './auth';
import { hasPageAccess } from '../config/auth';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const navItems: { page: PageType; label: string }[] = [
  { page: 'home', label: 'Accueil' },
  { page: 'dashboard', label: 'Tableau de bord' },
  { page: 'events', label: 'Événements' },
  { page: 'performance', label: 'Performance' },
  { page: 'results', label: 'Résultats' },
  { page: 'media', label: 'Médias' },
  { page: 'architecture', label: 'Architecture' },
  { page: 'stakeholders', label: 'Parties prenantes' },
  { page: 'about', label: 'À propos' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, -50]);
  const opacity = useTransform(scrollY, [0, 100], [1, 0.8]);
  const { isAuthenticated, user } = useAuth();

  // Filter nav items based on user role
  const visibleNavItems = navItems.filter(item => 
    hasPageAccess(user?.role || null, item.page)
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 dark:border-gray-800/50' 
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-800/30'
      }`}
      style={{ y, opacity }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <motion.button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-3 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-[#0085C3] to-[#009F3D] rounded-xl flex items-center justify-center relative overflow-hidden"
                whileHover={{ 
                  boxShadow: "0 0 30px rgba(0, 133, 195, 0.5)",
                  scale: 1.1
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.span 
                  className="text-white font-bold text-xl relative z-10"
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 10px rgba(255,255,255,0.5)",
                      "0 0 0px rgba(255,255,255,0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  O
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
              <motion.span 
                className="text-xl font-bold bg-gradient-to-r from-[#0085C3] to-[#009F3D] bg-clip-text text-transparent"
                whileHover={{ 
                  backgroundImage: "linear-gradient(45deg, #0085C3, #FFD100, #009F3D)",
                  backgroundSize: "200% 200%"
                }}
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Analytics Olympiques
              </motion.span>
            </motion.button>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {visibleNavItems.map((item, index) => (
              <motion.button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative overflow-hidden ${
                  currentPage === item.page
                    ? 'bg-[#0085C3] text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {currentPage === item.page && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#0085C3] to-[#009F3D] rounded-lg"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
                {currentPage === item.page && (
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-lg"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}

            {/* Authentication UI */}
            <div className="ml-4">
              {isAuthenticated ? (
                <UserProfile />
              ) : (
                <LoginButton onNavigate={onNavigate} />
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Basculer le menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
          >
            <div className="px-4 py-4 space-y-2">
              {visibleNavItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    currentPage === item.page
                      ? 'bg-[#0085C3] text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Authentication UI */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                {isAuthenticated ? (
                  <UserProfile />
                ) : (
                  <LoginButton onNavigate={onNavigate} />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
