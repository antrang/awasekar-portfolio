/**
 * Scroll and Context Animation Engine
 * High-performance, zero-jank IntersectionObserver & MutationObserver scroll orchestrator.
 * Strictly respects prefers-reduced-motion.
 */

export function initScrollFX(): () => void {
  if (typeof window === "undefined") return () => {};

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const timeoutIds: ReturnType<typeof setTimeout>[] = [];

  const SELECTOR =
    ".reveal-on-scroll, .pillar-card, .flagship-card, .tech-category-card, .value-card, .about-story";

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
      ".pillar-card:not(.is-observed), .flagship-card:not(.is-observed), .tech-category-card:not(.is-observed), .value-card:not(.is-observed), .about-story:not(.is-observed)"
    );
    unobserved.forEach((el) => {
      el.classList.add("reveal-on-scroll", "is-observed");
      revealObserver.observe(el);
    });
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });

  // 2. amber Ocean Text-to-SQL Pipeline sequential step illumination
  const flowBoxes = document.querySelectorAll<HTMLElement>(".system-flow-box");
  const flowObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const steps = entry.target.querySelectorAll<HTMLElement>(".flow-step");
          const arrows = entry.target.querySelectorAll<HTMLElement>(".flow-arrow");

          steps.forEach((step, idx) => {
            const tid = setTimeout(() => {
              step.classList.add("flow-step-active");
              if (arrows[idx]) {
                arrows[idx].classList.add("flow-arrow-active");
              }
            }, idx * 220);
            timeoutIds.push(tid);
          });
        }
      });
    },
    { threshold: 0.25 }
  );

  flowBoxes.forEach((box) => flowObserver.observe(box));

  // 3. amber Radar Sparkline trigger
  const radarOverlays = document.querySelectorAll<HTMLElement>(".radar-sparkline-overlay");
  const radarObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("sparkline-animated");
        }
      });
    },
    { threshold: 0.2 }
  );

  radarOverlays.forEach((overlay) => radarObserver.observe(overlay));

  // Cleanup handler
  return () => {
    revealObserver.disconnect();
    mutationObserver.disconnect();
    flowObserver.disconnect();
    radarObserver.disconnect();
    timeoutIds.forEach((id) => clearTimeout(id));
  };
}
