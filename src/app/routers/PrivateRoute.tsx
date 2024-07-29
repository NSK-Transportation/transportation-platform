import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRoute {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRoute) => {
  const isAuth = false; // TODO: Добавить useAuth или использовать Global Store

  if (!isAuth) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};
