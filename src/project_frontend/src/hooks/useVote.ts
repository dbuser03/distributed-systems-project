import { useCallback, useEffect } from "react";
import { VoteType } from "../types";
import { useVoteContext } from "../context/voteContext";

interface UseVoteProps {
  initialUpvotes: number;
  initialDownvotes: number;
  storyId: string;
}

interface UseVoteReturn {
  userVote: VoteType;
  score: number;
  isLoaded: boolean;
  handleVote: (voteType: "up" | "down", e: React.MouseEvent) => void;
}

export function useVote({
  initialUpvotes,
  initialDownvotes,
  storyId,
}: UseVoteProps): UseVoteReturn {
  const { getVoteState, vote, loadSingleVote } = useVoteContext();

  // Carica il voto dell'utente se non è già nel context
  useEffect(() => {
    loadSingleVote(storyId, initialUpvotes, initialDownvotes);
  }, [storyId, initialUpvotes, initialDownvotes, loadSingleVote]);

  const { userVote, score, isLoaded } = getVoteState(storyId, initialUpvotes, initialDownvotes);

  const handleVote = useCallback(
    async (voteType: "up" | "down", e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // Non votare se il voto non è ancora stato caricato
      if (!isLoaded) return;
      await vote(storyId, voteType);
    },
    [vote, storyId, isLoaded]
  );

  return { userVote, score, isLoaded, handleVote };
}
