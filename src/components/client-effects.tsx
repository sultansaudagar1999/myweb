"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Reveals [data-reveal] elements as they scroll into view. Re-scans on navigation. */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

/** Sets --frame-h on scrolling previews so the hover scroll stops at the image bottom. */
export function ScrollPreviewSizer() {
  const pathname = usePathname();
  useEffect(() => {
    const frames = document.querySelectorAll<HTMLElement>(".scroll-preview");
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) (e.target as HTMLElement).style.setProperty("--frame-h", `${e.contentRect.height}px`);
    });
    frames.forEach((f) => ro.observe(f));
    return () => ro.disconnect();
  }, [pathname]);
  return null;
}
