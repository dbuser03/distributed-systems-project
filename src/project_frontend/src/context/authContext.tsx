import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthClient } from "@dfinity/auth-client";
import { ActorSubclass, Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { createActor } from "../../../declarations/forum";
import { canisterId } from "../../../declarations/forum/index.js";
import type { _SERVICE } from "../../../declarations/forum/forum.did";

export type UserRole = "Guest" | "User" | "Verifier" | "Admin";

export interface UserProfile {
  principal: Principal;
  alias: string;
  role: UserRole;
  credibilityScore: number;
}

type ForumActor = ActorSubclass<_SERVICE>;

interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateAlias: (newAlias: string) => Promise<void>;
  actor: ForumActor;
  authClient: AuthClient | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

const network = process.env.DFX_NETWORK || "local";
const identityProvider =
  network === "local"
    ? `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943/#authorize`
    : "https://identity.ic0.app/#authorize";

const parseRole = (roleVariant: any): UserRole => {
  if (!roleVariant) return "Guest";
  if ("Admin" in roleVariant) return "Admin";
  if ("Verifier" in roleVariant) return "Verifier";
  return "User";
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [actor, setActor] = useState<ForumActor>(createActor(canisterId));
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const syncUserWithBackend = async (currentActor: ForumActor) => {
    try {
      const result = await currentActor.login();

      if ("ok" in result) {
        const user = result.ok;
        const roleStr = parseRole(user.role);

        setUserProfile({
          principal: user.id,
          alias: user.alias,
          role: roleStr,
          credibilityScore: Number(user.credibilityScore),
        });
      } else {
        const errorMsg = result.err;
        alert(`ACCESSO NEGATO: ${errorMsg}`);
        await performLogout();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    AuthClient.create().then(async (client: AuthClient) => {
      setAuthClient(client);
      const isAuth = await client.isAuthenticated();
      setIsAuthenticated(isAuth);

      if (isAuth) {
        const identity: Identity = client.getIdentity();
        const newActor = createActor(canisterId, {
          agentOptions: { identity },
        }) as ForumActor;
        setActor(newActor);

        await syncUserWithBackend(newActor);
      }
    });
  }, []);

  const login = async (): Promise<void> => {
    if (authClient) {
      await authClient.login({
        identityProvider,
        onSuccess: async () => {
          setIsAuthenticated(true);
          const identity: Identity = authClient.getIdentity();
          const newActor = createActor(canisterId, {
            agentOptions: { identity },
          }) as ForumActor;
          setActor(newActor);

          await syncUserWithBackend(newActor);
        },
      });
    }
  };

  const performLogout = async () => {
    if (authClient) {
      await authClient.logout();
    }
    setIsAuthenticated(false);
    setActor(createActor(canisterId));
    setUserProfile(null);
  };

  const logout = async (): Promise<void> => {
    await performLogout();
  };

  const updateAlias = async (newAlias: string): Promise<void> => {
    try {
      const res = await actor.updateAlias(newAlias);
      if ("ok" in res) {
        setUserProfile((prev) => (prev ? { ...prev, alias: newAlias } : null));
      } else {
        alert("Error updating profile: " + res.err);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userProfile,
        login,
        logout,
        updateAlias,
        actor,
        authClient,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};