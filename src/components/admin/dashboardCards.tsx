// import DateRangePicker from './DateRangePicker';
// import { useDateRange } from '@/hooks/dateRange';

// const DashboardCards = ({ cardData }: any) => {
//   const [dateRange, setDateRange] = useDateRange(
//     new Date(2025, 0, 16), 
//     new Date(2025, 0, 20) 
//   );
//   return (
//     <div className="mb-8">
//       {/* Date Picker */}
//       <div className="flex justify-end mb-4">
//         <DateRangePicker
//           dateRange={dateRange}
//           onDateRangeChange={setDateRange}
//           className=""
//         />
//       </div>

//       <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
//         {cardData.map((card: any, index: any) => (
//           <div
//             key={index}
//             className="bg-white relative rounded-xl p-4 shadow-md flex items-center gap-4"
//           >
//             <div className={`${card.bgColor} text-white p-3 rounded-full`}>
//               {card.icon}
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">{card.title}</p>
//               <h2 className="text-[31px] font-semibold">{card.amount}</h2>
//             </div>
//             <div
//               className={`ml-auto absolute flex gap-2 items-center bottom-3 right-4 ${card.textColor} text-sm`}
//             >
//               {/* <ArrowDirection /> */}
//               {card.change}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardCards;


'use client';

// src/components/admin/dashboardCards.tsx
import React from 'react';
import DateRangePicker from './DateRangePicker';
import { useDateRange } from '@/hooks/dashboardDateRangeHooks';

const DashboardCards = ({ cardData }: any) => {
  // Try-catch wrapped around useDateRange hook to prevent errors
  let dateRange = { startDate: new Date(), endDate: new Date() };
  let setDateRange = (start: Date, end: Date) => {};
  
  try {
    const [hookDateRange, hookSetDateRange] = useDateRange(
      new Date(new Date().setDate(new Date().getDate() - 30)), 
      new Date()
    );
    
    dateRange = hookDateRange || { startDate: new Date(), endDate: new Date() };
    setDateRange = hookSetDateRange;
  } catch (error) {
    console.error("Error using date range hook:", error);
  }
  
  return (
    <div className="mb-8">
      {/* Date Picker with error handling */}
      <div className="flex justify-end mb-4">
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          className=""
        />
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
        {cardData.map((card: any, index: number) => (
          <div
            key={index}
            className="bg-white relative rounded-xl p-4 shadow-md flex items-center gap-4"
          >
            <div className={`${card.bgColor} text-white p-3 rounded-full`}>
              {card.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>
              <h2 className="text-[31px] font-semibold">{card.amount}</h2>
            </div>
            <div
              className={`ml-auto absolute flex gap-2 items-center bottom-3 right-4 ${card.textColor} text-sm`}
            >
              {card.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;