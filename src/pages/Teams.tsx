import { motion } from 'framer-motion';
import { Users, TrendingUp, Award, Calendar, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import PowerBIDataService from '../services/powerBIDataService';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface TeamStats {
  totalTeams: number;
  menTeams: number;
  womenTeams: number;
  mensTeamEvents: number;
  womensTeamEvents: number;
  mixedTeamEvents: number;
}

export default function Teams() {
  const [teamStats, setTeamStats] = useState<TeamStats>({
    totalTeams: 743,
    menTeams: 120,
    womenTeams: 114,
    mensTeamEvents: 40,
    womensTeamEvents: 40,
    mixedTeamEvents: 29
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const dataService = PowerBIDataService.getInstance();

  useEffect(() => {
    loadTeamsData();
    dataService.startAutoUpdate(30000);
    
    return () => {
      dataService.stopAutoUpdate();
    };
  }, []);

  const loadTeamsData = async () => {
    const olympicData = await dataService.refreshData();
    
    if (olympicData && olympicData.kpis) {
      setTeamStats({
        totalTeams: olympicData.kpis.totalTeams || 743,
        menTeams: 120,
        womenTeams: 114,
        mensTeamEvents: 40,
        womensTeamEvents: 40,
        mixedTeamEvents: 29
      });
      setLastUpdate(new Date());
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadTeamsData();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Top 5 événements par nombre d'équipes (depuis screenshot Power BI)
  const eventTypeData = [
    { name: 'Men', value: 120, percentage: 34.99, color: '#0085C3' },
    { name: 'Women', value: 114, percentage: 33.24, color: '#009F3D' },
    { name: "Men's Team", value: 40, percentage: 11.66, color: '#FFD100' },
    { name: "Women's Team", value: 40, percentage: 11.66, color: '#FF6B9D' },
    { name: 'Mixed Team', value: 29, percentage: 8.45, color: '#4ECDC4' }
  ];

  // Équipes par discipline (top 10 depuis screenshot)
  const teamsByDiscipline = [
    { discipline: 'Rowing', teams: 250 },
    { discipline: 'Golf', teams: 220 },
    { discipline: 'Fencing', teams: 210 },
    { discipline: 'Karate', teams: 200 },
    { discipline: 'Rugby Sevens', teams: 190 },
    { discipline: '3x3 Basketball', teams: 180 },
    { discipline: 'Shooting', teams: 170 },
    { discipline: 'Artistic Gymnastics', teams: 160 },
    { discipline: 'Basketball', teams: 150 },
    { discipline: 'Baseball/Softball', teams: 140 }
  ];

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
            Équipes Olympiques
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto mb-6">
            Analyse complète des équipes par discipline, nationalité et type d'événement
          </p>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <motion.button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0085C3] to-[#009F3D] text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isRefreshing ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
              >
                <RefreshCw className="w-5 h-5" />
              </motion.div>
              <span className="font-medium">
                {isRefreshing ? 'Actualisation...' : 'Actualiser Équipes'}
              </span>
            </motion.button>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full border border-white/20 dark:border-gray-700/50">
              <Calendar className="w-4 h-4 text-[#0085C3]" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}
              </span>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards - Nombre total d'équipes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-[#0085C3]/10 to-[#009F3D]/10 dark:from-[#0085C3]/5 dark:to-[#009F3D]/5 rounded-2xl p-8 border border-[#0085C3]/20 dark:border-[#0085C3]/30 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <Users className="w-12 h-12 text-[#0085C3]" />
                <span className="text-4xl font-bold text-[#0085C3]">{teamStats.totalTeams}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Nombre total d'équipes</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Équipes participantes aux Jeux Olympiques
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-[#FFD100]/10 to-[#009F3D]/10 dark:from-[#FFD100]/5 dark:to-[#009F3D]/5 rounded-2xl p-8 border border-[#FFD100]/20 dark:border-[#FFD100]/30 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-12 h-12 text-[#FFD100]" />
                <span className="text-4xl font-bold text-[#FFD100]">{teamStats.menTeams + teamStats.womenTeams}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Équipes Individuelles</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Men ({teamStats.menTeams}) + Women ({teamStats.womenTeams})
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-[#009F3D]/10 to-[#4ECDC4]/10 dark:from-[#009F3D]/5 dark:to-[#4ECDC4]/5 rounded-2xl p-8 border border-[#009F3D]/20 dark:border-[#009F3D]/30 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <Award className="w-12 h-12 text-[#009F3D]" />
                <span className="text-4xl font-bold text-[#009F3D]">{teamStats.mensTeamEvents + teamStats.womensTeamEvents + teamStats.mixedTeamEvents}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Équipes Collectives</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Team Events + Mixed ({teamStats.mixedTeamEvents})
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Top 5 événements par nombre d'équipes - Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top 5 Événements par Nombre d'Équipes</h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={eventTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.name} (${entry.percentage.toFixed(2)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {eventTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  formatter={(value, name) => [`${value} équipes`, name]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Équipes par discipline - Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Équipes par Discipline (Top 10)</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={teamsByDiscipline}
                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="discipline" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => [`${value} équipes`, 'Total']}
                />
                <Bar dataKey="teams" fill="#0085C3" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Event Type Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Répartition par Type d'Événement</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {eventTypeData.map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center"
                style={{ borderTopColor: event.color, borderTopWidth: '4px' }}
              >
                <div className="text-3xl font-bold mb-2" style={{ color: event.color }}>
                  {event.value}
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {event.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {event.percentage.toFixed(2)}%
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
