import { Layout } from "@/shared/ui";
import { AsidePanel, HeaderPanel, InformationPanel, MainPanel } from "./components";

export const Home = () => (
  <Layout
    headerPanel={<HeaderPanel />}
    asidePanel={<AsidePanel />}
    mainPanel={<MainPanel />}
    informationPanel={<InformationPanel />}
  />
);
