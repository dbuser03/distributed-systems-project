import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Principal } from "@dfinity/principal";

import { useUserProfile } from "../hooks";
import { UserHeader, StorySection } from "../components/layout/user";
import { useAuth } from "../context/authContext";

import { LoadingProfile } from "../components/ui/LoadingProfile";

function UserPage() {
  const { id } = useParams<{ id: string }>();
  const { userProfile, isAuthenticated, actor } = useAuth();

  const [targetId, setTargetId] = useState("");
  const [selectedRole, setSelectedRole] = useState("Verifier");
  const [status, setStatus] = useState("");
  const [viewedUserAlias, setViewedUserAlias] = useState<string>("");
  const [viewedUserRole, setViewedUserRole] = useState<string>("");

  const targetUserId = id;

  const profile = useUserProfile(targetUserId);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!targetUserId || !actor) return;

      try {
        const principal = Principal.fromText(targetUserId);
        const profileResult = await actor.getUserProfile(principal);
        if ("ok" in profileResult) {
          setViewedUserAlias(profileResult.ok.alias);
          const roleVariant = profileResult.ok.role;
          if (!roleVariant) {
            setViewedUserRole("Guest");
          } else if ("Admin" in roleVariant) {
            setViewedUserRole("Admin");
          } else if ("Verifier" in roleVariant) {
            setViewedUserRole("Verifier");
          } else {
            setViewedUserRole("User");
          }
        }
      } catch (error) {
        console.warn("Could not fetch user info:", error);
        setViewedUserAlias(targetUserId);
        setViewedUserRole("Guest");
      }
    };

    fetchUserInfo();
  }, [targetUserId, actor]);

  const handlePromote = async () => {
    if (!actor || !targetId || !isAuthenticated) return;
    setStatus("Processing...");
    try {
      const principal = Principal.fromText(targetId);
      const roleVariant = { [selectedRole]: null };

      const result = await actor.promoteUser(principal, roleVariant);

      if ("ok" in result) {
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

  if (!targetUserId) {
    return (
      <div className="min-h-full p-8 flex flex-col items-center">
        Invalid user ID
      </div>
    );
  }

  if (!profile) {
    return <LoadingProfile />;
  }

  const { userId, threadsCreated, contributions, credibilityScore } = profile;
  const isViewingSelf =
    isAuthenticated && userProfile && userProfile.principal.toText() === userId;
  const canManageRoles =
    isAuthenticated && userProfile && userProfile.role === "Admin";

  return (
    <div className="min-h-full p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <UserHeader
          userId={viewedUserAlias || userId}
          credibilityScore={credibilityScore}
          threadCount={threadsCreated.length}
          contributionCount={contributions.length}
          role={viewedUserRole}
        />

        {canManageRoles && (
          <div className="bg-gray-100 p-6 rounded-lg mb-6 border border-gray-300">
            <h3 className="font-bold text-lg mb-4">Admin: Manage Roles</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                className="p-2 border rounded grow"
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
            title={isViewingSelf ? "My Threads" : "Threads"}
            stories={threadsCreated}
            emptyMessage={
              isViewingSelf
                ? "You haven't created any threads yet."
                : "This user hasn't created any threads yet."
            }
          />

          <StorySection
            title={isViewingSelf ? "My Comments" : "Comments"}
            stories={contributions}
            emptyMessage={
              isViewingSelf
                ? "You haven't commented on any threads yet."
                : "This user hasn't commented on any threads yet."
            }
          />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
