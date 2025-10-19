/**
 * ProtectedRoute Component
 * Wraps content that requires authentication and/or specific roles
 */

import { motion } from 'framer-motion';
import { Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole, hasPageAccess } from '../../config/auth';
import { LoginButton } from './LoginButton';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: UserRole;
  requirePage?: string;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  requireRole,
  requirePage,
  fallback,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-[#0085C3] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Vérification...</p>
        </motion.div>
      </div>
    );
  }

  // Not authenticated - show login prompt
  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full mx-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0085C3] to-[#009F3D] rounded-full mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Authentification Requise
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Veuillez vous connecter pour accéder à cette page
              </p>
            </div>
            <LoginButton />
          </div>
        </motion.div>
      </div>
    );
  }

  // Check role-based access
  if (requireRole && user?.role !== requireRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full mx-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-red-200 dark:border-red-900">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Accès Refusé
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Vous n'avez pas les permissions nécessaires pour accéder à cette page.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Rôle requis: <span className="font-semibold">{requireRole}</span>
                <br />
                Votre rôle: <span className="font-semibold">{user?.role}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Check page-based access
  if (requirePage && !hasPageAccess(user?.role || null, requirePage)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full mx-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-orange-200 dark:border-orange-900">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full mb-4">
                <AlertCircle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Page Non Accessible
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Votre rôle ne vous permet pas d'accéder à cette page.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // User is authenticated and has proper access
  return <>{children}</>;
}
