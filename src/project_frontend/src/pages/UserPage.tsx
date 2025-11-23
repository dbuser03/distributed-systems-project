import React from "react";
import { Link, useParams } from "react-router-dom";
import { mockStories } from "../hooks";

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
    <article className="min-h-full p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">User {id}</h1>
        <div className="text-sm text-gray-600 border-b pb-4">
          <span>Credibility Score: </span>
          <span className="font-semibold text-blue-600">
            {credibilityScore}
          </span>
        </div>
      </header>

      <div className="prose max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
            Threads Created ({threadsCreated.length})
          </h2>
          {threadsCreated.length === 0 ? (
            <p className="text-gray-600">No threads created yet.</p>
          ) : (
            <div className="space-y-4">
              {threadsCreated.map((story) => (
                <div key={story.id} className="border-b pb-4 last:border-b-0">
                  <Link
                    to={`/story/${story.id}`}
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <h3 className="text-xl font-semibold mb-1 text-gray-900">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{story.preview}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
            Contributions ({contributions.length})
          </h2>
          {contributions.length === 0 ? (
            <p className="text-gray-600">No contributions yet.</p>
          ) : (
            <div className="space-y-4">
              {contributions.map((story) => (
                <div key={story.id} className="border-b pb-4 last:border-b-0">
                  <Link
                    to={`/story/${story.id}`}
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <h3 className="text-xl font-semibold mb-1 text-gray-900">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{story.preview}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </article>
  );
}

export default UserPage;
