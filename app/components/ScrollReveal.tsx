"use client";
import { useEffect, useRef, ReactNode } from "react";

export default function ScrollReveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  variant?: "up" | "left" | "right" | "scale" | "blur";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = () => {
      setTimeout(() => {
        el.classList.add("visible");
        if (variant === "left") el.classList.add("from-left");
        if (variant === "right") el.classList.add("from-right");
        if (variant === "scale") el.classList.add("scale");
        if (variant === "blur") el.classList.add("blur");
      }, delay);
    };

    // If element is already in viewport, trigger immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      trigger();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger();
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, variant]);

  return (
    <div ref={ref} className={`scroll-reveal ${className}`} data-variant={variant}>
      {children}
    </div>
  );
}
