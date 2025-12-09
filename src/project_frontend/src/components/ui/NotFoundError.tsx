import React from "react";
import { ErrorIcon } from "../icons";

interface NotFoundErrorProps {
  message?: string;
}

function NotFoundError({ message = "Not found" }: NotFoundErrorProps) {
  return (
    <div className="min-h-full p-8">
      <div className="alert alert-error max-w-5xl">
        <ErrorIcon />
        <span>{message}</span>
      </div>
    </div>
  );
}

export default NotFoundError;
