import { Navigate } from "react-router-dom";
import React from "react";


interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const isAuth = localStorage.getItem("token") ?? sessionStorage.getItem("token");

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
