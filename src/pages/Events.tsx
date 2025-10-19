import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, Trophy, Star } from 'lucide-react';

const upcomingEvents = [
  {
    id: 1,
    title: 'Natation - Finale 100m Libre',
    date: '2024-07-28',
    time: '20:30',
    venue: 'Centre Aquatique',
    capacity: 15000,
    ticketsAvailable: 150,
    category: 'Finale',
    sport: 'Natation'
  },
  {
    id: 2,
    title: 'Athlétisme - Marathon Hommes',
    date: '2024-07-29',
    time: '08:00',
    venue: 'Parcours de la Ville',
    capacity: 50000,
    ticketsAvailable: 5000,
    category: 'Épreuve',
    sport: 'Athlétisme'
  },
  {
    id: 3,
    title: 'Gymnastique - Concours Général',
    date: '2024-07-30',
    time: '18:00',
    venue: 'Arena Bercy',
    capacity: 12000,
    ticketsAvailable: 0,
    category: 'Finale',
    sport: 'Gymnastique'
  }
];

const eventCategories = [
  { name: 'Finales', count: 329, color: 'from-yellow-500 to-orange-500' },
  { name: 'Qualifications', count: 542, color: 'from-blue-500 to-purple-500' },
  { name: 'Cérémonies', count: 12, color: 'from-green-500 to-teal-500' },
  { name: 'Entraînements', count: 156, color: 'from-gray-500 to-slate-500' }
];

export default function Events() {
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
            Événements Olympiques
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto">
            Calendrier des compétitions, cérémonies et événements spéciaux
          </p>
        </motion.div>

        {/* Event Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Catégories d'Événements</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {eventCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 + 0.1 * index }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}>
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">
                  {category.count}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Prochains Événements</h2>
          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + 0.1 * index }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Trophy className="w-6 h-6 text-[#FFD100]" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {event.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.category === 'Finale' 
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                      }`}>
                        {event.category}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{event.capacity.toLocaleString()} places</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Billets disponibles</p>
                      <p className={`text-lg font-bold ${
                        event.ticketsAvailable > 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {event.ticketsAvailable > 0 ? event.ticketsAvailable.toLocaleString() : 'Complet'}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                        event.ticketsAvailable > 0
                          ? 'bg-gradient-to-r from-[#0085C3] to-[#009F3D] text-white hover:shadow-lg'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={event.ticketsAvailable === 0}
                    >
                      {event.ticketsAvailable > 0 ? 'Réserver' : 'Complet'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Event Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8 text-blue-500" />
              <span className="text-3xl font-bold text-blue-500">329</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Épreuves Médaillées</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Événements attribuant des médailles olympiques
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 dark:from-green-500/5 dark:to-teal-500/5 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-green-500" />
              <span className="text-3xl font-bold text-green-500">10,500</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Athlètes Participants</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Nombre total d'athlètes engagés
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between mb-4">
              <MapPin className="w-8 h-8 text-purple-500" />
              <span className="text-3xl font-bold text-purple-500">32</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Sites de Compétition</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Installations olympiques officielles
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}