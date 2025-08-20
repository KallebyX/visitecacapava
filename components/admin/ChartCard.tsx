import React from 'react';
import { Pie, Doughnut } from 'react-chartjs-2';

interface ChartCardProps {
  title: string;
  chartType?: 'pie' | 'doughnut';
  data?: any; // Chart.js data object
  chart?: React.ReactNode; // Componente de gráfico já renderizado
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, chartType, data, chart, className }) => {
  // Se chart já foi passado, use-o diretamente
  if (chart) {
    return (
      <div className={`bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 ${className}`}>
        <h3 className="text-lg font-semibold text-slate-700 mb-4">{title}</h3>
        <div className="h-64">
          {chart}
        </div>
      </div>
    );
  }

  // Caso contrário, renderize com base em chartType e data
  if (!chartType || !data) {
    return (
      <div className={`bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 ${className}`}>
        <h3 className="text-lg font-semibold text-slate-700 mb-4">{title}</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Dados não disponíveis
        </div>
      </div>
    );
  }

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
