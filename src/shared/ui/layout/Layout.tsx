import { forwardRef, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Layout.module.scss";

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  asidePanel: ReactNode; // Левая часть интерфейса
  mainPanel: ReactNode; // Серединая часть интерфейса
  informationPanel: ReactNode; // Правая часть интерфейса
  headerPanel: ReactNode; // Верхняя часть интерфейса
  className?: string;
}

const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  ({ asidePanel, mainPanel, informationPanel, headerPanel, className, ...props }, ref) => (
    <div ref={ref} className={clsx(styles.layout, className)} {...props}>
      <header className={styles.layout__headerPanel}>{headerPanel}</header>
      <aside className={styles.layout__asidePanel}>{asidePanel}</aside>
      <main className={styles.layout__mainPanel}>{mainPanel}</main>
      <section className={styles.layout__informationPanel}>{informationPanel}</section>
    </div>
  ),
);

Layout.displayName = "Layout";

export { Layout };
