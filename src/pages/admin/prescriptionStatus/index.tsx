// src/components/admin/PrescriptionStats.tsx
import React, { useEffect } from 'react';
import { usePrescription } from '@/hooks/prescription.hooks';

const PrescriptionStats: React.FC = () => {
  const { stats, getPrescriptionStats, isLoading } = usePrescription();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      await getPrescriptionStats();
    } catch (error) {
      console.error('Error loading prescription stats:', error);
    }
  };

  const StatCard = ({ 
    title, 
    value, 
    color = 'blue',
    isLoading = false 
  }: { 
    title: string; 
    value: number | undefined;
    color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray';
    isLoading?: boolean;
  }) => {
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      gray: 'bg-gray-50 text-gray-700 border-gray-200',
    };

    return (
      <div className={`border rounded-lg p-4 ${colorClasses[color]}`}>
        <h3 className="text-sm font-medium mb-1">{title}</h3>
        {isLoading ? (
          <div className="h-6 w-12 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          <p className="text-2xl font-bold">{value || 0}</p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow mb-6">
      <h2 className="text-lg font-medium mb-4">Prescription Statistics</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <StatCard 
          title="Total Prescriptions" 
          value={stats?.total}
          color="blue"
          isLoading={isLoading} 
        />
        <StatCard 
          title="Pending" 
          value={stats?.pending}
          color="yellow"
          isLoading={isLoading} 
        />
        <StatCard 
          title="In Progress" 
          value={stats?.inProgress}
          color="purple"
          isLoading={isLoading} 
        />
        <StatCard 
          title="Approved" 
          value={stats?.approved}
          color="blue"
          isLoading={isLoading} 
        />
        <StatCard 
          title="Delivered" 
          value={stats?.delivered}
          color="green"
          isLoading={isLoading} 
        />
        <StatCard 
          title="Rejected" 
          value={stats?.rejected}
          color="red"
          isLoading={isLoading} 
        />
      </div>

      <h3 className="text-md font-medium mb-3">Recent Activity</h3>
      <div className="grid grid-cols-3 gap-4">
        <StatCard 
          title="Today" 
          value={stats?.todayNew}
          color="gray"
          isLoading={isLoading} 
        />
        <StatCard 
          title="This Week" 
          value={stats?.thisWeekNew}
          color="gray"
          isLoading={isLoading} 
        />
        <StatCard 
          title="This Month" 
          value={stats?.thisMonthNew}
          color="gray"
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};

export default PrescriptionStats;