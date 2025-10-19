import { motion } from 'framer-motion';
import { Trophy, Globe, Users, Target, Award, Heart, Star } from 'lucide-react';

export default function About() {
  const olympicFacts = [
    {
      icon: <Globe className="w-6 h-6" />,
      label: 'Lieu',
      value: 'Tokyo 2020',
      description: 'Japon'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      label: 'Sports',
      value: '32',
      description: 'Disciplines olympiques'
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: 'Athlètes',
      value: '10,500+',
      description: 'Participants attendus'
    },
    {
      icon: <Award className="w-6 h-6" />,
      label: 'Épreuves',
      value: '329',
      description: 'Compétitions'
    }
  ];

  const olympicValues = [
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Excellence',
      description: 'Donner le meilleur de soi-même sur le terrain de jeu et dans la vie',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Amitié',
      description: 'Construire un monde meilleur et plus pacifique grâce au sport',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Respect',
      description: 'Respecter les règles, les adversaires et l\'environnement',
      color: 'from-green-500 to-green-600'
    }
  ];

  const projectObjectives = [
    'Centraliser toutes les données olympiques dans un Data Warehouse performant',
    'Fournir des analyses en temps réel des performances et résultats',
    'Offrir un accès sécurisé aux différentes parties prenantes',
    'Faciliter la prise de décision basée sur les données',
    'Garantir la transparence et l\'intégrité des informations'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-full mb-6 shadow-lg">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-yellow-600 bg-clip-text text-transparent">
            À propos du projet
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Système de Business Intelligence dédié à l'analyse et la gestion des données des Jeux Olympiques
          </p>
        </motion.div>

        {/* Olympic Facts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Les Jeux Olympiques en chiffres
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {olympicFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-transparent hover:border-blue-500 transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mb-4 text-white">
                  {fact.icon}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {fact.label}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {fact.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {fact.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-2xl p-12 mb-16 text-white"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Notre Mission</h2>
          <p className="text-xl leading-relaxed text-center max-w-4xl mx-auto">
            Développer une plateforme de Business Intelligence de pointe pour les Jeux Olympiques, 
            permettant aux différentes parties prenantes d'accéder à des données fiables, 
            des analyses approfondies et des visualisations interactives pour optimiser 
            la gestion, l'organisation et la performance de cet événement mondial exceptionnel.
          </p>
        </motion.div>

        {/* Olympic Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Valeurs Olympiques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {olympicValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.color} rounded-full mb-6 text-white`}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Project Objectives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Objectifs du Projet
          </h2>
          <div className="space-y-6">
            {projectObjectives.map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-start group"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold mr-4 group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                  {objective}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Olympic Rings Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center space-x-4">
            <div className="w-20 h-20 rounded-full border-8 border-blue-600"></div>
            <div className="w-20 h-20 rounded-full border-8 border-yellow-600"></div>
            <div className="w-20 h-20 rounded-full border-8 border-black dark:border-white"></div>
            <div className="w-20 h-20 rounded-full border-8 border-green-600"></div>
            <div className="w-20 h-20 rounded-full border-8 border-red-600"></div>
          </div>
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 italic">
            "L'important aux Jeux Olympiques n'est pas de gagner mais de participer"
          </p>
        </motion.div>
      </div>
    </div>
  );
}
