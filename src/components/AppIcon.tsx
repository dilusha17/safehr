import { Icon } from "@iconify/react";
import { bundledIcons, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function AppIcon({ name, size = 48, className }: { name: IconName; size?: number; className?: string }) {
  return <span aria-hidden="true" className={cn("app-icon", className)} style={{ width: size, height: size }}>
    <Icon icon={bundledIcons[name]} ssr />
  </span>;
}