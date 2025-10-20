import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Award, TrendingUp, RefreshCw, Target } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PowerBIDataService from '../services/powerBIDataService';

const COLORS = {
  primary: '#0085C3',
  secondary: '#009F3D',
  tertiary: '#FFD100',
  male: '#0085C3',
  female: '#FF6B9D',
  chart: ['#0085C3', '#009F3D', '#FFD100', '#FF6B9D', '#00A651']
};

export default function Athletes() {
  const [isLoading, setIsLoading] = useState(true);
  const [totalAthletes, setTotalAthletes] = useState(11084); // From Power BI
  const [totalNationalities, setTotalNationalities] = useState(93); // From Power BI
  const [totalDisciplines, setTotalDisciplines] = useState(46); // From Power BI
  const [genderRatio, setGenderRatio] = useState(0.92);
  
  // Gender distribution data
  const [genderData, setGenderData] = useState([
    { name: 'Male', value: 5768, percentage: 52 },
    { name: 'Female', value: 5316, percentage: 48 }
  ]);

  // Top disciplines by athlete count
  const [disciplineData, setDisciplineData] = useState([
    { discipline: 'Athletics', athletes: 2100 },
    { discipline: 'Swimming', athletes: 1000 },
    { discipline: 'Football', athletes: 950 },
    { discipline: 'Rowing', athletes: 600 },
    { discipline: 'Judo', athletes: 500 },
    { discipline: 'Gymnastics', athletes: 420 },
    { discipline: 'Fencing', athletes: 512 },
    { discipline: 'Cycling', athletes: 456 }
  ]);

  // Top countries by athlete count
  const [countryData, setCountryData] = useState([
    { country: 'United States', athletes: 613 },
    { country: 'Japan', athletes: 552 },
    { country: 'China', athletes: 431 },
    { country: 'France', athletes: 378 },
    { country: 'Germany', athletes: 434 },
    { country: 'Great Britain', athletes: 376 },
    { country: 'Italy', athletes: 384 },
    { country: 'Australia', athletes: 472 },
    { country: 'Canada', athletes: 371 },
    { country: 'Brazil', athletes: 301 }
  ]);

  useEffect(() => {
    loadAthletesData();
    
    // Auto-refresh every 30 seconds
    const powerBIService = PowerBIDataService.getInstance();
    powerBIService.startAutoUpdate(30000);
    
    const interval = setInterval(() => {
      loadAthletesData();
    }, 30000);

    return () => {
      clearInterval(interval);
      powerBIService.stopAutoUpdate();
    };
  }, []);

  const loadAthletesData = async () => {
    setIsLoading(true);
    try {
      const powerBIService = PowerBIDataService.getInstance();
      const data = await powerBIService.refreshData();

      if (data && data.kpis) {
        // Update KPIs from Power BI
        setTotalAthletes(data.kpis.totalAthletes || 11084);
        setTotalNationalities(data.kpis.totalCountries || 93);
        setTotalDisciplines(data.kpis.totalDisciplines || 46);
      }

      if (data && data.participation) {
        // Calculate gender distribution
        const totalMale = data.participation.reduce((sum, item) => sum + item.male, 0);
        const totalFemale = data.participation.reduce((sum, item) => sum + item.female, 0);
        const total = totalMale + totalFemale;
        
        if (total > 0) {
          const malePercent = Math.round((totalMale / total) * 100);
          const femalePercent = Math.round((totalFemale / total) * 100);
          
          setGenderData([
            { name: 'Male', value: totalMale, percentage: malePercent },
            { name: 'Female', value: totalFemale, percentage: femalePercent }
          ]);
          
          setGenderRatio(totalFemale / totalMale);
        }

        // Update discipline data
        const topDisciplines = data.participation
          .map(item => ({
            discipline: item.discipline,
            athletes: item.total
          }))
          .sort((a, b) => b.athletes - a.athletes)
          .slice(0, 8);
        
        if (topDisciplines.length > 0) {
          setDisciplineData(topDisciplines);
        }
      }

      if (data && data.performance) {
        // Update country data from performance
        const topCountries = data.performance
          .map(item => ({
            country: item.country,
            athletes: item.athletes
          }))
          .sort((a, b) => b.athletes - a.athletes)
          .slice(0, 10);
        
        if (topCountries.length > 0) {
          setCountryData(topCountries);
        }
      }
    } catch (error) {
      console.error('Error loading athletes data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadAthletesData();
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
                Statistiques des Athlètes
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Analyse complète des athlètes olympiques par pays et discipline
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
              Athlètes Olympiques
            </div>
          </motion.div>

          {/* Total Nationalities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-[#009F3D]"
          >
            <div className="flex items-center justify-between mb-2">
              <Globe className="w-8 h-8 text-[#009F3D]" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Pays</span>
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              {totalNationalities}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Nationalités Représentées
            </div>
          </motion.div>

          {/* Total Disciplines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-[#FFD100]"
          >
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-[#FFD100]" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Sports</span>
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              {totalDisciplines}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Disciplines Olympiques
            </div>
          </motion.div>

          {/* Gender Ratio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-[#FF6B9D]"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-[#FF6B9D]" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Parité</span>
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              {genderRatio.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Ratio Homme/Femme
            </div>
          </motion.div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gender Distribution Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#0085C3]" />
              Distribution par Genre
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.name === 'Male' ? COLORS.male : COLORS.female} 
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => value.toLocaleString()} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Countries Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#009F3D]" />
              Top 10 Pays par Athlètes
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={countryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="country" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  style={{ fontSize: '11px' }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="athletes" fill={COLORS.secondary} name="Athlètes" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Disciplines Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#FFD100]" />
            Athlètes par Discipline
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={disciplineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="discipline" 
                angle={-45}
                textAnchor="end"
                height={120}
                style={{ fontSize: '12px' }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="athletes" fill={COLORS.primary} name="Nombre d'Athlètes" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Data Source Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <p>Données synchronisées avec Power BI • Mise à jour automatique toutes les 30 secondes</p>
          <p className="mt-2">
            {totalAthletes.toLocaleString()} athlètes • {totalNationalities} pays • {totalDisciplines} disciplines
          </p>
        </motion.div>
      </div>
    </div>
  );
}
