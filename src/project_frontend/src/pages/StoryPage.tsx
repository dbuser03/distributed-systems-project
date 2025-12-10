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
import CommentThread from "../components/ui/CommentThread";

function StoryPage() {
  const { id } = useParams<{ id: string }>();
  const { story, comments, error, isLoading } = useStory(id);

  if (isLoading) {
    return (
      <div className="min-h-full p-8 flex justify-center items-center">
        <p className="animate-pulse">Loading story...</p>
      </div>
    );
  }

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

      <CommentThread comments={comments ?? []} threadId={story.id} />
    </div>
  );
}

export default StoryPage;
