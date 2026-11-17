import { AppIcon } from "@/components/AppIcon";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categoryTree } from "@/lib/products";
import { CategoryLink } from "./CategoryLink";

const triggerCls =
  "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-navy-900 hover:bg-surface data-[state=open]:bg-surface";

export function ShopMegaMenu() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className={triggerCls}>
        Shop <ChevronDown className="size-4" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[min(90vw,40rem)] p-4">
        <div className="grid gap-6 sm:grid-cols-2">
          {categoryTree.map((top) => (
            <div key={top.slug}>
              <DropdownMenuItem asChild className="cursor-pointer">
                <CategoryLink path={top.path} className="flex items-baseline justify-between font-display text-lg font-bold text-navy-900">
                  {top.name} <span className="text-xs font-medium text-muted-foreground">{top.count} products</span>
                </CategoryLink>
              </DropdownMenuItem>
              <ul className="mt-1">
                {top.children.map((sub) => (
                  <li key={sub.slug}>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <CategoryLink path={sub.path} className="flex justify-between">
                        <span>{sub.name}</span>
                        <span className="text-xs text-muted-foreground">{sub.count}</span>
                      </CategoryLink>
                    </DropdownMenuItem>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="rounded-lg bg-surface p-4">
            <p className="font-display text-lg font-bold text-navy-900">Ordering in bulk?</p>
            <p className="mt-1 text-sm text-muted-foreground">Contact us for team and site quantities.</p>
            <DropdownMenuItem asChild className="mt-3 cursor-pointer font-semibold text-safety-700">
              <Link to="/bulk-orders" search={{ product: undefined }}>Bulk order enquiry →</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer font-semibold">
              <Link to="/shop">View all products</Link>
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TechnologyMenu() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className={triggerCls}>
        Technology <ChevronDown className="size-4" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-80 p-2">
        <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">Enquiry only</DropdownMenuLabel>
        <DropdownMenuItem asChild className="cursor-pointer items-start gap-3 p-3">
          <Link to="/technology/air-quality-monitoring">
            <AppIcon name="air" size=20 />
            <span>
              <span className="block font-semibold text-navy-900">Air Quality Monitoring Device</span>
              <span className="block text-xs text-muted-foreground">Air quality and CO sensors</span>
            </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer items-start gap-3 p-3">
          <Link to="/technology/ai-safety-camera-system">
            <AppIcon name="camera" size=20 />
            <span>
              <span className="block font-semibold text-navy-900">AI Safety Camera System</span>
              <span className="block text-xs text-muted-foreground">Camera analytics with Redvision</span>
            </span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
