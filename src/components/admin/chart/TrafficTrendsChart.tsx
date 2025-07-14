import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const chartOptions = {
  chart: {
    type: 'bar',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '55%',
    },
  },
  colors: ['#22c55e'],
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ],
    labels: {
      style: {
        fontSize: '12px',
        fontWeight: 600,
      },
    },
  },
  tooltip: {
    y: {
      formatter: (val: number) => `${val} Visitors`,
    },
  },
  yaxis: {
    show: false,
  },
};

const chartSeries = [
  {
    name: 'Visitors',
    data: [
      12000, 8000, 11000, 13000, 17000, 19000, 21000, 18000, 12000, 14000,
      16000, 13000,
    ],
  },
];

const TrafficTrendsChart = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div>
      {isClient && (
        <Chart
          options={chartOptions as any}
          series={chartSeries}
          type="bar"
          height={300}
        />
      )}
    </div>
  );
};

export default TrafficTrendsChart;
