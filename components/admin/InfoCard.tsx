import React from 'react';
import { IconType } from 'react-icons';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border flex items-start">
      <div className={`p-3 rounded-full mr-4`} style={{ backgroundColor: `${color}20` }}>
        <Icon className="h-6 w-6" style={{ color }} />
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
};

export default InfoCard;
