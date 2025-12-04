import React from "react";

interface LoginRequiredProps {
  login: () => void;
}

export const LoginRequired: React.FC<LoginRequiredProps> = ({ login }) => {
  return (
    <div className="min-h-full p-8 flex flex-col items-center justify-center">
      <div className="text-center">
        <p className="text-lg mb-4">You need to be logged in to view your profile.</p>
        <button className="btn btn-primary" onClick={login}>
          Login with Internet Identity
        </button>
      </div>
    </div>
  );
};