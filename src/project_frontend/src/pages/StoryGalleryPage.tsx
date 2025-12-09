import React from "react";
import { Link } from "react-router-dom";
import { mockStories } from "../data";
import {
  StoryLink,
  SearchInput,
  StoryFilters,
  EmptyState,
} from "../components/ui";
import { useStoryFilters } from "../hooks";

function StoryGalleryPage() {
  const {
    filters,
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
  } = useStoryFilters(mockStories);

  const showEmptyState = filteredStories.length === 0 && hasActiveFilters;

  return (
    <div className="min-h-full p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-8">
          {filters.search ? "Search Results" : "Top Stories"}
        </h1>

        <SearchInput
          value={filters.search}
          onChange={setSearch}
          placeholder="Search for a story"
        />

        <StoryFilters
          selectedTags={filters.selectedTags}
          selectedCountries={filters.selectedCountries}
          dateRange={filters.dateRange}
          calendarMonth={calendarMonth}
          verifiedOnly={filters.verifiedOnly}
          onToggleTag={toggleTag}
          onToggleCountry={toggleCountry}
          onDateRangeChange={setDateRange}
          onCalendarMonthChange={setCalendarMonth}
          onVerifiedChange={setVerifiedOnly}
          onClearFilters={clearAllFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <section className="flex flex-col gap-4">
          {showEmptyState ? (
            <EmptyState
              search={filters.search}
              hasFilters={
                filters.selectedTags.length > 0 ||
                filters.selectedCountries.length > 0 ||
                !!filters.dateRange?.from
              }
            />
          ) : (
            filteredStories.map((story) => (
              <Link key={story.id} to={`/story/${story.id}`}>
                <StoryLink story={story} />
              </Link>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

export default StoryGalleryPage;
