import { MapPin, MessageCircle, Phone } from "lucide-react";
import { company } from "@/data/company";

export function TopBar() {
  return (
    <div className="bg-navy-900 text-on-dark-muted">
      <div className="container-page flex h-9 items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4">
          <a href={company.phone.href} className="inline-flex items-center gap-1.5 hover:text-on-dark">
            <Phone className="size-3.5" aria-hidden /> {company.phone.display}
          </a>
          <a href={company.whatsapp.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-on-dark">
            <MessageCircle className="size-3.5" aria-hidden /> <span className="hidden sm:inline">WhatsApp</span> {company.whatsapp.display}
          </a>
        </div>
        <span className="hidden items-center gap-1.5 md:inline-flex">
          <MapPin className="size-3.5" aria-hidden /> {company.address.short}
        </span>
      </div>
    </div>
  );
}
