import { forwardRef, ImgHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Image.module.scss";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  alt: string;
  src: string;
  size?: string;
  alignSelf?: string;
}

const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ className, objectFit = "cover", children, alt, src, size, alignSelf, ...props }, ref) => (
    <img
      className={clsx(styles.image, className, {
        [styles[objectFit]]: objectFit,
      })}
      style={{ width: size, height: size, alignSelf: alignSelf }}
      ref={ref}
      src={src}
      alt={alt}
      {...props}
    />
  ),
);

Image.displayName = "Image";

export { Image };
