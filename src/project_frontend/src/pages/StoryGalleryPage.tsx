import React from "react";
import { Link } from "react-router-dom";
import { mockStories } from "../hooks";

function StoryGalleryPage() {
  return (
    <div className="min-h-full p-8">
      <h1 className="text-3xl mb-8 max-w-5xl">Top Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        {mockStories.map((story) => (
          <Link key={story.id} to={`/story/${story.id}`}>
            <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
              <figure>
                <div className="w-full h-48 bg-base-200 skeleton"></div>
              </figure>
              <div className="card-body flex-1 flex flex-col">
                <h2 className="card-title">{story.title}</h2>
                <p className="text-base-content/70 line-clamp-3 flex-1">
                  {story.preview}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StoryGalleryPage;
