import { useState, useEffect } from "react";
import { Principal } from "@dfinity/principal";
import { useAuth } from "../context/authContext";
import { Story } from "../types";
import { adaptThreadToStory } from "../adapters/storyAdapter";

export interface UserProfile {
  userId: string;
  threadsCreated: Story[];
  contributions: Story[];
  credibilityScore: number;
}

export function useUserProfile(userId: string | undefined): UserProfile | null {
  const { actor, userProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!userId || !actor) {
      setProfile(null);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const principal = Principal.fromText(userId);

        let credibilityScore = 0;
        let userAlias = "";
        try {
          const profileResult = await actor.getUserProfile(principal);
          if ("ok" in profileResult) {
            credibilityScore = Number(profileResult.ok.credibilityScore);
            userAlias = profileResult.ok.alias;
          }
        } catch (error) {
          console.warn("Could not fetch user profile:", error);
        }

        // Try to fetch threads and comments (may require authentication)
        let threadsCreated: Story[] = [];
        let contributions: Story[] = [];

        try {
          const result = await actor.getUserThreads(principal);

          if ("list" in result) {
            const backendThreads = result.list;
            threadsCreated = backendThreads.map(adaptThreadToStory);

            const userCommentsResult = await actor.getUserComments(principal);

            if ("ok" in userCommentsResult) {
              const comments = userCommentsResult.ok;

              if (comments.length > 0) {
                const extractedIds = comments.map((c: any) => c.threadId);
                const uniqueThreadIds = [...new Set(extractedIds)];

                const threadsFromComments = await actor.getThreads(
                  uniqueThreadIds
                );
                contributions = threadsFromComments.map(adaptThreadToStory);
              }
            }
          }
        } catch (error) {
          console.warn(
            "Could not fetch user threads (authentication may be required):",
            error
          );
        }

        setProfile({
          userId,
          threadsCreated,
          contributions,
          credibilityScore: userProfile?.credibilityScore ?? 0,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setProfile(null);
      }
    };

    fetchUserProfile();
  }, [userId, actor, userProfile]);

  return profile;
}
