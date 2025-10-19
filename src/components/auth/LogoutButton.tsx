/**
 * LogoutButton Component
 * Elegant logout button with confirmation
 */

import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LogoutButtonProps {
  variant?: 'default' | 'icon-only';
}

export function LogoutButton({ variant = 'default' }: LogoutButtonProps) {
  const { logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      logout();
    }
  };

  if (variant === 'icon-only') {
    return (
      <motion.button
        onClick={handleLogout}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Se déconnecter"
      >
        <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleLogout}
      className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <LogOut className="w-4 h-4" />
      <span>Déconnexion</span>
    </motion.button>
  );
}
