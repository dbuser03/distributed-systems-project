import React from "react";

interface EditorActionsProps {
  canSaveDraft: boolean;
  canPublish: boolean;
  onSaveDraft: (e: React.FormEvent) => void;
  onPublish: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function EditorActions({
  canSaveDraft,
  canPublish,
  onSaveDraft,
  onPublish,
  onCancel,
}: EditorActionsProps) {
  return (
    <div className="flex gap-4">
      <button
        type="submit"
        onClick={onSaveDraft}
        className="btn btn-primary"
        disabled={!canSaveDraft}
      >
        Save Draft
      </button>
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
