import { useState, useCallback } from "react";
import { VoteType } from "../types";

interface UseVoteProps {
  initialUpvotes: number;
  initialDownvotes: number;
}

interface UseVoteReturn {
  userVote: VoteType;
  score: number;
  handleVote: (voteType: "up" | "down", e: React.MouseEvent) => void;
}

export function useVote({
  initialUpvotes,
  initialDownvotes,
}: UseVoteProps): UseVoteReturn {
  const [userVote, setUserVote] = useState<VoteType>(null);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);

  const score = upvotes - downvotes;

  const handleVote = useCallback(
    (voteType: "up" | "down", e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (userVote === voteType) {
        // Remove vote
        setUserVote(null);
        if (voteType === "up") {
          setUpvotes((prev) => prev - 1);
        } else {
          setDownvotes((prev) => prev - 1);
        }
      } else if (userVote === null) {
        // New vote
        setUserVote(voteType);
        if (voteType === "up") {
          setUpvotes((prev) => prev + 1);
        } else {
          setDownvotes((prev) => prev + 1);
        }
      } else {
        // Changing vote
        setUserVote(voteType);
        if (voteType === "up") {
          setUpvotes((prev) => prev + 1);
          setDownvotes((prev) => prev - 1);
        } else {
          setUpvotes((prev) => prev - 1);
          setDownvotes((prev) => prev + 1);
        }
      }
    },
    [userVote]
  );

  return { userVote, score, handleVote };
}
