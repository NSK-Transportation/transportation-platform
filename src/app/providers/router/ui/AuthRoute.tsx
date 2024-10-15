import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/entities/auth";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "@/shared/consts";
import { getFromLocalStorage } from "@/shared/helpers";

interface PrivateRoute {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRoute) => {
  const { isAuth } = useAuthStore();
  const accessToken = getFromLocalStorage(LOCAL_STORAGE_ACCESS_TOKEN_KEY);

  if (!(isAuth && accessToken)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
