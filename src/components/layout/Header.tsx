import { AppIcon } from "@/components/AppIcon";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { buildWhatsAppLink } from "@/lib/format";
import { cn } from "@/lib/utils";
import { TopBar } from "./TopBar";
import { Logo } from "./Logo";
import { ShopMegaMenu, TechnologyMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { SearchDialog } from "@/components/shop/SearchDialog";

const navCls = "rounded-md px-3 py-2 text-sm font-semibold text-navy-900 hover:bg-surface";

export function Header() {
  const { totalQty, setOpen, hydrated } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <TopBar />
      <header className={cn("sticky top-0 z-40 border-b border-line bg-background/95 backdrop-blur transition-shadow", scrolled && "shadow-md")}>
        <div className="container-page flex h-[4.5rem] items-center gap-2">
          <MobileNav />
          <Logo className="mr-4" />
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <Link to="/" className={navCls} activeOptions={{ exact: true }} activeProps={{ className: "text-safety-700" }}>Home</Link>
            <ShopMegaMenu />
            <TechnologyMenu />
            <Link to="/about" className={navCls} activeProps={{ className: "text-safety-700" }}>About</Link>
            <Link to="/contact" search={{ topic: undefined }} className={navCls} activeProps={{ className: "text-safety-700" }}>Contact</Link>
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Search products" onClick={() => setSearchOpen(true)}>
              <Search className="size-5" />
            </Button>
            <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
              <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <AppIcon name="whatsapp" size=20 /> WhatsApp
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={() => setOpen(true)} aria-label={`Open cart, ${hydrated ? totalQty : 0} items`}>
              <AppIcon name="cart" size=20 />
              {hydrated && totalQty > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex min-w-5 items-center justify-center rounded-full bg-safety-500 px-1 text-[0.7rem] font-bold leading-5 text-navy-900" aria-hidden>
                  {totalQty}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
