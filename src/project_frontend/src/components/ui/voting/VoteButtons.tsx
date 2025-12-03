import React from "react";
import { useVote } from "../../../hooks";
import { formatScore } from "../../../lib";
import { VoteButton, VoteScore } from "../voting";

interface VoteButtonsProps {
  storyId: string;
  initialUpvotes: number;
  initialDownvotes: number;
  compact?: boolean;
}

function VoteButtons({
  storyId,
  initialUpvotes,
  initialDownvotes,
  compact = false,
}: VoteButtonsProps) {
  const { userVote, score, handleVote } = useVote({
    initialUpvotes,
    initialDownvotes,
  });

  const size = compact ? "sm" : "md";
  const containerClass = compact
    ? "flex items-center gap-1 bg-base-200 rounded-full px-2 py-1"
    : "flex flex-col items-center gap-1 bg-base-200 rounded-lg px-2 py-2";

  return (
    <div className={containerClass}>
      <VoteButton
        direction="up"
        isActive={userVote === "up"}
        onClick={(e) => handleVote("up", e)}
        size={size}
      />
      <VoteScore
        score={score}
        userVote={userVote}
        formattedScore={formatScore(score)}
        size={size}
      />
      <VoteButton
        direction="down"
        isActive={userVote === "down"}
        onClick={(e) => handleVote("down", e)}
        size={size}
      />
    </div>
  );
}

export default VoteButtons;
