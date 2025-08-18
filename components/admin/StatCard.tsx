import React from 'react';

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  isText?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, isText = false }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
      <div className="bg-brand-light-green/20 p-4 rounded-full text-brand-green">
        <Icon size={32} />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className={`font-bold ${isText ? 'text-lg' : 'text-3xl'} text-brand-dark-green`}>{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
