import clsx from "clsx";
import { forwardRef, HTMLAttributes, ReactNode } from "react";
import styles from "./Layout.module.scss";

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  asidePanel: ReactNode; // Левая часть интерфейса
  mainPanel: ReactNode; // Серединая часть интерфейса
  headerPanel: ReactNode; // Верхняя часть интерфейса
  className?: string;
}

const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  ({ asidePanel, mainPanel, headerPanel, className, ...props }, ref) => (
    <div ref={ref} className={clsx(styles.layout, className)} {...props}>
      <header className={styles.layout__headerPanel}>{headerPanel}</header>
      <aside className={styles.layout__asidePanel}>{asidePanel}</aside>
      <main className={styles.layout__mainPanel}>{mainPanel}</main>
    </div>
  ),
);

Layout.displayName = "Layout";

export { Layout };
