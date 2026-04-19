import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TravelMateLogo from "../assets/TravelMateLogo";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? {
          color: "#e8b84b",
          borderBottom: "2px solid #e8b84b",
          paddingBottom: "4px",
        }
      : {};

  return (
    <nav className="navbar">
      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <TravelMateLogo size={74} />
      </Link>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/dashboard" style={isActive("/dashboard")}>
              Home
            </Link>
            <Link to="/search" style={isActive("/search")}>
              Search
            </Link>
            <Link to="/itinerary" style={isActive("/itinerary")}>
              Itinerary
            </Link>
            <Link to="/alerts" style={isActive("/alerts")}>
              Alerts
            </Link>
            <Link to="/profile" style={isActive("/profile")}>
              Profile
            </Link>
            {user.role === "admin" && (
              <Link to="/admin" style={isActive("/admin")}>
                Admin
              </Link>
            )}
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
              👤 {user.username}
            </span>
            <button className="btn-logout" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={isActive("/login")}>
              Login
            </Link>
            <Link to="/register" style={isActive("/register")}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
