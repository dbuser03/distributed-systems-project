import { useParams } from "react-router-dom";
import { useUserProfile } from "../hooks";
import { UserHeader, StorySection } from "../components/layout/user";

function UserPage() {
  const { id } = useParams<{ id: string }>();
  const profile = useUserProfile(id);

  if (!profile) {
    return (
      <div className="min-h-full p-8 flex flex-col items-center">
        <div className="w-full max-w-5xl">
          <p className="text-base-content/60">User not found.</p>
        </div>
      </div>
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
            title="Threads Created"
            stories={threadsCreated}
            emptyMessage="No threads created yet."
          />

          <StorySection
            title="Contributions"
            stories={contributions}
            emptyMessage="No contributions yet."
          />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
