import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SendButtons({ onWhatsApp, onEmail, waLabel = "Send via WhatsApp" }: { onWhatsApp: () => void; onEmail: () => void; waLabel?: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button type="button" size="lg" onClick={onWhatsApp}><MessageCircle /> {waLabel}</Button>
      <Button type="button" size="lg" variant="outline" onClick={onEmail}><Mail /> Send by email</Button>
    </div>
  );
}

export function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}
