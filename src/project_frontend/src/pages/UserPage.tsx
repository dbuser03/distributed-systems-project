import React from "react";
import { Link, useParams } from "react-router-dom";
import { mockStories } from "../data";
import { StoryLink } from "../components";

function UserPage() {
  const { id } = useParams<{ id: string }>();
  const threadsCreated = mockStories.filter(
    (story) => story.publisherId === id
  );
  const contributions: typeof mockStories = [];
  const credibilityScore = Math.min(
    100,
    Math.max(0, threadsCreated.length * 15 + 20)
  );

  return (
    <div className="min-h-full p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <div className="border-b border-base-300 pb-4 mb-6">
          <h1 className="text-4xl font-bold mb-8">User {id}</h1>
          <div className="text-sm text-base-content/70">
            Credibility: <span className="font-medium">{credibilityScore}</span>{" "}
            • Threads:{" "}
            <span className="font-medium">{threadsCreated.length}</span> •
            Contributions:{" "}
            <span className="font-medium">{contributions.length}</span>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-base-content mb-3 pb-2 border-b border-base-300">
              Threads Created ({threadsCreated.length})
            </h2>
            {threadsCreated.length === 0 ? (
              <p className="text-base-content/60 text-sm py-4">
                No threads created yet.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {threadsCreated.map((story) => (
                  <Link key={story.id} to={`/story/${story.id}`}>
                    <StoryLink story={story} />
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold text-base-content mb-3 pb-2 border-b border-base-300">
              Contributions ({contributions.length})
            </h2>
            {contributions.length === 0 ? (
              <p className="text-base-content/60 text-sm py-4">
                No contributions yet.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {contributions.map((story) => (
                  <Link key={story.id} to={`/story/${story.id}`}>
                    <StoryLink story={story} />
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
