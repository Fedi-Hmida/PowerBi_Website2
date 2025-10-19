import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface ParticipationData {
  discipline: string;
  male: number;
  female: number;
  total: number;
}

interface ParticipationChartProps {
  data: ParticipationData[];
  title?: string;
  height?: number;
}

const COLORS = [
  '#0085C3', '#FFD100', '#009F3D', '#FF6B6B', '#4ECDC4',
  '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA',
];

export default function ParticipationChart({ 
  data, 
  title = "Participation par Discipline",
  height = 400 
}: ParticipationChartProps) {
  // Transform data for pie chart
  const pieData = data.map((item, index) => ({
    name: item.discipline,
    value: item.total,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value, name) => [value, 'Athlètes']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
