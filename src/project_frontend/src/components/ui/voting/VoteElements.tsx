import React from "react";
import { VoteType } from "../../../types";

interface VoteArrowProps {
  direction: "up" | "down";
  isActive: boolean;
  size?: "xs" | "sm" | "md";
}

export function VoteArrow({
  direction,
  isActive,
  size = "md",
}: VoteArrowProps) {
  const sizeClass =
    size === "xs" ? "w-3 h-3" : size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const path =
    direction === "up" ? "M12 4L3 15h18L12 4z" : "M12 20L3 9h18L12 20z";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={sizeClass}
      fill={isActive ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={isActive ? 0 : 2}
    >
      <path d={path} />
    </svg>
  );
}

interface VoteButtonProps {
  direction: "up" | "down";
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
  size?: "xs" | "sm" | "md";
}

export function VoteButton({
  direction,
  isActive,
  onClick,
  size = "md",
}: VoteButtonProps) {
  const isUpvote = direction === "up";
  const activeColor = isUpvote ? "text-success" : "text-error";
  const hoverColor = isUpvote ? "hover:text-success" : "hover:text-error";
  const btnSize =
    size === "xs" ? "btn-xs" : size === "sm" ? "btn-xs" : "btn-sm";

  return (
    <button
      onClick={onClick}
      className={`btn btn-ghost ${btnSize} btn-circle ${
        isActive
          ? `${activeColor} ${hoverColor}`
          : `text-base-content/70 ${hoverColor}`
      }`}
      aria-label={isUpvote ? "Upvote" : "Downvote"}
    >
      <VoteArrow direction={direction} isActive={isActive} size={size} />
    </button>
  );
}

interface VoteScoreProps {
  score: bigint;
  userVote: VoteType;
  formattedScore: string;
  size?: "xs" | "sm" | "md";
}

export function VoteScore({
  userVote,
  formattedScore,
  size = "md",
}: VoteScoreProps) {
  const textSize =
    size === "xs" ? "text-xs" : size === "sm" ? "text-sm" : "text-base";
  const fontWeight =
    size === "xs"
      ? "font-medium"
      : size === "sm"
      ? "font-semibold"
      : "font-bold";

  return (
    <span
      className={`${textSize} ${fontWeight} min-w-8 text-center ${
        userVote === "up"
          ? "text-success"
          : userVote === "down"
          ? "text-error"
          : "text-base-content"
      }`}
    >
      {formattedScore}
    </span>
  );
}
