import React from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { MONTHS, getYearOptions } from "../../../lib";

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  calendarMonth: Date;
  onCalendarMonthChange: (date: Date) => void;
}

function DateRangePicker({
  dateRange,
  onDateRangeChange,
  calendarMonth,
  onCalendarMonthChange,
}: DateRangePickerProps) {
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(e.target.value);
    onCalendarMonthChange(new Date(calendarMonth.getFullYear(), month, 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(e.target.value);
    onCalendarMonthChange(new Date(year, calendarMonth.getMonth(), 1));
  };

  return (
    <>
      <h3 className="font-semibold mb-2">Select Date Range</h3>
      <div className="flex gap-2 mb-3">
        <select
          className="select select-sm select-bordered flex-1"
          value={calendarMonth.getMonth().toString()}
          onChange={handleMonthChange}
        >
          {MONTHS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          className="select select-sm select-bordered w-24"
          value={calendarMonth.getFullYear().toString()}
          onChange={handleYearChange}
        >
          {getYearOptions().map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <DayPicker
        className="react-day-picker"
        mode="range"
        selected={dateRange}
        onSelect={onDateRangeChange}
        month={calendarMonth}
        onMonthChange={onCalendarMonthChange}
      />
    </>
  );
}

export default DateRangePicker;
