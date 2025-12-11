import React from "react";
import { Link } from "react-router-dom";
import { ISICSections } from "../../../data";
import { Story, ISICSectionKey } from "../../../types";
import { CalendarIcon } from "../../icons";

interface StoryHeaderProps {
  story: Story;
}

function StoryHeader({ story }: StoryHeaderProps) {
  return (
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
            <CalendarIcon className="w-4 h-4 mr-1" />
            {new Date(Number(story.publishedAt)).toLocaleDateString()}
          </div>
        )}

        {story.industryTags && story.industryTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {story.industryTags.map((tag: ISICSectionKey) => (
              <span key={tag} className="badge badge-secondary">
                {ISICSections[tag]}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default StoryHeader;
