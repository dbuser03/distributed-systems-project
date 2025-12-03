import React from "react";
import { InfoIcon } from "../icons";

interface EmptyStateProps {
  search?: string;
  hasFilters?: boolean;
}

function EmptyState({ search, hasFilters }: EmptyStateProps) {
  return (
    <div className="alert alert-info">
      <InfoIcon />
      <span>
        No stories found
        {search && ` matching "${search}"`}
        {hasFilters && ` with selected filters`}
      </span>
    </div>
  );
}

export default EmptyState;
