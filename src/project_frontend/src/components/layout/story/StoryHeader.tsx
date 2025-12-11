import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "../../icons/CommonIcons";
import { ISICSections, Countries } from "../../../data";
import { Story, ISICSectionKey } from "../../../types";
import { CalendarIcon } from "../../icons";

interface StoryHeaderProps {
  story: Story;
}

function StoryHeader({ story }: StoryHeaderProps) {
  const navigate = useNavigate();
  return (
    <header className="mb-8">
      {/* Back icon for mobile/dock screens */}
      <div className="lg:hidden mb-8 flex items-center">
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          type="button"
          className="p-0 m-0 bg-transparent border-none outline-none inline-flex items-center justify-center"
          style={{ boxShadow: "none" }}
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
      </div>
      <h1 className="text-4xl font-bold mb-6">{story.title}</h1>
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

        {story.countries && story.countries.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {story.countries.map((countryCode) => (
              <span key={countryCode} className="badge badge-accent">
                {Countries[countryCode] || countryCode}
              </span>
            ))}
          </div>
        )}

        {story.industryTags && story.industryTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {story.industryTags.map((tag: ISICSectionKey) => (
              <span key={tag} className="badge badge-secondary badge-sm">
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
