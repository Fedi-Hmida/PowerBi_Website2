import React from 'react';
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

interface GenderParityData {
  discipline: string;
  female: number;
  male: number;
  parity: number;
}

interface GenderParityChartProps {
  data: GenderParityData[];
  title?: string;
  height?: number;
}

export default function GenderParityChart({ 
  data, 
  title = "Parité des Genres par Discipline",
  height = 400 
}: GenderParityChartProps) {
  // Transform data for diverging bar chart
  const chartData = data.map(item => ({
    ...item,
    femalePercent: (item.female / (item.female + item.male)) * 100,
    malePercent: (item.male / (item.female + item.male)) * 100,
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={chartData}
          layout="horizontal"
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            type="number" 
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis 
            type="category" 
            dataKey="discipline" 
            tick={{ fontSize: 12 }}
            width={120}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value, name) => [
              `${value.toFixed(1)}%`,
              name === 'femalePercent' ? 'Féminin' : 'Masculin'
            ]}
          />
          <Bar 
            dataKey="femalePercent" 
            fill="#FF6B9D" 
            name="Féminin"
            radius={[0, 4, 4, 0]}
          />
          <Bar 
            dataKey="malePercent" 
            fill="#4ECDC4" 
            name="Masculin"
            radius={[4, 0, 0, 4]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
