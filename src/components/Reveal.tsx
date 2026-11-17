import { useEffect, useRef, useState, type ReactNode } from "react";

export const stagger = (index: number) => Math.min(index * 80, 400);

/** Above-fold elements stay visible; only offscreen content opts into AOS. */
export function Reveal({ children, animation = "fade-up", delay = 0, duration = 700, className }: {
  children: ReactNode; animation?: string; delay?: number; duration?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!motion.matches && node.getBoundingClientRect().top >= window.innerHeight) setAnimate(true);
    const onMotion = () => { if (motion.matches) setAnimate(false); };
    motion.addEventListener("change", onMotion);
    return () => motion.removeEventListener("change", onMotion);
  }, []);
  useEffect(() => {
    if (animate) void import("aos").then(({ default: AOS }) => AOS.refreshHard());
  }, [animate]);
  return <div ref={ref} className={className} {...(animate ? {
    "data-aos": animation, "data-aos-delay": delay, "data-aos-duration": duration,
    "data-aos-once": "true",
  } : {})}>{children}</div>;
}