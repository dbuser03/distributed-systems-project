import React from "react";
import { Story } from "../types";

function StoryLink({ story }: { story: Story }) {
  return (
    <React.Fragment>
      {/* Mobile: vertical layout, Large: horizontal with image right */}
      <article className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-2 lg:border lg:p-4 lg:rounded-lg lg:border-base-200 hover:border-base-300 transition-colors">
        <div className="flex-1 order-2 lg:order-1">
          <h2 className="text-xl mb-1 text-primary">{story.title}</h2>
          <p className="text-secondary">{story.preview}</p>
        </div>
        <div className="w-full h-48 skeleton transition-none order-1 lg:order-2 mt-4 lg:mt-0 lg:ml-4 lg:w-48 lg:h-32 lg:shrink-0" />
      </article>
    </React.Fragment>
  );
}

export default StoryLink;
