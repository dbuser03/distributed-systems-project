import React from "react";

interface IconProps {
  className?: string;
}

export function ErrorIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`stroke-current shrink-0 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export function DownloadIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`stroke-current shrink-0 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}
