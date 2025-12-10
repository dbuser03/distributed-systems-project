import React from "react";
import { TextInput, TextArea } from "./FormField";
import { TagInput } from "./TagInput";
import { EditorActions } from "./EditorActions";
import { StoryFormData } from "../../../hooks/useStoryEditor";
import { ISICSectionKey } from "../../../types";

interface StoryEditorFormProps {
  formData: StoryFormData;
  canSaveDraft: boolean;
  canPublish: boolean;
  onUpdateField: <K extends keyof StoryFormData>(
    field: K,
    value: StoryFormData[K]
  ) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: ISICSectionKey) => void;
  onSaveDraft: (e: React.FormEvent) => void;
  onPublish: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function StoryEditorForm({
  formData,
  canSaveDraft,
  canPublish,
  onUpdateField,
  onAddTag,
  onRemoveTag,
  onSaveDraft,
  onPublish,
  onCancel,
}: StoryEditorFormProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    onUpdateField("file", files as StoryFormData["file"]);
  };

  return (
    <form className="space-y-3">
      <TextInput
        id="title"
        label="Title"
        value={formData.title}
        onChange={(value) => onUpdateField("title", value)}
        placeholder="Enter story title"
        required
      />

      <TextArea
        id="preview"
        label="Preview"
        value={formData.preview}
        onChange={(value) => onUpdateField("preview", value)}
        placeholder="Write a brief preview..."
        rows={3}
      />

      <div className="flex gap-4">
        <div className="flex-1">
          <TagInput
            tags={formData.industryTags}
            inputValue={formData.industryTagInput}
            onInputChange={(value) => onUpdateField("industryTagInput", value)}
            onAddTag={onAddTag}
            onRemoveTag={onRemoveTag}
          />
        </div>
        <div className="flex-1">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Pick file(s)</legend>
            <div className="flex gap-2 items-start">
              <input
                type="file"
                className="file-input flex-1"
                multiple
                onChange={handleFileChange}
              />
            </div>

            {formData.file && formData.file.length > 0 && (
              <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
                {formData.file.map((f, idx) => (
                  <li key={idx}>{f.name}</li>
                ))}
              </ul>
            )}
          </fieldset>
        </div>
      </div>

      <TextArea
        id="content"
        label="Story Content"
        value={formData.content}
        onChange={(value) => onUpdateField("content", value)}
        placeholder="Write your story here..."
        rows={15}
        required
      />

      <EditorActions
        canSaveDraft={canSaveDraft}
        canPublish={canPublish}
        onSaveDraft={onSaveDraft}
        onPublish={onPublish}
        onCancel={onCancel}
      />
    </form>
  );
}
