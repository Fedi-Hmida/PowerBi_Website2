import { motion } from 'framer-motion';
import { Award, TrendingUp, Users, Globe, ArrowRight, Sparkles, Zap, Star } from 'lucide-react';
import KPICard from '../components/KPICard';
import type { PageType } from '../types';

interface HomeProps {
  onNavigate: (page: PageType) => void;
}

export default function Home({ onNavigate }: HomeProps) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors relative overflow-hidden">
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
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#FFD100]/10 rounded-full blur-2xl"
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-[#0085C3] to-[#009F3D] rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-center mb-16 relative"
        >
          {/* Decorative Elements */}
          <motion.div
            className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-[#0085C3] to-[#FFD100] rounded-full opacity-20 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute -top-5 -right-5 w-16 h-16 bg-gradient-to-r from-[#FFD100] to-[#009F3D] rounded-full opacity-20 blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 relative"
            initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ 
              duration: 1, 
              delay: 0.2,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.span 
              className="bg-gradient-to-r from-[#0085C3] via-[#FFD100] to-[#009F3D] bg-clip-text text-transparent relative inline-block"
              style={{
                backgroundSize: "200% 200%"
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 20px rgba(0, 133, 195, 0.5)"
              }}
            >
              Jeux Olympiques
              <motion.div
                className="absolute -top-4 -right-8"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <Sparkles className="w-8 h-8 text-[#FFD100] drop-shadow-lg" />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-6"
                animate={{ 
                  rotate: [360, 0],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                  y: { duration: 2, repeat: Infinity }
                }}
              >
                <Star className="w-6 h-6 text-[#0085C3] drop-shadow-lg" fill="currentColor" />
              </motion.div>
            </motion.span>
            <br />
            <motion.span 
              className="text-gray-900 dark:text-white relative inline-block"
              initial={{ opacity: 0, x: -50, rotateY: 90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ 
                duration: 1, 
                delay: 0.5,
                type: "spring"
              }}
            >
              Tableau de Bord Analytics
              <motion.div
                className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-[#0085C3] via-[#FFD100] to-[#009F3D] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
              <motion.div
                className="absolute -top-2 -right-8"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Zap className="w-7 h-7 text-[#FFD100] drop-shadow-lg" fill="currentColor" />
              </motion.div>
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.8,
              type: "spring"
            }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Plateforme d'analytics de niveau entreprise avec intégration Power BI et visualisations interactives 
              fournissant des insights en temps réel pour la prise de décision stratégique, l'optimisation des performances, 
              et le suivi des médailles à travers toutes les disciplines olympiques.
            </motion.span>
            <motion.div
              className="absolute top-0 -left-8"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity 
              }}
            >
              <Star className="w-5 h-5 text-[#009F3D] opacity-60" fill="currentColor" />
            </motion.div>
            <motion.div
              className="absolute bottom-0 -right-8"
              animate={{ 
                rotate: [360, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity 
              }}
            >
              <Star className="w-4 h-4 text-[#0085C3] opacity-60" fill="currentColor" />
            </motion.div>
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 1.2,
                staggerChildren: 0.15
              }
            }
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50, rotateX: -90 },
              visible: { 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
                transition: { type: "spring", stiffness: 100 }
              }
            }}
            whileHover={{ 
              y: -10, 
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          >
            <KPICard
              title="Total Médailles"
              value="1,245"
              icon={<Award className="w-6 h-6" />}
              trend="+12%"
              delay={0.1}
            />
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50, rotateX: -90 },
              visible: { 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
                transition: { type: "spring", stiffness: 100 }
              }
            }}
            whileHover={{ 
              y: -10, 
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          >
            <KPICard
              title="Indice de Performance"
              value="92%"
              icon={<TrendingUp className="w-6 h-6" />}
              trend="+8%"
              delay={0.2}
            />
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50, rotateX: -90 },
              visible: { 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
                transition: { type: "spring", stiffness: 100 }
              }
            }}
            whileHover={{ 
              y: -10, 
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          >
            <KPICard
              title="Équilibre des Genres"
              value="47/53"
              icon={<Users className="w-6 h-6" />}
              trend="+3%"
              delay={0.3}
            />
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50, rotateX: -90 },
              visible: { 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
                transition: { type: "spring", stiffness: 100 }
              }
            }}
            whileHover={{ 
              y: -10, 
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          >
            <KPICard
              title="Pays"
              value="206"
              icon={<Globe className="w-6 h-6" />}
              delay={0.4}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button
            onClick={() => onNavigate('dashboard')}
            className="group px-8 py-4 bg-gradient-to-r from-[#0085C3] to-[#009F3D] text-white rounded-xl font-semibold text-lg shadow-2xl relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              y: -2,
              boxShadow: "0 20px 40px rgba(0, 133, 195, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#009F3D] to-[#0085C3] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: [-100, 100] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="relative z-10 flex items-center space-x-2">
              <span>Voir le Tableau de Bord en Direct</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>
          
          <motion.button
            onClick={() => onNavigate('architecture')}
            className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl text-gray-900 dark:text-white rounded-xl font-semibold text-lg shadow-2xl border border-white/20 dark:border-gray-700/50 relative overflow-hidden group"
            whileHover={{ 
              scale: 1.05,
              y: -2,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#0085C3]/10 to-[#009F3D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <span className="relative z-10">Explorer l'Architecture</span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { value: "95%", label: "Confiance de Déploiement", color: "text-[#0085C3]", bgColor: "from-[#0085C3]/10 to-[#0085C3]/5" },
            { value: "3", label: "Phases de Déploiement", color: "text-[#FFD100]", bgColor: "from-[#FFD100]/10 to-[#FFD100]/5" },
            { value: "4", label: "Groupes de Parties Prenantes", color: "text-[#009F3D]", bgColor: "from-[#009F3D]/10 to-[#009F3D]/5" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`text-center p-8 bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 relative overflow-hidden group shadow-xl`}
              whileHover={{ 
                scale: 1.08,
                y: -8,
                rotateY: 5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              initial={{ opacity: 0, y: 30, rotateX: -45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 1.6 + index * 0.2,
                type: "spring",
                stiffness: 100
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0"
                animate={{
                  rotate: [0, 360]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className={`text-5xl font-bold ${stat.color} mb-3 relative z-10`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.8 + index * 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -5, 5, -5, 0]
                }}
              >
                {stat.value}
              </motion.div>
              <motion.div 
                className="text-gray-600 dark:text-gray-300 font-medium relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 + index * 0.2 }}
              >
                {stat.label}
              </motion.div>
              
              {/* Animated corner accents */}
              <motion.div
                className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-br from-[#FFD100] to-[#0085C3] rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              />
              <motion.div
                className="absolute bottom-2 left-2 w-2 h-2 bg-gradient-to-br from-[#009F3D] to-[#FFD100] rounded-full"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
