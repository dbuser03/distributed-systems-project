import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { mockStories } from "../hooks";
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
        <h1 className="text-3xl mb-8">Search</h1>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search for a story"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <section className="flex flex-col gap-4 max-w-5xl">
        {results.map((story) => (
          <Link key={story.id} to={`/story/${story.id}`}>
            <StoryLink story={story} />
          </Link>
        ))}
      </section>
    </div>
  );
}

export default SearchPage;
