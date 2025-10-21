import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface CountryData {
  country: string;
  athletes: number;
  flag?: string;
}

interface TopCountriesChartProps {
  data: CountryData[];
  title?: string;
  height?: number;
}

export default function TopCountriesChart({ 
  data, 
  title = "Top Pays par Nombre d'Athlètes",
  height = 400 
}: TopCountriesChartProps) {
  // Si pas de données, afficher un message
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
        <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
          <div className="text-center">
            <div className="text-gray-400 dark:text-gray-500 mb-2">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400">Chargement des données en cours...</p>
          </div>
        </div>
      </div>
    );
  }

  // Couleurs olympiques pour les barres
  const COLORS = [
    '#0085C3', // Bleu olympique
    '#FFD100', // Jaune olympique
    '#009F3D', // Vert olympique
    '#FF6B9D', // Rose
    '#4ECDC4', // Turquoise
    '#F77F00', // Orange
    '#06AED5', // Bleu clair
    '#EF476F', // Rose foncé
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 100,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            type="number" 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value.toLocaleString('fr-FR')}
          />
          <YAxis 
            type="category" 
            dataKey="country" 
            tick={{ fontSize: 12 }}
            width={90}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number) => [
              `${value.toLocaleString('fr-FR')} athlètes`,
              'Nombre'
            ]}
            labelFormatter={(label) => `Pays: ${label}`}
          />
          <Bar 
            dataKey="athletes" 
            radius={[0, 8, 8, 0]}
            animationDuration={1000}
          >
            {data.map((_entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* Statistiques supplémentaires */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[#0085C3]">
              {data.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Pays affichés</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#009F3D]">
              {data.reduce((sum, item) => sum + item.athletes, 0).toLocaleString('fr-FR')}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total athlètes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#FFD100]">
              {data[0] ? data[0].country : 'N/A'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Premier pays</div>
          </div>
        </div>
      </div>
    </div>
  );
}
