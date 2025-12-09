import React, { useCallback } from "react";
import { ISICSectionKey } from "../../../types";
import { ISICSections } from "../../../data/index";
import FilterDropdown from "../filters/FilterDropdown";
import { FilterIcon } from "../../icons/FilterIcons";

interface TagInputProps {
  tags: ISICSectionKey[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: ISICSectionKey) => void;
}

export function TagInput({
  tags,
  inputValue,
  onInputChange,
  onAddTag,
  onRemoveTag,
}: TagInputProps) {
  const availableTags = Object.keys(ISICSections) as ISICSectionKey[];

  const handleTagSelect = (tag: ISICSectionKey) => {
    if (!tags.includes(tag)) {
      onAddTag(tag);
    }
  };

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Tags</legend>
      <div className="flex gap-2 items-start">
        <FilterDropdown
          label="Select Tags"
          icon={<FilterIcon />}
          badgeCount={tags.length}
          className="w-80"
        >
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {availableTags.map((tag) => (
              <label
                key={tag}
                className="flex items-center gap-2 cursor-pointer hover:bg-base-200 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={tags.includes(tag)}
                  onChange={() => {
                    if (tags.includes(tag)) {
                      onRemoveTag(tag);
                    } else {
                      handleTagSelect(tag);
                    }
                  }}
                  className="checkbox checkbox-sm"
                />
                <span className="text-sm">{ISICSections[tag]}</span>
              </label>
            ))}
          </div>
        </FilterDropdown>
      </div>
      {tags.length > 0 && <TagList tags={tags} onRemove={onRemoveTag} />}
      <div className="label">Optional</div>
    </fieldset>
  );
}

interface TagListProps {
  tags: ISICSectionKey[];
  onRemove: (tag: ISICSectionKey) => void;
}

function TagList({ tags, onRemove }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag) => (
        <TagBadge key={tag} tag={tag} onRemove={() => onRemove(tag)} />
      ))}
    </div>
  );
}

interface TagBadgeProps {
  tag: ISICSectionKey;
  onRemove: () => void;
}

function TagBadge({ tag, onRemove }: TagBadgeProps) {
  return (
    <div
      className="badge badge-secondary cursor-pointer"
      onClick={onRemove}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onRemove()}
    >
      {ISICSections[tag]} ×
    </div>
  );
}
