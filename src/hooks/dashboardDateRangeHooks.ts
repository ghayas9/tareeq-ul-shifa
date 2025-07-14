// src/hooks/dateRange.ts
import { useState, useEffect } from 'react';
import { useDashboard } from './dashboard.hooks';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

/**
 * Custom hook for managing date ranges in the dashboard
 * @param initialStartDate Default start date
 * @param initialEndDate Default end date
 * @returns DateRange state and setter function
 */
export const useDateRange = (
  initialStartDate: Date = new Date(new Date().setDate(new Date().getDate() - 30)),
  initialEndDate: Date = new Date()
): [DateRange, (startDate: Date, endDate: Date) => void] => {
  // Ensure we have valid dates
  const validInitialStartDate = initialStartDate instanceof Date && !isNaN(initialStartDate.getTime()) 
    ? initialStartDate 
    : new Date(new Date().setDate(new Date().getDate() - 30));
    
  const validInitialEndDate = initialEndDate instanceof Date && !isNaN(initialEndDate.getTime())
    ? initialEndDate
    : new Date();

  // Initialize with validated dates
  const [dateRange, setDateRangeState] = useState<DateRange>({
    startDate: validInitialStartDate,
    endDate: validInitialEndDate,
  });

  // Try to access the dashboard hook, but don't fail if unavailable
  let updateDateRange: ((startDate: string, endDate: string) => void) | undefined;
  try {
    const dashboard = useDashboard();
    updateDateRange = dashboard?.updateDateRange;
  } catch (error) {
    console.error("Failed to access dashboard hook:", error);
  }

  // Format date as ISO string for API requests
  const formatDateForApi = (date: Date): string => {
    try {
      return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    } catch (error) {
      console.error("Error formatting date:", error);
      return new Date().toISOString().split('T')[0];
    }
  };

  // Update both local state and Redux state
  const setDateRange = (startDate: Date, endDate: Date) => {
    // Validate input dates
    const validStartDate = startDate instanceof Date && !isNaN(startDate.getTime())
      ? startDate
      : dateRange.startDate;
      
    const validEndDate = endDate instanceof Date && !isNaN(endDate.getTime())
      ? endDate
      : dateRange.endDate;
    
    // Update local state
    setDateRangeState({ 
      startDate: validStartDate, 
      endDate: validEndDate 
    });
    
    // Update Redux state if available
    if (updateDateRange) {
      try {
        updateDateRange(
          formatDateForApi(validStartDate),
          formatDateForApi(validEndDate)
        );
      } catch (error) {
        console.error("Failed to update date range in Redux:", error);
      }
    }
  };

  // Sync with Redux on initial load, but only if updateDateRange is available
  useEffect(() => {
    if (updateDateRange) {
      try {
        updateDateRange(
          formatDateForApi(validInitialStartDate),
          formatDateForApi(validInitialEndDate)
        );
      } catch (error) {
        console.error("Failed to initialize date range in Redux:", error);
      }
    }
  }, [updateDateRange]);

  return [dateRange, setDateRange];
};

/**
 * Helper function to get preset date ranges
 */
export const getPresetDateRanges = () => {
  const today = new Date();
  
  // Today
  const todayStart = new Date(today);
  todayStart.setHours(0, 0, 0, 0);
  
  // Yesterday
  const yesterdayStart = new Date(today);
  yesterdayStart.setDate(today.getDate() - 1);
  yesterdayStart.setHours(0, 0, 0, 0);
  
  const yesterdayEnd = new Date(yesterdayStart);
  yesterdayEnd.setHours(23, 59, 59, 999);
  
  // Last 7 days
  const last7DaysStart = new Date(today);
  last7DaysStart.setDate(today.getDate() - 6);
  last7DaysStart.setHours(0, 0, 0, 0);
  
  // Last 30 days
  const last30DaysStart = new Date(today);
  last30DaysStart.setDate(today.getDate() - 29);
  last30DaysStart.setHours(0, 0, 0, 0);
  
  // This month
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  
  // Last month
  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59, 999);
  
  return {
    today: { startDate: todayStart, endDate: today },
    yesterday: { startDate: yesterdayStart, endDate: yesterdayEnd },
    last7Days: { startDate: last7DaysStart, endDate: today },
    last30Days: { startDate: last30DaysStart, endDate: today },
    thisMonth: { startDate: thisMonthStart, endDate: today },
    lastMonth: { startDate: lastMonthStart, endDate: lastMonthEnd },
  };
};