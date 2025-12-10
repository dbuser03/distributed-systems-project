import React from "react";

interface StoryContentProps {
  content: string;
}

function StoryContent({ content }: StoryContentProps) {
  return (
    <div className="prose max-w-none">
      <div className="card bg-base-100">
        <div className="card-body p-0">
          <p className="text-base-content text-lg whitespace-pre-line">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StoryContent;
