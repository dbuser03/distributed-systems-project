import React from "react";
import { Link, useParams } from "react-router-dom";
import { ISICSections, mockStories } from "../data";
import { ISICSectionKey } from "../types";

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
    <div className="min-h-full p-8 max-w-4xl">
      <div className="border-b border-base-300 pb-4 mb-6">
        <h1 className="text-2xl font-semibold text-base-content mb-2">
          User {id}
        </h1>
        <div className="text-sm text-base-content/70">
          Credibility: <span className="font-medium">{credibilityScore}</span> •
          Threads: <span className="font-medium">{threadsCreated.length}</span>{" "}
          • Contributions:{" "}
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
            <div className="space-y-0">
              {threadsCreated.map((story, index) => (
                <Link
                  key={story.id}
                  to={`/story/${story.id}`}
                  className="block py-3 px-2 hover:bg-base-200 border-b border-base-300 last:border-b-0 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-base-content hover:text-primary mb-1">
                        {story.title}
                      </h3>
                      <p className="text-sm text-base-content/70 line-clamp-1">
                        {story.preview}
                      </p>
                      {story.industryTags && story.industryTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {story.industryTags
                            .slice(0, 3)
                            .map((tag: ISICSectionKey) => (
                              <span
                                key={tag}
                                className="text-xs text-base-content/60"
                              >
                                [{tag}]
                              </span>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
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
            <div className="space-y-0">
              {contributions.map((story) => (
                <Link
                  key={story.id}
                  to={`/story/${story.id}`}
                  className="block py-3 px-2 hover:bg-base-200 border-b border-base-300 last:border-b-0 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-base-content hover:text-primary mb-1">
                        {story.title}
                      </h3>
                      <p className="text-sm text-base-content/70 line-clamp-1">
                        {story.preview}
                      </p>
                      {story.industryTags && story.industryTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {story.industryTags
                            .slice(0, 3)
                            .map((tag: ISICSectionKey) => (
                              <span
                                key={tag}
                                className="text-xs text-base-content/60"
                              >
                                [{ISICSections[tag]}]
                              </span>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default UserPage;
