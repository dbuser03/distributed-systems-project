import { DateRange } from "react-day-picker";

/**
 * Formats a date range for display in the filter button
 */
export function formatDateRange(dateRange: DateRange | undefined): string {
  if (!dateRange?.from) return "Filter by Date";

  if (!dateRange.to) {
    return `From ${dateRange.from.toLocaleDateString()}`;
  }

  if (dateRange.from.getTime() === dateRange.to.getTime()) {
    return `From ${dateRange.from.toLocaleDateString()}`;
  }

  return `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`;
}

/**
 * Generates an array of years for the date picker
 */
export function getYearOptions(
  startYear: number = 2020,
  count: number = 11
): number[] {
  return Array.from({ length: count }, (_, i) => startYear + i);
}

/**
 * Month names for the date picker
 */
export const MONTHS = [
  { value: "0", label: "January" },
  { value: "1", label: "February" },
  { value: "2", label: "March" },
  { value: "3", label: "April" },
  { value: "4", label: "May" },
  { value: "5", label: "June" },
  { value: "6", label: "July" },
  { value: "7", label: "August" },
  { value: "8", label: "September" },
  { value: "9", label: "October" },
  { value: "10", label: "November" },
  { value: "11", label: "December" },
] as const;
