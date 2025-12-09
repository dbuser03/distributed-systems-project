import React from "react";

export const LoadingProfile: React.FC = () => {
  return (
    <div className="min-h-full p-8 flex flex-col items-center">
        <div className="w-full max-w-5xl">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="text-base-content/60 mt-2">Loading your profile...</p>
        </div>
      </div>
  );
};