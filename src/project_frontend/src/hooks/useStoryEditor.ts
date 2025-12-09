import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ISICSectionKey, Story } from "../types";
import { mockStories } from "../data";
import { ActorSubclass } from "@dfinity/agent";
import type { _SERVICE } from "../../../declarations/forum/forum.did";

type ForumActor = ActorSubclass<_SERVICE>;

export interface StoryFormData {
  title: string;
  preview: string;
  content: string;
  industryTags: ISICSectionKey[];
  industryTagInput: string;
  file?: File | null;
}

const initialFormData: StoryFormData = {
  title: "",
  preview: "",
  content: "",
  industryTags: [],
  industryTagInput: "",
  file: null,
};

export function useStoryEditor(storyId?: string, actor?: ForumActor | null) {
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
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!canPublish || !actor) return;

      try {
        // Converti il file in array di Blob se presente
        let fileBlobs: Uint8Array[] | undefined = undefined;
        let fileTypes: string[] | undefined = undefined;

        if (formData.file) {
          const arrayBuffer = await formData.file.arrayBuffer();
          fileBlobs = [new Uint8Array(arrayBuffer)];
          fileTypes = [formData.file.type];
        }

        const input = {
          title: formData.title,
          abstract: formData.preview,
          body: formData.content,
          tags: formData.industryTags,
          file: fileBlobs ? [fileBlobs] : [],
          fileType: fileTypes ? [fileTypes] : [],
        };

        const result = await actor.createThread(input);

        if ("id" in result) {
          console.log("Story published successfully with ID:", result.id);
          navigate(`/story/${result.id}`);
        } else if ("err" in result) {
          console.error("Error publishing story:", result.err);
          alert(`Error: ${result.err}`);
        }
      } catch (error) {
        console.error("Error publishing story:", error);
        alert("Failed to publish story. Please try again.");
      }
    },
    [formData, canPublish, actor, navigate]
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
