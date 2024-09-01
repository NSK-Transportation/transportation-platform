import { useAuthStore } from "@/pages/auth/Auth.store";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRoute {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRoute) => {
  const { isAuth } = useAuthStore();

  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
