import React, { SVGProps } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/authContext";

function Sidebar() {

  const { isAuthenticated, login, logout } = useAuth() as any;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="drawer-side is-drawer-close:overflow-visible group/sidebar hidden sm:block">
        <div className="flex min-h-full flex-col items-start bg-base-200 w-14 group-hover/sidebar:w-64 transition-[width] duration-300 pt-4">
          <ul className="menu w-full grow">
            {/* Home */}
            <li>
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="hidden group-hover/sidebar:inline opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300">
                  Homepage
                </span>
              </Link>
            </li>

            {/* Editor */}
            <li>
              <Link to="/story-editor">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                <span className="hidden group-hover/sidebar:inline opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300">
                  Editor
                </span>
              </Link>
            </li>

            {/* Profile */}
            <li>
              <Link to="/user/1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                </svg>
                <span className="hidden group-hover/sidebar:inline opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300">
                  Profile
                </span>
              </Link>
            </li>

            {/* LOGIN / LOGOUT BUTTON (Desktop) */}
            <li className="mt-auto mb-4">
              <button onClick={isAuthenticated ? logout : login}>
                {isAuthenticated ? (
                  // Icona Logout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4 text-error"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                ) : (
                  // Icona Login
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4 text-primary"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                )}
                <span className="hidden group-hover/sidebar:inline opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300">
                  {isAuthenticated ? "Logout" : "Login"}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Dock */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-base-200 border-t border-base-300 z-50">
        <div className="flex justify-around items-center px-4 py-2">
          {/* Home Mobile */}
          <Link
            to="/"
            className="flex flex-col items-center gap-1 p-2 hover:bg-base-300 rounded-lg transition-colors group"
          >
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
            <span className="text-xs opacity-70 group-hover:opacity-100">
              Home
            </span>
          </Link>

          {/* Editor Mobile */}
          <Link
            to="/story-editor"
            className="flex flex-col items-center gap-1 p-2 hover:bg-base-300 rounded-lg transition-colors group"
          >
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span className="text-xs opacity-70 group-hover:opacity-100">
              Editor
            </span>
          </Link>

          {/* Profile Mobile */}
          <Link
            to="/user/1"
            className="flex flex-col items-center gap-1 p-2 hover:bg-base-300 rounded-lg transition-colors group"
          >
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
            </svg>
            <span className="text-xs opacity-70 group-hover:opacity-100">
              Profile
            </span>
          </Link>

          {/* LOGIN / LOGOUT BUTTON (Mobile) */}
          <button
            onClick={isAuthenticated ? logout : login}
            className="flex flex-col items-center gap-1 p-2 hover:bg-base-300 rounded-lg transition-colors group"
          >
            {isAuthenticated ? (
               // Logout Icon
              <svg
                className="size-[1.2em] text-error"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            ) : (
               // Login Icon
              <svg
                className="size-[1.2em] text-primary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            )}
            <span className="text-xs opacity-70 group-hover:opacity-100">
              {isAuthenticated ? "Logout" : "Login"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
