import React from "react";
import { Link, useParams } from "react-router-dom";
import { mockStories } from "../hooks";

function StoryPage() {
  const { id } = useParams<{ id: string }>();
  const story = mockStories.find((story) => story.id === id);
  if (!story) {
    return <div>Story not found</div>;
  }
  return (
    <article className="min-h-full p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{story.title}</h1>
        <div className="text-sm text-gray-600 border-b pb-4">
          <Link
            to={`/user/${story.publisherId}`}
            className="text-blue-500 hover:underline"
          >
            Publisher {story.publisherId}
          </Link>
          {story.publishedAt && (
            <span className="ml-4">
              {new Date(story.publishedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </header>
      <div className="prose max-w-none">
        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
          {story.text}
        </p>
      </div>
    </article>
  );
}

export default StoryPage;
