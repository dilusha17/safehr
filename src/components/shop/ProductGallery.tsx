import { useState } from "react";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { SafeImage } from "./SafeImage";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const current = images[index] ?? images[0] ?? "";
  return (
    <div>
      <button type="button" onClick={() => setOpen(true)} className="group relative block w-full overflow-hidden rounded-card border border-line bg-surface p-6" aria-label="Enlarge image">
        <SafeImage src={current} alt={alt} width={800} height={800} eager className="aspect-square w-full object-contain" />
        <span className="absolute right-3 top-3 rounded-md bg-background/90 p-2 text-navy-900 opacity-80 group-hover:opacity-100"><Expand className="size-4" aria-hidden /></span>
      </button>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((src, i) => (
            <button key={src} type="button" onClick={() => setIndex(i)} aria-label={`Show image ${i + 1}`} aria-current={i === index}
              className={cn("size-20 overflow-hidden rounded-md border-2 bg-surface p-1", i === index ? "border-safety-500" : "border-line")}>
              <SafeImage src={src} alt="" width={80} height={80} className="size-full object-contain" />
            </button>
          ))}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <SafeImage src={current} alt={alt} width={800} height={800} className="w-full object-contain" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
