import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function StoryEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [formData, setFormData] = useState({
    title: "",
    preview: "",
    text: "",
    tags: [] as string[],
    tagInput: "",
  });

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && formData.tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(formData.tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, formData.tagInput.trim()],
          tagInput: "",
        });
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.text) return;
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.text || !formData.preview) return;
  };

  return (
    <div className="min-h-full p-8">
      <h1 className="text-4xl font-bold mb-8 max-w-5xl">
        {id ? "Edit Story" : "Story Editor"}
      </h1>

      <form className="space-y-6 max-w-5xl">
        <div className="form-control">
          <label htmlFor="title" className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="input input-bordered w-full"
            placeholder="Enter story title"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="preview" className="label">
            <span className="label-text">Preview</span>
          </label>
          <textarea
            id="preview"
            value={formData.preview}
            onChange={(e) =>
              setFormData({ ...formData, preview: e.target.value })
            }
            className="textarea textarea-bordered w-full"
            rows={3}
            placeholder="Write a brief preview..."
          />
        </div>

        <div className="form-control">
          <label htmlFor="tags" className="label">
            <span className="label-text">Tags</span>
          </label>
          <input
            type="text"
            id="tags"
            value={formData.tagInput}
            onChange={(e) =>
              setFormData({ ...formData, tagInput: e.target.value })
            }
            onKeyDown={handleAddTag}
            className="input input-bordered w-full"
            placeholder="Type a tag and press Enter"
          />
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag) => (
                <div
                  key={tag}
                  className="badge badge-secondary cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag} ×
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="text" className="label">
            <span className="label-text">Story Content</span>
          </label>
          <textarea
            id="text"
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            className="textarea textarea-bordered w-full"
            rows={15}
            placeholder="Write your story here..."
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            onClick={handleSaveDraft}
            className="btn btn-primary"
            disabled={!formData.title || !formData.text}
          >
            Save Draft
          </button>
          <button
            type="submit"
            onClick={handlePublish}
            className="btn btn-success"
            disabled={!formData.title || !formData.text || !formData.preview}
          >
            Publish
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-ghost"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default StoryEditorPage;
