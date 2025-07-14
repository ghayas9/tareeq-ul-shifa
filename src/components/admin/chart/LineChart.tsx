// import React, { useState, useEffect } from 'react';
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

// interface ChartDataItem {
//   name: string;
//   value: number;
//   hasData: boolean;
// }

// interface TotalSalesChartProps {
//   data?: number[];
//   labels?: string[];
// }

// const TotalSalesChart: React.FC<TotalSalesChartProps> = ({
//   data = [],
//   labels = [],
// }) => {
//   // State for chart data with all 12 months
//   const [chartData, setChartData] = useState<ChartDataItem[]>([]);
//   const [selectedYear, setSelectedYear] = useState<string>('');

//   // Get the current year from the first label or use current year
//   const getCurrentYear = (): string => {
//     if (labels.length > 0) {
//       // Extract year from label format like "03M 2025"
//       const match = labels[0]?.match(/\d{4}$/);
//       return match ? match[0] : new Date().getFullYear().toString();
//     }
//     return new Date().getFullYear().toString();
//   };

//   useEffect(() => {
//     // Get the current year from the data or current date
//     const year = getCurrentYear();

//     // Initialize the selected year if not already set
//     if (!selectedYear) {
//       setSelectedYear(year);
//     }

//     // Create an array of all 12 months with placeholder values
//     const allMonths: ChartDataItem[] = [
//       { name: `01M ${selectedYear || year}`, value: 0, hasData: false },
//       { name: `02M ${selectedYear || year}`, value: 0, hasData: false },
//       { name: `03M ${selectedYear || year}`, value: 0, hasData: false },
//       { name: `04M ${selectedYear || year}`, value: 0, hasData: false },
//       { name: `05M ${selectedYear || year}`, value: 0, hasData: false },
//       { name: `06M ${selectedYear || year}`, value: 0, hasData: false },
//       { name: `07M ${selectedYear || year}`, value: 0, hasData: false },
//       { name: `08M ${selectedYear || year}`, value: 0, hasData: false },
//       { name: `09M ${selectedYear || year}`, value: 0, hasData: false },
//       { name: `10M ${selectedYear || year}`, value: 0, hasData: false },
//       { name: `11M ${selectedYear || year}`, value: 0, hasData: false },
//       { name: `12M ${selectedYear || year}`, value: 0, hasData: false },
//     ];

//     // Map the actual data values to the corresponding months
//     if (data.length > 0 && labels.length > 0) {
//       labels.forEach((label, index) => {
//         // Check if this data point belongs to the selected year
//         if (label?.includes(selectedYear || year)) {
//           // Find the month index in our allMonths array
//           const monthIndex = allMonths.findIndex((item) => item.name === label);
//           if (monthIndex !== -1) {
//             allMonths[monthIndex].value = data[index];
//             allMonths[monthIndex].hasData = true;
//           }
//         }
//       });
//     }

//     setChartData(allMonths);
//   }, [data, labels, selectedYear]);

//   // Custom tooltip component
//   interface TooltipProps {
//     active?: boolean;
//     payload?: Array<{
//       payload: ChartDataItem;
//       value: number;
//       dataKey: string;
//     }>;
//     label?: string;
//   }

//   const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       const item = payload[0].payload;

//       // Only show value if there is actual data for this month
//       return (
//         <div className="bg-white p-2 shadow-md rounded-md border border-gray-200 text-sm">
//           <p className="text-gray-500">{item.name}</p>
//           {item.hasData ? (
//             <p className="font-bold">{`Rs ${item.value.toLocaleString()}`}</p>
//           ) : (
//             <p className="text-gray-400">No data available</p>
//           )}
//         </div>
//       );
//     }
//     return null;
//   };

//   // Format month labels for display
//   const formatXAxis = (value: string): string => {
//     // Convert "01M 2025" to "Jan"
//     const monthMap: Record<string, string> = {
//       '01M': 'Jan',
//       '02M': 'Feb',
//       '03M': 'Mar',
//       '04M': 'Apr',
//       '05M': 'May',
//       '06M': 'Jun',
//       '07M': 'Jul',
//       '08M': 'Aug',
//       '09M': 'Sep',
//       '10M': 'Oct',
//       '11M': 'Nov',
//       '12M': 'Dec',
//     };

//     const monthCode = value.substring(0, 3);
//     return monthMap[monthCode] || monthCode;
//   };

//   // Generate year options (current year and 4 previous years)
//   const generateYearOptions = (): number[] => {
//     const currentYear = new Date().getFullYear();
//     const years: number[] = [];
//     for (let i = 0; i < 5; i++) {
//       years.push(currentYear - i);
//     }
//     return years;
//   };

//   // Handle year change
//   const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
//     setSelectedYear(e.target.value);
//   };

//   // Filter chart data to only include months with data
//   const filteredData = chartData.filter((item) => item.hasData);

//   return (
//     <div className="w-full h-64">
//       <div className="flex justify-end mb-2">
//         <select
//           value={selectedYear}
//           onChange={handleYearChange}
//           className="border rounded px-2 py-1 text-sm text-gray-500 bg-white"
//         >
//           {generateYearOptions().map((year) => (
//             <option key={year} value={year.toString()}>
//               {year}
//             </option>
//           ))}
//         </select>
//       </div>
//       <ResponsiveContainer width="100%" height="90%">
//         <AreaChart
//           data={chartData}
//           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//         >
//           <defs>
//             <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
//             </linearGradient>
//           </defs>
//           <CartesianGrid vertical={false} stroke="#f5f5f5" />
//           <XAxis
//             dataKey="name"
//             axisLine={false}
//             tickLine={false}
//             tickFormatter={formatXAxis}
//             dy={10}
//           />
//           <YAxis
//             axisLine={false}
//             tickLine={false}
//             hide={true} // Hide Y-axis values as requested
//           />
//           <Tooltip content={<CustomTooltip />} />
//           <Area
//             type="monotone"
//             dataKey="value"
//             stroke="#10b981"
//             fillOpacity={1}
//             fill="url(#colorValue)"
//             strokeWidth={2}
//             // Simple dot configuration - no TypeScript errors
//             activeDot={{
//               r: 6,
//               strokeWidth: 3,
//               stroke: '#fff',
//               fill: '#10b981',
//             }}
//             dot={(props) => {
//               const dataItem = props.payload as ChartDataItem;
//               if (dataItem.hasData) {
//                 return (
//                   <circle
//                     cx={props.cx}
//                     cy={props.cy}
//                     r={4}
//                     fill="#10b981"
//                     stroke="#fff"
//                     strokeWidth={2}
//                   />
//                 ) as any;
//               }
//               return null;
//             }}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default TotalSalesChart;


import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartDataItem {
  name: string;
  value: number;
  hasData: boolean;
}

interface TotalSalesChartProps {
  data?: number[];
  labels?: string[];
}

const TotalSalesChart: React.FC<TotalSalesChartProps> = ({
  data = [],
  labels = [],
}) => {
  // State for chart data with all 12 months
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Update window width when resizing
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Get the current year from the first label or use current year
  const getCurrentYear = (): string => {
    if (labels.length > 0) {
      // Extract year from label format like "03M 2025"
      const match = labels[0]?.match(/\d{4}$/);
      return match ? match[0] : new Date().getFullYear().toString();
    }
    return new Date().getFullYear().toString();
  };

  useEffect(() => {
    // Get the current year from the data or current date
    const year = getCurrentYear();

    // Initialize the selected year if not already set
    if (!selectedYear) {
      setSelectedYear(year);
    }

    // Create an array of all 12 months with placeholder values
    const allMonths: ChartDataItem[] = [
      { name: `01M ${selectedYear || year}`, value: 0, hasData: false },
      { name: `02M ${selectedYear || year}`, value: 0, hasData: false },
      { name: `03M ${selectedYear || year}`, value: 0, hasData: false },
      { name: `04M ${selectedYear || year}`, value: 0, hasData: false },
      { name: `05M ${selectedYear || year}`, value: 0, hasData: false },
      { name: `06M ${selectedYear || year}`, value: 0, hasData: false },
      { name: `07M ${selectedYear || year}`, value: 0, hasData: false },
      { name: `08M ${selectedYear || year}`, value: 0, hasData: false },
      { name: `09M ${selectedYear || year}`, value: 0, hasData: false },
      { name: `10M ${selectedYear || year}`, value: 0, hasData: false },
      { name: `11M ${selectedYear || year}`, value: 0, hasData: false },
      { name: `12M ${selectedYear || year}`, value: 0, hasData: false },
    ];

    // Map the actual data values to the corresponding months
    if (data.length > 0 && labels.length > 0) {
      labels.forEach((label, index) => {
        // Check if this data point belongs to the selected year
        if (label?.includes(selectedYear || year)) {
          // Find the month index in our allMonths array
          const monthIndex = allMonths.findIndex((item) => item.name === label);
          if (monthIndex !== -1) {
            allMonths[monthIndex].value = data[index];
            allMonths[monthIndex].hasData = true;
          }
        }
      });
    }

    setChartData(allMonths);
  }, [data, labels, selectedYear]);

  // Custom tooltip component
  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      payload: ChartDataItem;
      value: number;
      dataKey: string;
    }>;
    label?: string;
  }

  const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;

      // Only show value if there is actual data for this month
      return (
        <div className="bg-white p-2 shadow-md rounded-md border border-gray-200 text-sm">
          <p className="text-gray-500">{item.name}</p>
          {item.hasData ? (
            <p className="font-bold">{`Rs ${item.value.toLocaleString()}`}</p>
          ) : (
            <p className="text-gray-400">No data available</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Format month labels for display
  const formatXAxis = (value: string): string => {
    // Convert "01M 2025" to "Jan"
    const monthMap: Record<string, string> = {
      '01M': 'Jan',
      '02M': 'Feb',
      '03M': 'Mar',
      '04M': 'Apr',
      '05M': 'May',
      '06M': 'Jun',
      '07M': 'Jul',
      '08M': 'Aug',
      '09M': 'Sep',
      '10M': 'Oct',
      '11M': 'Nov',
      '12M': 'Dec',
    };

    const monthCode = value.substring(0, 3);
    return monthMap[monthCode] || monthCode;
  };

  // Responsive formatter for small screens
  const getMobileFormatter = (value: string): string => {
    // Convert "01M 2025" to "J", "02M 2025" to "F", etc.
    const mobileMonthMap: Record<string, string> = {
      '01M': 'J',
      '02M': 'F',
      '03M': 'M',
      '04M': 'A',
      '05M': 'M',
      '06M': 'J',
      '07M': 'J',
      '08M': 'A',
      '09M': 'S',
      '10M': 'O',
      '11M': 'N',
      '12M': 'D',
    };

    const monthCode = value.substring(0, 3);
    return mobileMonthMap[monthCode] || monthCode;
  };

  // Generate year options (current year and 4 previous years)
  const generateYearOptions = (): number[] => {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let i = 0; i < 5; i++) {
      years.push(currentYear - i);
    }
    return years;
  };

  // Handle year change
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedYear(e.target.value);
  };

  // Get tick count based on screen width
  const isMobile = windowWidth <= 480;

  return (
    <div className="w-full h-64">
      <div className="flex justify-end mb-2">
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="border rounded px-2 py-1 text-sm text-gray-500 bg-white"
        >
          {generateYearOptions().map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f5f5f5" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tickFormatter={isMobile ? getMobileFormatter : formatXAxis}
            dy={10}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            interval={0} // Force to show all ticks
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            hide={true} // Hide Y-axis values as requested
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#10b981"
            fillOpacity={1}
            fill="url(#colorValue)"
            strokeWidth={2}
            // Simple dot configuration - no TypeScript errors
            activeDot={{
              r: 6,
              strokeWidth: 3,
              stroke: '#fff',
              fill: '#10b981',
            }}
            dot={(props) => {
              const dataItem = props.payload as ChartDataItem;
              if (dataItem.hasData) {
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={4}
                    fill="#10b981"
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ) as any;
              }
              return null;
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalSalesChart;