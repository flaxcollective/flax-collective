"use client";
import { useEffect } from "react";

/**
 * useScrollAnimation
 * Adds `.in-view` to any element with class `.anim` when it enters the viewport.
 * Call once in a layout or page-level component.
 */
export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            // Unobserve after triggering so animation only plays once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,      // trigger when 12% visible
        rootMargin: "0px 0px -40px 0px", // slight offset from bottom
      }
    );

    // Observe all elements with .anim class
    const elements = document.querySelectorAll(".anim");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}