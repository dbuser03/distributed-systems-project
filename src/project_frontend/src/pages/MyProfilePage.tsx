import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { LoginRequired } from "../components/ui/LoginRequired";

function MyProfilePage() {
  const { userProfile, isAuthenticated, login } = useAuth();

  if (!isAuthenticated) {
    return <LoginRequired login={login} />;
  }

  if (!userProfile) {
    return (
      <div className="min-h-full p-8 flex flex-col items-center">
        Loading...
      </div>
    );
  }

  // Redirect to the user's profile page using their principal ID
  return <Navigate to={`/user/${userProfile.principal.toText()}`} replace />;
}

export default MyProfilePage;
