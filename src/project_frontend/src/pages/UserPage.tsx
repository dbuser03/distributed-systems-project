import React, { useState } from "react";
import { Principal } from "@dfinity/principal";

import { useUserProfile } from "../hooks";
import { UserHeader, StorySection } from "../components/layout/user";
import { useAuth } from "../context/authContext";

import { LoginRequired } from "../components/ui/LoginRequired";
import { LoadingProfile } from "../components/ui/LoadingProfile";

function UserPage() {
  const { userProfile, isAuthenticated, login, actor } = useAuth();

  const [targetId, setTargetId] = useState("");
  const [selectedRole, setSelectedRole] = useState("Verifier");
  const [status, setStatus] = useState("");

  const currentUserId = userProfile?.principal.toText();
  const profile = useUserProfile(currentUserId);

  const handlePromote = async () => {
    if (!actor || !targetId) return;
    setStatus("Processing...");
    try {
      const principal = Principal.fromText(targetId);
      const roleVariant = { [selectedRole]: null }; 
      
      const result = await actor.promoteUser(principal, roleVariant);

      if ('ok' in result) {
        setStatus(`Success: ${targetId} is now ${selectedRole}`);
        setTargetId("");
      } else {
        setStatus(`Error: ${result.err}`);
      }
    } catch (e) {
      console.error(e);
      setStatus("Error: Invalid Principal ID");
    }
  };

  if (!isAuthenticated) {
    return <LoginRequired login={login} />;
  }

  if (!profile || !userProfile) {
    return <LoadingProfile />;
  }

  const { userId, threadsCreated, contributions, credibilityScore } = profile;

  return (
    <div className="min-h-full p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <UserHeader
          userId={userProfile.alias} 
          credibilityScore={userProfile.credibilityScore}
          threadCount={threadsCreated.length}
          contributionCount={contributions.length}
          role={userProfile.role}
        />

        {userProfile.role === 'Admin' && (
          <div className="bg-gray-100 p-6 rounded-lg mb-6 border border-gray-300">
            <h3 className="font-bold text-lg mb-4">Admin: Manage Roles</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                className="p-2 border rounded flex-grow"
                placeholder="Principal ID (e.g. 2vxsx...)"
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
              />
              <select
                className="p-2 border rounded"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="User">User</option>
                <option value="Verifier">Verifier</option>
                <option value="Admin">Admin</option>
              </select>
              <button
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                onClick={handlePromote}
              >
                Update Role
              </button>
            </div>
            {status && <p className="mt-2 text-sm">{status}</p>}
          </div>
        )}

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