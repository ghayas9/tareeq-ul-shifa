import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const RetentionRate = () => {
  // Donut chart options for Customer Retention Rate
  const donutOptions = {
    chart: {
      type: 'donut' as const,
    },
    labels: ['New Customer', 'Active Customer', 'Inactive'],
    colors: ['#22c55e', '#10b981', '#ef4444'],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
              fontSize: '22px',
              fontWeight: 800,
            },
            total: {
              show: true,
              label: 'Total Customers',
              formatter: function () {
                return '100,000';
              },
            },
          },
        },
      },
    },
  };

  const donutSeries = [40000, 35000, 25000];

  return (
    <div className="bg-white px-6 py-3 rounded-lg shadow-sm mb-6">
      <h2 className="md:text-[28px] sm:text-2xl text-lg font-medium font-robotoSlab mb-0 ">
        Customer Retention Rate
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="flex flex-col space-y-1">
          {[
            {
              color: 'bg-green-500',
              label: 'New Customer',
              visitors: '29,000',
              percentage: '40%',
            },
            {
              color: 'bg-emerald-500',
              label: 'Active Customer',
              visitors: '29,000',
              percentage: '35%',
            },
            {
              color: 'bg-red-500',
              label: 'Inactive',
              visitors: '29,000',
              percentage: '25%',
            },
          ].map(({ color, label, visitors, percentage }, index) => (
            <div
              key={index}
              className="flex items-center md:w-3/4 w-full justify-between md:-mt-8 mt-0 py-1"
            >
              {/* Circle and Label Section */}
              <div className="flex items-center min-w-[200px]">
                <div
                  className={`w-3 h-3 rounded-full ${color} mr-2 flex-shrink-0`}
                ></div>
                <span className="text-base ">{`${label} - ${visitors} Visitors`}</span>
              </div>

              {/* Percentage Value */}
              <span className="text-sm font-medium text-right w-[40px]">
                {percentage}
              </span>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="flex justify-center items-center">
          {typeof window !== 'undefined' && (
            <Chart
              options={donutOptions}
              series={donutSeries}
              type="donut"
              height={200}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RetentionRate;
