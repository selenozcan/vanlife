import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthRequired() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          message: "You must log in first",
          from: location.pathname,
        }}
        replace
      />
    );
  }

  return <Outlet />;
}
