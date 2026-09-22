import { useEffect } from "react";

/** Adds .is-visible to .reveal elements as they enter the viewport. */
export function useReveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = new WeakSet<Element>();

    const revealAll = (nodes: HTMLElement[]) => {
      nodes.forEach((node) => node.classList.add("is-visible"));
    };

    let observer: IntersectionObserver | null = null;

    if (!reduced) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
      );
    }

    const scan = () => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
      if (reduced) {
        revealAll(nodes);
        return;
      }
      nodes.forEach((node) => {
        if (seen.has(node)) return;
        seen.add(node);
        observer?.observe(node);
      });
    };

    scan();
    const timer = window.setTimeout(scan, 200);
    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, []);
}
