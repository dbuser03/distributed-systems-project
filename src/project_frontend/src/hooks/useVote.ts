import { useState, useCallback } from "react";
import { VoteType } from "../types";
import { useAuth } from "../context/authContext";

interface UseVoteProps {
  initialUpvotes: number;
  initialDownvotes: number;
  storyId: string;
}

interface UseVoteReturn {
  userVote: VoteType;
  score: number;
  handleVote: (voteType: "up" | "down", e: React.MouseEvent) => void;
}

export function useVote({
  initialUpvotes,
  initialDownvotes,
  storyId,
}: UseVoteProps): UseVoteReturn {
  const { actor } = useAuth();

  const [userVote, setUserVote] = useState<VoteType>("null");
  const [score, setScore] = useState(initialUpvotes - initialDownvotes);

  const handleVote = useCallback( async (voteType: "up" | "down", e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        const nextVote: VoteType = userVote === voteType ? "null" : voteType;
        console.log("add", storyId, nextVote)
        const res = await actor.addFeedbackThread(nextVote, storyId);
        console.log("res add", res)

        // TypeScript candid bindings usually give a variant like:
        // { err: bigint } | { newScore: bigint }
        if ("err" in res) {
          // Specifically handle 401 if you want
          if (res.err === 401n) {
            console.warn("Unauthorized (401) when sending feedback");
          } else {
            console.error("Error from addFeedbackThread:", res.err);
          }
          return;
        }

        if ("newScore" in res) {
          setScore(Number(res.newScore));
          setUserVote(nextVote);
        }
      } catch (error) {
        console.error("Failed to send feedback:", error);
      }
    },
    [actor, storyId, userVote]
  );

  return { userVote, score, handleVote };
}
