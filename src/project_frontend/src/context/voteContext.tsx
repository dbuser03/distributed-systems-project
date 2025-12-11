import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { VoteType } from "../types";
import { useAuth } from "./authContext";

// Tipo per il feedback dal backend (like/dislike/none -> up/down/null)
type BackendVoteType = { like: null } | { dislike: null } | { none: null };

interface VoteState {
  userVote: VoteType;
  score: number;
  isLoaded: boolean; // Indica se il voto è stato caricato dal backend
}

interface VoteContextType {
  // Mappa threadId -> stato del voto
  votes: Map<string, VoteState>;
  // Carica i voti dell'utente per una lista di thread
  loadUserVotes: (threadIds: string[], threads: { id: string; upvotes: number; downvotes: number }[]) => Promise<void>;
  // Carica il voto per un singolo thread
  loadSingleVote: (threadId: string, upvotes: number, downvotes: number) => Promise<void>;
  // Esegue il voto
  vote: (threadId: string, voteType: "up" | "down") => Promise<void>;
  // Ottiene lo stato del voto per un thread
  getVoteState: (threadId: string, initialUpvotes: number, initialDownvotes: number) => VoteState;
  // Controlla se un voto è stato caricato
  isVoteLoaded: (threadId: string) => boolean;
}

interface VoteProviderProps {
  children: ReactNode;
}

const VoteContext = createContext<VoteContextType | null>(null);

// Converte il tipo di voto del backend al tipo frontend
function convertBackendVote(backendVote: BackendVoteType): VoteType {
  if ("like" in backendVote) return "up";
  if ("dislike" in backendVote) return "down";
  return "null";
}

export const VoteProvider: React.FC<VoteProviderProps> = ({ children }) => {
  const { actor, isAuthenticated } = useAuth();
  const [votes, setVotes] = useState<Map<string, VoteState>>(new Map());
  
  // Traccia quali thread hanno già avuto il voto caricato dal backend
  const loadedVotesRef = useRef<Set<string>>(new Set());

  // Carica i voti dell'utente per una lista di thread
  const loadUserVotes = useCallback(
    async (threadIds: string[], threads: { id: string; upvotes: number; downvotes: number }[]) => {
      // Filtra solo i thread non ancora caricati
      const unloadedThreadIds = threadIds.filter((id) => !loadedVotesRef.current.has(id));
      const unloadedThreads = threads.filter((t) => !loadedVotesRef.current.has(t.id));

      if (unloadedThreads.length === 0) return;

      // Marca tutti come caricati
      unloadedThreadIds.forEach((id) => loadedVotesRef.current.add(id));

      if (!isAuthenticated || !actor) {
        // Se non autenticato, inizializza solo con gli score e marca come loaded
        setVotes((prev) => {
          const newVotes = new Map(prev);
          unloadedThreads.forEach((t) => {
            if (!newVotes.has(t.id)) {
              newVotes.set(t.id, {
                userVote: "null",
                score: t.upvotes - t.downvotes,
                isLoaded: true,
              });
            }
          });
          return newVotes;
        });
        return;
      }

      try {
        const result = await actor.getUserFeedbackOnThreads(unloadedThreadIds);

        if ("feedback" in result) {
          const feedbackList = result.feedback as [string, BackendVoteType][];
          
          // Crea una mappa per accesso rapido ai feedback
          const feedbackMap = new Map<string, VoteType>();
          feedbackList.forEach(([threadId, backendVote]) => {
            feedbackMap.set(threadId, convertBackendVote(backendVote));
          });

          setVotes((prev) => {
            const newVotes = new Map(prev);

            // Inizializza tutti i thread con score e feedback
            unloadedThreads.forEach((t) => {
              const userVote = feedbackMap.get(t.id) ?? "null";
              newVotes.set(t.id, {
                userVote,
                score: t.upvotes - t.downvotes,
                isLoaded: true,
              });
            });

            return newVotes;
          });
        }
      } catch (error) {
        console.error("Error loading user votes:", error);
      }
    },
    [actor, isAuthenticated]
  );

  // Carica il voto per un singolo thread
  const loadSingleVote = useCallback(
    async (threadId: string, upvotes: number, downvotes: number) => {
      // Se già caricato, non fare nulla
      if (loadedVotesRef.current.has(threadId)) {
        return;
      }

      // Marca come caricato
      loadedVotesRef.current.add(threadId);

      if (!isAuthenticated || !actor) {
        // Se non autenticato, inizializza con score e marca come loaded
        setVotes((prev) => {
          const newVotes = new Map(prev);
          newVotes.set(threadId, {
            userVote: "null",
            score: upvotes - downvotes,
            isLoaded: true,
          });
          return newVotes;
        });
        return;
      }

      try {
        const result = await actor.hasUserLikedOrDislikedThread(threadId);

        if ("feedback" in result) {
          const backendVote = result.feedback as BackendVoteType;
          setVotes((prev) => {
            const newVotes = new Map(prev);
            newVotes.set(threadId, {
              userVote: convertBackendVote(backendVote),
              score: upvotes - downvotes,
              isLoaded: true,
            });
            return newVotes;
          });
        } else {
          // In caso di errore, inizializza comunque
          setVotes((prev) => {
            const newVotes = new Map(prev);
            newVotes.set(threadId, {
              userVote: "null",
              score: upvotes - downvotes,
              isLoaded: true,
            });
            return newVotes;
          });
        }
      } catch (error) {
        console.error("Error loading single vote:", error);
        // In caso di errore, inizializza comunque
        setVotes((prev) => {
          const newVotes = new Map(prev);
          newVotes.set(threadId, {
            userVote: "null",
            score: upvotes - downvotes,
            isLoaded: true,
          });
          return newVotes;
        });
      }
    },
    [actor, isAuthenticated]
  );

  // Esegue il voto
  const vote = useCallback(
    async (threadId: string, voteType: "up" | "down") => {
      if (!actor) return;

      const currentState = votes.get(threadId);
      // Non permettere di votare se il voto non è ancora stato caricato
      if (!currentState || !currentState.isLoaded) return;

      const { userVote: currentVote, score: currentScore } = currentState;

      // Calcola il nuovo stato locale
      let nextVote: VoteType;
      let nextScore: number;

      if (currentVote === voteType) {
        // Stesso voto -> rimuovi il voto (toggle)
        nextVote = "null";
        nextScore = voteType === "up" ? currentScore - 1 : currentScore + 1;
      } else if (currentVote === "null") {
        // Nessun voto precedente -> applica il nuovo voto
        nextVote = voteType;
        nextScore = voteType === "up" ? currentScore + 1 : currentScore - 1;
      } else {
        // Voto opposto -> cambia voto (rimuovi vecchio + applica nuovo)
        nextVote = voteType;
        // Se era "up" e ora "down": -1 (rimuove up) -1 (applica down) = -2
        // Se era "down" e ora "up": +1 (rimuove down) +1 (applica up) = +2
        nextScore = voteType === "up" ? currentScore + 2 : currentScore - 2;
      }

      // Aggiorna ottimisticamente lo stato locale
      setVotes((prev) => {
        const newVotes = new Map(prev);
        newVotes.set(threadId, { userVote: nextVote, score: nextScore, isLoaded: true });
        return newVotes;
      });

      try {
        // IMPORTANTE: Il backend fa il toggle automaticamente
        // Mandiamo sempre il voteType cliccato, non "null"
        const res = await actor.addFeedbackThread(voteType, threadId);

        if ("err" in res) {
          // Rollback in caso di errore
          console.error("Error voting:", res.err);
          setVotes((prev) => {
            const newVotes = new Map(prev);
            newVotes.set(threadId, currentState);
            return newVotes;
          });
          return;
        }

        if ("newScore" in res) {
          // Aggiorna con lo score reale dal backend
          setVotes((prev) => {
            const newVotes = new Map(prev);
            newVotes.set(threadId, {
              userVote: nextVote,
              score: Number(res.newScore),
              isLoaded: true,
            });
            return newVotes;
          });
        }
      } catch (error) {
        console.error("Failed to send vote:", error);
        // Rollback
        setVotes((prev) => {
          const newVotes = new Map(prev);
          newVotes.set(threadId, currentState);
          return newVotes;
        });
      }
    },
    [actor, votes]
  );

  // Ottiene lo stato del voto per un thread
  const getVoteState = useCallback(
    (threadId: string, initialUpvotes: number, initialDownvotes: number): VoteState => {
      const existing = votes.get(threadId);
      if (existing) return existing;

      // Ritorna valori di default se non ancora caricato
      return {
        userVote: "null",
        score: initialUpvotes - initialDownvotes,
        isLoaded: false,
      };
    },
    [votes]
  );

  // Controlla se un voto è stato caricato
  const isVoteLoaded = useCallback(
    (threadId: string): boolean => {
      const existing = votes.get(threadId);
      return existing?.isLoaded ?? false;
    },
    [votes]
  );

  return (
    <VoteContext.Provider
      value={{
        votes,
        loadUserVotes,
        loadSingleVote,
        vote,
        getVoteState,
        isVoteLoaded,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
};

export const useVoteContext = (): VoteContextType => {
  const context = useContext(VoteContext);
  if (!context) {
    throw new Error("useVoteContext must be used within a VoteProvider");
  }
  return context;
};
