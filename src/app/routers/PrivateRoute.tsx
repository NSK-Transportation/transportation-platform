import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRoute {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRoute) => {
  const isAuth = false;

  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
