import { motion } from 'framer-motion';
import { Trophy, Medal, Flag, TrendingUp } from 'lucide-react';

const medalStandings = [
  { rank: 1, country: 'États-Unis', gold: 39, silver: 41, bronze: 33, total: 113, flag: '🇺🇸' },
  { rank: 2, country: 'Chine', gold: 38, silver: 32, bronze: 18, total: 88, flag: '🇨🇳' },
  { rank: 3, country: 'Japon', gold: 27, silver: 14, bronze: 17, total: 58, flag: '🇯🇵' },
  { rank: 4, country: 'Grande-Bretagne', gold: 22, silver: 21, bronze: 22, total: 65, flag: '🇬🇧' },
  { rank: 5, country: 'ROC', gold: 20, silver: 28, bronze: 23, total: 71, flag: '🏳️' },
];

const recentResults = [
  {
    sport: 'Natation',
    event: 'Finale 200m Papillon Hommes',
    winner: 'Caeleb Dressel (USA)',
    time: '1:51.25',
    type: 'Record Olympique',
    timestamp: '14:30'
  },
  {
    sport: 'Athlétisme',
    event: 'Finale Saut en Longueur Femmes',
    winner: 'Malaika Mihambo (GER)',
    time: '7.00m',
    type: 'Meilleure Performance Saisonnière',
    timestamp: '19:45'
  },
  {
    sport: 'Gymnastique',
    event: 'Finale Barres Asymétriques',
    winner: 'Sunisa Lee (USA)',
    time: '15.400',
    type: 'Nouveau Record',
    timestamp: '20:15'
  }
];

export default function Results() {
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
            Résultats Olympiques
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto">
            Classements des médailles, résultats en direct et performances
          </p>
        </motion.div>

        {/* Medal Standings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Classement des Médailles</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#0085C3] to-[#009F3D] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Rang</th>
                    <th className="px-6 py-4 text-left font-semibold">Pays</th>
                    <th className="px-6 py-4 text-center font-semibold">🥇 Or</th>
                    <th className="px-6 py-4 text-center font-semibold">🥈 Argent</th>
                    <th className="px-6 py-4 text-center font-semibold">🥉 Bronze</th>
                    <th className="px-6 py-4 text-center font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {medalStandings.map((country, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + 0.1 * index }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          country.rank === 1 ? 'bg-yellow-500' : 
                          country.rank === 2 ? 'bg-gray-400' : 
                          country.rank === 3 ? 'bg-orange-600' :
                          'bg-gray-500'
                        }`}>
                          {country.rank}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{country.flag}</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{country.country}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-yellow-600">{country.gold}</td>
                      <td className="px-6 py-4 text-center font-bold text-gray-500">{country.silver}</td>
                      <td className="px-6 py-4 text-center font-bold text-orange-600">{country.bronze}</td>
                      <td className="px-6 py-4 text-center font-bold text-[#0085C3] text-lg">{country.total}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Recent Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Derniers Résultats</h2>
          <div className="space-y-6">
            {recentResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + 0.1 * index }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Trophy className="w-5 h-5 text-[#FFD100]" />
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{result.sport}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{result.timestamp}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{result.event}</p>
                    <div className="flex items-center space-x-4">
                      <p className="text-xl font-bold text-[#0085C3]">{result.winner}</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{result.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Medal className="w-5 h-5 text-[#FFD100]" />
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      result.type === 'Record Olympique' 
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        : result.type === 'Nouveau Record'
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    }`}>
                      {result.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 dark:from-yellow-500/5 dark:to-orange-500/5 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span className="text-3xl font-bold text-yellow-500">329</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Épreuves Terminées</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total des événements complétés
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 dark:from-red-500/5 dark:to-pink-500/5 rounded-2xl p-6 border border-red-200 dark:border-red-800">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-red-500" />
              <span className="text-3xl font-bold text-red-500">47</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Records Olympiques</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Nouveaux records établis
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-4">
              <Medal className="w-8 h-8 text-blue-500" />
              <span className="text-3xl font-bold text-blue-500">987</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Médailles Distribuées</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total des médailles attribuées
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 dark:from-green-500/5 dark:to-teal-500/5 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between mb-4">
              <Flag className="w-8 h-8 text-green-500" />
              <span className="text-3xl font-bold text-green-500">206</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Pays Médaillés</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Nations ayant remporté des médailles
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}