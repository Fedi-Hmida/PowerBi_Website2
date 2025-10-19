import { useState } from 'react';
import { motion } from 'framer-motion';
import type { PageType } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  onNavigate: (page: PageType) => void;
}

export default function Login({ onNavigate }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    role: 'analyst' as 'admin' | 'analyst' | 'viewer'
  });
  const [error, setError] = useState('');

  const { login, setAuthData } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (isSignUp) {
      if (!formData.name) {
        setError('Veuillez entrer votre nom');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Les mots de passe ne correspondent pas');
        return;
      }

      // Create a demo user locally (for the demo only)
      const demoUser = {
        id: Date.now().toString(),
        email: formData.email,
        name: formData.name,
        role: formData.role
      };
      setAuthData(demoUser);
      onNavigate('dashboard');
      return;
    }

    try {
      await login(formData.email, formData.password);
      onNavigate('dashboard');
    } catch (err: any) {
      setError(err.message || 'Échec de la connexion');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-olympic-blue/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-olympic-gold/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-olympic-blue to-olympic-gold rounded-full mb-4"
            >
              <span className="text-3xl">🏆</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isSignUp ? 'Créer un compte' : 'Bienvenue'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isSignUp 
                ? 'Rejoignez la plateforme Analytics' 
                : 'Connectez-vous à votre compte'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-olympic-blue focus:border-transparent transition-all"
                  placeholder="Jean Martin"
                />
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Adresse email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-olympic-blue focus:border-transparent transition-all"
                placeholder="jean.martin@exemple.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-olympic-blue focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            {isSignUp && (
              <>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-olympic-blue focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rôle
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange as any}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-olympic-blue focus:border-transparent transition-all"
                  >
                    <option value="analyst">Analyste</option>
                    <option value="viewer">Lecteur</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </motion.div>
              </>
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-olympic-blue focus:ring-olympic-blue" />
                  <span className="ml-2 text-gray-600 dark:text-gray-400">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-olympic-blue hover:text-blue-700 font-medium">
                  Mot de passe oublié ?
                </a>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-olympic-blue to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isSignUp ? 'Créer mon compte' : 'Se connecter'}
            </motion.button>
          </form>

          {/* Toggle Sign Up/Sign In */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {isSignUp ? 'Vous avez déjà un compte ?' : "Vous n'avez pas de compte ?"}
              {' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setFormData({ email: '', password: '', name: '', confirmPassword: '', role: 'analyst' });
                }}
                className="text-olympic-blue hover:text-blue-700 font-semibold"
              >
                {isSignUp ? 'Se connecter' : "S'inscrire"}
              </button>
            </p>
          </div>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-olympic-gold/10 dark:bg-olympic-gold/5 rounded-lg border border-olympic-gold/30">
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
              💡 Mode démo : Entrez n'importe quel email et mot de passe pour tester
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => onNavigate('home')}
          className="mt-6 flex items-center justify-center w-full text-gray-600 dark:text-gray-400 hover:text-olympic-blue dark:hover:text-olympic-blue transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à l'accueil
        </motion.button>
      </motion.div>
    </div>
  );
}
