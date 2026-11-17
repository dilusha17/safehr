import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type Props = { path: string[]; className?: string; children: ReactNode; onClick?: () => void };

/** Typed link to a top-level or sub-category page from a category path. */
export function CategoryLink({ path, className, children, onClick }: Props) {
  if (path.length >= 2) {
    return (
      <Link
        to="/shop/$category/$subcategory"
        params={{ category: path[0], subcategory: path[1] }}
        className={className}
        onClick={onClick}
        activeProps={{ "aria-current": "page" }}
      >
        {children}
      </Link>
    );
  }
  if (path.length === 1) {
    return (
      <Link to="/shop/$category" params={{ category: path[0] }} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/shop" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
