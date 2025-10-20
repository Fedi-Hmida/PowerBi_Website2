import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, RefreshCw, TrendingUp, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PowerBIDataService from '../services/powerBIDataService';

const COLORS = {
  male: '#0085C3',
  female: '#FF6B9D',
  chart: ['#0085C3', '#FF6B9D', '#FFD100', '#009F3D', '#00A651']
};

export default function Genre() {
  const [isLoading, setIsLoading] = useState(true);
  const [totalAthletes, setTotalAthletes] = useState(11000); // 11K from screenshot
  const [femaleParticipation, setFemaleParticipation] = useState(48.00);
  const [maleParticipation, setMaleParticipation] = useState(52.00);
  const [genderRatio, setGenderRatio] = useState(0.92);
  const [genderByType, setGenderByType] = useState([
    { name: 'Male', value: 5200, percentage: 52 },
    { name: 'Female', value: 4800, percentage: 48 }
  ]);
  const [disciplineData, setDisciplineData] = useState([
    { discipline: 'Athletics', female: 1100, male: 1200 },
    { discipline: 'Swimming', female: 450, male: 550 },
    { discipline: 'Football', female: 350, male: 650 },
    { discipline: 'Rowing', female: 280, male: 320 },
    { discipline: 'Judo', female: 200, male: 300 }
  ]);

  useEffect(() => {
    loadData();
    
    // Auto-refresh every 30 seconds
    const powerBIService = PowerBIDataService.getInstance();
    powerBIService.startAutoUpdate(30000);
    
    const interval = setInterval(() => {
      loadData();
    }, 30000);

    return () => {
      clearInterval(interval);
      powerBIService.stopAutoUpdate();
    };
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const powerBIService = PowerBIDataService.getInstance();
      const data = await powerBIService.refreshData();

      if (data && data.kpis) {
        // Update KPIs from Power BI data
        setTotalAthletes(data.kpis.totalAthletes || 11084);
        
        // Calculate gender percentages from participation data
        if (data.participation && data.participation.length > 0) {
          const totalMale = data.participation.reduce((sum, item) => sum + item.male, 0);
          const totalFemale = data.participation.reduce((sum, item) => sum + item.female, 0);
          const total = totalMale + totalFemale;
          
          if (total > 0) {
            const femalePct = (totalFemale / total) * 100;
            const malePct = (totalMale / total) * 100;
            setFemaleParticipation(parseFloat(femalePct.toFixed(2)));
            setMaleParticipation(parseFloat(malePct.toFixed(2)));
            setGenderRatio(totalFemale / totalMale);
            
            setGenderByType([
              { name: 'Male', value: totalMale, percentage: parseFloat(malePct.toFixed(0)) },
              { name: 'Female', value: totalFemale, percentage: parseFloat(femalePct.toFixed(0)) }
            ]);
          }
        }

        // Update discipline data
        if (data.participation && data.participation.length > 0) {
          const topDisciplines = data.participation
            .slice(0, 5)
            .map(item => ({
              discipline: item.discipline,
              female: item.female,
              male: item.male
            }));
          setDisciplineData(topDisciplines);
        }
      }
    } catch (error) {
      console.error('Error loading gender data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadData();
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
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
                Statistiques par Genre
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Analyse de la participation des athlètes par genre
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
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {/* Total Athletes */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-[#0085C3]"
          >
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-[#0085C3]" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Total</span>
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              {totalAthletes.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total athlètes genre
            </div>
          </motion.div>

          {/* Female Participation */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-[#FF6B9D]"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-[#FF6B9D]" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Féminine</span>
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              {femaleParticipation.toFixed(2)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              % Participation Féminine
            </div>
          </motion.div>

          {/* Male Participation */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-[#0085C3]"
          >
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8 text-[#0085C3]" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Masculine</span>
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              {maleParticipation.toFixed(2)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              % Participation masc
            </div>
          </motion.div>

          {/* Gender Ratio */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-[#FFD100]"
          >
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-[#FFD100]" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Ratio</span>
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              {genderRatio.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Ratio H/F
            </div>
          </motion.div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart - Total athletes genre by Type */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              Total athlètes genre by Type
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} (${percentage}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderByType.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.name === 'Male' ? COLORS.male : COLORS.female} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => value.toLocaleString()}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart - Total athletes genre by Discipline and Type */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              Total athlètes genre by Discipline and Type
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={disciplineData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                  dataKey="discipline" 
                  type="category" 
                  width={100}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="female" fill={COLORS.female} name="Female" />
                <Bar dataKey="male" fill={COLORS.male} name="Male" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Data Source Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <p>Données synchronisées avec Power BI • Mise à jour automatique toutes les 30 secondes</p>
        </motion.div>
      </div>
    </div>
  );
}
