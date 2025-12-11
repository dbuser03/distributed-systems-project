import React from "react";

interface EditorActionsProps {
  canPublish: boolean;
  onPublish: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function EditorActions({
  canPublish,
  onPublish,
  onCancel,
}: EditorActionsProps) {
  return (
    <div className="flex gap-4">
      <button
        type="submit"
        onClick={onPublish}
        className="btn btn-success"
        disabled={!canPublish}
      >
        Publish
      </button>
      <button type="button" onClick={onCancel} className="btn btn-ghost">
        Cancel
      </button>
    </div>
  );
}
