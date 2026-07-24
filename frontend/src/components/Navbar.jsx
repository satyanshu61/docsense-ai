import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="ds-navbar">
      <div className="container ds-navbar__inner">
        <Link to="/" className="ds-navbar__brand">
          <span className="ds-navbar__mark">DS</span>
          <span>DocSense AI</span>
        </Link>

        <nav className="ds-navbar__actions">
          {user ? (
            <>
              <Link to="/dashboard" className="ds-navbar__link">Dashboard</Link>
              <Link to="/upload" className="ds-navbar__link">Upload</Link>
              <div className="ds-navbar__user">
                <span className="ds-navbar__avatar">{user.name?.charAt(0)?.toUpperCase()}</span>
                <span className="ds-navbar__username">{user.name}</span>
              </div>
              <button className="ds-navbar__logout" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="ds-navbar__link">Log in</Link>
              <Link to="/register" className="ds-navbar__cta">Get started</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
