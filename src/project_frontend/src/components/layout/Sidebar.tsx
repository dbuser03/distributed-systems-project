import React from "react";

function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="drawer-side is-drawer-close:overflow-visible group/sidebar hidden sm:block">
        <div className="flex min-h-full flex-col items-start bg-base-200 w-14 group-hover/sidebar:w-64 transition-[width] duration-300 pt-4">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <button>
                {/* Home icon */}
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
              </button>
            </li>

            {/* List item */}
            <li>
              <button>
                {/* Settings icon */}
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
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="hidden group-hover/sidebar:inline opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300">
                  Settings
                </span>
              </button>
            </li>

            {/* List item */}
            <li>
              <button>
                {/* Profile icon */}
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
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Dock */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-base-200 border-t border-base-300 z-50">
        <div className="flex justify-around items-center px-4 py-2">
          <button className="flex flex-col items-center gap-1 p-2 hover:bg-base-300 rounded-lg transition-colors group">
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
          </button>

          <button className="flex flex-col items-center gap-1 p-2 hover:bg-base-300 rounded-lg transition-colors group">
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
              <path d="M20 7h-9"></path>
              <path d="M14 17H5"></path>
              <circle cx="17" cy="17" r="3"></circle>
              <circle cx="7" cy="7" r="3"></circle>
            </svg>
            <span className="text-xs opacity-70 group-hover:opacity-100">
              Settings
            </span>
          </button>

          <button className="flex flex-col items-center gap-1 p-2 hover:bg-base-300 rounded-lg transition-colors group">
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
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
