import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { ISICSectionKey, CountryCode, Story } from "../types";

export interface StoryFilters {
  search: string;
  selectedTags: ISICSectionKey[];
  selectedCountries: CountryCode[];
  dateRange: DateRange | undefined;
  verifiedOnly: boolean;
}

export interface UseStoryFiltersReturn {
  // Filter state
  filters: StoryFilters;
  calendarMonth: Date;

  // Filtered results
  filteredStories: Story[];

  // Actions
  setSearch: (search: string) => void;
  toggleTag: (tag: ISICSectionKey) => void;
  toggleCountry: (code: CountryCode) => void;
  setDateRange: (range: DateRange | undefined) => void;
  setCalendarMonth: (date: Date) => void;
  setVerifiedOnly: (verified: boolean) => void;
  clearAllFilters: () => void;

  // Computed
  hasActiveFilters: boolean;
}

export function useStoryFilters(stories: Story[]): UseStoryFiltersReturn {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<ISICSectionKey[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<CountryCode[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filteredStories = useMemo(() => {
    let result = stories;

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter((story) =>
        story.title.toLowerCase().includes(searchLower)
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter((story) =>
        selectedTags.some((tag) => story.industryTags.includes(tag))
      );
    }

    if (selectedCountries.length > 0) {
      result = result.filter((story) =>
        selectedCountries.includes(story.country)
      );
    }

    if (dateRange?.from) {
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);
      const fromTime = fromDate.getTime();

      result = result.filter((story) => {
        if (!story.publishedAt) return false;
        const publishedTime = Number(story.publishedAt);

        if (
          dateRange.to &&
          dateRange.to.getTime() !== dateRange.from!.getTime()
        ) {
          const toDate = new Date(dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          const toTime = toDate.getTime();
          return publishedTime >= fromTime && publishedTime <= toTime;
        }

        return publishedTime >= fromTime;
      });
    }

    if (verifiedOnly) {
      result = result.filter((story) => story.status === "VERIFIED");
    }

    return result;
  }, [
    search,
    selectedTags,
    selectedCountries,
    dateRange,
    verifiedOnly,
    stories,
  ]);

  const toggleTag = (tag: ISICSectionKey) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleCountry = (code: CountryCode) => {
    setSelectedCountries((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const clearAllFilters = () => {
    setSelectedTags([]);
    setSelectedCountries([]);
    setDateRange(undefined);
    setVerifiedOnly(false);
  };

  const hasActiveFilters =
    search.length > 0 ||
    selectedTags.length > 0 ||
    selectedCountries.length > 0 ||
    dateRange?.from !== undefined;

  return {
    filters: {
      search,
      selectedTags,
      selectedCountries,
      dateRange,
      verifiedOnly,
    },
    calendarMonth,
    filteredStories,
    setSearch,
    toggleTag,
    toggleCountry,
    setDateRange,
    setCalendarMonth,
    setVerifiedOnly,
    clearAllFilters,
    hasActiveFilters,
  };
}
