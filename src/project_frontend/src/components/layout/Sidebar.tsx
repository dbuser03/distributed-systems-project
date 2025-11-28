import React, { SVGProps } from "react";
import { Link } from "react-router-dom";

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
              <Link to="/">
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
              </Link>
            </li>

            {/* List item */}
            <li>
              <Link to="/search">
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="1em"
                  height="1em"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M469.297 439.13L347.982 317.816C370.466 288.907 384 252.707 384 213.334c0-94.104-76.562-170.667-170.666-170.667S42.667 119.23 42.667 213.334S119.23 384 213.334 384c39.373 0 75.573-13.534 104.481-36.018l121.316 121.315zm-255.963-97.796c-70.584 0-128-57.417-128-128c0-70.584 57.416-128 128-128c70.583 0 128 57.416 128 128c0 70.583-57.417 128-128 128"
                  ></path>
                </svg>
                <span className="hidden group-hover/sidebar:inline opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300">
                  Search
                </span>
              </Link>
            </li>

            {/* List item */}
            <li>
              <Link to="/story-editor">
                {/* Edit/Write icon */}
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

            {/* List item */}
            <li>
              <Link to="/user/1">
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
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Dock */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-base-200 border-t border-base-300 z-50">
        <div className="flex justify-around items-center px-4 py-2">
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

          <Link
            to="/search"
            className="flex flex-col items-center gap-1 p-2 hover:bg-base-300 rounded-lg transition-colors group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="1em"
              height="1em"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M469.297 439.13L347.982 317.816C370.466 288.907 384 252.707 384 213.334c0-94.104-76.562-170.667-170.666-170.667S42.667 119.23 42.667 213.334S119.23 384 213.334 384c39.373 0 75.573-13.534 104.481-36.018l121.316 121.315zm-255.963-97.796c-70.584 0-128-57.417-128-128c0-70.584 57.416-128 128-128c70.583 0 128 57.416 128 128c0 70.583-57.417 128-128 128"
              ></path>
            </svg>
            <span className="text-xs opacity-70 group-hover:opacity-100">
              Search
            </span>
          </Link>

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
        </div>
      </div>
    </>
  );
}

export default Sidebar;
