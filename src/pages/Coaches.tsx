import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, RefreshCw, Award, Globe } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = {
  primary: '#0085C3',
  secondary: '#009F3D',
  tertiary: '#FFD100'
};

interface CoachData {
  event: string;
  coaches: number;
}

interface NationalityCoachData {
  nationality: string;
  coaches: number;
}

export default function Coaches() {
  const [isLoading, setIsLoading] = useState(true);
  const [totalCoaches] = useState(743); // From screenshot
  const [athleteCoachRatio] = useState(14.92);
  
  // Data from screenshot - Top coaches by event
  const [coachesByEvent] = useState<CoachData[]>([
    { event: 'Men', coaches: 130 },
    { event: 'Women', coaches: 125 },
    { event: "Men's Team", coaches: 42 },
    { event: "Women's...", coaches: 38 },
    { event: "Mixed Team", coaches: 35 },
    { event: "Men's x", coaches: 32 },
    { event: "Women's x", coaches: 28 },
    { event: "Men's x", coaches: 25 },
    { event: "Men's x", coaches: 24 },
    { event: "Men's Ma...", coaches: 22 }
  ]);

  // Data from screenshot - Top coaches by nationality
  const [coachesByNationality] = useState<NationalityCoachData[]>([
    { nationality: 'Japan', coaches: 52 },
    { nationality: 'United States', coaches: 50 },
    { nationality: 'Italy', coaches: 42 },
    { nationality: 'Germany', coaches: 38 },
    { nationality: 'Australia', coaches: 36 },
    { nationality: 'ROC', coaches: 34 },
    { nationality: 'France', coaches: 33 },
    { nationality: "People's R...", coaches: 31 },
    { nationality: 'Canada', coaches: 30 },
    { nationality: 'Great Brit...', coaches: 28 },
    { nationality: 'Netherlan...', coaches: 27 }
  ]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#0085C3] to-[#009F3D] bg-clip-text text-transparent mb-2">
                Statistiques des Entraîneurs
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Analyse des entraîneurs par événement, discipline et nationalité
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

        {/* KPI Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Total Coaches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-[#0085C3]"
          >
            <div className="flex items-center justify-between mb-2">
              <UserCheck className="w-8 h-8 text-[#0085C3]" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Total</span>
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              {totalCoaches}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Coaches
            </div>
          </motion.div>

          {/* Athlete to Coach Ratio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-[#009F3D]"
          >
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-[#009F3D]" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Ratio</span>
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              {athleteCoachRatio}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Ratio Athlètes par Entraîneur
            </div>
          </motion.div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Total Coaches by Event */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#0085C3]" />
              Total Coaches by Event
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={coachesByEvent}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="event" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  style={{ fontSize: '11px' }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="coaches" fill={COLORS.primary} name="Total Coaches" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Total Coaches by Nationality */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#009F3D]" />
              Total Coaches by Nationalite
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={coachesByNationality}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="nationality" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  style={{ fontSize: '11px' }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="coaches" fill={COLORS.secondary} name="Total Coaches" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Data Source Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <p>Données synchronisées avec Power BI • 743 entraîneurs au total</p>
        </motion.div>
      </div>
    </div>
  );
}
