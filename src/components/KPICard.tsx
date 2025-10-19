import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { KPICardProps } from '../types';

export default function KPICard({ title, value, icon, trend, delay = 0 }: KPICardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.4, 0.0, 0.2, 1]
      }}
      className="relative group"
      whileHover={{ 
        scale: 1.05,
        y: -8,
        transition: { duration: 0.3 }
      }}
    >
      {/* Enhanced Glow Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#0085C3]/20 to-[#009F3D]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Glassmorphism Container */}
      <motion.div 
        className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 dark:border-gray-700/50 hover:shadow-3xl transition-all duration-500"
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)"
        }}
      >
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-5"
          style={{
            background: `radial-gradient(circle at 20% 80%, #0085C3 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, #009F3D 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, #FFD100 0%, transparent 50%)`
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className="p-3 bg-gradient-to-br from-[#0085C3] to-[#009F3D] rounded-xl text-white relative overflow-hidden"
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
              <div className="relative z-10">
                {icon}
              </div>
            </motion.div>
            
            {trend && (
              <motion.span 
                className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center gap-1"
                animate={{
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ↗
                </motion.span>
                {trend}
              </motion.span>
            )}
          </div>
          
          <motion.h3 
            className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-3xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ 
              duration: 0.6, 
              delay: delay + 0.4,
              ease: [0.4, 0.0, 0.2, 1]
            }}
            whileHover={{
              scale: 1.05,
              color: "#0085C3"
            }}
          >
            {value}
          </motion.p>
        </div>

        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0085C3]/5 to-[#009F3D]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </motion.div>
    </motion.div>
  );
}
