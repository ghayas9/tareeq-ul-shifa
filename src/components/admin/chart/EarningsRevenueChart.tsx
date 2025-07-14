import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  BarElement,
  ArcElement,
  ChartDataset,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend
);

interface EarningsRevenueChartProps {
  revenueData?: {
    labels?: string[];
    datasets?: {
      revenue?: number[];
      orders?: number[];
    };
    totals?: {
      revenue?: number;
      orders?: number;
    };
  };
}

// Define the chart dataset type with yAxisID
interface CustomChartDataset
  extends Omit<ChartDataset<'bar', number[]>, 'type'> {
  type: 'bar'; // Fixed to 'bar' instead of string
  label: string;
  backgroundColor: string;
  data: number[];
  barThickness: number;
  order: number;
  yAxisID?: string;
  originalData?: number[];
}

export const EarningsRevenueChart = ({
  revenueData,
}: EarningsRevenueChartProps) => {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  // Generate year options (current year and 4 previous years)
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 8; i++) {
      years.push(currentYear - i);
    }
    return years;
  };

  // Handle year change
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  // Format currency for display
  const formatCurrency = (value: number) => {
    return `Rs ${value.toLocaleString()}`;
  };

  // Calculate totals based on the selected year's data
  const [totalRevenue, setTotalRevenue] = useState(
    revenueData?.totals?.revenue || 0
  );
  const [totalOrders, setTotalOrders] = useState(
    revenueData?.totals?.orders || 0
  );

  // Map month numbers to names
  const monthNames = [
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
  ];

  // Get data for the chart with proper typing
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: CustomChartDataset[];
  }>({
    labels: monthNames,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Revenue',
        backgroundColor: '#128E7C',
        data: Array(12).fill(0),
        barThickness: 12,
        order: 1,
        yAxisID: 'revenue',
      },
      {
        type: 'bar' as const,
        label: 'Orders',
        backgroundColor: '#38C95C',
        data: Array(12).fill(0),
        barThickness: 12,
        order: 2,
        yAxisID: 'orders',
      },
    ],
  });

  // Fill in data from API and calculate year-specific totals
  useEffect(() => {
    if (revenueData?.labels && revenueData?.datasets) {
      let yearlyRevenueTotal = 0;
      let yearlyOrdersTotal = 0;
      let hasDataForSelectedYear = false;

      // Create new datasets to avoid direct mutation
      const newDatasets: CustomChartDataset[] = [
        {
          ...chartData.datasets[0],
          data: Array(12).fill(0),
          yAxisID: 'revenue',
          type: 'bar' as const,
        },
        {
          ...chartData.datasets[1],
          data: Array(12).fill(0),
          yAxisID: 'orders',
          type: 'bar' as const,
        },
      ];

      revenueData.labels.forEach((label, index) => {
        // Extract year from label format like "03M 2025"
        const labelYear = label.match(/\d{4}$/)?.[0];

        // Only process data from the selected year
        if (labelYear === selectedYear) {
          hasDataForSelectedYear = true;
          // Extract month from format like "03M 2025"
          const monthNum = parseInt(label.substring(0, 2)) - 1; // 0-based index
          if (monthNum >= 0 && monthNum < 12) {
            // Get values from API
            const revenueValue = revenueData?.datasets?.revenue?.[index] || 0;
            const orderValue = revenueData?.datasets?.orders?.[index] || 0;

            // Add to chart data
            newDatasets[0].data[monthNum] = revenueValue;
            newDatasets[1].data[monthNum] = orderValue;

            // Add to yearly totals
            yearlyRevenueTotal += revenueValue;
            yearlyOrdersTotal += orderValue;
          }
        }
      });

      // Update the chart datasets
      setChartData((prevData) => ({
        ...prevData,
        datasets: newDatasets,
      }));

      // Update totals based on selected year
      if (hasDataForSelectedYear) {
        setTotalRevenue(yearlyRevenueTotal);
        setTotalOrders(yearlyOrdersTotal);
      } else {
        // No data for the selected year
        setTotalRevenue(0);
        setTotalOrders(0);
      }
    }
  }, [revenueData, selectedYear]);

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (tooltipItems: any) {
            const monthName = tooltipItems[0].label;
            return `${monthName} ${selectedYear}`;
          },
          label: function (context: any) {
            if (context.dataset.label === 'Revenue') {
              return `Revenue: Rs ${context.raw.toLocaleString()}`;
            } else {
              return `Orders: ${context.raw.toLocaleString()}`;
            }
          },
        },
        backgroundColor: 'white',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 4,
        displayColors: true,
        boxWidth: 10,
        boxHeight: 10,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          drawBorder: false,
          color: '#f0f0f0',
        },
        ticks: {
          color: '#666',
        },
        stacked: false,
      },
      revenue: {
        type: 'linear',
        position: 'left',
        display: false,
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      orders: {
        type: 'linear',
        position: 'right',
        display: false,
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full">
      {/* Header with year dropdown */}
      <div className="flex md:flex-row flex-col justify-between md:items-center items-start mb-4">
        {/* Legend */}
        <div className="flex space-x-8">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#128E7C]"></div>
              <span className="text-sm font-medium">Revenue</span>
            </div>
            <div className="flex items-center mt-1">
              <span className="font-bold text-lg">
                {formatCurrency(totalRevenue)}
              </span>
              <span className="flex items-center text-green-500 ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L12 12.586V7z"
                    clipRule="evenodd"
                  />
                </svg>
                1.56%
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#38C95C]"></div>
              <span className="text-sm font-medium">Order</span>
            </div>
            <div className="flex items-center mt-1">
              <span className="font-bold text-lg">
                {totalOrders.toLocaleString()}
              </span>
              <span className="flex items-center text-green-500 ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L12 12.586V7z"
                    clipRule="evenodd"
                  />
                </svg>
                1.56%
              </span>
            </div>
          </div>
        </div>

        {/* Year Dropdown */}
        <div className="relative pt-2 md:pt-0">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="border border-gray-300 rounded-md py-1 px-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
          >
            {generateYearOptions().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Chart Container with fixed height */}
      <div className="h-80 w-full border-t border-gray-200 pt-6">
        <Bar data={chartData} options={options as any} />
      </div>
    </div>
  );
};

export default EarningsRevenueChart;
