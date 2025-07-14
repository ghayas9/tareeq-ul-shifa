// import React, { useState } from 'react';
// import {
//   AiOutlineCalendar,
//   AiOutlineLeft,
//   AiOutlineRight,
// } from 'react-icons/ai';
// import { DateRangePickerProps } from '@/types/dateTypes';

// const formatDate = (date: Date): string => {
//   return date?.toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//   });
// };

// const DateRangePicker: React.FC<DateRangePickerProps> = ({
//   dateRange,
//   onDateRangeChange,
//   className = '',
//   buttonClassName = '',
//   popupClassName = '',
// }) => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [selecting, setSelecting] = useState<'start' | 'end'>('start');
//   const [currentMonth, setCurrentMonth] = useState<number>(
//     new Date().getMonth()
//   );
//   const [currentYear, setCurrentYear] = useState<number>(
//     new Date().getFullYear()
//   );

//   const generateCalendarDays = (): (Date | null)[] => {
//     const firstDay = new Date(currentYear, currentMonth, 1);
//     const lastDay = new Date(currentYear, currentMonth + 1, 0);
//     const days: (Date | null)[] = [];

//     for (let i = 0; i < firstDay.getDay(); i++) {
//       days.push(null);
//     }

//     for (let i = 1; i <= lastDay.getDate(); i++) {
//       days.push(new Date(currentYear, currentMonth, i));
//     }

//     return days;
//   };

//   const handleDateClick = (date: Date): void => {
//     if (selecting === 'start') {
//       onDateRangeChange(date, dateRange.endDate);
//       setSelecting('end');
//     } else {
//       if (date >= dateRange.startDate) {
//         onDateRangeChange(dateRange.startDate, date);
//         setIsOpen(false);
//         setSelecting('start');
//       }
//     }
//   };

//   const navigateMonth = (direction: 'prev' | 'next'): void => {
//     if (direction === 'next') {
//       if (currentMonth === 11) {
//         setCurrentMonth(0);
//         setCurrentYear(currentYear + 1);
//       } else {
//         setCurrentMonth(currentMonth + 1);
//       }
//     } else {
//       if (currentMonth === 0) {
//         setCurrentMonth(11);
//         setCurrentYear(currentYear - 1);
//       } else {
//         setCurrentMonth(currentMonth - 1);
//       }
//     }
//   };

//   const isDateInRange = (date: Date): boolean => {
//     return date >= dateRange.startDate && date <= dateRange.endDate;
//   };

//   const isStartDate = (date: Date): boolean => {
//     return date.getTime() === dateRange.startDate.getTime();
//   };

//   const isEndDate = (date: Date): boolean => {
//     return date.getTime() === dateRange.endDate.getTime();
//   };

//   return (
//     <div className={`relative ${className}`}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className={`w-full border border-blue-200 rounded-lg px-4 py-3 bg-white shadow-sm flex items-center gap-3 ${buttonClassName}`}
//       >
//         <AiOutlineCalendar className="text-teal-500 w-6 h-6" />
//         <span className="text-gray-800 font-medium">
//           {formatDate(dateRange.startDate)} - {formatDate(dateRange.endDate)}
//         </span>
//       </button>

//       {isOpen && (
//         <div
//           className={`absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 ${popupClassName}`}
//         >
//           <div className="flex items-center justify-between mb-4">
//             <button
//               onClick={() => navigateMonth('prev')}
//               className="p-1 hover:bg-gray-100 rounded-full"
//             >
//               <AiOutlineLeft className="w-5 h-5" />
//             </button>
//             <span className="font-semibold">
//               {new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
//                 month: 'long',
//                 year: 'numeric',
//               })}
//             </span>
//             <button
//               onClick={() => navigateMonth('next')}
//               className="p-1 hover:bg-gray-100 rounded-full"
//             >
//               <AiOutlineRight className="w-5 h-5" />
//             </button>
//           </div>

//           <div className="grid grid-cols-7 gap-1 mb-2">
//             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
//               <div key={day} className="text-center text-sm text-gray-500 p-2">
//                 {day}
//               </div>
//             ))}
//           </div>

//           <div className="grid grid-cols-7 gap-1">
//             {generateCalendarDays().map((date, index) => (
//               <div key={index} className="aspect-square">
//                 {date && (
//                   <button
//                     onClick={() => handleDateClick(date)}
//                     className={`w-full h-full flex items-center justify-center rounded-full text-sm transition-colors
//                       ${isDateInRange(date) ? 'bg-teal-100' : 'hover:bg-gray-100'}
//                       ${isStartDate(date) ? 'bg-teal-500 text-white hover:bg-teal-600' : ''}
//                       ${isEndDate(date) ? 'bg-teal-500 text-white hover:bg-teal-600' : ''}
//                     `}
//                   >
//                     {date.getDate()}
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="mt-4 text-sm text-gray-500 text-center">
//             {selecting === 'start' ? 'Select start date' : 'Select end date'}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DateRangePicker;


import React, { useState } from 'react';
import {
  AiOutlineCalendar,
  AiOutlineLeft,
  AiOutlineRight,
} from 'react-icons/ai';
import { DateRangePickerProps } from '@/types/dateTypes';

// Fixed formatDate function with proper null/undefined checking
const formatDate = (date?: Date | null): string => {
  if (!date) return 'N/A';
  
  try {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  dateRange,
  onDateRangeChange,
  className = '',
  buttonClassName = '',
  popupClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  // Ensure dateRange has valid values
  const startDate = dateRange?.startDate instanceof Date ? dateRange.startDate : new Date();
  const endDate = dateRange?.endDate instanceof Date ? dateRange.endDate : new Date();

  const generateCalendarDays = (): (Date | null)[] => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(currentYear, currentMonth, i));
    }

    return days;
  };

  const handleDateClick = (date: Date): void => {
    if (selecting === 'start') {
      onDateRangeChange(date, endDate);
      setSelecting('end');
    } else {
      if (date >= startDate) {
        onDateRangeChange(startDate, date);
        setIsOpen(false);
        setSelecting('start');
      }
    }
  };

  const navigateMonth = (direction: 'prev' | 'next'): void => {
    if (direction === 'next') {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  const isDateInRange = (date: Date): boolean => {
    try {
      return date >= startDate && date <= endDate;
    } catch (error) {
      console.error('Error checking if date is in range:', error);
      return false;
    }
  };

  const isStartDate = (date: Date): boolean => {
    try {
      return date.getTime() === startDate.getTime();
    } catch (error) {
      console.error('Error checking if date is start date:', error);
      return false;
    }
  };

  const isEndDate = (date: Date): boolean => {
    try {
      return date.getTime() === endDate.getTime();
    } catch (error) {
      console.error('Error checking if date is end date:', error);
      return false;
    }
  };

  // Safely format the month/year heading
  const formatMonthYear = (year: number, month: number): string => {
    try {
      return new Date(year, month).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting month/year:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full border border-blue-200 rounded-lg px-4 py-3 bg-white shadow-sm flex items-center gap-3 ${buttonClassName}`}
      >
        <AiOutlineCalendar className="text-teal-500 w-6 h-6" />
        <span className="text-gray-800 font-medium">
          {formatDate(startDate)} - {formatDate(endDate)}
        </span>
      </button> */}

      {isOpen && (
        <div
          className={`absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 ${popupClassName}`}
        >
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <AiOutlineLeft className="w-5 h-5" />
            </button>
            <span className="font-semibold">
              {formatMonthYear(currentYear, currentMonth)}
            </span>
            <button
              onClick={() => navigateMonth('next')}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <AiOutlineRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm text-gray-500 p-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays().map((date, index) => (
              <div key={index} className="aspect-square">
                {date && (
                  <button
                    onClick={() => handleDateClick(date)}
                    className={`w-full h-full flex items-center justify-center rounded-full text-sm transition-colors
                      ${isDateInRange(date) ? 'bg-teal-100' : 'hover:bg-gray-100'}
                      ${isStartDate(date) ? 'bg-teal-500 text-white hover:bg-teal-600' : ''}
                      ${isEndDate(date) ? 'bg-teal-500 text-white hover:bg-teal-600' : ''}
                    `}
                  >
                    {date.getDate()}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-500 text-center">
            {selecting === 'start' ? 'Select start date' : 'Select end date'}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;