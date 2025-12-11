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

    const fetchUserThreads = async () => {
      try {
        const principal = Principal.fromText(userId);

        const result = await actor.getUserThreads(principal);
        
        if ('list' in result) {
          const backendThreads = result.list;
          
          const threadsCreated = backendThreads.map(adaptThreadToStory);

          const userCommentsResult = await actor.getUserComments(principal);
          const threadIdsRaw = userCommentsResult.ok;

          //console.log("User comments result:", userCommentsResult);

          let contributions: Story[] = [];

          if ('ok' in userCommentsResult) {
            const comments = userCommentsResult.ok;

            if (comments.length > 0) {

              const extractedIds = comments.map((c: any) => c.threadId);
              const uniqueThreadIds = [...new Set(extractedIds)];

              //console.log("Unique thread IDs from comments:", uniqueThreadIds);

              const threadsFromComments = await actor.getThreads(uniqueThreadIds);

              //console.log("Threads fetched from comments:", threadsFromComments);
              
              contributions = threadsFromComments.map(adaptThreadToStory);
            }
          }

          setProfile({
            userId,
            threadsCreated,
            contributions,
            credibilityScore: userProfile?.credibilityScore ?? 0, 
          });
        } else {
          console.error("Error retrieving threads:", result.err);
          setProfile(null);
        }

      } catch (error) {
        console.error("Error:", error);
        setProfile(null);
      }
    };

    fetchUserThreads();

  }, [userId, actor, userProfile]);

  return profile;
}