import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FilterSidebar, type FilterProps } from "./FilterSidebar";

export function FilterSheet(props: FilterProps) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="h-11 lg:hidden"><SlidersHorizontal /> Filters</Button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
        <div className="px-4 pb-8"><FilterSidebar {...props} onNavigate={() => setOpen(false)} /></div>
      </SheetContent>
    </Sheet>
  );
}
