import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuUpload,
  LuFileText,
  LuSettings,
  LuSun,
  LuMoon,
} from "react-icons/lu";
import { useTheme } from "../context/ThemeContext.jsx";
import "./Sidebar.css";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: <LuLayoutDashboard /> },
  { to: "/upload", label: "Upload document", icon: <LuUpload /> },
  { to: "/documents", label: "My documents", icon: <LuFileText /> },
];

const Sidebar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="ds-sidebar">
      <nav className="ds-sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `ds-sidebar__item ${isActive ? "ds-sidebar__item--active" : ""}`
            }
          >
            <span className="ds-sidebar__icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="ds-sidebar__settings">
        <button
          type="button"
          className="ds-sidebar__footer ds-sidebar__footer--button"
          onClick={() => setSettingsOpen((prev) => !prev)}
          aria-expanded={settingsOpen}
        >
          <span className="ds-sidebar__icon"><LuSettings /></span>
          <span>Settings</span>
        </button>

        {settingsOpen && (
          <div className="ds-settings-panel">
            <p className="ds-settings-panel__label">Appearance</p>
            <button
              type="button"
              className="ds-theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              <span className={`ds-theme-toggle__option ${theme === "light" ? "ds-theme-toggle__option--active" : ""}`}>
                <LuSun /> Light
              </span>
              <span className={`ds-theme-toggle__option ${theme === "dark" ? "ds-theme-toggle__option--active" : ""}`}>
                <LuMoon /> Dark
              </span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;