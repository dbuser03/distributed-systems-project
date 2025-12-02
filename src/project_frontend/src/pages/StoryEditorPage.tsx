import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ISICSectionKey, ISICSectionsType, Story } from "../types";
import { ISICSections, mockStories } from "../data";

function StoryEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [formData, setFormData] = useState({
    title: "",
    preview: "",
    content: "",
    industryTags: [] as ISICSectionKey[],
    industryTagInput: "",
  });

  useEffect(() => {
    if (!id) return;

    const story: Story | undefined = mockStories.find(
      (story: Story) => story.id === id
    );
    if (!story) return;

    setFormData({
      title: story.title,
      preview: story.preview,
      content: story.content,
      industryTags: story.industryTags,
      industryTagInput: "",
    });
  }, [id]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && formData.industryTagInput.trim()) {
      e.preventDefault();
      if (
        !formData.industryTags.includes(
          formData.industryTagInput.trim() as ISICSectionKey
        )
      ) {
        setFormData({
          ...formData,
          industryTags: [
            ...formData.industryTags,
            formData.industryTagInput.trim() as ISICSectionKey,
          ],
          industryTagInput: "",
        });
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      industryTags: formData.industryTags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.preview) return;
  };

  return (
    <div className="min-h-full p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-8">
          {id ? "Edit Story" : "Story Editor"}
        </h1>

        <form className="space-y-6">
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
              value={formData.industryTagInput}
              onChange={(e) =>
                setFormData({ ...formData, industryTagInput: e.target.value })
              }
              onKeyDown={handleAddTag}
              className="input input-bordered w-full"
              placeholder="Type a tag and press Enter"
            />
            {formData.industryTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.industryTags.map((tag: ISICSectionKey) => (
                  <div
                    key={tag}
                    className="badge badge-secondary cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {ISICSections[tag]} ×
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="content" className="label">
              <span className="label-text">Story Content</span>
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
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
              disabled={!formData.title || !formData.content}
            >
              Save Draft
            </button>
            <button
              type="submit"
              onClick={handlePublish}
              className="btn btn-success"
              disabled={
                !formData.title || !formData.content || !formData.preview
              }
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
    </div>
  );
}

export default StoryEditorPage;
