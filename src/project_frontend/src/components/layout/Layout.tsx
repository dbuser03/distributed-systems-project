import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="drawer sm:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="pb-20 sm:pb-4">
          <Outlet />
        </div>
      </div>

      <Sidebar />
    </div>
  );
}

export default Layout;
