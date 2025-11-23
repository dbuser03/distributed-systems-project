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
      <div>
        <h1 className="text-3xl mb-8">Search</h1>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search for a story"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <section>
        <h2 className="text-2xl mb-4">Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((story) => (
            <Link
              key={story.id}
              to={`/story/${story.id}`}
              className="block bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <StoryLink story={story} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SearchPage;
