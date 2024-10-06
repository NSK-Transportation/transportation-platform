import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/widgets/Header";
import { Sidebar } from "@/widgets/Sidebar";
import { Layout } from "@/shared/ui";

export const Home = () => {
  const location = useLocation();
  const isSaleTicket = location.pathname === "/home/sale-ticket";

  return (
    <Layout
      headerPanel={<Header />}
      asidePanel={<Sidebar />}
      mainPanel={<Outlet />}
      informationPanel={""}
      gridTemplateAreas={isSaleTicket ? "default" : "withoutInfo"}
    />
  );
};
