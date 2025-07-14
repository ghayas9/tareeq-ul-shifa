export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface DateRangePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (start: Date, end: Date) => void;
  className?: string;
  buttonClassName?: string;
  popupClassName?: string;
}
