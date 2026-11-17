import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { categoryTree } from "@/lib/products";
import { company } from "@/data/company";
import { buildWhatsAppLink } from "@/lib/format";
import { CategoryLink } from "./CategoryLink";
import { Logo } from "./Logo";

const linkCls = "block rounded-md px-2 py-2.5 font-semibold text-navy-900 hover:bg-surface";
const subCls = "flex justify-between rounded-md px-2 py-2 text-sm text-ink hover:bg-surface";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto">
        <SheetHeader>
          <SheetTitle asChild>
            <div><Logo /></div>
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="mt-4 px-4 pb-6">
          <Link to="/" className={linkCls} onClick={close}>Home</Link>
          <Accordion type="multiple">
            <AccordionItem value="shop">
              <AccordionTrigger className="px-2 font-semibold text-navy-900">Shop</AccordionTrigger>
              <AccordionContent>
                <Link to="/shop" className={subCls} onClick={close}>All products</Link>
                {categoryTree.map((top) => (
                  <div key={top.slug}>
                    <CategoryLink path={top.path} className={`${subCls} font-semibold`} onClick={close}>
                      <span>{top.name}</span><span className="text-muted-foreground">{top.count}</span>
                    </CategoryLink>
                    {top.children.map((sub) => (
                      <CategoryLink key={sub.slug} path={sub.path} className={`${subCls} pl-5`} onClick={close}>
                        <span>{sub.name}</span><span className="text-muted-foreground">{sub.count}</span>
                      </CategoryLink>
                    ))}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="tech">
              <AccordionTrigger className="px-2 font-semibold text-navy-900">Technology</AccordionTrigger>
              <AccordionContent>
                <Link to="/technology/air-quality-monitoring" className={subCls} onClick={close}>Air Quality Monitoring Device</Link>
                <Link to="/technology/ai-safety-camera-system" className={subCls} onClick={close}>AI Safety Camera System</Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Link to="/bulk-orders" search={{ product: undefined }} className={linkCls} onClick={close}>Bulk orders</Link>
          <Link to="/about" className={linkCls} onClick={close}>About</Link>
          <Link to="/contact" search={{ topic: undefined }} className={linkCls} onClick={close}>Contact</Link>
          <div className="mt-6 grid gap-2">
            <Button asChild><a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer">WhatsApp us</a></Button>
            <Button asChild variant="outline"><a href={company.phone.href}>Call {company.phone.display}</a></Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
