import { Link } from "@tanstack/react-router";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/lib/products";
import { SafeImage } from "@/components/shop/SafeImage";
import { IllustrativeSensor } from "@/components/tech/IllustrativeSensor";
import heroShop from "@/assets/hero/hero-shop.jpg";
import heroAir from "@/assets/hero/hero-air-quality.jpg";
import { cn } from "@/lib/utils";

const heroProducts = ["p02", "p06", "p10"].map((id) => getProductById(id)).filter((p) => p !== undefined);

function ProductStack() {
  const rot = ["-rotate-6 translate-y-6", "z-10 -translate-y-2", "rotate-6 translate-y-8"];
  return (
    <div className="relative flex h-full items-center justify-center" aria-hidden>
      <div className="absolute size-64 rounded-full bg-safety-500/80 blur-[2px] md:size-80" />
      <div className="relative flex -space-x-10">
        {heroProducts.map((p, i) => (
          <div key={p.id} className={cn("w-32 rounded-card border border-line bg-background p-3 shadow-2xl sm:w-40 md:w-44", rot[i])}>
            <SafeImage src={p.imageUrl} alt="" width={176} height={176} eager className="aspect-square w-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSlider() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) setPlaying(false);
  }, []);

  const autoplay = useMemo(() => Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true, playOnInit: true }), []);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const ap = api.plugins().autoplay;
    if (!ap) return;
    if (playing && !reduced) ap.play(); else ap.stop();
  }, [api, playing, reduced]);

  const pauseOnFocus = useCallback(() => api?.plugins().autoplay?.stop(), [api]);
  const resumeOnBlur = useCallback(() => { if (playing && !reduced) api?.plugins().autoplay?.play(); }, [api, playing, reduced]);

  const slides = [
    {
      bg: heroShop,
      eyebrow: "Safe HR Safety Store",
      title: "Safety gloves built for the job.",
      body: "Cut, chemical, impact and general-use protection for New Zealand workplaces. Order online, or contact us for bulk pricing.",
      actions: (
        <>
          <Button asChild size="lg"><Link to="/shop/$category" params={{ category: "safety-gloves" }}>Shop Safety Gloves</Link></Button>
          <Button asChild size="lg" variant="outlineLight"><Link to="/bulk-orders" search={{ product: undefined }}>Bulk orders: contact us</Link></Button>
        </>
      ),
      chips: ["Cut levels A2 to A5", "Chemical resistant", "Bulk orders welcome"],
      visual: <ProductStack />,
    },
    {
      bg: heroAir,
      eyebrow: "Technology",
      title: "Know the air your team breathes.",
      body: "IoT air quality and carbon monoxide sensors that feed live compliance visibility for your site.",
      actions: (
        <>
          <Button asChild size="lg"><Link to="/technology/air-quality-monitoring">Explore Air Quality Monitoring</Link></Button>
          <Button asChild size="lg" variant="outlineLight"><Link to="/contact" search={{ topic: "air-quality" }}>Request a demo</Link></Button>
        </>
      ),
      chips: [] as string[],
      visual: <div className="flex h-full items-center"><IllustrativeSensor /></div>,
    },
  ];

  return (
    <section aria-roledescription="carousel" aria-label="Featured" className="relative bg-navy-900" onFocusCapture={pauseOnFocus} onBlurCapture={resumeOnBlur}>
      <Carousel setApi={setApi} opts={{ loop: true }} plugins={[autoplay]}>
        <CarouselContent className="ml-0">
          {slides.map((s, i) => (
            <CarouselItem key={s.title} className="pl-0" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>
              <div className="relative min-h-[480px] overflow-hidden md:h-[560px]">
                <img src={s.bg} alt="" width={1920} height={1088} loading={i === 0 ? "eager" : "lazy"} className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-0 bg-navy-900/80 md:bg-gradient-to-r md:from-navy-900 md:via-navy-900/85 md:to-navy-900/40" />
                <div className="container-page relative grid h-full gap-8 py-12 pb-24 md:grid-cols-[55%_45%] md:items-center md:py-0">
                  <div className="text-on-dark">
                    <p className="eyebrow text-hivis-400">{s.eyebrow}</p>
                    {i === 0 ? (
                      <h1 className="mt-3 text-4xl leading-[1.05] md:text-6xl">{s.title}</h1>
                    ) : (
                      <h2 className="mt-3 text-4xl leading-[1.05] md:text-6xl">{s.title}</h2>
                    )}
                    <p className="mt-4 max-w-xl text-base text-on-dark-muted md:text-lg">{s.body}</p>
                    <div className="mt-7 flex flex-wrap gap-3">{s.actions}</div>
                    {s.chips.length > 0 && (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {s.chips.map((c) => (
                          <li key={c} className="rounded-full border border-on-dark/25 px-3 py-1 text-xs font-medium text-on-dark">{c}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="hidden h-full md:block">{s.visual}</div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="container-page pointer-events-none absolute inset-x-0 bottom-6">
        <div className="pointer-events-auto flex items-center gap-3 text-on-dark">
          <button type="button" onClick={() => api?.scrollPrev()} aria-label="Previous slide" className="flex size-10 items-center justify-center rounded-full border border-on-dark/30 hover:bg-on-dark/10"><ChevronLeft className="size-5" /></button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button key={i} type="button" onClick={() => api?.scrollTo(i)} aria-label={`Go to slide ${i + 1}`} aria-current={selected === i}
                className={cn("h-2.5 rounded-full transition-all", selected === i ? "w-8 bg-safety-500" : "w-2.5 bg-on-dark/40 hover:bg-on-dark/70")} />
            ))}
          </div>
          <button type="button" onClick={() => api?.scrollNext()} aria-label="Next slide" className="flex size-10 items-center justify-center rounded-full border border-on-dark/30 hover:bg-on-dark/10"><ChevronRight className="size-5" /></button>
          <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause slideshow" : "Play slideshow"} disabled={reduced}
            className="flex size-10 items-center justify-center rounded-full border border-on-dark/30 hover:bg-on-dark/10 disabled:opacity-40">
            {playing && !reduced ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
          <span className="text-sm tabular-nums text-on-dark-muted" aria-live="polite">{selected + 1} / {slides.length}</span>
        </div>
      </div>
    </section>
  );
}
