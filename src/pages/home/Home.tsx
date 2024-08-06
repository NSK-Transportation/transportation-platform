import { Layout } from "@/shared/ui";
import { AsidePanel, HeaderPanel, InformationPanel, MainPanel, NavPanel } from "./components";

export const Home = () => (
  <Layout
    headerPanel={<HeaderPanel />}
    asidePanel={<AsidePanel />}
    navPanel={<NavPanel />}
    mainPanel={<MainPanel />}
    informationPanel={<InformationPanel />}
  />
);
