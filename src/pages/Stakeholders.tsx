import { motion } from 'framer-motion';
import { Users, Building2, Trophy, Target, Award, Medal } from 'lucide-react';

interface Stakeholder {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  responsibilities: string[];
  metrics: { label: string; value: string }[];
}

const stakeholders: Stakeholder[] = [
  {
    title: 'Comité d\'Organisation',
    description: 'Responsable de la planification et de l\'exécution globale des Jeux Olympiques',
    icon: <Building2 className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500',
    responsibilities: [
      'Coordination générale des événements',
      'Gestion des sites et infrastructures',
      'Supervision de la logistique',
      'Relations avec le CIO'
    ],
    metrics: [
      { label: 'Sites gérés', value: '32' },
      { label: 'Événements coordonnés', value: '329' },
      { label: 'Équipe', value: '5,000+' }
    ]
  },
  {
    title: 'Comités Nationaux Olympiques',
    description: 'Représentent et soutiennent les délégations nationales aux Jeux',
    icon: <Trophy className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
    responsibilities: [
      'Sélection des athlètes nationaux',
      'Préparation des équipes olympiques',
      'Support logistique aux délégations',
      'Suivi des performances nationales'
    ],
    metrics: [
      { label: 'Pays représentés', value: '93' },
      { label: 'Athlètes', value: '11,084' },
      { label: 'Équipes', value: '743' }
    ]
  },
  {
    title: 'Fédérations Sportives',
    description: 'Gouvernent et réglementent leurs disciplines sportives respectives',
    icon: <Medal className="w-8 h-8" />,
    color: 'from-orange-500 to-red-500',
    responsibilities: [
      'Établissement des règles de compétition',
      'Qualification des athlètes',
      'Formation des officiels',
      'Développement des sports'
    ],
    metrics: [
      { label: 'Disciplines', value: '46' },
      { label: 'Entraîneurs', value: '743' },
      { label: 'Ratio A/E', value: '14.92' }
    ]
  },
  {
    title: 'Athlètes Olympiques',
    description: 'Compétiteurs d\'élite représentant leurs pays aux Jeux',
    icon: <Users className="w-8 h-8" />,
    color: 'from-green-500 to-teal-500',
    responsibilities: [
      'Excellence sportive et représentation',
      'Respect des valeurs olympiques',
      'Engagement communautaire',
      'Promotion du sport'
    ],
    metrics: [
      { label: 'Participants', value: '11,084' },
      { label: 'Hommes', value: '52%' },
      { label: 'Femmes', value: '48%' }
    ]
  },
  {
    title: 'Partenaires & Sponsors',
    description: 'Soutien financier et support marketing des Jeux Olympiques',
    icon: <Award className="w-8 h-8" />,
    color: 'from-yellow-500 to-orange-500',
    responsibilities: [
      'Financement des Jeux',
      'Activation marketing',
      'Support technologique',
      'Visibilité de la marque'
    ],
    metrics: [
      { label: 'Sponsors TOP', value: '15' },
      { label: 'Partenaires', value: '100+' },
      { label: 'Investissement', value: '$3B+' }
    ]
  },
  {
    title: 'Médias & Diffuseurs',
    description: 'Couverture médiatique et diffusion mondiale des Jeux',
    icon: <Target className="w-8 h-8" />,
    color: 'from-red-500 to-pink-500',
    responsibilities: [
      'Diffusion des compétitions',
      'Production de contenu',
      'Couverture journalistique',
      'Engagement du public mondial'
    ],
    metrics: [
      { label: 'Diffuseurs', value: '200+' },
      { label: 'Heures de diffusion', value: '7,000+' },
      { label: 'Audience', value: '3B+' }
    ]
  }
];

export default function Stakeholders() {
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
            Parties Prenantes Olympiques
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto">
            Les acteurs clés qui contribuent au succès des Jeux Olympiques
          </p>
        </motion.div>

        {/* Stakeholders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {stakeholders.map((stakeholder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stakeholder.color} flex items-center justify-center text-white shadow-lg`}>
                  {stakeholder.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {stakeholder.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                {stakeholder.description}
              </p>

              {/* Responsibilities */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Responsabilités
                </h4>
                <ul className="space-y-2">
                  {stakeholder.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#0085C3] to-[#009F3D] mt-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4">
                {stakeholder.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-bold text-[#0085C3] mb-1">
                      {metric.value}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 bg-gradient-to-br from-[#0085C3]/10 to-[#009F3D]/10 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Écosystème Olympique
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Les Jeux Olympiques réunissent un écosystème diversifié d'acteurs, chacun jouant un rôle essentiel dans le succès de l'événement. 
            De l'organisation et la logistique à la performance sportive et la couverture médiatique, chaque partie prenante contribue à créer 
            une expérience olympique exceptionnelle pour les athlètes et le public mondial.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold text-[#0085C3] mb-2">6</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">Groupes de Parties Prenantes</div>
            </div>
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold text-[#FFD100] mb-2">93</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">Pays Participants</div>
            </div>
            <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold text-[#009F3D] mb-2">11,084</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">Athlètes Olympiques</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
