import { Outlet } from "react-router-dom";
import styles from "./MainPanel.module.scss";

export const MainPanel = () => (
  <div className={styles.main}>
    <Outlet />
  </div>
);
