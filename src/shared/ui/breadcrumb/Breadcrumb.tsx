import { forwardRef, HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "./Breadcrumb.module.scss";

export interface BreadcrumbProps extends HTMLAttributes<HTMLDivElement> {
  items: { label: string; href: string }[];
  className?: string;
}

const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>(
  ({ className, items, ...props }, ref) => (
    <nav
      className={clsx(styles.breadcrumb, className)}
      ref={ref}
      aria-label="breadcrumb"
      {...props}
    >
      <ol className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            <Link to={item.href} className={styles.link}>
              {item.label}
            </Link>
            {index < items.length - 1 && <span className={styles.separator}>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  ),
);

Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
