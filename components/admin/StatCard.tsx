import React from 'react';

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  isText?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, isText = false }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80">
      <div className="flex items-center justify-between">
         <p className="text-slate-500 text-sm font-medium">{title}</p>
         <div className="text-brand-green">
            <Icon size={24} />
         </div>
      </div>
      <p className={`mt-2 font-bold ${isText ? 'text-xl' : 'text-4xl'} text-slate-800`}>{value}</p>
    </div>
  );
};

export default StatCard;