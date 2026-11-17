import { createFileRoute } from "@tanstack/react-router";
import { HeroSlider } from "@/components/home/HeroSlider";
import { CategoryTiles, ClosingCta, FeaturedProducts, IndustriesStrip, TechTeaser, WhyShop } from "@/components/home/HomeSections";
import { BulkOrderCta } from "@/components/shop/BulkOrderCta";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Safety Gloves & Equipment NZ", "Shop cut, chemical, impact, general-use and garden safety gloves from Safe HR Consultants in Parnell, Auckland. Bulk orders welcome.", "/"),
  component: Home,
});

function Home() {
  return (
    <>
      <HeroSlider />
      <CategoryTiles />
      <FeaturedProducts />
      <WhyShop />
      <div className="container-page"><BulkOrderCta /></div>
      <div className="pt-16 md:pt-20"><TechTeaser /></div>
      <IndustriesStrip />
      <ClosingCta />
    </>
  );
}
