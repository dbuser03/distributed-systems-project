import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { mockStories } from "../data";
import { StoryLink } from "../components";

// Implement better search functionality later
// Either some backend search or preload stories to lunr.js and use that for search
function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") || "";

  const results = useMemo(() => {
    return mockStories.filter((story) =>
      story.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (value) {
      setSearchParams({ q: value }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  return (
    <div className="min-h-full p-8">
      <div className="mb-8 max-w-5xl">
        <div className="form-control">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search for a story"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      <section className="flex flex-col gap-4 max-w-5xl">
        {results.length === 0 && search ? (
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
            <span>No stories found matching "{search}"</span>
          </div>
        ) : (
          results.map((story) => (
            <Link key={story.id} to={`/story/${story.id}`}>
              <StoryLink story={story} />
            </Link>
          ))
        )}
      </section>
    </div>
  );
}

export default SearchPage;
