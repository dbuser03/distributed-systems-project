import React from "react";
import { Story } from "../types";
import { ISICSections } from "../data";

function StoryLink({ story }: { story: Story }) {
  return (
    <React.Fragment>
      {/* Mobile: vertical layout, Large: horizontal with image right */}
      <article className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
        <div className="card-body flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div className="flex-1">
            <h2 className="card-title text-primary">{story.title}</h2>
            <p className="text-base-content/70 line-clamp-2">{story.preview}</p>
            {story.industryTags && story.industryTags.length > 0 && (
              <div className="card-actions mt-2">
                {story.industryTags.slice(0, 3).map((tag) => (
                  <div key={tag} className="badge badge-secondary badge-sm">
                    {ISICSections[tag]}
                  </div>
                ))}
              </div>
            )}
          </div>
          <figure className="w-full lg:w-48 lg:shrink-0">
            <div className="w-full h-48 lg:h-32 bg-base-200 skeleton rounded-lg" />
          </figure>
        </div>
      </article>
    </React.Fragment>
  );
}

export default StoryLink;
