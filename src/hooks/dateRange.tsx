
import { useState, useCallback } from 'react';

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export const useDateRange = (
  initialFromDate: Date | null = null,
  initialToDate: Date | null = null
): [DateRange, (range: DateRange) => void] => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: initialFromDate,
    to: initialToDate,
  });

  const handleDateRangeChange = useCallback((range: DateRange) => {
    setDateRange(range);
  }, []);

  return [dateRange, handleDateRangeChange];
};