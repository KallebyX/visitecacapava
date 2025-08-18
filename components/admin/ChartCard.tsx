import React from 'react';
import { Pie, Doughnut } from 'react-chartjs-2';

interface ChartCardProps {
  title: string;
  chartType: 'pie' | 'doughnut';
  data: any; // Chart.js data object
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, chartType, data, className }) => {
  const ChartComponent = chartType === 'pie' ? Pie : Doughnut;
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 12,
          }
        }
      },
    },
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 ${className}`}>
      <h3 className="text-lg font-semibold text-slate-700 mb-4">{title}</h3>
      <div className="h-64">
        <ChartComponent data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartCard;
