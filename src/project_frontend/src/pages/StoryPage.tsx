import React from "react";
import { Link, useParams } from "react-router-dom";
import { mockStories } from "../hooks";

function StoryPage() {
  const { id } = useParams<{ id: string }>();
  const story = mockStories.find((story) => story.id === id);
  if (!story) {
    return (
      <div className="min-h-full p-8">
        <div className="alert alert-error max-w-5xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Story not found</span>
        </div>
      </div>
    );
  }
  return (
    <article className="min-h-full p-8 max-w-5xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{story.title}</h1>
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-base-300">
          <Link
            to={`/user/${story.publisherId}`}
            className="badge badge-outline badge-primary hover:badge-primary cursor-pointer"
          >
            Publisher {story.publisherId}
          </Link>
          {story.publishedAt && (
            <div className="badge badge-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              {new Date(story.publishedAt).toLocaleDateString()}
            </div>
          )}
          {story.tags && story.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {story.tags.map((tag) => (
                <span key={tag} className="badge badge-secondary badge-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>
      <div className="prose max-w-none">
        <div className="card bg-base-100">
          <div className="card-body p-0">
            <p className="text-base-content leading-relaxed text-lg whitespace-pre-line">
              {story.text}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default StoryPage;
