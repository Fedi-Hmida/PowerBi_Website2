/**
 * UserProfile Component
 * Displays user information with role badge and dropdown menu
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { User, ChevronDown, Settings, Shield, Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../config/auth';
import { LogoutButton } from './LogoutButton';

export function UserProfile() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const getRoleConfig = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return {
          label: 'Administrateur',
          icon: Shield,
          color: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
        };
      case UserRole.ANALYST:
        return {
          label: 'Analyste',
          icon: Settings,
          color: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        };
      case UserRole.VIEWER:
        return {
          label: 'Lecteur',
          icon: Eye,
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
        };
    }
  };

  const roleConfig = getRoleConfig(user.role as UserRole);
  const RoleIcon = roleConfig.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0085C3] to-[#009F3D] flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>

        {/* User Info */}
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {user.name}
          </span>
          <div className="flex items-center space-x-1">
            <RoleIcon className={`w-3 h-3 ${roleConfig.color}`} />
            <span className={`text-xs ${roleConfig.color}`}>
              {roleConfig.label}
            </span>
          </div>
        </div>

        {/* Dropdown Arrow */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {/* User Info Section */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
              <div className={`mt-2 inline-flex items-center space-x-2 px-3 py-1 rounded-lg ${roleConfig.bgColor}`}>
                <RoleIcon className={`w-4 h-4 ${roleConfig.color}`} />
                <span className={`text-xs font-medium ${roleConfig.color}`}>
                  {roleConfig.label}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-2">
              <LogoutButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
