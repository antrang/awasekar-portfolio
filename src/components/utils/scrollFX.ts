/**
 * Scroll and Context Animation Engine
 * High-performance, zero-jank IntersectionObserver & MutationObserver scroll orchestrator.
 * Strictly respects prefers-reduced-motion.
 */

export function initScrollFX(): () => void {
  if (typeof window === "undefined") return () => {};

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const SELECTOR = ".reveal-on-scroll, .flagship-card, .tech-category-card";

  const revealElements = document.querySelectorAll<HTMLElement>(SELECTOR);

  if (prefersReducedMotion) {
    revealElements.forEach((el) => {
      el.classList.add("is-visible");
    });
    return () => {};
  }

  // 1. Reveal on scroll observer for cards and bento containers
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => {
    el.classList.add("reveal-on-scroll", "is-observed");
    revealObserver.observe(el);
  });

  // Watch for lazy-loaded DOM elements (e.g., TechStack, CommitChart)
  const mutationObserver = new MutationObserver(() => {
    const unobserved = document.querySelectorAll<HTMLElement>(
      ".flagship-card:not(.is-observed), .tech-category-card:not(.is-observed)"
    );
    unobserved.forEach((el) => {
      el.classList.add("reveal-on-scroll", "is-observed");
      revealObserver.observe(el);
    });
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });

  // Cleanup handler
  return () => {
    revealObserver.disconnect();
    mutationObserver.disconnect();
  };
}
