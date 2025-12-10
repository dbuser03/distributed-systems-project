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

// Definiamo un tipo locale per ciò che ritorna getHydratedThread
// Estende il thread normale includendo i commenti completi
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
        
        // 1. Chiamata UNICA al backend
        const result = await actor.getHydratedThread(id);

        if ("ok" in result) {
          // Casting del risultato: sappiamo che contiene sia thread che commenti
          const hydratedData = result.ok as unknown as HydratedThreadResponse;

          // 2. Adattiamo la Storia
          const adaptedStory = adaptThreadToStory(hydratedData);
          setStory(adaptedStory);

          // 3. Adattiamo i Commenti (SONO GIÀ QUI!)
          // Non serve fare un'altra chiamata await actor.getComments(...)
          if (hydratedData.comments && Array.isArray(hydratedData.comments)) {
             const adaptedComments = hydratedData.comments.map(adaptComment);
             setComments(adaptedComments);
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

  return {
    story,
    comments,
    isLoading,
    error,
  };
}