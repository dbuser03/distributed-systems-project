import { useMemo } from "react";
import { Story } from "../types";
import { mockStories } from "../data";

export interface UserProfile {
  userId: string;
  threadsCreated: Story[];
  contributions: Story[];
  credibilityScore: number;
}

const calculateCredibilityScore = (threadCount: number): number => {
  return Math.min(100, Math.max(0, threadCount * 15 + 20));
};

export function useUserProfile(userId: string | undefined): UserProfile | null {
  return useMemo(() => {
    if (!userId) return null;

    const threadsCreated = mockStories.filter(
      (story) => story.publisherId === userId
    );

    // TODO: Implement actual contributions logic
    const contributions: Story[] = [];

    const credibilityScore = calculateCredibilityScore(threadsCreated.length);

    return {
      userId,
      threadsCreated,
      contributions,
      credibilityScore,
    };
  }, [userId]);
}
