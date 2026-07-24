import React from "react";
import Sidebar from "./Sidebar.jsx";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="ds-dashboard">
      <Sidebar />
      <main className="ds-dashboard__content">
        <div className="container ds-dashboard__inner">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
