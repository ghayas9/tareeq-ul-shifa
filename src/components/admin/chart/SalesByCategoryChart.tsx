import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface SalesByCategoryChartProps {
  data?: number[];
  labels?: string[];
  colors?: string[];
  total?: number;
}

export const SalesByCategoryChart = ({
  data = [],
  labels = [],
  colors = [],
  total = 0
}: SalesByCategoryChartProps) => {
  // Default data if props are not provided
  const defaultLabels = ['Electronics', 'Clothing', 'Home Appliances', 'Books', 'Other'];
  const defaultData = [25, 20, 15, 10, 30];
  const defaultColors = [
    '#f43f5e',
    '#6366f1',
    '#14b8a6',
    '#eab308',
    '#22c55e',
  ];

  // Use provided data or fallback to default
  const chartData = {
    labels: labels.length > 0 ? labels : defaultLabels,
    datasets: [
      {
        data: data.length > 0 ? data : defaultData,
        backgroundColor: colors.length > 0 ? colors : defaultColors,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.raw || 0;
            const calculatedTotal = total || data.reduce((sum, val) => sum + val, 0) || 1;
            const percentage = ((value / calculatedTotal) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    layout: {
      padding: {
        bottom: 0,
      },
    },
  };

  return <Doughnut data={chartData} options={options as any} />;
};

export default SalesByCategoryChart;