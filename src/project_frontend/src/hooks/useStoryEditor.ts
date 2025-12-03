import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ISICSectionKey, Story } from "../types";
import { mockStories } from "../data";

export interface StoryFormData {
  title: string;
  preview: string;
  content: string;
  industryTags: ISICSectionKey[];
  industryTagInput: string;
}

const initialFormData: StoryFormData = {
  title: "",
  preview: "",
  content: "",
  industryTags: [],
  industryTagInput: "",
};

export function useStoryEditor(storyId?: string) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<StoryFormData>(initialFormData);

  const isEditing = Boolean(storyId);

  // Load existing story data when editing
  useEffect(() => {
    if (!storyId) return;

    const story: Story | undefined = mockStories.find(
      (story: Story) => story.id === storyId
    );
    if (!story) return;

    setFormData({
      title: story.title,
      preview: story.preview,
      content: story.content,
      industryTags: story.industryTags,
      industryTagInput: "",
    });
  }, [storyId]);

  // Field update handlers
  const updateField = useCallback(
    <K extends keyof StoryFormData>(field: K, value: StoryFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  // Tag management
  const addTag = useCallback((tag: string) => {
    const trimmedTag = tag.trim() as ISICSectionKey;
    if (!trimmedTag) return;

    setFormData((prev) => {
      if (prev.industryTags.includes(trimmedTag)) {
        return { ...prev, industryTagInput: "" };
      }
      return {
        ...prev,
        industryTags: [...prev.industryTags, trimmedTag],
        industryTagInput: "",
      };
    });
  }, []);

  const removeTag = useCallback((tagToRemove: ISICSectionKey) => {
    setFormData((prev) => ({
      ...prev,
      industryTags: prev.industryTags.filter((tag) => tag !== tagToRemove),
    }));
  }, []);

  // Validation
  const canSaveDraft = Boolean(formData.title && formData.content);
  const canPublish = Boolean(
    formData.title && formData.content && formData.preview
  );

  // Actions
  const handleSaveDraft = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!canSaveDraft) return;
      // TODO: Implement save draft logic
      console.log("Saving draft:", formData);
    },
    [formData, canSaveDraft]
  );

  const handlePublish = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!canPublish) return;
      // TODO: Implement publish logic
      console.log("Publishing story:", formData);
    },
    [formData, canPublish]
  );

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    formData,
    isEditing,
    updateField,
    addTag,
    removeTag,
    canSaveDraft,
    canPublish,
    handleSaveDraft,
    handlePublish,
    handleCancel,
  };
}
