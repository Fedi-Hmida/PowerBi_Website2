import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Target, Zap, Users, Calendar, RefreshCw } from 'lucide-react';
import PowerBIDataService from '../services/powerBIDataService';

const performanceMetrics = [
  {
    category: 'Records Olympiques',
    value: '47',
    change: '+12',
    trend: 'up',
    description: 'Nouveaux records établis'
  },
  {
    category: 'Records du Monde',
    value: '23',
    change: '+8',
    trend: 'up',
    description: 'Records mondiaux battus'
  },
  {
    category: 'Performances Nationales',
    value: '156',
    change: '+34',
    trend: 'up',
    description: 'Records nationaux'
  },
  {
    category: 'Temps Moyens',
    value: '2.3%',
    change: '-0.8%',
    trend: 'down',
    description: 'Amélioration générale'
  }
];

const topPerformers = [
  {
    rank: 1,
    athlete: 'Katie Ledecky',
    country: 'USA',
    sport: 'Natation',
    event: '1500m Libre',
    performance: '15:20.48',
    type: 'Record Olympique',
    medals: 3
  },
  {
    rank: 2,
    athlete: 'Caeleb Dressel',
    country: 'USA', 
    sport: 'Natation',
    event: '50m Libre',
    performance: '21.07',
    type: 'Record du Monde',
    medals: 2
  },
  {
    rank: 3,
    athlete: 'Sydney McLaughlin',
    country: 'USA',
    sport: 'Athlétisme',
    event: '400m Haies',
    performance: '50.68',
    type: 'Record du Monde',
    medals: 2
  }
];

const sportCategories = [
  { sport: 'Natation', records: 18, athletes: 890, color: 'from-blue-500 to-cyan-500' },
  { sport: 'Athlétisme', records: 12, athletes: 1240, color: 'from-red-500 to-orange-500' },
  { sport: 'Gymnastique', records: 8, athletes: 324, color: 'from-purple-500 to-pink-500' },
  { sport: 'Cyclisme', records: 6, athletes: 456, color: 'from-green-500 to-teal-500' }
];

export default function Performance() {
  const [isLoading, setIsLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState(performanceMetrics);
  const [topAthletesData, setTopAthletesData] = useState(topPerformers);
  const [sportsData, setSportsData] = useState(sportCategories);

  useEffect(() => {
    loadPerformanceData();
    
    // Auto-refresh every 30 seconds
    const powerBIService = PowerBIDataService.getInstance();
    powerBIService.startAutoUpdate(30000);
    
    const interval = setInterval(() => {
      loadPerformanceData();
    }, 30000);

    return () => {
      clearInterval(interval);
      powerBIService.stopAutoUpdate();
    };
  }, []);

  const loadPerformanceData = async () => {
    setIsLoading(true);
    try {
      const powerBIService = PowerBIDataService.getInstance();
      const data = await powerBIService.refreshData();

      if (data && data.performance) {
        // Update top performers from Power BI performance data
        const updatedPerformers = data.performance.slice(0, 3).map((item, index) => ({
          rank: index + 1,
          athlete: `Top Athlete ${index + 1}`,
          country: item.country,
          sport: 'Multi-Sport',
          event: 'Overall Performance',
          performance: `${item.efficiency.toFixed(1)}%`,
          type: item.efficiency > 85 ? 'Record Olympique' : 'Performance Excellente',
          medals: item.medals
        }));
        
        setTopAthletesData(updatedPerformers.length > 0 ? updatedPerformers : topPerformers);
      }

      // Keep existing metrics as they're display-focused
      setPerformanceData(performanceMetrics);
      setSportsData(sportCategories);
    } catch (error) {
      console.error('Error loading performance data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadPerformanceData();
  };

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#0085C3] via-[#FFD100] to-[#009F3D] bg-clip-text text-transparent mb-6">
                Performance Olympique
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto">
                Analyse des performances, records et statistiques des athlètes
              </p>
            </div>
            <motion.button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-[#0085C3] text-white rounded-lg hover:bg-[#006fa3] transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </motion.button>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Métriques de Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {performanceData.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 + 0.1 * index }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className={`w-8 h-8 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    metric.trend === 'up' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {metric.category}
                </h3>
                <p className="text-3xl font-bold text-[#0085C3] mb-2">
                  {metric.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top Performances</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Rang</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Athlète</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Pays</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Sport</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Épreuve</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Performance</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Médailles</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {topAthletesData.map((performer, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + 0.1 * index }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          performer.rank === 1 ? 'bg-yellow-500' : 
                          performer.rank === 2 ? 'bg-gray-400' : 
                          'bg-orange-600'
                        }`}>
                          {performer.rank}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {performer.athlete}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {performer.country}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {performer.sport}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {performer.event}
                      </td>
                      <td className="px-6 py-4 font-bold text-[#0085C3]">
                        {performer.performance}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          performer.type === 'Record du Monde' 
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {performer.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {performer.medals}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Sport Categories Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Performance par Sport</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {sportsData.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + 0.1 * index }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}>
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {category.sport}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Records</span>
                    <span className="font-semibold text-[#0085C3]">{category.records}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Athlètes</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{category.athletes}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-blue-500" />
              <span className="text-3xl font-bold text-blue-500">94.2%</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Taux de Participation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pourcentage d'athlètes ayant participé aux épreuves
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 dark:from-green-500/5 dark:to-teal-500/5 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-green-500" />
              <span className="text-3xl font-bold text-green-500">206</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Nations Représentées</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Nombre de pays participants aux Jeux
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-purple-500" />
              <span className="text-3xl font-bold text-purple-500">16</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Jours de Compétition</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Durée totale des épreuves olympiques
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}