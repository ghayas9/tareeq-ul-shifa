import React from 'react';

interface Props {
  stats: any;
  className?: string;
}

const StatsCards = ({ stats, className }: Props) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 ${className}`}>
      {stats?.map((stat: any) => (
        <div
          key={stat.id}
          className="bg-white flex justify-between p-4 rounded-lg shadow-sm"
        >
          <div className="flex items-start mb-2">
            <div
              className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center mr-2`}
            >
              {stat.icon}
            </div>
          </div>
          <div className="flex flex-col items-start -mb-2 justify-end">
            <span className="text-sm text-gray-500">{stat.title}</span>
            <p className="text-[28px] font-medium">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
