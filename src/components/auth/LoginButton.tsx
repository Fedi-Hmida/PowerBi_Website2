/**
 * LoginButton Component
 * Beautiful animated button that triggers navigation to login page
 */

import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import type { PageType } from '../../types';

interface LoginButtonProps {
  onNavigate?: (page: PageType) => void;
}

export function LoginButton({ onNavigate }: LoginButtonProps) {
  const handleClick = () => {
    if (onNavigate) {
      onNavigate('login');
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#0085C3] to-[#009F3D] text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <LogIn className="w-5 h-5" />
      <span>Se connecter</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#009F3D] to-[#0085C3] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
        style={{ zIndex: -1 }}
      />
    </motion.button>
  );
}
