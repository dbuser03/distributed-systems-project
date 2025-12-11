import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Story } from "../types";
import { Comment } from "../components/ui/CommentThread";
import { 
  adaptThreadToStory, 
  adaptComment, 
  BackendThread, 
  BackendComment 
} from "../adapters/storyAdapter";

interface UseStoryResult {
  story: Story | undefined;
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
}

interface HydratedThreadResponse extends BackendThread {
  comments: BackendComment[]; 
}

export function useStory(id: string | undefined): UseStoryResult {
  const { actor } = useAuth();
  
  const [story, setStory] = useState<Story | undefined>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setStory(undefined);
      setComments([]);

      if (!id || !actor) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        console.log(`Fetching hydrated thread for ID: ${id}`);
        
        const result = await actor.getHydratedThread(id);

        if ("ok" in result) {
          const hydratedData = result.ok as unknown as HydratedThreadResponse;

          const adaptedStory = adaptThreadToStory(hydratedData);
          setStory(adaptedStory);


          if (Array.isArray(hydratedData.comments) && hydratedData.comments.length > 0) {
             
             const realCommentsArray = hydratedData.comments[0];

             if (Array.isArray(realCommentsArray)) {
                 const adaptedComments = realCommentsArray.map(adaptComment);
                 setComments(adaptedComments);
             }
          } else {
             setComments([]);
          }

        } else {
          setError("Story not found or error loading thread.");
          console.error("Backend returned error:", result.err);
        }

      } catch (err) {
        console.error("Critical error fetching story:", err);
        setError("Failed to fetch story.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, actor]);

  console.log("useStory state:", { story, comments, isLoading, error });

  return {
    story,
    comments,
    isLoading,
    error,
  };
}