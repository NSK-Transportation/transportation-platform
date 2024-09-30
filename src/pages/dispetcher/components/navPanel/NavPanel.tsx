import { useAsideStore } from "../asidePanel/AsidePanel.store";
import styles from "./NavPanel.module.scss";

export const NavPanel = () => {
  const { activeLink } = useAsideStore();
  return <div className={styles.nav}>{activeLink}</div>;
};
