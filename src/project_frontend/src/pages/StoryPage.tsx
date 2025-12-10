import React from "react";
import { useParams } from "react-router-dom";
import {
  NotFoundError,
  StoryHeader,
  StoryContent,
  StoryVoteSection,
} from "../components/ui";
import { StoryAttachments } from "../components/ui/StoryAttachment";
import { useStory } from "../hooks";

function StoryPage() {
  const { id } = useParams<{ id: string }>();
  const { story, error } = useStory(id);

  if (error || !story) {
    return <NotFoundError message="Story not found" />;
  }

  return (
    <div className="min-h-full p-8 flex flex-col items-center">
      <article className="w-full max-w-5xl">
        <StoryHeader story={story} />
        <StoryContent content={story.content} />
        {story.files && story.files.length > 0 && (
          <div className="mt-8">
            <StoryAttachments files={story.files} />
          </div>
        )}
        <StoryVoteSection
          storyId={story.id}
          upvotes={story.upvotes}
          downvotes={story.downvotes}
        />
      </article>
    </div>
  );
}

export default StoryPage;
