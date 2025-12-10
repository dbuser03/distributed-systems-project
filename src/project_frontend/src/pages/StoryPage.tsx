import React from "react";
import { useParams } from "react-router-dom";
import {
  NotFoundError,
  StoryHeader,
  StoryContent,
  StoryVoteSection,
} from "../components/ui";
import { useStory } from "../hooks";
import CommentThread, { Comment } from "../components/ui/CommentThread";

function StoryPage() {
  const { id } = useParams<{ id: string }>();
  const { story, error } = useStory(id);

  const comments: Comment[] = [
    {
      id: "1",
      threadId: "1",
      author: "John Doe",
      body: "This is a comment",
      likes: 0,
      dislikes: 0,
      createdAt: BigInt(1718000000000),
    },
    {
      id: "2",
      threadId: "1",
      author: "Jane Doe",
      body: "This is another comment",
      likes: 0,
      dislikes: 0,
      createdAt: BigInt(1718000000000),
    },
  ];

  if (error || !story) {
    return <NotFoundError message="Story not found" />;
  }

  return (
    <div className="min-h-full p-8 flex flex-col items-center">
      <article className="w-full max-w-5xl">
        <StoryHeader story={story} />
        <StoryContent content={story.body} />
        <StoryVoteSection
          storyId={story.id}
          upvotes={story.likes}
          downvotes={story.dislikes}
        />
      </article>

      <CommentThread comments={comments ?? []} threadId={story.id} />
    </div>
  );
}

export default StoryPage;
