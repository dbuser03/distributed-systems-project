import React, { useCallback } from "react";
import { ISICSectionKey } from "../../../types";
import { ISICSections } from "../../../data";
import { FormField } from "./FormField";

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
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue.trim()) {
        e.preventDefault();
        onAddTag(inputValue);
      }
    },
    [inputValue, onAddTag]
  );

  return (
    <FormField id="tags" label="Tags">
      <input
        type="text"
        id="tags"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="input input-bordered w-full"
        placeholder="Type a tag and press Enter"
      />
      {tags.length > 0 && <TagList tags={tags} onRemove={onRemoveTag} />}
    </FormField>
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
