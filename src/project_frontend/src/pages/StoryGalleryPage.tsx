import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { mockStories, ISICSections, Countries } from "../data";
import { StoryLink } from "../components";
import { ISICSectionKey, CountryCode } from "../types";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css";

function StoryGalleryPage() {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<ISICSectionKey[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<CountryCode[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());

  const filteredStories = useMemo(() => {
    let stories = mockStories;

    if (search) {
      stories = stories.filter((story) =>
        story.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedTags.length > 0) {
      stories = stories.filter((story) =>
        selectedTags.some((tag) => story.industryTags.includes(tag))
      );
    }

    if (selectedCountries.length > 0) {
      stories = stories.filter((story) =>
        selectedCountries.includes(story.country)
      );
    }

    if (dateRange?.from) {
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);
      const fromTime = fromDate.getTime();

      stories = stories.filter((story) => {
        if (!story.publishedAt) return false;
        const publishedTime = Number(story.publishedAt);

        // If end date is selected, filter within range
        if (
          dateRange.to &&
          dateRange.to.getTime() !== dateRange.from!.getTime()
        ) {
          const toDate = new Date(dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          const toTime = toDate.getTime();
          return publishedTime >= fromTime && publishedTime <= toTime;
        }

        // If only start date (or same day selected twice), show everything from that date onwards
        return publishedTime >= fromTime;
      });
    }

    return stories;
  }, [search, selectedTags, selectedCountries, dateRange]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const toggleTag = (tag: ISICSectionKey) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSelectedTags([]);
    setSelectedCountries([]);
    setDateRange(undefined);
  };

  const formatDateRange = () => {
    if (!dateRange?.from) return "Filter by Date";
    if (!dateRange.to) {
      return `From ${dateRange.from.toLocaleDateString()}`;
    }
    if (dateRange.from.getTime() === dateRange.to.getTime()) {
      return `From ${dateRange.from.toLocaleDateString()}`;
    }
    return `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`;
  };

  return (
    <div className="min-h-full p-8">
      <h1 className="text-4xl font-bold mb-8 max-w-5xl">
        {search ? "Search Results" : "Top Stories"}
      </h1>

      <label className="input mb-4 max-w-5xl w-full">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          value={search}
          onChange={handleSearch}
          placeholder="Search for a story"
        />
      </label>

      {/* Filter by Industry Tag and Date */}
      <div className="flex flex-wrap items-center gap-2 mb-8 max-w-5xl">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>
            Filter by Industry
            {selectedTags.length > 0 && (
              <span className="badge badge-primary ml-2">
                {selectedTags.length}
              </span>
            )}
          </div>
          <div
            tabIndex={0}
            className="dropdown-content card card-sm bg-base-100 z-10 w-80 shadow-md max-h-96 overflow-y-auto"
          >
            <div className="card-body">
              <h3 className="font-semibold mb-2">Select Industry Tags</h3>
              <div className="flex flex-col gap-1">
                {(Object.keys(ISICSections) as ISICSectionKey[]).map((key) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 cursor-pointer hover:bg-base-200 p-1 rounded"
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={selectedTags.includes(key)}
                      onChange={() => toggleTag(key)}
                    />
                    <span className="text-sm ml-2">{ISICSections[key]}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Country Filter */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
            Filter by Country
            {selectedCountries.length > 0 && (
              <span className="badge badge-primary ml-2">
                {selectedCountries.length}
              </span>
            )}
          </div>
          <div
            tabIndex={0}
            className="dropdown-content card card-sm bg-base-100 z-10 w-64 shadow-md max-h-96 overflow-y-auto"
          >
            <div className="card-body">
              <h3 className="font-semibold mb-2">Select Country</h3>
              <div className="flex flex-col gap-1">
                {(Object.keys(Countries) as CountryCode[]).map((code) => (
                  <label
                    key={code}
                    className="flex items-center gap-2 cursor-pointer hover:bg-base-200 p-1 rounded"
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={selectedCountries.includes(code)}
                      onChange={() => {
                        setSelectedCountries((prev) =>
                          prev.includes(code)
                            ? prev.filter((c) => c !== code)
                            : [...prev, code]
                        );
                      }}
                    />
                    <span className="text-sm ml-2">{Countries[code]}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            {formatDateRange()}
            {dateRange?.from && (
              <span className="badge badge-primary ml-2">✓</span>
            )}
          </div>
          <div
            tabIndex={0}
            className="dropdown-content card card-sm bg-base-100 z-10 shadow-md"
          >
            <div className="card-body">
              <h3 className="font-semibold mb-2">Select Date Range</h3>
              <div className="flex gap-2 mb-3">
                <select
                  className="select select-sm select-bordered flex-1"
                  value={calendarMonth.getMonth().toString()}
                  onChange={(e) => {
                    const month = parseInt(e.target.value);
                    setCalendarMonth(
                      new Date(calendarMonth.getFullYear(), month, 1)
                    );
                  }}
                >
                  <option value="0">January</option>
                  <option value="1">February</option>
                  <option value="2">March</option>
                  <option value="3">April</option>
                  <option value="4">May</option>
                  <option value="5">June</option>
                  <option value="6">July</option>
                  <option value="7">August</option>
                  <option value="8">September</option>
                  <option value="9">October</option>
                  <option value="10">November</option>
                  <option value="11">December</option>
                </select>
                <select
                  className="select select-sm select-bordered w-24"
                  value={calendarMonth.getFullYear().toString()}
                  onChange={(e) => {
                    const year = parseInt(e.target.value);
                    setCalendarMonth(
                      new Date(year, calendarMonth.getMonth(), 1)
                    );
                  }}
                >
                  {Array.from({ length: 11 }, (_, i) => 2020 + i).map(
                    (year) => (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    )
                  )}
                </select>
              </div>
              <DayPicker
                className="react-day-picker"
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                month={calendarMonth}
                onMonthChange={setCalendarMonth}
              />
            </div>
          </div>
        </div>

        {(selectedTags.length > 0 ||
          selectedCountries.length > 0 ||
          dateRange?.from) && (
          <button
            onClick={clearAllFilters}
            className="btn btn-ghost text-error"
          >
            Clear all filters
          </button>
        )}
      </div>

      <section className="flex flex-col gap-4 max-w-5xl">
        {filteredStories.length === 0 &&
        (search ||
          selectedTags.length > 0 ||
          selectedCountries.length > 0 ||
          dateRange?.from) ? (
          <div className="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              No stories found
              {search && ` matching "${search}"`}
              {(selectedTags.length > 0 ||
                selectedCountries.length > 0 ||
                dateRange?.from) &&
                ` with selected filters`}
            </span>
          </div>
        ) : (
          filteredStories.map((story) => (
            <Link key={story.id} to={`/story/${story.id}`}>
              <StoryLink story={story} />
            </Link>
          ))
        )}
      </section>
    </div>
  );
}

export default StoryGalleryPage;
