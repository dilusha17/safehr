import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

export function Field({ id, label, error, optional, children }: { id: string; label: string; error?: string | undefined; optional?: boolean; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="font-semibold text-navy-900">
        {label} {optional && <span className="font-normal text-muted-foreground">(optional)</span>}
      </Label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export const inputCls = "h-11 bg-background";
