// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   ArcElement,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import { Doughnut } from 'react-chartjs-2';
// import { useEffect, useRef } from 'react';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const EarningsRevenueChart = () => {
//   const chartRef = useRef(null);

//   const data = {
//     labels: [
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Aug',
//       'Sep',
//       'Oct',
//       'Nov',
//       'Dec',
//     ],
//     datasets: [
//       {
//         label: 'Revenue',
//         data: [30, 50, 45, 70, 65, 75, 80, 85, 90, 100, 110, 120],
//         backgroundColor: '#128E7C',
//         categoryPercentage: 0.5,
//       },
//       {
//         label: 'Orders',
//         data: [20, 40, 35, 50, 55, 65, 70, 75, 80, 85, 90, 100],
//         backgroundColor: '#38C95C',
//         categoryPercentage: 0.5,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false, // ✅ Hide default legend
//       },
//     },
//     scales: {
//       x: {
//         stacked: false,
//         grid: { display: false },
//       },
//       y: {
//         beginAtZero: true,
//         grid: { display: true, drawBorder: false },
//       },
//     },
//   };

//   useEffect(() => {
//     if (chartRef.current) {
//       const chartInstance = chartRef.current;
//       const legendContainer = document.getElementById('custom-legend');

//       if (legendContainer) {
//         legendContainer.innerHTML = `
//           <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
//             <!-- Revenue Section -->
//             <div style="display: flex; flex-direction: column; align-items: start; gap: 4px;">
//               <div style="display: flex; align-items: center; gap: 8px;">
//                 <span style="width: 12px; height: 12px; background-color: #128E7C; border-radius: 50%;"></span>
//                 <span>Revenue</span>
//               </div>
//              <div  style="display: flex; align-items: center; gap: 20px;" >
//               <span>Rs 37,802</span>
//                  <div style = "display:flex; gap:5px">
//                 <img src="/images/graphicon.png" width="16" height="16" alt="Graph Icon" />
//                 <span>1.56%</span>
//               </div>
//              </div>
//             </div>

//             <!-- Orders Section (Centered) -->
//             <div style="display: flex; flex-direction: column; align-items: start; gap: 4px; margin: auto;">
//               <div style="display: flex; align-items: start; gap: 8px;">
//                 <span style="width: 12px; height: 12px; background-color: #38C95C; border-radius: 50%;"></span>
//                 <span>Orders</span>
//               </div>
//                <div  style="display: flex; align-items: center; gap: 20px;" >
//               <span>Rs 37,802</span>
//                  <div style = "display:flex; gap:5px">
//                 <img src="/images/graphicon.png" width="16" height="16" alt="Graph Icon" />
//                 <span>1.56%</span>
//               </div>
//              </div>
//             </div>

//           </div>
//         `;
//       }
//     }
//   }, []);

//   return (
//     <div>
//       <div id="custom-legend" style={{ marginBottom: '10px' }}></div>
//       <Bar ref={chartRef} data={data} options={options as any} />
//     </div>
//   );
// };

// export const SalesByCategoryChart = () => {
//   const data = {
//     labels: ['Electronics', 'Clothing', 'Home Appliances', 'Books', 'Other'],
//     datasets: [
//       {
//         data: [25, 20, 15, 10, 30],
//         backgroundColor: [
//           '#f43f5e',
//           '#6366f1',
//           '#14b8a6',
//           '#eab308',
//           '#22c55e',
//         ],
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       legend: {
//         position: 'bottom',
//         labels: {
//           usePointStyle: true,
//           pointStyle: 'circle',
//           padding: 20,
//         },
//       },
//     },
//     layout: {
//       padding: {
//         bottom: 0,
//       },
//     },
//   };

//   return <Doughnut data={data} options={options as any} />;
// };
