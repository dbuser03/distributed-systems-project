import React from "react";
import { VoteButtons } from "../../ui/voting/index";

interface StoryVoteSectionProps {
  storyId: string;
  upvotes: number;
  downvotes: number;
}

function StoryVoteSection({
  storyId,
  upvotes,
  downvotes,
}: StoryVoteSectionProps) {
  return (
    <div className="flex justify-center mt-8 pt-6 border-t border-base-300">
      <div className="flex items-center gap-4 md:gap-4">
        <span className="text-base-content/70 text-sm md:text-base">
          Was this story helpful?
        </span>
        <div className="md:scale-100 scale-90">
          <VoteButtons
            storyId={storyId}
            initialUpvotes={upvotes}
            initialDownvotes={downvotes}
            variant="compact"
          />
        </div>
      </div>
    </div>
  );
}

export default StoryVoteSection;
