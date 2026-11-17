import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type Props = { path: string[]; className?: string; children: ReactNode; onClick?: (() => void) | undefined };

/** Typed link to a top-level or sub-category page from a category path. */
export function CategoryLink({ path, className, children, onClick }: Props) {
  const [a, b] = path;
  if (a && b) {
    return (
      <Link
        to="/shop/$category/$subcategory"
        params={{ category: a, subcategory: b }}
        className={className}
        onClick={onClick}
        activeProps={{ "aria-current": "page" }}
      >
        {children}
      </Link>
    );
  }
  if (a) {
    return (
      <Link to="/shop/$category" params={{ category: a }} className={className} onClick={onClick}>
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
