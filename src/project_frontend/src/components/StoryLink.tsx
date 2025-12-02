import React from "react";
import { Story } from "../types";
import { ISICSections } from "../data";

function StoryLink({ story }: { story: Story }) {
  return (
    <article className="card lg:card-side bg-base-100 shadow-sm hover:shadow-lg transition-shadow lg:h-64 w-full rounded-t-lg lg:rounded-lg">
      <div className="card-body">
        <h2 className="card-title text-primary">{story.title}</h2>
        <p className="text-base-content/70 line-clamp-3">{story.preview}</p>

        {story.industryTags && story.industryTags.length > 0 && (
          <div className="card-actions mt-4">
            {story.industryTags.slice(0, 3).map((tag) => (
              <div key={tag} className="badge badge-secondary badge-sm">
                {ISICSections[tag]}
              </div>
            ))}
          </div>
        )}
      </div>

      <figure className="order-first lg:order-last lg:w-96 lg:shrink-0 overflow-hidden">
        <div className="w-full h-56 lg:h-full bg-base-200 skeleton rounded-t-lg rounded-b-none lg:rounded-r-lg lg:rounded-tl-none lg:rounded-bl-none" />
      </figure>
    </article>
  );
}

export default StoryLink;
