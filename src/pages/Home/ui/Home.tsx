import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/widgets/Header";
import { Sidebar } from "@/widgets/Sidebar";
import { Layout } from "@/shared/ui";

export const Home = () => {
  const location = useLocation();
  const isHome = location.pathname === "/home";

  return (
    <Layout
      headerPanel={<Header />}
      asidePanel={<Sidebar />}
      mainPanel={isHome ? "Выберите действие" : <Outlet />}
    />
  );
};
