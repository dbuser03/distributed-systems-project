import React from "react";
import { useVote } from "../../../hooks";
import { formatScore } from "../../../lib";
import { VoteButton, VoteScore } from "../voting";

type VoteButtonsVariant = "default" | "compact" | "small";

interface VoteButtonsProps {
  storyId: string;
  initialUpvotes: number;
  initialDownvotes: number;
  variant?: VoteButtonsVariant;
}

function VoteButtons({
  storyId,
  initialUpvotes,
  initialDownvotes,
  variant = "default",
}: VoteButtonsProps) {
  const { userVote, score, isLoaded, handleVote } = useVote({
    initialUpvotes,
    initialDownvotes,
    storyId,
  });

  const size = variant === "small" ? "xs" : variant === "compact" ? "sm" : "md";

  const containerClass =
    variant === "small"
      ? "flex flex-col items-center gap-0.5 bg-transparent"
      : variant === "compact"
      ? "flex items-center gap-1 bg-base-200 rounded-full px-2 py-1"
      : "flex flex-col items-center gap-1 bg-base-200 rounded-lg px-2 py-2";

  // Disabilita i pulsanti mentre il voto sta caricando
  const isDisabled = !isLoaded;

  return (
    <div className={containerClass}>
      <VoteButton
        direction="up"
        isActive={isLoaded && userVote === "up"}
        onClick={(e) => handleVote("up", e)}
        size={size}
        disabled={isDisabled}
      />
      <VoteScore
        score={score}
        userVote={isLoaded ? userVote : "null"}
        formattedScore={formatScore(score)}
        size={size}
      />
      <VoteButton
        direction="down"
        isActive={isLoaded && userVote === "down"}
        onClick={(e) => handleVote("down", e)}
        size={size}
        disabled={isDisabled}
      />
    </div>
  );
}

export default VoteButtons;
