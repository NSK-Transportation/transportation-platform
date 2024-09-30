import { Layout } from "@/shared/ui";
import { AsidePanel, HeaderPanel, InformationPanel, MainPanel, NavPanel } from "./components";
import { useLocation } from "react-router-dom";

export const Dispetcher = () => {
  const location = useLocation();
  const isSaleTicket = location.pathname === "/dispetcher";

  return (
    <Layout
      headerPanel={<HeaderPanel />}
      asidePanel={<AsidePanel />}
      navPanel={<NavPanel />}

      mainPanel={<MainPanel />}
      informationPanel={<InformationPanel  />}

      gridTemplateAreas={isSaleTicket ? "default" : "withoutInfo"}
    />
  );
};
