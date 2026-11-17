import { AppIcon } from "@/components/AppIcon";
import { Link } from "@tanstack/react-router";

import { company } from "@/data/company";
import { categoryTree } from "@/lib/products";
import { CategoryLink } from "./CategoryLink";
import { Logo } from "./Logo";

const linkCls = "text-sm text-on-dark-muted hover:text-on-dark hover:underline rounded";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-on-dark">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="light" />
          <p className="mt-4 text-sm text-on-dark-muted">
            {company.tagline} A New Zealand workplace safety consultancy supplying safety gloves and equipment.
          </p>
          <address className="mt-5 space-y-2 text-sm not-italic text-on-dark-muted">
            <p className="flex gap-2"><AppIcon name="address" size={16} />{company.address.full}</p>
            <p><a className="flex gap-2 hover:text-on-dark" href={company.phone.href}><AppIcon name="phone" size={16} />{company.phone.display}</a></p>
            <p><a className="flex gap-2 hover:text-on-dark" href={company.whatsapp.href} target="_blank" rel="noopener noreferrer"><AppIcon name="whatsapp" size={16} />WhatsApp {company.whatsapp.display}</a></p>
            <p><a className="flex gap-2 break-all hover:text-on-dark" href={`mailto:${company.email}`}><AppIcon name="email" size={16} />{company.email}</a></p>
          </address>
        </div>
        <div>
          <h2 className="font-display text-lg">Shop</h2>
          <ul className="mt-4 space-y-2">
            <li><Link to="/shop" className={linkCls}>All products</Link></li>
            {categoryTree.map((c) => (
              <li key={c.slug}><CategoryLink path={c.path} className={linkCls}>{c.name}</CategoryLink></li>
            ))}
            {categoryTree.flatMap((c) => c.children).map((c) => (
              <li key={c.slug}><CategoryLink path={c.path} className={linkCls}>{c.name}</CategoryLink></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-lg">Technology</h2>
          <ul className="mt-4 space-y-2">
            <li><Link to="/technology/air-quality-monitoring" className={linkCls}>Air Quality Monitoring Device</Link></li>
            <li><Link to="/technology/ai-safety-camera-system" className={linkCls}>AI Safety Camera System</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-lg">Company</h2>
          <ul className="mt-4 space-y-2">
            <li><Link to="/about" className={linkCls}>About</Link></li>
            <li><Link to="/contact" search={{ topic: undefined }} className={linkCls}>Contact</Link></li>
            <li><Link to="/bulk-orders" search={{ product: undefined }} className={linkCls}>Bulk orders</Link></li>
            <li><Link to="/privacy" className={linkCls}>Privacy</Link></li>
            <li><Link to="/terms" className={linkCls}>Terms</Link></li>
            <li><Link to="/shipping-returns" className={linkCls}>Shipping and Returns</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-on-dark/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-on-dark-muted sm:flex-row sm:justify-between">
          <p>© 2026 {company.name}</p>
          <p>All prices in NZD</p>
        </div>
      </div>
    </footer>
  );
}
