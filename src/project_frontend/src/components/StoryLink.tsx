import React from "react";
import { Story } from "../types";

function StoryLink({ story }: { story: Story }) {
  return (
    <React.Fragment>
      <div className="w-full h-48 bg-gray-200 mb-4"></div>
      <h2 className="text-xl mb-1">{story.title}</h2>
      <p className="text-gray-600">{story.preview}</p>
    </React.Fragment>
  );
}

export default StoryLink;
