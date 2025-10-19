import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface PerformanceData {
  country: string;
  efficiency: number;
  athletes: number;
  medals: number;
}

interface PerformanceScatterChartProps {
  data: PerformanceData[];
  title?: string;
  height?: number;
}

const COLORS = [
  '#0085C3', '#FFD100', '#009F3D', '#FF6B6B', '#4ECDC4',
  '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8',
];

export default function PerformanceScatterChart({ 
  data, 
  title = "Efficacité de Performance vs Athlètes",
  height = 400 
}: PerformanceScatterChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <ScatterChart
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
            dataKey="athletes" 
            name="Athlètes"
            tick={{ fontSize: 12 }}
            label={{ value: 'Nombre d\'Athlètes', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            type="number" 
            dataKey="efficiency" 
            name="Efficacité"
            tick={{ fontSize: 12 }}
            label={{ value: 'Efficacité des Médailles', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value, name, props) => {
              if (name === 'efficiency') {
                return [`${(value as number * 100).toFixed(1)}%`, 'Efficacité'];
              }
              return [value, name];
            }}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                return payload[0].payload.country;
              }
              return '';
            }}
          />
          <Scatter dataKey="medals" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
