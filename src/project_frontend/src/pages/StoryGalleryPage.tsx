import React from "react";
import { Link } from "react-router-dom";
import { mockStories } from "../hooks";

function StoryGalleryPage() {
  return (
    <div className="min-h-full p-8">
      <h1 className="text-3xl mb-8">Top Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockStories.map((story) => (
          <Link
            key={story.id}
            to={`/story/${story.id}`}
            className="block p-4 border-b"
          >
            <div className="w-full h-48 bg-gray-200 mb-4"></div>
            <h2 className="text-xl mb-1">{story.title}</h2>
            <p className="text-gray-600">{story.preview}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StoryGalleryPage;
