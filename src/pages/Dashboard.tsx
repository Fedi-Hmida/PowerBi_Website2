import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { BarChart3, PieChart, Users, TrendingUp, Sparkles, Zap, Star, RefreshCw } from 'lucide-react';
import PowerBIEmbed from '../components/PowerBIEmbed';
import MedalDistributionChart from '../components/charts/MedalDistributionChart';
import ParticipationChart from '../components/charts/ParticipationChart';
import TopCountriesChart from '../components/charts/TopCountriesChart';
import PowerBIDataService, { OlympicData } from '../services/powerBIDataService';
import ExportPDFButton from '../components/ExportPDFButton';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'powerbi' | 'charts'>('powerbi');
  const dataService = PowerBIDataService.getInstance();
  const [olympicData, setOlympicData] = useState<OlympicData>(dataService.getMockData());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    // Load Olympic data dynamically
    loadData();

    // Démarrer les mises à jour automatiques toutes les 30 secondes
    dataService.startAutoUpdate(30000);

    // Cleanup: Arrêter les mises à jour quand le composant est démonté
    return () => {
      dataService.stopAutoUpdate();
    };
  }, []);

  const loadData = async () => {
    const data = await dataService.refreshData();
    setOlympicData(data);
    setLastUpdate(new Date());
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-all duration-1000 pt-20 pb-12 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0085C3]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#009F3D]/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div 
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
          className="mb-12 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full border border-white/20 dark:border-gray-700/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-[#FFD100]" />
              </motion.div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Analytics en Temps Réel
              </span>
            </motion.div>

            <motion.button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0085C3] to-[#009F3D] text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isRefreshing ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
              >
                <RefreshCw className="w-4 h-4" />
              </motion.div>
              <span className="text-sm font-medium">
                {isRefreshing ? 'Actualisation...' : 'Actualiser les données'}
              </span>
            </motion.button>

            {/* Export PDF Button */}
            {olympicData && olympicData.kpis && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <ExportPDFButton
                  stats={{
                    totalAthletes: olympicData.kpis.totalAthletes || 11084,
                    totalCountries: olympicData.kpis.totalCountries || 93,
                    totalDisciplines: olympicData.kpis.totalDisciplines || 46,
                    totalTeams: olympicData.kpis.totalTeams || 743,
                    totalCoaches: 743,
                    athleteCoachRatio: 14.92,
                    genderDistribution: {
                      male: 52,
                      female: 48
                    }
                  }}
                  variant="icon"
                />
              </motion.div>
            )}

            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full border border-white/20 dark:border-gray-700/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}
              </span>
            </motion.div>
          </div>

          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-[#0085C3] via-[#FFD100] to-[#009F3D] bg-clip-text text-transparent">
              Tableau de Bord Analytics
            </span>
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Zap className="w-8 h-8 text-[#0085C3]" />
            </motion.div>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Analytics interactifs et insights en temps réel pour la performance des Jeux Olympiques
            <motion.div
              className="inline-block ml-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="w-5 h-5 text-[#009F3D] inline" />
            </motion.div>
          </motion.p>
        </motion.div>

        {/* Enhanced Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12 flex justify-center"
        >
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-2 rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-2xl">
            <div className="flex space-x-2">
              {[
                { id: 'powerbi', label: 'Rapports Power BI', icon: BarChart3 },
                { id: 'charts', label: 'Graphiques Interactifs', icon: PieChart }
              ].map((tab, index) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'powerbi' | 'charts')}
                  className={`relative flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#0085C3] to-[#009F3D] rounded-xl"
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <motion.div
                    className="relative z-10"
                    animate={activeTab === tab.id ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <tab.icon className="w-4 h-4" />
                  </motion.div>
                  <span className="relative z-10">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-xl"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Power BI Tab */}
        {activeTab === 'powerbi' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PowerBIEmbed 
              reportId="olympic-dashboard-report" 
              height={700}
              onError={(error) => console.error('Power BI Error:', error)}
            />
          </motion.div>
        )}

        {/* Interactive Charts Tab */}
        {activeTab === 'charts' && olympicData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="space-y-12"
          >
            {/* Medal Distribution Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0085C3]/10 to-[#009F3D]/10 rounded-3xl blur-2xl" />
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/50">
                <MedalDistributionChart 
                  data={olympicData?.medals?.slice(0, 10) || []} 
                  title="Top 10 Pays - Distribution des Médailles"
                />
              </div>
            </motion.div>

            {/* Charts Grid */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0085C3]/10 to-[#FFD100]/10 rounded-3xl blur-2xl" />
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/50">
                  <ParticipationChart 
                    data={olympicData?.participation?.slice(0, 8) || []} 
                    title="Participation des Athlètes par Discipline"
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 2.0 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD100]/10 to-[#009F3D]/10 rounded-3xl blur-2xl" />
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/50">
                  <TopCountriesChart 
                    data={olympicData?.topCountries?.slice(0, 10) || []} 
                    title="Top Pays par Nombre d'Athlètes"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Summary Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: BarChart3,
                  title: "Filtres Interactifs",
                  description: "Filtrer les données par pays, sport, année et type de médaille pour des insights personnalisés.",
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "from-blue-500/10 to-cyan-500/10",
                  iconColor: "text-blue-600 dark:text-blue-400"
                },
                {
                  icon: TrendingUp,
                  title: "Mises à Jour en Temps Réel",
                  description: "Le tableau de bord se met à jour automatiquement avec les dernières données de performance olympique.",
                  color: "from-green-500 to-emerald-500",
                  bgColor: "from-green-500/10 to-emerald-500/10",
                  iconColor: "text-green-600 dark:text-green-400"
                },
                {
                  icon: Users,
                  title: "Options d'Export",
                  description: "Exporter les rapports en PDF, PowerPoint ou Excel pour le partage et les présentations.",
                  color: "from-purple-500 to-pink-500",
                  bgColor: "from-purple-500/10 to-pink-500/10",
                  iconColor: "text-purple-600 dark:text-purple-400"
                }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 2.6 + index * 0.2 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -8
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.bgColor} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500`} />
                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/50 group-hover:shadow-3xl transition-all duration-500">
                    <div className="flex items-center space-x-4 mb-6">
                      <motion.div 
                        className={`p-3 bg-gradient-to-br ${card.color} rounded-xl text-white relative overflow-hidden`}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{ x: [-100, 100] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <card.icon className="w-6 h-6 relative z-10" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {card.description}
                    </p>
                    
                    {/* Hover Effect Overlay */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0085C3]/5 to-[#009F3D]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
