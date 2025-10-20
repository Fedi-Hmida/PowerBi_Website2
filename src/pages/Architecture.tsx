import { motion } from 'framer-motion';
import { 
  Database, GitBranch, LineChart, Globe, 
  Shield, Zap,
  Lock, RefreshCw, Users,
  Activity
} from 'lucide-react';

const dataFlow = [
  { icon: <Database className="w-8 h-8" />, label: 'Sources de Données', description: 'Bases de données, APIs externes' },
  { icon: <GitBranch className="w-8 h-8" />, label: 'Pipeline ETL', description: 'Transformation des données' },
  { icon: <LineChart className="w-8 h-8" />, label: 'Moteur Analytics', description: 'Traitement et analyse' },
  { icon: <Globe className="w-8 h-8" />, label: 'Interface Web', description: 'Application utilisateur' },
];

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Sécurité Avancée',
    description: 'Authentification multi-rôles, contrôle d\'accès basé sur les rôles (RBAC), et chiffrement des données',
    highlight: 'RBAC'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Performance Optimale',
    description: 'Chargement rapide avec lazy loading, mise en cache intelligente, et optimisation des requêtes',
    highlight: 'Optimized'
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Temps Réel',
    description: 'Actualisation automatique des données et synchronisation en temps réel',
    highlight: 'Real-time'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Multi-utilisateurs',
    description: 'Support de multiples profils utilisateurs avec permissions granulaires',
    highlight: 'Multi-role'
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: 'Monitoring',
    description: 'Surveillance en temps réel des performances, logs détaillés, et alertes automatiques',
    highlight: 'Monitoring'
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Conformité',
    description: 'Respect des normes RGPD, ISO 27001, et meilleures pratiques de sécurité des données',
    highlight: 'Compliant'
  }
];

export default function Architecture() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#0085C3] via-[#FFD100] to-[#009F3D] bg-clip-text text-transparent mb-6">
            Architecture Technique
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto">
            Infrastructure moderne et évolutive pour l'analyse de données
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Architecture du Flux de Données</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {dataFlow.map((step, index) => (
              <div key={index} className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-gradient-to-br from-[#0085C3] to-[#009F3D] rounded-xl text-white mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {step.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
                {index < dataFlow.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-0.5 bg-gradient-to-r from-[#0085C3] to-[#009F3D]" />
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-[#009F3D] border-t-4 border-t-transparent border-b-4 border-b-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Fonctionnalités Clés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + 0.1 * index }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#0085C3] to-[#009F3D] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-[#0085C3] to-[#009F3D] text-white">
                        {feature.highlight}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-blue-500" />
              <span className="text-3xl font-bold text-blue-500">99.9%</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Disponibilité</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Infrastructure haute disponibilité avec failover automatique
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 dark:from-green-500/5 dark:to-teal-500/5 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-green-500" />
              <span className="text-3xl font-bold text-green-500">&lt; 2s</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Temps de Chargement</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Performance optimisée pour une expérience utilisateur fluide
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-purple-500" />
              <span className="text-3xl font-bold text-purple-500">1000+</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Utilisateurs Concurrents</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Architecture scalable pour supporter une croissance massive
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
