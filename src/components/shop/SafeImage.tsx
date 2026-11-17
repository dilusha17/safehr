import { AppIcon } from "@/components/AppIcon";
import { useState, type ImgHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "width" | "height"> & {
  src: string;
  alt: string;
  width: number;
  height: number;
  eager?: boolean;
};

/** Lazy-loaded image with explicit dimensions and a neutral placeholder if it fails to load. */
export function SafeImage({ src, alt, width, height, eager, className, ...rest }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div role="img" aria-label={alt} className={cn("flex items-center justify-center bg-surface text-muted-foreground", className)} style={{ aspectRatio: `${width} / ${height}` }}>
        <AppIcon name="gloves" size={32} />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  );
}
