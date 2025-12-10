import { useState, useEffect } from "react";
import { Story } from "../types";
import { ActorSubclass } from "@dfinity/agent";
import type { _SERVICE } from "../../../declarations/forum/forum.did";

type ForumActor = ActorSubclass<_SERVICE>;

// Convert backend Thread to frontend Story
const threadToStory = (thread: any): Story => {
  return {
    id: thread.id,
    title: thread.title,
    preview: thread.abstract,
    content: thread.body,
    status: "PUBLISHED",
    createdAt: BigInt(thread.createdAt),
    publishedAt: BigInt(thread.createdAt),
    industryTags: thread.tags,
    country: "OTHER",
    publisherId: thread.author.toText(),
    upvotes: Number(thread.likes),
    downvotes: Number(thread.dislikes),
  };
};

export function useStories(actor: ForumActor | null) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStories() {
      if (!actor) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const threads = await actor.getAllThreads();
        const convertedStories = threads.map(threadToStory);
        setStories(convertedStories);
        setError(null);
      } catch (err) {
        console.error("Error fetching stories:", err);
        setError("Failed to load stories");
        setStories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchStories();
  }, [actor]);

  return { stories, loading, error };
}
