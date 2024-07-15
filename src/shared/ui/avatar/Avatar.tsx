import { forwardRef, ImgHTMLAttributes, ReactNode, Ref } from "react";
import clsx from "clsx";
import styles from "./Avatar.module.scss";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  size?: "small" | "medium" | "large";
  src?: string;
  alt?: string;
  icon?: ReactNode;
}

const Avatar = forwardRef<ImgHTMLAttributes<AvatarProps>, AvatarProps>(
  ({ className, src, size = "large", alt = "avatar", icon, ...props }, ref) => {
    return (
      <div
        className={clsx(styles.avatar, className, {
          [styles[size]]: size,
        })}
        ref={ref as Ref<HTMLDivElement>}
        {...props}
      >
        {src ? (
          <img className={styles.avatar__img} src={src} alt={alt} />
        ) : (
          <>{icon || alt.charAt(0).toUpperCase()}</>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

export { Avatar };
