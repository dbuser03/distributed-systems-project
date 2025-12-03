import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { ActorSubclass, Identity } from "@dfinity/agent";
import { createActor } from "../../../declarations/forum";
import { canisterId } from "../../../declarations/forum/index.js";
import type { _SERVICE } from "../../../declarations/forum/forum.did";

// Tipo per l'attore del forum
type ForumActor = ActorSubclass<_SERVICE>;

// Interfaccia per il contesto di autenticazione
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  actor: ForumActor | null;
  authClient: AuthClient | null;
}

// Interfaccia per le props del provider
interface AuthProviderProps {
  children: ReactNode;
}

// Creiamo il contesto con il tipo corretto
const AuthContext = createContext<AuthContextType | null>(null);

// Definiamo l'URL corretto (la logica che abbiamo discusso prima)
const network = process.env.DFX_NETWORK || "local";
const identityProvider = network === "local" 
  ? `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943/#authorize`
  : "https://identity.ic0.app/#authorize";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [actor, setActor] = useState<ForumActor | null>(null);

  // Inizializzazione al caricamento della pagina
  useEffect(() => {
    AuthClient.create().then(async (client: AuthClient) => {
      setAuthClient(client);
      const isAuth = await client.isAuthenticated();
      setIsAuthenticated(isAuth);
      
      // Se è loggato, creiamo subito l'attore
      if (isAuth) {
        const identity: Identity = client.getIdentity();
        const newActor = createActor(canisterId, { agentOptions: { identity } }) as ForumActor;
        setActor(newActor);
      }
    });
  }, []);

  const login = async (): Promise<void> => {
    if (authClient) {
      await authClient.login({
        identityProvider,
        onSuccess: () => {
          setIsAuthenticated(true);
          const identity: Identity = authClient.getIdentity();
          const newActor = createActor(canisterId, { agentOptions: { identity } }) as ForumActor;
          setActor(newActor);
        },
      });
    }
  };

  const logout = async (): Promise<void> => {
    if (authClient) {
      await authClient.logout();
      setIsAuthenticated(false);
      setActor(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, actor, authClient }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizzato per usare l'auth ovunque
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};