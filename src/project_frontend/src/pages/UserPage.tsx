import React, { useEffect, useState } from "react";

import { useUserProfile } from "../hooks";
import { UserHeader, StorySection } from "../components/layout/user";
import { useAuth } from "../context/authContext";

import { LoginRequired } from "../components/ui/LoginRequired";
import { LoadingProfile } from "../components/ui/LoadingProfile";

function UserPage() {
  const { authClient, isAuthenticated, login } = useAuth() as any; 

  const [currentUserId, setCurrentUserId] = useState<string | undefined>(undefined);

  useEffect(() => {

    if (isAuthenticated && authClient) {
      const principal = authClient.getIdentity().getPrincipal().toText();
      setCurrentUserId(principal);
    }
  }, [isAuthenticated, authClient]);


  const profile = useUserProfile(currentUserId);


  if (!isAuthenticated) {
    return (
      <LoginRequired login={login} />
    );
  }

  if (!profile) {
    return (
      <LoadingProfile />
    );
  }

  const { userId, threadsCreated, contributions, credibilityScore } = profile;

  return (
    <div className="min-h-full p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <UserHeader
          userId={userId} 
          credibilityScore={credibilityScore}
          threadCount={threadsCreated.length}
          contributionCount={contributions.length}
        />

        <div className="space-y-6">
          <StorySection
            title="My Threads"
            stories={threadsCreated}
            emptyMessage="You haven't created any threads yet."
          />

          <StorySection
            title="My Contributions"
            stories={contributions}
            emptyMessage="You haven't contributed to any threads yet."
          />
        </div>
      </div>
    </div>
  );
}

export default UserPage;