import { useMemo } from "react";
import { mockStories } from "../data";
import { Story } from "../types";

interface UseStoryResult {
  story: Story | undefined;
  isLoading: boolean;
  error: string | null;
}

export function useStory(id: string | undefined): UseStoryResult {
  const result = useMemo(() => {
    if (!id) {
      return {
        story: undefined,
        isLoading: false,
        error: "No story ID provided",
      };
    }

    // In a real app, this would be an async fetch
    const story = mockStories.find((s) => s.id === id);

    return {
      story,
      isLoading: false,
      error: story ? null : "Story not found",
    };
  }, [id]);

  return result;
}
