import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface MedalData {
  country: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

interface MedalDistributionChartProps {
  data: MedalData[];
  title?: string;
  height?: number;
}

const COLORS = {
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32',
};

export default function MedalDistributionChart({ 
  data, 
  title = "Distribution des Médailles par Pays",
  height = 400 
}: MedalDistributionChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="country" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value, name) => [
              value,
              name === 'gold' ? 'Or' : name === 'silver' ? 'Argent' : 'Bronze'
            ]}
          />
          <Legend />
          <Bar dataKey="gold" stackId="a" fill={COLORS.gold} name="Or" />
          <Bar dataKey="silver" stackId="a" fill={COLORS.silver} name="Argent" />
          <Bar dataKey="bronze" stackId="a" fill={COLORS.bronze} name="Bronze" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
