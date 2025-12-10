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

import { useState } from "react";

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

  // Pagination state
  const PAGE_SIZE = 5;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredStories.length / PAGE_SIZE));
  const pagedStories = filteredStories.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Reset to page 1 when filters/search change
  React.useEffect(() => {
    setPage(1);
  }, [
    filters.search,
    filters.selectedTags,
    filters.selectedCountries,
    filters.dateRange,
    filters.verifiedOnly,
  ]);

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
            pagedStories.map((story) => (
              <Link key={story.id} to={`/story/${story.id}`}>
                <StoryLink story={story} />
              </Link>
            ))
          )}
        </section>

        {/* Pagination Controls */}
        {filteredStories.length > PAGE_SIZE && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              className="btn btn-sm"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span className="mx-2">
              Page {page} of {totalPages}
            </span>
            <button
              className="btn btn-sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoryGalleryPage;
