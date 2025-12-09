import React from "react";
import { ISICSections, Countries } from "../../../data";
import { ISICSectionKey, CountryCode } from "../../../types";
import { formatDateRange } from "../../../lib";
import { DateRange } from "react-day-picker";
import {
  FilterDropdown,
  CheckboxList,
  DateRangePicker,
  VerifiedToggle,
} from "./index";
import { FilterIcon, GlobeIcon, CalendarIcon } from "../../icons";

interface StoryFiltersProps {
  selectedTags: ISICSectionKey[];
  selectedCountries: CountryCode[];
  dateRange: DateRange | undefined;
  calendarMonth: Date;
  verifiedOnly: boolean;
  onToggleTag: (tag: ISICSectionKey) => void;
  onToggleCountry: (code: CountryCode) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onCalendarMonthChange: (date: Date) => void;
  onVerifiedChange: (verified: boolean) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

function StoryFilters({
  selectedTags,
  selectedCountries,
  dateRange,
  calendarMonth,
  verifiedOnly,
  onToggleTag,
  onToggleCountry,
  onDateRangeChange,
  onCalendarMonthChange,
  onVerifiedChange,
  onClearFilters,
  hasActiveFilters,
}: StoryFiltersProps) {
  const industryItems = (Object.keys(ISICSections) as ISICSectionKey[]).map(
    (key) => ({
      key,
      label: ISICSections[key],
    })
  );

  const countryItems = (Object.keys(Countries) as CountryCode[]).map(
    (code) => ({
      key: code,
      label: Countries[code],
    })
  );

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      {/* Industry Filter */}
      <FilterDropdown
        label="Filter by Industry"
        icon={<FilterIcon />}
        badgeCount={selectedTags.length}
        className="w-80"
      >
        <CheckboxList
          title="Select Industry Tags"
          items={industryItems}
          selectedItems={selectedTags}
          onToggle={onToggleTag}
        />
      </FilterDropdown>

      {/* Country Filter */}
      <FilterDropdown
        label="Filter by Country"
        icon={<GlobeIcon />}
        badgeCount={selectedCountries.length}
      >
        <CheckboxList
          title="Select Country"
          items={countryItems}
          selectedItems={selectedCountries}
          onToggle={onToggleCountry}
        />
      </FilterDropdown>

      {/* Date Range Filter */}
      <FilterDropdown
        label={formatDateRange(dateRange)}
        icon={<CalendarIcon />}
        badgeCount={dateRange?.from ? 1 : 0}
        className="w-auto"
      >
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
          calendarMonth={calendarMonth}
          onCalendarMonthChange={onCalendarMonthChange}
        />
      </FilterDropdown>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="btn btn-ghost text-error whitespace-nowrap"
        >
          Clear all filters
        </button>
      )}

      {/* Verified Toggle */}
      <VerifiedToggle checked={verifiedOnly} onChange={onVerifiedChange} />
    </div>
  );
}

export default StoryFilters;
