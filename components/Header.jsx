import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import imageUrl from "/assets/images/avatar-icon.png";
import { logoutUser } from "../api"
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  const handleLogOut = async () => {
    await logoutUser();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header>
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <nav>
        <NavLink
          to="/host"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Host
        </NavLink>
        <NavLink
          to="/about"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Vans
        </NavLink>
        <Link to={user ? "/host" : "login"} className="login-link">
          <img src={imageUrl} className="login-icon" />
        </Link>
        <button onClick={handleLogOut}>X</button>
      </nav>
    </header>
  );
}
