import React from "react";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="bg-gray-100 p-4 border-b shrink-0">
        <h1 className="text-2xl font-bold">Whistleblower</h1>
      </header>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0">
        <aside className="bg-gray-100 flex md:flex-col flex-row gap-2 p-4 border-t md:border-t-0 md:border-b-0 md:border-r order-2 md:order-1 shrink-0">
          {/* Sidebar links for quick navigation */}
          {/* Replace with Icons in the future */}
          <Link className="text-blue-500" to="/">
            Home
          </Link>
          <Link className="text-blue-500" to="/search">
            Search
          </Link>
          <Link className="text-blue-500" to="/user/1">
            Profile
          </Link>

          <hr />
          <div>with permissions</div>
          {/* Permissioned bttons */}
          <Link className="text-blue-500" to="/story-editor">
            Story Editor
          </Link>
        </aside>
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto order-1 md:order-2 min-h-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
