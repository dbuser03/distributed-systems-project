import React, { useState } from "react";
import VoteButtons from "./voting/VoteButtons";
import { useAuth } from "../../context/authContext";

export type Comment = {
  id: string;
  threadId: string;
  author: string; // Principal as string
  body: string;
  likes: number;
  dislikes: number;
  createdAt: bigint; // Time.Time as BigInt
};

type CommentThreadProps = {
  comments?: Comment[];
  threadId: string;
  onCommentAdded?: () => void;
};

function CommentThread({
  comments,
  threadId,
  onCommentAdded,
}: CommentThreadProps) {
  const { actor, isAuthenticated, login } = useAuth();
  const [commentBody, setCommentBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentBody.trim() || !actor || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await actor.createComment({
        threadId,
        body: commentBody.trim(),
      });

      if ("ok" in result) {
        setCommentBody("");
        if (onCommentAdded) {
          onCommentAdded();
        }
      } else {
        setError(`Failed to post comment: Error code ${result.err}`);
      }
    } catch (err) {
      console.error("Error posting comment:", err);
      setError(
        "An error occurred while posting your comment. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const commentForm = (
    <div className="card bg-base-100 border border-base-300 mb-4">
      <div className="card-body p-4">
        {!isAuthenticated ? (
          <div className="alert alert-soft py-2 justify-between flex">
            <span className="text-sm">Please log in to post a comment.</span>
            <button className="btn btn-sm btn-primary ml-3" onClick={login}>
              Login with Internet Identity
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              className="textarea textarea-bordered w-full min-h-[80px] text-sm py-2"
              placeholder="Write your comment here..."
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              disabled={isSubmitting}
            />
            {error && (
              <div className="alert alert-error py-2 text-sm">
                <span>{error}</span>
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                disabled={!commentBody.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Posting...
                  </>
                ) : (
                  "Post Comment"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  // Handle empty or null comments
  if (!comments || comments.length === 0) {
    return (
      <div className="mt-12 w-full max-w-5xl">
        <h2 className="text-3xl font-bold mb-6">Comments</h2>
        {commentForm}
        <div className="alert alert-info">
          <span>No comments yet. Be the first to comment!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 w-full max-w-5xl">
      <h2 className="text-xl font-bold mb-6">Comments ({comments.length})</h2>
      {commentForm}
      <div className="space-y-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="card bg-base-100 border border-base-300"
          >
            <div className="card-body p-3">
              <div className="flex items-start gap-3">
                {/* Vote Section */}
                <div className="shrink-0">
                  <VoteButtons
                    storyId={comment.id}
                    initialUpvotes={comment.likes}
                    initialDownvotes={comment.dislikes}
                    variant="small"
                  />
                </div>

                {/* Comment Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs text-base-content/60">
                    <span className="font-medium">{comment.author}</span>
                    <span>·</span>
                    <span>
                      {new Date(Number(comment.createdAt)).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-base-content whitespace-pre-line leading-relaxed text-sm">
                    {comment.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentThread;
