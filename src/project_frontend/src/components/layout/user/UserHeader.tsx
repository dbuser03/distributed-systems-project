interface UserHeaderProps {
  userId: string;
  credibilityScore: number;
  threadCount: number;
  contributionCount: number;
  role: string;
}

export function UserHeader({
  userId,
  credibilityScore,
  threadCount,
  contributionCount,
  role,
}: UserHeaderProps) {
  return (
    <div className="border-b border-base-300 pb-4 mb-6">
      <h1 className="text-4xl font-bold mb-8">User {userId}</h1>
      <UserStats
        credibilityScore={credibilityScore}
        threadCount={threadCount}
        contributionCount={contributionCount}
        role={role}
      />
    </div>
  );
}

interface UserStatsProps {
  credibilityScore: number;
  threadCount: number;
  contributionCount: number;
  role: string;
}

function UserStats({
  credibilityScore,
  threadCount,
  contributionCount,
  role,
}: UserStatsProps) {
  return (
    <div className="text-sm text-base-content/70">
      <StatItem label="Credibility" value={credibilityScore} />
      {" • "}
      <StatItem label="Threads" value={threadCount} />
      {" • "}
      <StatItem label="Contributions" value={contributionCount} />
      {" • "}
      <StatItem label="Role" value={role ? role : "Guest"} />
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: number | string;
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <>
      {label}: <span className="font-medium">{value}</span>
    </>
  );
}
